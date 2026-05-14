// =====================================================
// v17 OutputHistory — Zackyのアウトプット → AIレビュー → Vocab自動登録 ループ
// =====================================================
const OutputHistory = {
  KEY: 'output_history',
  USAGE_KEY: 'phrase_usage_log',

  all() { return Storage.get(this.KEY, []); },
  save(list) { Storage.set(this.KEY, list); },

  add(entry) {
    const list = this.all();
    const item = {
      id: 'o' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      timestamp: new Date().toISOString(),
      source: entry.source || 'writing',  // 'writing'|'realtime'|'livetalk'|'composition'
      rawText: entry.rawText || '',
      reviewedText: entry.reviewedText || '',
      overall: entry.overall || '',
      issues: entry.issues || [],
      refined: entry.refined || '',
      extract: entry.extract || []
    };
    list.unshift(item);
    // 直近300件まで保持
    this.save(list.slice(0, 300));
    return item;
  },

  get(id) {
    return this.all().find(o => o.id === id);
  },

  remove(id) {
    this.save(this.all().filter(o => o.id !== id));
  },

  bySource(source) {
    if (!source || source === 'all') return this.all();
    return this.all().filter(o => o.source === source);
  },

  // 日付ごとにグルーピング (YYYY-MM-DD)
  groupByDate() {
    const map = {};
    this.all().forEach(o => {
      const d = new Date(o.timestamp);
      const key = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
      if (!map[key]) map[key] = [];
      map[key].push(o);
    });
    return map;
  },

  // 使用ログ
  usage() { return Storage.get(this.USAGE_KEY, {}); },
  saveUsage(u) { Storage.set(this.USAGE_KEY, u); },

  logUsed(vocabId) {
    const u = this.usage();
    if (!u[vocabId]) u[vocabId] = { used: [], skipped: [] };
    u[vocabId].used.push(Date.now());
    if (u[vocabId].used.length > 50) u[vocabId].used = u[vocabId].used.slice(-50);
    this.saveUsage(u);
  },

  logSkipped(vocabId) {
    const u = this.usage();
    if (!u[vocabId]) u[vocabId] = { used: [], skipped: [] };
    u[vocabId].skipped.push(Date.now());
    if (u[vocabId].skipped.length > 50) u[vocabId].skipped = u[vocabId].skipped.slice(-50);
    this.saveUsage(u);
  }
};

// =====================================================
// reviewOutput(text, source) — gpt-4o汎用レビュー関数
// =====================================================
async function reviewOutput(rawText, source = 'writing') {
  if (!Storage.hasApiKey()) {
    throw new Error('OpenAI APIキーが必要です。');
  }
  if (!rawText || !rawText.trim()) {
    throw new Error('テキストが空です。');
  }
  const sys = `You are Zacky's English coach. He's a Japanese business professional (TOEIC 800+) working on cross-cultural client conversations. Context hint: occasionally Indonesia/Jakarta or luxury client topics may come up — handle them naturally but don't force flower/business vocabulary unless he uses it. Focus on natural business English, nuance, register, fluency.

Source of this output: ${source} (writing=he typed it; realtime/livetalk=spoken transcript; composition=written exercise).

Return STRICTLY VALID JSON (no markdown, no code fence) in this exact shape:
{
  "overall": "1-2 sentence overall assessment in Japanese (warm but honest)",
  "issues": [
    { "quote": "exact phrase from user's text", "type": "grammar|word_choice|register|natural", "fix": "corrected version", "why": "Japanese explanation, 1 sentence" }
  ],
  "refined": "polished, natural business-English version of the entire text (keep his intent, just sound like a confident native)",
  "extract": [
    { "type": "phrase|word|pattern", "en": "the useful expression", "jp": "Japanese meaning", "why_useful": "Japanese, 1 sentence why Zacky should add this", "example_in_context": "1 example sentence using it" }
  ]
}

Rules for extract:
- 3-6 items, focused on what HE was trying to say but said awkwardly. Pull from the gap between his rawText and the refined version.
- Skip extracts if the original was already perfect.
- If transcript is very short or filler-only, return empty extract.`;

  const user = `Zacky's output:
"""
${rawText}
"""`;

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Storage.getApiKey()
    },
    body: JSON.stringify({
      model: Storage.get('chatModel', 'gpt-4o'),
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: user }
      ],
      temperature: 0.5,
      response_format: { type: 'json_object' }
    })
  });
  if (!r.ok) {
    const errText = await r.text();
    throw new Error('AI request failed: ' + r.status + ' ' + errText.slice(0, 150));
  }
  const data = await r.json();
  const raw = data.choices[0].message.content;
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch { throw new Error('AI returned invalid JSON'); }

  // OutputHistory に保存
  const saved = OutputHistory.add({
    source,
    rawText,
    reviewedText: parsed.refined || '',
    overall: parsed.overall || '',
    issues: parsed.issues || [],
    refined: parsed.refined || '',
    extract: parsed.extract || []
  });

  // extract → Vocab自動登録
  if (Array.isArray(parsed.extract)) {
    parsed.extract.forEach(ex => {
      if (!ex || !ex.en) return;
      // 重複チェック (同じen文字列)
      const exists = Vocab.all().some(v =>
        (v.en || '').toLowerCase().trim() === ex.en.toLowerCase().trim()
      );
      if (exists) return;
      Vocab.add({
        type: ex.type === 'word' ? 'word' : 'phrase',
        en: ex.en,
        jp: ex.jp || '',
        examples: ex.example_in_context ? [ex.example_in_context] : [],
        source: 'extracted',
        sourceOutputId: saved.id,
        contextExample: rawText.length < 200 ? rawText : rawText.slice(0, 200) + '...',
        refinedExample: ex.example_in_context || (parsed.refined || '').slice(0, 200),
        forcedUseCount: 0,
        whyUseful: ex.why_useful || ''
      });
    });
  }

  return { entry: saved, parsed };
}

// =====================================================
// detectPhraseUsage — 部分一致でフレーズ使用検知
// =====================================================
function detectPhraseUsage(transcript, phrases) {
  if (!transcript || !Array.isArray(phrases)) return [];
  const lower = transcript.toLowerCase();
  return phrases.filter(p => {
    const target = (p.en || '').toLowerCase().trim();
    if (!target) return false;
    if (lower.includes(target)) return true;
    const words = target.split(/\s+/).filter(w => w.length > 3);
    if (words.length === 0) return lower.includes(target);
    const hits = words.filter(w => lower.includes(w)).length;
    return hits / words.length >= 0.5;
  });
}

// =====================================================
// MustUse — 今日強制再利用すべき6個
// =====================================================
const MustUse = {
  COUNT: 6,

  list() {
    if (typeof Vocab === 'undefined') return [];
    const due = Vocab.due();
    const newItems = Vocab.newItems().filter(v => !due.find(d => d.id === v.id));
    // 抽出系を優先
    const sortFn = (a, b) => {
      const aExt = a.source === 'extracted' ? 0 : 1;
      const bExt = b.source === 'extracted' ? 0 : 1;
      if (aExt !== bExt) return aExt - bExt;
      // forcedUseCount少ない順（=まだ使われてない）
      return (a.forcedUseCount || 0) - (b.forcedUseCount || 0);
    };
    const combined = [...due, ...newItems].sort(sortFn);
    return combined.slice(0, this.COUNT);
  },

  // プロンプト注入用テキスト
  promptInjection() {
    const list = this.list();
    if (list.length === 0) return '';
    return `\n\n[FORCED VOCABULARY — please naturally weave these 6 into your replies/scenarios so Zacky encounters them in context]:\n` +
      list.map((v, i) => `${i+1}. ${v.en}${v.jp ? ' (' + v.jp + ')' : ''}`).join('\n');
  },

  // 使用検知して SM-2 自動更新 + ログ
  applyUsageDetection(transcript) {
    const list = this.list();
    if (list.length === 0) return { used: [], unused: [] };
    const used = detectPhraseUsage(transcript, list);
    const usedIds = new Set(used.map(u => u.id));
    used.forEach(u => {
      Vocab.review(u.id, 5); // 自動 Easy
      OutputHistory.logUsed(u.id);
    });
    // 未使用は forcedUseCount++
    const items = Vocab.all();
    list.forEach(p => {
      if (usedIds.has(p.id)) return;
      const idx = items.findIndex(i => i.id === p.id);
      if (idx >= 0) {
        items[idx].forcedUseCount = (items[idx].forcedUseCount || 0) + 1;
      }
      OutputHistory.logSkipped(p.id);
    });
    Vocab.save(items);
    return { used, unused: list.filter(p => !usedIds.has(p.id)) };
  }
};
