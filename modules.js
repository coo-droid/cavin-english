// =====================================================
// 各モジュール（モーダル中身）
// =====================================================
const Modules = {
  declaration() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">MORNING DECLARATION</div>
      <div class="declaration">"${DECLARATION}"</div>
      <button class="btn-primary" onclick="Speech.speak('${DECLARATION}', 0.85)">🔊 LISTEN</button>
      <button class="btn-primary btn-success" onclick="Storage.markDone('declaration'); App.toast('Declared ✓'); App.closeModal();">✓ MARK DONE</button>
    `;
    setTimeout(() => Speech.speak(DECLARATION, 0.85), 400);
  },

  hook() {
    const hookEsc = HOOK.replace(/`/g, "'");
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">SELF-INTRO HOOK</div>
      <div class="hook-text">${HOOK.replace(/\n/g, '<br>')}</div>
      <div style="text-align:center; font-size:11px; color: var(--text-dim); margin-bottom:14px;">REPEAT 3 TIMES</div>
      <div class="btn-row-3">
        <button class="speed-btn" onclick="Speech.speak(\`${hookEsc}\`, 0.7)">SLOW</button>
        <button class="speed-btn active" onclick="Speech.speak(\`${hookEsc}\`, 0.9)">NORMAL</button>
        <button class="speed-btn" onclick="Speech.speak(\`${hookEsc}\`, 1.1)">FAST</button>
      </div>
      <button class="btn-primary" onclick="Shadowing.start(\`${hookEsc}\`, 2); App.openModule('shadowing-active');">🎬 SHADOWING DRILL</button>
      <button class="btn-primary btn-success" onclick="Storage.markDone('hook'); App.toast('Hook practiced ✓'); App.closeModal();">✓ MARK DONE</button>
    `;
    setTimeout(() => Speech.speak(HOOK, 0.85), 400);
  },

  flash(slot, title) {
    const card = FLASH[slot][new Date().getDay()];
    const dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const aEsc = card.a.replace(/`/g, "'");
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">${title} · ${dayNames[new Date().getDay()]}</div>
      <div class="flash-q">Q: ${card.q}</div>
      <div class="flash-a">${card.a}</div>
      <button class="btn-primary" onclick="Speech.speak(\`${aEsc}\`)">🔊 LISTEN</button>
      <div class="btn-row-3">
        <button class="speed-btn" onclick="Speech.speak(\`${aEsc}\`, 0.75)">0.75x</button>
        <button class="speed-btn active" onclick="Speech.speak(\`${aEsc}\`, 0.9)">1.0x</button>
        <button class="speed-btn" onclick="Speech.speak(\`${aEsc}\`, 1.1)">1.2x</button>
      </div>
      <button class="btn-primary btn-success" onclick="Storage.markDone('flash-${slot}'); Storage.recordEvent('flash_done'); App.toast('Flash done ✓'); App.closeModal();">✓ MARK DONE</button>
    `;
    setTimeout(() => Speech.speak(card.a, 0.9), 400);
  },

  flashRandom() {
    const slots = ['am','noon','pm','night'];
    const slot = slots[Math.floor(Math.random()*4)];
    const idx = Math.floor(Math.random()*7);
    const card = FLASH[slot][idx];
    const aEsc = card.a.replace(/`/g, "'");
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">RANDOM FLASH</div>
      <div class="flash-q">Q: ${card.q}</div>
      <div class="flash-a">${card.a}</div>
      <button class="btn-primary" onclick="Speech.speak(\`${aEsc}\`)">🔊 LISTEN</button>
      <button class="btn-secondary" onclick="App.openModule('flash-random')">🔀 ANOTHER ONE</button>
    `;
    setTimeout(() => Speech.speak(card.a, 0.9), 300);
  },

  phraseToday() {
    const phrase = DAILY_PHRASE[new Date().getDay()];
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">TODAY'S PHRASE</div>
      <div class="declaration" style="font-style:normal; font-size:24px;">"${phrase}"</div>
      <div style="text-align:center; font-size:11px; color: var(--text-dim); margin-bottom:14px;">SAY IT 3 TIMES</div>
      <button class="btn-primary" onclick="Speech.speak(\`${phrase}\`, 0.9)">🔊 LISTEN</button>
      <button class="btn-primary" onclick="Shadowing.start(\`${phrase}\`, 1); setTimeout(()=>Shadowing.render(), 100);">🎬 50× DRILL</button>
      <button class="btn-primary btn-success" onclick="Storage.markDone('phrase-today'); App.toast('Phrase practiced ✓'); App.closeModal();">✓ MARK DONE</button>
    `;
    setTimeout(() => Speech.speak(phrase, 0.9), 400);
  },

  // ========== シャドーイングHub ==========
  shadowingHub() {
    const shortList = SHADOW_BANK.short.map((s) => `
      <div class="vocab-item" onclick="Shadowing.start(\`${s.text.replace(/`/g,"'")}\`, 1);">
        <div style="flex:1; min-width:0;">
          <div class="vocab-word" style="font-size:14px;">${s.text}</div>
          <div class="vocab-jp">SHORT · 50×</div>
        </div>
        <div class="vocab-due new">START</div>
      </div>
    `).join('');
    const longList = SHADOW_BANK.long.map((s) => `
      <div class="vocab-item" onclick="Shadowing.start(\`${s.text.replace(/`/g,"'")}\`, 2);">
        <div style="flex:1; min-width:0;">
          <div class="vocab-word" style="font-size:13px; line-height:1.5;">${s.text.substring(0, 80)}${s.text.length > 80 ? '...' : ''}</div>
          <div class="vocab-jp">LONG · 20×</div>
        </div>
        <div class="vocab-due soon">START</div>
      </div>
    `).join('');
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">SHADOWING DRILL</div>
      <div style="font-size:13px; color: var(--text-soft); margin-bottom: 14px; line-height:1.6; font-weight:800;">
        Pick a sentence. Repeat until your mouth knows it.<br>
        Short = 50×  ·  Long = 20×
      </div>
      <button class="btn-primary btn-purple" onclick="Shadowing.customStart()">✏️ CUSTOM TEXT</button>
      <div class="section-title" style="margin: 14px 0 8px;">📝 SHORT SENTENCES</div>
      ${shortList}
      <div class="section-title" style="margin: 18px 0 8px;">📜 LONG PASSAGES</div>
      ${longList}
    `;
  },

  // ========== 語彙リスト ==========
  vocabList(filter) {
    Vocab.init();
    const type = filter || 'all';
    const items = Vocab.filterByType(type);
    const due = Vocab.due().length;
    const tabs = ['all', 'word', 'phrase', 'sentence'].map(t => `
      <button class="${t === type ? 'active' : ''}" onclick="App.openModule('vocab-list-${t}')">${t.toUpperCase()}</button>
    `).join('');
    const list = items.map(v => {
      const st = Vocab.status(v);
      return `
        <div class="vocab-item" onclick="App.openModule('vocab-detail', '${v.id}')">
          <div style="flex:1; min-width:0;">
            <div class="vocab-word">${v.en}</div>
            <div class="vocab-jp">${v.jp}</div>
          </div>
          <div class="vocab-due ${st.cls}">${st.label}</div>
        </div>
      `;
    }).join('');
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">VOCABULARY  ·  ${due} DUE</div>
      <div class="vocab-tab">${tabs}</div>
      ${due > 0 ? `<button class="btn-primary" onclick="App.openModule('vocab-review')">📖 REVIEW DUE (${due})</button>` : ''}
      <button class="btn-secondary" onclick="App.openModule('vocab-add')">+ ADD NEW</button>
      <div style="margin-top:10px;">${list || '<div style="text-align:center; color:var(--text-dim); padding:30px;">No items</div>'}</div>
    `;
  },

  vocabDetail(id) {
    const v = Vocab.getById(id);
    if (!v) { Modules.vocabList(); return; }
    const examples = v.examples.map(ex => `
      <div class="example">
        <div class="example-en">${ex.en}</div>
        <div class="example-jp">${ex.jp}</div>
        <button class="example-speak" onclick="Speech.speak(\`${ex.en.replace(/`/g,"'")}\`, 0.9)">🔊 PLAY</button>
      </div>
    `).join('');
    const st = Vocab.status(v);
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">${v.type.toUpperCase()} · ${st.label}</div>
      <div class="vocab-detail">
        <div class="word">${v.en}</div>
        <div class="jp">${v.jp}</div>
        <button class="btn-primary" onclick="Speech.speak(\`${v.en.replace(/`/g,"'")}\`, 0.85)">🔊 LISTEN</button>
      </div>
      <div class="section-title" style="margin: 8px 0;">EXAMPLES</div>
      ${examples}
      <div class="section-title" style="margin: 18px 0 8px;">REVIEW</div>
      <div class="btn-row-3">
        <button class="btn-primary btn-danger" onclick="Vocab.review('${v.id}', 1); App.toast('Will see again soon'); App.openModule('vocab-list');">😵 FORGOT</button>
        <button class="btn-primary" style="background:#888;color:#fff;" onclick="Vocab.review('${v.id}', 3); App.toast('Got it'); App.openModule('vocab-list');">😐 HARD</button>
        <button class="btn-primary btn-success" onclick="Vocab.review('${v.id}', 5); App.toast('Mastered'); App.openModule('vocab-list');">😎 EASY</button>
      </div>
      <button class="btn-secondary" onclick="if(confirm('Delete?')){Vocab.remove('${v.id}'); App.openModule('vocab-list');}">🗑 DELETE</button>
    `;
    setTimeout(() => Speech.speak(v.en, 0.85), 400);
  },

  vocabAdd() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">ADD NEW ITEM</div>
      <div class="label">TYPE</div>
      <div class="btn-row-3">
        <button class="speed-btn active" id="t-word" onclick="document.querySelectorAll('[id^=t-]').forEach(b=>b.classList.remove('active')); this.classList.add('active'); window._addType='word';">WORD</button>
        <button class="speed-btn" id="t-phrase" onclick="document.querySelectorAll('[id^=t-]').forEach(b=>b.classList.remove('active')); this.classList.add('active'); window._addType='phrase';">PHRASE</button>
        <button class="speed-btn" id="t-sentence" onclick="document.querySelectorAll('[id^=t-]').forEach(b=>b.classList.remove('active')); this.classList.add('active'); window._addType='sentence';">SENTENCE</button>
      </div>
      <div class="label">ENGLISH</div>
      <input type="text" id="add-en" placeholder="acquire / cross the table / etc.">
      <div class="label">JAPANESE</div>
      <input type="text" id="add-jp" placeholder="日本語訳">
      <div class="label">EXAMPLE 1 (EN)</div>
      <input type="text" id="add-ex1-en">
      <div class="label">EXAMPLE 1 (JP)</div>
      <input type="text" id="add-ex1-jp">
      <div class="label">EXAMPLE 2 (EN)</div>
      <input type="text" id="add-ex2-en">
      <div class="label">EXAMPLE 2 (JP)</div>
      <input type="text" id="add-ex2-jp">
      <div class="label">EXAMPLE 3 (EN)</div>
      <input type="text" id="add-ex3-en">
      <div class="label">EXAMPLE 3 (JP)</div>
      <input type="text" id="add-ex3-jp">
      <button class="btn-primary btn-success" onclick="Modules.vocabSave()">✓ SAVE</button>
    `;
    window._addType = 'word';
  },

  vocabSave() {
    const en = document.getElementById('add-en').value.trim();
    const jp = document.getElementById('add-jp').value.trim();
    if (!en) { App.toast('English required'); return; }
    const examples = [];
    for (let i = 1; i <= 3; i++) {
      const e = document.getElementById('add-ex' + i + '-en').value.trim();
      const j = document.getElementById('add-ex' + i + '-jp').value.trim();
      if (e) examples.push({ en: e, jp: j });
    }
    Vocab.add({ type: window._addType || 'word', en, jp, examples });
    App.toast('Added ✓');
    App.openModule('vocab-list');
  },

  vocabReview() {
    const due = Vocab.due();
    if (due.length === 0) {
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">REVIEW DONE</div>
        <div style="text-align:center; padding:40px 0;">
          <div style="font-size:60px;">🌸</div>
          <div style="color:var(--gold); margin-top:10px;">All caught up!</div>
        </div>
        <button class="btn-primary" onclick="App.openModule('vocab-list')">BACK TO LIST</button>
      `;
      return;
    }
    const v = due[0];
    const examples = v.examples.slice(0, 1).map(ex => `
      <div class="example">
        <div class="example-en">${ex.en}</div>
        <div class="example-jp">${ex.jp}</div>
      </div>
    `).join('');
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">REVIEW · ${due.length} REMAINING</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${100 - (due.length / Vocab.all().length * 100)}%"></div></div>
      <div class="vocab-detail">
        <div class="word">${v.en}</div>
        <div class="jp" id="rev-jp" style="opacity:0;">${v.jp}</div>
        <button class="btn-secondary" onclick="document.getElementById('rev-jp').style.opacity=1; document.getElementById('rev-ex').style.opacity=1;">SHOW MEANING</button>
        <button class="btn-primary" onclick="Speech.speak(\`${v.en.replace(/`/g,"'")}\`, 0.85)">🔊 LISTEN</button>
      </div>
      <div id="rev-ex" style="opacity:0;">${examples}</div>
      <div style="margin-top:14px;">
        <div class="btn-row-3">
          <button class="btn-primary btn-danger" onclick="Vocab.review('${v.id}', 1); App.openModule('vocab-review');">😵 FORGOT</button>
          <button class="btn-primary" style="background:#888;color:#fff;" onclick="Vocab.review('${v.id}', 3); App.openModule('vocab-review');">😐 HARD</button>
          <button class="btn-primary btn-success" onclick="Vocab.review('${v.id}', 5); App.openModule('vocab-review');">😎 EASY</button>
        </div>
      </div>
    `;
    setTimeout(() => Speech.speak(v.en, 0.85), 400);
  },

  // ========== シーン別 ==========
  scenes() {
    const cards = Object.entries(SCENES).map(([key, s]) => `
      <div class="scene-card" onclick="App.openModule('scene-detail-${key}')">
        <div class="scene-name">${s.name}</div>
        <div class="scene-count">${s.phrases.length} phrases</div>
      </div>
    `).join('');
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">SCENE PHRASES</div>
      ${cards}
    `;
  },

  sceneDetail(key) {
    const scene = SCENES[key];
    if (!scene) return;
    const list = scene.phrases.map((p, i) => `
      <div class="example">
        <div class="example-en">${p.en}</div>
        <div class="example-jp">${p.jp}</div>
        <div style="display:flex; gap:6px; margin-top:8px;">
          <button class="example-speak" onclick="Speech.speak(\`${p.en.replace(/`/g,"'")}\`, 0.9)">🔊 PLAY</button>
          <button class="example-speak" onclick="Shadowing.start(\`${p.en.replace(/`/g,"'")}\`, 1); setTimeout(()=>Shadowing.render(),100);">🎬 50×</button>
          <button class="example-speak" onclick="Vocab.add({type:'sentence', en:\`${p.en.replace(/`/g,"'")}\`, jp:\`${p.jp.replace(/`/g,"'")}\`, examples:[]}); App.toast('Added to vocab ✓');">+ VOCAB</button>
        </div>
      </div>
    `).join('');
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">${scene.name}</div>
      ${list}
    `;
  },

  // ========== ストーリーモード ==========
  storyMode() {
    Modules.vocabReview();
  },

  // ========== ダッシュボード ==========
  dashboard() {
    const today = Storage.todayKey();
    const dates = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      dates.push(`${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`);
    }
    const totalReps = dates.reduce((s, d) => s + Storage.getEvent('shadow_rep', d), 0);
    const totalFlash = dates.reduce((s, d) => s + Storage.getEvent('flash_done', d), 0);
    const totalReviews = dates.reduce((s, d) => s + Storage.getEvent('vocab_review', d), 0);
    const totalPron = dates.reduce((s, d) => s + Storage.getEvent('pronunciation_check', d), 0);

    const heatmap = dates.map(d => {
      const events = Storage.get('events_' + d, {});
      const score = (events.shadow_rep || 0) + (events.flash_done || 0) + (events.vocab_review || 0) * 2;
      let cls = '';
      if (score >= 30) cls = 'l4';
      else if (score >= 15) cls = 'l3';
      else if (score >= 5) cls = 'l2';
      else if (score >= 1) cls = 'l1';
      return `<div class="heat-cell ${cls}" title="${d}: ${score} pts"></div>`;
    }).join('');

    const dueCount = Vocab.due().length;
    const totalVocab = Vocab.all().length;

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">DASHBOARD</div>
      <div class="dash-grid">
        <div class="dash-card">
          <div class="dash-num">${totalReps}</div>
          <div class="dash-label">SHADOW REPS · 30D</div>
        </div>
        <div class="dash-card">
          <div class="dash-num">${totalFlash}</div>
          <div class="dash-label">FLASH DONE · 30D</div>
        </div>
        <div class="dash-card">
          <div class="dash-num">${totalReviews}</div>
          <div class="dash-label">VOCAB REVIEWS · 30D</div>
        </div>
        <div class="dash-card">
          <div class="dash-num">${totalPron}</div>
          <div class="dash-label">PRON CHECKS · 30D</div>
        </div>
        <div class="dash-card">
          <div class="dash-num">${totalVocab}</div>
          <div class="dash-label">VOCAB ITEMS</div>
        </div>
        <div class="dash-card">
          <div class="dash-num" style="color:${dueCount > 0 ? 'var(--red)' : 'var(--gold)'};">${dueCount}</div>
          <div class="dash-label">DUE NOW</div>
        </div>
      </div>
      <div class="section-title" style="margin:18px 0 8px;">30-DAY ACTIVITY</div>
      <div class="heatmap">${heatmap}</div>
      <div style="font-size:10px; color:var(--text-dim); text-align:center; margin-top:8px;">
        Each square = 1 day. Brighter = more practice.
      </div>
    `;
  },

  // ========== 音声入力ロールプレイ（簡易版） ==========
  voiceRoleplay() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">VOICE ROLEPLAY</div>
      <div style="font-size:13px; color: var(--text-dim); margin-bottom: 14px; line-height:1.6;">
        Practice with built-in scenarios.<br>
        Tap mic, speak in English, get a response.
      </div>
      <div class="chat-area" id="chatArea">
        <div class="chat-msg chat-ai">Hello, I'm Mr. Tan. Tell me about CAVIN — what's so special about it?</div>
      </div>
      <button class="btn-primary" id="micBtn" onclick="Modules.voiceRoleplayMic()">🎙️ TAP TO SPEAK</button>
      <button class="btn-secondary" onclick="App.openModule('roleplay')">FOR DEEPER TALK → CHATGPT</button>
      <div style="font-size:10px; color:var(--text-dim); text-align:center; margin-top:10px;">
        For full conversations, use ChatGPT roleplay (weekend mode).
      </div>
    `;
  },

  voiceRoleplayMic() {
    const btn = document.getElementById('micBtn');
    btn.textContent = '🎙️ LISTENING...';
    btn.disabled = true;
    Speech.startRecognition(
      (transcript) => {
        const chat = document.getElementById('chatArea');
        chat.innerHTML += `<div class="chat-msg chat-user">${transcript}</div>`;
        // 簡易応答
        const responses = [
          "Interesting. And what makes you trust your suppliers?",
          "How do you handle quality across distance?",
          "Why should I choose you over Dutch importers?",
          "What's your minimum commitment?",
          "Tell me — how do you measure success?",
          "I see. And what's been your hardest lesson so far?"
        ];
        const r = responses[Math.floor(Math.random() * responses.length)];
        chat.innerHTML += `<div class="chat-msg chat-ai">${r}</div>`;
        chat.scrollTop = chat.scrollHeight;
        Speech.speak(r, 0.9);
        btn.textContent = '🎙️ TAP TO SPEAK';
        btn.disabled = false;
      },
      (err) => {
        btn.textContent = '🎙️ TAP TO SPEAK';
        btn.disabled = false;
        App.toast('Speech recognition error');
      }
    );
  },

  // ========== Listen / Roleplay (ChatGPT) ==========
  listen() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">LISTENING</div>
      <div style="font-size:13px; color: var(--text-dim); margin-bottom: 14px; line-height:1.6;">
        Pick one. Press play. Put in earbuds.
      </div>
      <a href="https://open.spotify.com/search/Monocle%20Entrepreneurs" target="_blank" class="btn-primary" style="text-decoration:none; text-align:center; display:block;">🎙️ MONOCLE: ENTREPRENEURS</a>
      <a href="https://open.spotify.com/search/How%20I%20Built%20This" target="_blank" class="btn-secondary" style="text-decoration:none; text-align:center; display:block;">🚀 HOW I BUILT THIS</a>
      <a href="https://open.spotify.com/search/HBR%20IdeaCast" target="_blank" class="btn-secondary" style="text-decoration:none; text-align:center; display:block;">📊 HBR IDEACAST</a>
      <a href="https://open.spotify.com/search/Bloomberg%20Pursuits" target="_blank" class="btn-secondary" style="text-decoration:none; text-align:center; display:block;">💎 BLOOMBERG PURSUITS</a>
      <button class="btn-primary btn-success" style="margin-top:14px;" onclick="Storage.markDone('listen'); App.toast('Listening tracked ✓'); App.closeModal();">✓ MARK DONE</button>
    `;
  },

  roleplay() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">CHATGPT ROLEPLAY · WEEKEND</div>
      <div style="font-size:13px; color: var(--text-dim); margin-bottom: 14px; line-height:1.6;">
        Pick scenario → Copy prompt → Open ChatGPT → Paste → Begin.
      </div>
      <button class="btn-primary" onclick="Modules.copyAndOpen('meeting')">🤝 BUSINESS MEETING (Mr. Tan)</button>
      <button class="btn-primary" onclick="Modules.copyAndOpen('smalltalk')">💬 SMALL TALK (Ibu Sari)</button>
      <button class="btn-primary" onclick="Modules.copyAndOpen('negotiation')">💸 PRICE NEGOTIATION (Pak Budi)</button>
      <div style="font-size:11px; color:var(--text-dim); text-align:center; margin-top:10px;">Prompt is auto-copied. ChatGPT opens.</div>
    `;
  },

  copyAndOpen(scenario) {
    const prompt = ROLEPLAY_PROMPTS[scenario];
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(prompt).then(() => {
        App.toast('Prompt copied ✓');
        setTimeout(() => { window.open('https://chat.openai.com', '_blank'); }, 500);
      }).catch(() => { fallback(); App.toast('Prompt copied ✓'); setTimeout(() => window.open('https://chat.openai.com', '_blank'), 500); });
    } else {
      fallback(); App.toast('Prompt copied ✓');
      setTimeout(() => window.open('https://chat.openai.com', '_blank'), 500);
    }
  },

  // ========== 日記＋履歴 ==========
  diary() {
    const today = Storage.todayKey();
    const existing = Storage.get('diary_' + today, { a:'', b:'', c:'' });
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">3-LINE DIARY · ${today}</div>
      <div class="label">① WHAT I DID TODAY</div>
      <textarea id="d_a" placeholder="What I checked off...">${existing.a}</textarea>
      <div class="label">② WHAT WORKED · INSIGHT</div>
      <textarea id="d_b" placeholder="What clicked...">${existing.b}</textarea>
      <div class="label">③ TOMORROW'S FOCUS</div>
      <textarea id="d_c" placeholder="One thing to remember...">${existing.c}</textarea>
      <button class="btn-primary btn-success" onclick="Modules.saveDiary()">✓ SAVE & DONE</button>
    `;
  },

  saveDiary() {
    const today = Storage.todayKey();
    const data = {
      a: document.getElementById('d_a').value,
      b: document.getElementById('d_b').value,
      c: document.getElementById('d_c').value,
      ts: new Date().toISOString()
    };
    Storage.set('diary_' + today, data);
    Storage.markDone('diary');
    App.toast('Saved ✓');
    App.closeModal();
  },

  emergency() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">2-MINUTE EMERGENCY MODE</div>
      <div style="font-size:14px; line-height:1.8; padding:8px 0 18px;">
        <div style="color:var(--gold); margin-bottom:10px;">FOR BUSY DAYS — PRESERVE STREAK</div>
        <div style="color:var(--text); font-size:14px; line-height:1.8;">
          ① Speak aloud 3x:<br>
          <span style="color:var(--gold); font-style:italic;">"Japan grows some of the world's most beautiful flowers. I'm Zacky. I'm here to change that."</span><br><br>
          ② Recall in your head:<br>
          <span style="color:var(--gold); font-style:italic;">"Tell me about CAVIN."</span><br>
          → Direct growers + FedEx = world's freshest Japan flowers.<br><br>
          ③ Done. Streak preserved. ✓
        </div>
      </div>
      <button class="btn-primary" onclick="Speech.speak(\`Japan grows some of the world's most beautiful flowers. I'm Zacky. I'm here to change that.\`, 0.85)">🔊 LISTEN</button>
      <button class="btn-primary btn-success" onclick="Storage.markDone('declaration'); Storage.markDone('hook'); App.toast('Streak preserved ✓'); App.closeModal();">✓ DONE</button>
    `;
  },

  history() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('diary_')).sort().reverse();
    let html = `<div class="modal-title">DIARY HISTORY · ${keys.length} ENTRIES</div>`;
    if (keys.length === 0) {
      html += `<div style="color:var(--text-dim); text-align:center; padding:40px 0;">No entries yet. Start tonight 🌙</div>`;
    } else {
      keys.slice(0, 30).forEach(k => {
        const d = Storage.get(k, {});
        const date = k.replace('diary_','');
        html += `
          <div class="diary-entry">
            <div class="diary-date">${date}</div>
            <div class="diary-text">① ${d.a || '—'}\n② ${d.b || '—'}\n③ ${d.c || '—'}</div>
          </div>
        `;
      });
    }
    document.getElementById('modalBody').innerHTML = html;
  }
};
