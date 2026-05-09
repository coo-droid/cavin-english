// =====================================================
// シャドーイング v5
// セッション = 短文2 + 長文1（自動選択）
// 各itemに「なぜ練習するか」表示
// 録音 + 発音チェック付き
// =====================================================
const Shadowing = {
  state: null,
  timerInterval: null,

  // セッション開始：自動で 短文2 + 長文1 を選ぶ
  startSession() {
    const items = this.pickSessionItems();
    this.state = {
      session: items,        // 配列：[short1, short2, long1] の順
      sessionIndex: 0,
      current: 0,            // 現在のitemでの繰り返し数
      isRecording: false,
      lastRecordingUrl: null,
      autoMode: false,
      timerStart: Date.now(),
      elapsedMs: 0
    };
    this.startTimer();
    this.renderItem();
  },

  // 履歴ベースで次の3教材を選ぶ（前回と被りにくいように）
  pickSessionItems() {
    const recent = Storage.get('shadow_recent', []);
    const recentTexts = new Set(recent.slice(-9));

    const shortPool = SHADOW_BANK.short.filter(s => !recentTexts.has(s.text));
    const longPool  = SHADOW_BANK.long.filter(s => !recentTexts.has(s.text));

    const shortAvail = shortPool.length >= 2 ? shortPool : SHADOW_BANK.short.slice();
    const longAvail = longPool.length >= 1 ? longPool : SHADOW_BANK.long.slice();

    const s1 = shortAvail.splice(Math.floor(Math.random() * shortAvail.length), 1)[0];
    const s2 = shortAvail.splice(Math.floor(Math.random() * shortAvail.length), 1)[0];
    const l1 = longAvail[Math.floor(Math.random() * longAvail.length)];

    const items = [
      { ...s1, level: 1, target: 50 },
      { ...s2, level: 1, target: 50 },
      { ...l1, level: 2, target: 20 }
    ];
    // 履歴更新
    const updated = [...recent, s1.text, s2.text, l1.text].slice(-12);
    Storage.set('shadow_recent', updated);
    return items;
  },

  // 1教材完了→次へ
  nextItem() {
    if (!this.state) return;
    this.state.sessionIndex += 1;
    this.state.current = 0;
    this.state.lastRecordingUrl = null;
    if (this.state.sessionIndex >= this.state.session.length) {
      this.completeSession();
      return;
    }
    this.renderItem();
  },

  // 全完了
  completeSession() {
    Speech.cancel();
    this.stopTimer();
    Storage.markDone('shadowing-hub');
    const elapsed = this.formatTime(this.state.elapsedMs);
    const totalReps = this.state.session.reduce((s, i) => s + i.target, 0);
    const xp = 60; // 短文2+長文1 完走で60 XP
    Storage.addXP(xp);
    App.confetti(60);
    this.state = null;
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">SESSION COMPLETE</div>
      <div class="burst-card">
        <div class="burst-emoji">🌸</div>
        <div class="burst-title">${totalReps} reps in ${elapsed}</div>
        <div class="burst-msg">Your mouth knows more English than 1 hour ago.</div>
        <div style="margin-top: 12px;"><span class="xp-badge" style="font-size: 14px; padding: 6px 16px;">+${xp} XP</span></div>
      </div>
      <div class="why-card" style="margin: 12px 0;">
        <div class="why-label">WHY THIS MATTERS</div>
        <div class="why-text">This is how your Jakarta-day English is built. Mouth memory now → confidence on July 23.</div>
      </div>
      <button class="btn-primary btn-success" onclick="App.closeModal()">AWESOME 🔥</button>
    `;
    App.toast('+' + xp + ' XP earned!', 'xp');
    setTimeout(() => App.checkAchievements(), 1500);
    // Daily Flow連動：シャドーイング完了を検知して自動advance
    if (window._dailyFlowAfterShadow && typeof Modules !== 'undefined' && Modules.onDailyFlowShadowComplete) {
      Modules.onDailyFlowShadowComplete();
    }
  },

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.state) { clearInterval(this.timerInterval); return; }
      this.state.elapsedMs = Date.now() - this.state.timerStart;
      const el = document.getElementById('shadowTimer');
      if (el) el.textContent = this.formatTime(this.state.elapsedMs);
    }, 200);
  },
  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = null;
  },
  formatTime(ms) {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2,'0')}`;
  },

  async playRound() {
    if (!this.state) return;
    const item = this.state.session[this.state.sessionIndex];
    Speech.cancel();
    Speech.speak(item.text, 0.85, () => {
      if (this.state && this.state.autoMode) {
        setTimeout(() => this.nextRep(), 800);
      }
    });
  },

  nextRep() {
    if (!this.state) return;
    this.state.current += 1;
    Storage.recordEvent('shadow_rep');
    const item = this.state.session[this.state.sessionIndex];
    if (this.state.current >= item.target) {
      // この教材完了
      this.itemComplete();
      return;
    }
    this.renderItem();
    if (this.state.autoMode) this.playRound();
  },

  itemComplete() {
    if (!this.state) return;
    const item = this.state.session[this.state.sessionIndex];
    const isLast = this.state.sessionIndex >= this.state.session.length - 1;
    const remaining = this.state.session.length - this.state.sessionIndex - 1;
    Storage.addXP(item.level === 1 ? 15 : 30);

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">ITEM ${this.state.sessionIndex + 1} / ${this.state.session.length} DONE</div>
      <div class="burst-card" style="background: linear-gradient(135deg, #d4f7b8, #aae883); border-color: var(--success-dark);">
        <div class="burst-emoji">✓</div>
        <div class="burst-title" style="color: var(--success-dark);">${item.target} reps complete</div>
        <div class="burst-msg">"${item.text.substring(0, 80)}${item.text.length > 80 ? '...' : ''}"</div>
        <div style="margin-top: 12px;"><span class="xp-badge" style="background: var(--success); border-bottom-color: var(--success-shadow); font-size: 14px; padding: 6px 14px;">+${item.level === 1 ? 15 : 30} XP</span></div>
      </div>
      ${isLast ? '' : `
        <div style="text-align: center; font-size: 13px; color: var(--text-soft); font-weight: 800; margin: 14px 0;">
          ${remaining} more ${remaining === 1 ? 'item' : 'items'} to finish session
        </div>
      `}
      <button class="btn-primary btn-success" onclick="Shadowing.nextItem()">${isLast ? 'FINISH SESSION 🌸' : 'NEXT ITEM →'}</button>
    `;
  },

  toggleAuto() {
    if (!this.state) return;
    this.state.autoMode = !this.state.autoMode;
    this.renderItem();
    if (this.state.autoMode) this.playRound();
    else Speech.cancel();
  },

  // ===== 録音 =====
  async toggleRecording() {
    if (!this.state) return;
    if (this.state.isRecording) {
      try {
        const data = await Speech.stopRecording();
        this.state.isRecording = false;
        this.state.lastRecordingUrl = data ? data.url : null;
      } catch (e) {
        this.state.isRecording = false;
      }
      this.renderItem();
    } else {
      try {
        await Speech.startRecording();
        this.state.isRecording = true;
        this.renderItem();
      } catch (e) {
        this.handleMicError(e);
      }
    }
  },

  handleMicError(e) {
    const msg = (e && e.message) || 'unknown';
    let display = '';
    if (msg === 'PERM_DENIED') {
      display = 'Microphone permission denied.<br>Tap the 🔒 icon in Safari → Microphone → Allow.';
    } else if (msg === 'NO_MIC') {
      display = 'No microphone found on this device.';
    } else if (msg === 'NOT_SECURE') {
      display = 'Recording requires HTTPS. Open via the GitHub Pages URL.';
    } else if (msg === 'NO_MEDIA_API') {
      display = Speech.isStandalone() && Speech.isIOS()
        ? 'Recording is unstable in iPhone Home Screen mode.<br><b>Open this site in Safari</b> (not the home icon) to record.'
        : 'Your browser does not support audio recording.';
    } else {
      display = 'Recording failed: ' + msg + '<br>Try opening in Safari instead of Home Screen app.';
    }
    document.getElementById('shadowAlert').innerHTML = `
      <div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800; font-size:13px; line-height:1.6; margin-bottom:10px;">
        🚫 ${display}
      </div>
    `;
  },

  // ===== 発音チェック =====
  async checkPronunciation() {
    if (!this.state) return;
    const item = this.state.session[this.state.sessionIndex];
    const target = item.text;
    const area = document.getElementById('diffArea');
    if (!area) return;

    // ★ aborted対策：TTSとマイクが干渉する。完全に止めて待つ
    Speech.cancel();
    Speech.stopRecognition();
    if (this.state.isRecording) {
      try { await Speech.stopRecording(); } catch(e) {}
      this.state.isRecording = false;
    }
    // 200ms待つ（iOS SafariのTTS停止確実性のため）
    await new Promise(r => setTimeout(r, 250));

    // APIキーがあればWhisper（最も確実）
    if (Storage.hasApiKey()) {
      area.innerHTML = `
        <div style="text-align:center; padding: 18px; background: var(--bg-soft); border-radius: 14px; margin-bottom: 10px;">
          <div style="font-size: 40px; margin-bottom: 6px;">🎙️</div>
          <div style="color: var(--info); font-weight: 900; font-size: 14px;">RECORDING... READ THE SENTENCE</div>
          <div style="color: var(--text-soft); font-size: 12px; margin-top: 4px; font-weight: 700;">Tap stop when done</div>
        </div>
        <button class="btn-primary btn-danger" id="stopWhisperBtn">⏹ STOP & ANALYZE</button>
      `;
      try {
        await Speech.startRecording();
        document.getElementById('stopWhisperBtn').onclick = async () => {
          area.innerHTML = `<div style="text-align:center; padding: 18px;"><div style="font-size:30px;">🤖</div><div style="margin-top:6px; color:var(--info); font-weight:900;">Analyzing with Whisper AI...</div></div>`;
          try {
            const data = await Speech.stopRecording();
            const transcript = await Speech.transcribeWithWhisper(data.blob, data.mime);
            const diff = Speech.computeDiff(target, transcript);
            this.renderDiff(transcript, diff);
            Storage.recordEvent('pronunciation_check');
            Storage.addXP(5);
          } catch (e) {
            area.innerHTML = `
              <div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800;">
                Whisper failed: ${e.message}
              </div>
              <button class="btn-primary" onclick="Shadowing.checkPronunciation()">🔁 RETRY</button>
            `;
          }
        };
      } catch (e) {
        this.handleMicError(e);
        area.innerHTML = `<button class="btn-primary" onclick="Shadowing.checkPronunciation()">🔁 RETRY</button>`;
      }
      return;
    }

    // Whisperがない場合：Web Speech APIへフォールバック
    if (!Speech.hasSpeechRecognition()) {
      area.innerHTML = `
        <div style="background:#fff7e0; border:2px solid var(--accent); border-radius:14px; padding:14px; color: var(--text); font-weight:800; font-size:13px; line-height:1.6;">
          🔧 Pronunciation check needs either:<br>
          <b>1.</b> Open in Safari (not Home Screen app), OR<br>
          <b>2.</b> Set OpenAI API key in AI Tutor → enables Whisper (most accurate, works in PWA).
        </div>
      `;
      return;
    }

    area.innerHTML = `
      <div style="text-align:center; padding: 18px; background: var(--bg-soft); border-radius: 14px; margin-bottom: 10px;">
        <div style="font-size: 40px; margin-bottom: 6px;">🎤</div>
        <div style="color: var(--info); font-weight: 900; font-size: 14px;">LISTENING...</div>
        <div style="color: var(--text-soft); font-size: 12px; margin-top: 4px; font-weight: 700;">Read the sentence aloud now</div>
      </div>
    `;
    Speech.startRecognition(
      (transcript) => {
        const diff = Speech.computeDiff(target, transcript);
        this.renderDiff(transcript, diff);
        Storage.recordEvent('pronunciation_check');
        Storage.addXP(5);
      },
      (err) => {
        const isAborted = (err || '').toLowerCase().includes('abort');
        area.innerHTML = `
          <div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800; font-size:13px; line-height:1.6;">
            🚫 ${err}<br>
            ${isAborted ? '<span style="font-weight:700; color: var(--text-soft); font-size:11px;">Audio playback was interrupting. Try again — it should work now.</span>' : '<span style="font-weight:700; color: var(--text-soft); font-size:11px;">Tip: open in Safari (not Home Screen app), allow microphone, ensure internet.</span>'}
          </div>
          <button class="btn-primary" onclick="Shadowing.checkPronunciation()">🔁 RETRY</button>
          ${!Storage.hasApiKey() ? '<button class="btn-secondary" onclick="App.openModule(\'chatgpt-api\')">⚙️ SET OPENAI KEY (most reliable)</button>' : ''}
        `;
      }
    );
  },

  renderDiff(transcript, diff) {
    const html = diff.result.map(r => {
      if (r.status === 'correct') return `<span class="diff-correct">${r.word}</span>`;
      if (r.status === 'partial') return `<span class="diff-correct" title="You said: ${r.spoken}">${r.word}</span>`;
      return `<span class="diff-missing">${r.word}</span>`;
    }).join(' ');
    const extraHtml = diff.extra.length
      ? `<div style="font-size:11px; color: var(--text-soft); margin-top:8px; font-weight:800;">Extra (you added): ${diff.extra.map(w=>`<span class="diff-wrong">${w}</span>`).join(' ')}</div>`
      : '';
    let scoreClass = '';
    if (diff.score < 50) scoreClass = 'low';
    else if (diff.score < 80) scoreClass = 'mid';
    let emoji = '🔥';
    if (diff.score < 50) emoji = '💪';
    else if (diff.score < 80) emoji = '👍';
    else if (diff.score >= 95) emoji = '⭐';

    const tips = this.generateTips(diff);

    document.getElementById('diffArea').innerHTML = `
      <div style="background: ${diff.score >= 80 ? '#e8ffd9' : diff.score >= 50 ? '#fff7e0' : '#ffe9e9'}; border-radius: 16px; padding: 18px; margin-bottom: 10px; text-align: center;">
        <div style="font-size: 30px; margin-bottom: 4px;">${emoji}</div>
        <div class="diff-score ${scoreClass}">${diff.score}</div>
        <div class="diff-score-label">PRONUNCIATION SCORE</div>
      </div>
      <div class="label">YOU SAID</div>
      <div style="background: var(--bg-soft); border: 2px solid var(--line); border-radius: 12px; padding: 12px; font-size: 14px; font-weight: 800; color: var(--text-soft); margin-bottom: 10px;">${transcript}</div>
      <div class="label">BREAKDOWN</div>
      <div class="diff-result">${html}${extraHtml}</div>
      <div style="font-size:11px; color: var(--text-soft); margin: 10px 0; line-height:1.6; font-weight:800;">
        <span class="diff-correct" style="font-size:10px;">●</span> Correct &nbsp;
        <span class="diff-missing" style="font-size:10px;">●</span> Missing/Unclear &nbsp;
        <span class="diff-wrong" style="font-size:10px;">●</span> Extra
      </div>
      ${tips ? `<div class="label">💡 TIPS</div><div style="background: #fff7e0; border: 2px solid var(--accent); border-radius: 12px; padding: 12px; font-size: 13px; line-height: 1.6; font-weight: 700; color: var(--text);">${tips}</div>` : ''}
    `;
  },

  generateTips(diff) {
    const missing = diff.result.filter(r => r.status === 'missing').map(r => r.word);
    if (missing.length === 0) return '';
    const tipMap = {
      'flower': '"flower" → 「フ・<b>ラ</b>・ウァ」R音をしっかり',
      'flowers': '"flowers" → 「フ・<b>ラ</b>・ウァズ」最後にz音',
      'grower': '"grower" → 「グ・<b>ロ</b>・ウァ」owは二重母音',
      'growers': '"growers" → 「グ・ロ・ウァズ」最後にz',
      'craftsmanship': '"craftsmanship" → 「ク・<b>ラ</b>・フツ・マン・シップ」ftsを息で',
      'logistics': '"logistics" → 「ロ・<b>ジ</b>・スティクス」gは[ʤ]',
      'partnership': '"partnership" → 「<b>パー</b>・トナ・シップ」最初を強く',
      'extraordinary': '"extraordinary" → 「イクスト・<b>ロー</b>・ディ・ナリ」exはiks',
      'discerning': '"discerning" → 「ディ・<b>サー</b>・ニン」sは強く',
      'beautiful': '"beautiful" → 「<b>ビュー</b>・ティ・フォ」最初を強く',
      'world': '"world" → 「<b>ワー</b>ルド」rとlを意識',
      'thank': '"thank" → 「<b>サ</b>ンク」th舌を歯の間に',
      'three': '"three" → 「<b>スリー</b>」th＋r、難関',
      'right': '"right" → 「<b>ラ</b>イト」舌を巻きすぎない',
      'really': '"really" → 「<b>リ</b>ーリー」rが2回',
      'language': '"language" → 「<b>ラ</b>ン・グィッジ」L音',
      'business': '"business" → 「<b>ビズ</b>・ニス」ne音はnis',
      'fashion': '"fashion" → 「<b>ファ</b>・ション」shを意識',
      'pleasure': '"pleasure" → 「プ・<b>レ</b>・ジャ」zh音',
      'visit': '"visit" → 「<b>ヴィ</b>・ジット」v下唇',
      'very': '"very" → 「<b>ヴェ</b>リ」vはbではない',
      'over': '"over" → 「<b>オウ</b>ヴァ」vを強く',
      'fresh': '"fresh" → 「フ<b>レ</b>シュ」shで終わる',
      'partner': '"partner" → 「<b>パー</b>トナ」'
    };
    const lines = [];
    const seen = new Set();
    missing.forEach(w => {
      const tip = tipMap[w.toLowerCase()];
      if (tip && !seen.has(tip)) { lines.push('• ' + tip); seen.add(tip); }
    });
    if (lines.length === 0) {
      lines.push('• Slow down on missing words and exaggerate the sounds');
      lines.push('• Listen 2-3 times before speaking');
      lines.push('• Try one word at a time, then full sentence');
    }
    return lines.slice(0, 4).join('<br>');
  },

  // メインのレンダリング
  renderItem() {
    if (!this.state) return;
    const idx = this.state.sessionIndex;
    const item = this.state.session[idx];
    const total = this.state.session.length;
    const pct = Math.min(100, (this.state.current / item.target) * 100);
    const sessionPct = ((idx / total) + (this.state.current / item.target / total)) * 100;
    const recBtn = this.state.isRecording
      ? '<button class="btn-primary btn-danger" onclick="Shadowing.toggleRecording()">⏹ STOP RECORDING</button>'
      : '<button class="btn-secondary" onclick="Shadowing.toggleRecording()">🎙️ RECORD MY VOICE</button>';
    const playback = this.state.lastRecordingUrl
      ? `<audio controls src="${this.state.lastRecordingUrl}" style="width:100%;margin:8px 0 10px;border-radius:10px;"></audio>`
      : '';
    const autoLabel = this.state.autoMode ? '⏸ AUTO ON' : '▶ AUTO OFF';
    const itemLabel = item.level === 1 ? 'SHORT · 50×' : 'LONG · 20×';

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">SHADOWING · ITEM ${idx + 1}/${total} · ${itemLabel}</div>

      <!-- セッション全体の進捗 -->
      <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-soft); font-weight: 900; margin-bottom: 4px; letter-spacing: 1px;">
        <span>SESSION PROGRESS</span>
        <span id="shadowTimer">${this.formatTime(this.state.elapsedMs)}</span>
      </div>
      <div class="progress-bar" style="height: 8px; margin-bottom: 14px;">
        <div class="progress-fill" style="width:${sessionPct}%"></div>
      </div>

      <!-- なぜこれを練習するか -->
      <div class="why-card">
        <div class="why-label">🎯 WHY YOU'RE PRACTICING THIS</div>
        <div class="why-text">${item.why || ''}</div>
      </div>

      <!-- 教材本文 -->
      <div class="shadow-text">${item.text}</div>

      ${item.jp ? `
      <div class="lesson-jp">
        <div class="lesson-label">🇯🇵 JAPANESE</div>
        <div class="lesson-text">${item.jp}</div>
      </div>
      ` : ''}

      ${item.grammar ? `
      <div class="lesson-grammar">
        <div class="lesson-label">📖 GRAMMAR</div>
        <div class="lesson-text">${item.grammar}</div>
      </div>
      ` : ''}

      <!-- 反復カウンタ -->
      <div class="shadow-counter">${this.state.current} <span style="color: var(--text-dim); font-size: 36px;">/ ${item.target}</span></div>
      <div class="shadow-target">REPS DONE${this.state.isRecording ? '<span class="recording-indicator">REC</span>' : ''}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>

      <div class="btn-row">
        <button class="btn-primary" onclick="Shadowing.playRound()">🔊 LISTEN</button>
        <button class="btn-primary btn-success" onclick="Shadowing.nextRep()">✓ NEXT REP</button>
      </div>
      <button class="btn-secondary ${this.state.autoMode ? 'btn-purple' : ''}" onclick="Shadowing.toggleAuto()">${autoLabel}</button>

      <div id="shadowAlert"></div>
      ${recBtn}
      ${playback}
      <button class="btn-primary btn-pink" onclick="Shadowing.checkPronunciation()">📊 CHECK MY PRONUNCIATION</button>
      <div id="diffArea"></div>

      <button class="btn-secondary" style="margin-top:10px;" onclick="if(confirm('Skip this item and move to next?')){Shadowing.nextItem();}">⏭ SKIP TO NEXT ITEM</button>
    `;
  },

  // カスタムテキスト（任意の英文を1教材として20回練習）
  customStart() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">CUSTOM SHADOWING</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY CUSTOM TEXT</div>
        <div class="why-text">自分が話したい英文を体に入れる。商談で使いそうな自分の言葉で練習することで、本番での自然さが段違いに上がる。</div>
      </div>
      <textarea id="customShadowText" placeholder="Type your English here..." rows="4"></textarea>
      <div class="btn-row">
        <button class="btn-primary btn-pink" onclick="Shadowing.startFromCustom(1)">SHORT 50×</button>
        <button class="btn-primary btn-purple" onclick="Shadowing.startFromCustom(2)">LONG 20×</button>
      </div>
    `;
  },

  startFromCustom(level) {
    const text = document.getElementById('customShadowText').value.trim();
    if (!text) { App.toast('Type something first'); return; }
    // 単発セッションとして扱う
    this.state = {
      session: [{ text, level, target: level === 1 ? 50 : 20, why: '自分で選んだ英文。あなたが本番で使いたい言葉。' }],
      sessionIndex: 0,
      current: 0,
      isRecording: false,
      lastRecordingUrl: null,
      autoMode: false,
      timerStart: Date.now(),
      elapsedMs: 0
    };
    this.startTimer();
    this.renderItem();
  },

  // 単一教材の起動（既存の他モジュールから呼ばれる用）
  // start(text, level) を後方互換で残す
  start(text, level) {
    const lvl = level || (text.length > 60 ? 2 : 1);
    this.state = {
      session: [{ text, level: lvl, target: lvl === 1 ? 50 : 20, why: getShadowWhy(text) || 'この一文を口の筋肉に染み込ませる。' }],
      sessionIndex: 0,
      current: 0,
      isRecording: false,
      lastRecordingUrl: null,
      autoMode: false,
      timerStart: Date.now(),
      elapsedMs: 0
    };
    this.startTimer();
    this.renderItem();
  }
};
