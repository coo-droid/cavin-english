// =====================================================
// 各モジュール（モーダル中身）
// =====================================================
const Modules = {
  declaration() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">MORNING DECLARATION</div>
      <div class="declaration">"${DECLARATION}"</div>
      <button class="btn-primary" onclick="Speech.speak('${DECLARATION}', 0.85)">🔊 LISTEN</button>
      <button class="btn-primary btn-success" onclick="Storage.markDone('declaration'); App.awardXP(5, event); App.closeModal();">✓ I DECLARED (+5 XP)</button>
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
      <button class="btn-primary btn-pink" onclick="Shadowing.start(\`${hookEsc}\`, 2);">🎬 SHADOWING 20×</button>
      <button class="btn-primary btn-success" onclick="Storage.markDone('hook'); App.awardXP(10, event); App.closeModal();">✓ HOOK DONE (+10 XP)</button>
    `;
    setTimeout(() => Speech.speak(HOOK, 0.85), 400);
  },

  flash(slot, title) {
    const card = FLASH[slot][new Date().getDay()];
    const dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const aEsc = card.a.replace(/`/g, "'");
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">${title} · ${dayNames[new Date().getDay()]}</div>
      <div class="flip-card" onclick="this.querySelector('.flip-inner').classList.toggle('flipped')">
        <div class="flip-inner">
          <div class="flip-front">
            <div class="flip-q">${card.q}</div>
            <div class="flip-hint">TAP TO REVEAL</div>
          </div>
          <div class="flip-back">
            <div class="flip-a">${card.a}</div>
            <div class="flip-hint">TAP TO HIDE</div>
          </div>
        </div>
      </div>
      <button class="btn-primary" onclick="Speech.speak(\`${aEsc}\`)">🔊 LISTEN</button>
      <div class="btn-row-3">
        <button class="speed-btn" onclick="Speech.speak(\`${aEsc}\`, 0.75)">0.75x</button>
        <button class="speed-btn active" onclick="Speech.speak(\`${aEsc}\`, 0.9)">1.0x</button>
        <button class="speed-btn" onclick="Speech.speak(\`${aEsc}\`, 1.1)">1.2x</button>
      </div>
      <button class="btn-primary btn-pink" onclick="Shadowing.start(\`${aEsc}\`, 2);">🎬 SHADOWING 20×</button>
      <button class="btn-primary btn-success" onclick="Storage.markDone('flash-${slot}'); Storage.recordEvent('flash_done'); App.awardXP(10, event); App.closeModal();">✓ MARK DONE (+10 XP)</button>
    `;
    setTimeout(() => Speech.speak(card.a, 0.9), 400);
  },

  flashRandom() {
    const slots = ['am','noon','pm','night'];
    const slot = slots[Math.floor(Math.random()*4)];
    const idx = Math.floor(Math.random()*7);
    const card = FLASH[slot][idx];
    const aEsc = card.a.replace(/`/g, "'");
    const qEsc = card.q.replace(/`/g, "'");
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">RANDOM FLASH</div>
      <div class="flip-card" onclick="this.querySelector('.flip-inner').classList.toggle('flipped')">
        <div class="flip-inner">
          <div class="flip-front">
            <div class="flip-q">${card.q}</div>
            <div class="flip-hint">TAP TO FLIP</div>
          </div>
          <div class="flip-back">
            <div class="flip-a">${card.a}</div>
            <div class="flip-hint">TAP TO FLIP BACK</div>
          </div>
        </div>
      </div>
      <button class="btn-primary" onclick="Speech.speak(\`${aEsc}\`)">🔊 LISTEN</button>
      <button class="btn-primary btn-pink" onclick="Shadowing.start(\`${aEsc}\`, ${aEsc.length > 60 ? 2 : 1});">🎬 SHADOWING DRILL</button>
      <button class="btn-secondary" onclick="App.openModule('flash-random')">🔀 ANOTHER ONE</button>
      <button class="btn-secondary" onclick="App.awardXP(5); App.closeModal();">✓ DONE (+5 XP)</button>
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
      <button class="btn-primary btn-pink" onclick="Shadowing.start(\`${phrase}\`, 1);">🎬 50× DRILL</button>
      <button class="btn-primary btn-success" onclick="Storage.markDone('phrase-today'); App.awardXP(8, event); App.closeModal();">✓ PRACTICED (+8 XP)</button>
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
        <button class="btn-primary btn-danger" onclick="Vocab.review('${v.id}', 1); App.toast('Will see again soon 🔄'); App.openModule('vocab-list');">😵 FORGOT</button>
        <button class="btn-primary" style="background:#888;color:#fff;border-bottom-color:#555;" onclick="Vocab.review('${v.id}', 3); App.awardXP(3); App.openModule('vocab-list');">😐 HARD</button>
        <button class="btn-primary btn-success" onclick="Vocab.review('${v.id}', 5); App.awardXP(5, event); App.openModule('vocab-list');">😎 EASY</button>
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
      App.confetti(30);
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">ALL CAUGHT UP!</div>
        <div class="burst-card">
          <div class="burst-emoji">🌸</div>
          <div class="burst-title">No reviews waiting!</div>
          <div class="burst-msg">Your memory is in great shape.</div>
        </div>
        <button class="btn-primary btn-success" onclick="App.openModule('vocab-list')">BACK TO LIST</button>
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
          <button class="btn-primary" style="background:#888;color:#fff;border-bottom-color:#555;" onclick="Vocab.review('${v.id}', 3); Storage.addXP(3); App.openModule('vocab-review');">😐 HARD</button>
          <button class="btn-primary btn-success" onclick="Vocab.review('${v.id}', 5); Storage.addXP(5); App.openModule('vocab-review');">😎 EASY</button>
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
    App.awardXP(15);
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
      <button class="btn-primary btn-success" onclick="Storage.markDone('declaration'); Storage.markDone('hook'); App.awardXP(3); App.toast('Streak preserved 🔥', 'fire'); App.closeModal();">✓ STREAK SAVED</button>
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
  },

  // ===========================================
  // 商談当日タイムライン
  // ===========================================
  timeline() {
    const days = Storage.daysUntil(TARGET_DATE);
    const items = JAKARTA_TIMELINE.map((t, i) => `
      <div class="timeline-item t-${t.type} slide-up" style="animation-delay: ${i * 0.06}s;">
        <div class="timeline-time">${t.time}  ·  ${t.icon}</div>
        <div class="timeline-title">${t.title}</div>
        <div class="timeline-desc">${t.desc}</div>
        <div class="timeline-script">"${t.script}"</div>
        <div style="display:flex; gap:6px; margin-top:8px;">
          <button class="example-speak" onclick="Speech.speak(\`${t.script.replace(/`/g,"'")}\`, 0.9)">🔊 LISTEN</button>
          <button class="example-speak" onclick="Shadowing.start(\`${t.script.replace(/`/g,"'")}\`, ${t.script.length > 60 ? 2 : 1});">🎬 DRILL</button>
          <button class="example-speak" onclick="Vocab.add({type:'sentence', en:\`${t.script.replace(/`/g,"'")}\`, jp:\`${t.title}\`, examples:[]}); App.toast('Added to vocab ✓');">+ VOCAB</button>
        </div>
      </div>
    `).join('');
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">JAKARTA · DAY TIMELINE</div>
      <div style="background: linear-gradient(135deg, #fff0f4, #ffe0ec); border-radius: 16px; padding: 14px 16px; margin-bottom: 14px; text-align: center;">
        <div style="font-size: 11px; color: var(--primary); font-weight: 900; letter-spacing: 1.5px; margin-bottom: 4px;">COUNTDOWN</div>
        <div style="font-size: 32px; font-weight: 900; color: var(--primary-dark); line-height: 1;">${days >= 0 ? days : '✓'} <span style="font-size: 14px;">${days >= 0 ? 'days to go' : 'completed'}</span></div>
      </div>
      <div class="timeline">${items}</div>
      <div style="text-align: center; font-size: 12px; color: var(--text-soft); font-weight: 800; padding: 10px;">
        Tap any phrase to practice. Make this day yours. 🌸
      </div>
    `;
  },

  // ===========================================
  // 週次レポート
  // ===========================================
  weeklyReport() {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      dates.push(`${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`);
    }
    const totalReps = dates.reduce((s, d) => s + Storage.getEvent('shadow_rep', d), 0);
    const totalFlash = dates.reduce((s, d) => s + Storage.getEvent('flash_done', d), 0);
    const totalReviews = dates.reduce((s, d) => s + Storage.getEvent('vocab_review', d), 0);
    const totalPron = dates.reduce((s, d) => s + Storage.getEvent('pronunciation_check', d), 0);
    const totalDoneDays = dates.filter(d => (Storage.get('done_' + d, []).length > 0)).length;

    // 先週との比較
    const prevDates = [];
    for (let i = 13; i >= 7; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      prevDates.push(`${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`);
    }
    const prevReps = prevDates.reduce((s, d) => s + Storage.getEvent('shadow_rep', d), 0);
    const repsDelta = totalReps - prevReps;

    let summary = "Keep going!";
    if (totalDoneDays >= 6) summary = "🔥 Iron week! You showed up.";
    else if (totalDoneDays >= 4) summary = "👍 Solid week. Build on this.";
    else if (totalDoneDays >= 2) summary = "💪 Some sparks. Push next week.";
    else summary = "🌱 Fresh start. Tomorrow is yours.";

    const days = Storage.daysUntil(TARGET_DATE);
    const lvProgress = Storage.getLevelProgress();

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">WEEKLY REPORT</div>
      <div class="burst-card">
        <div class="burst-emoji">📈</div>
        <div class="burst-title">${summary}</div>
        <div class="burst-msg">${totalDoneDays} active days · ${days >= 0 ? days + ' days to Jakarta' : 'Mission complete'}</div>
      </div>

      <div class="report-stat slide-up">
        <span class="report-icon">🎬</span>
        <div class="report-detail">
          <div class="report-name">Shadowing Reps</div>
          <div class="report-sub">${repsDelta >= 0 ? '+' : ''}${repsDelta} vs last week</div>
        </div>
        <div class="report-value">${totalReps}</div>
      </div>
      <div class="report-stat slide-up" style="animation-delay:0.05s;">
        <span class="report-icon">🃏</span>
        <div class="report-detail">
          <div class="report-name">Flash Cards</div>
          <div class="report-sub">${totalFlash} done this week</div>
        </div>
        <div class="report-value">${totalFlash}</div>
      </div>
      <div class="report-stat slide-up" style="animation-delay:0.1s;">
        <span class="report-icon">📚</span>
        <div class="report-detail">
          <div class="report-name">Vocab Reviews</div>
          <div class="report-sub">SM-2 forgetting curve</div>
        </div>
        <div class="report-value">${totalReviews}</div>
      </div>
      <div class="report-stat slide-up" style="animation-delay:0.15s;">
        <span class="report-icon">📊</span>
        <div class="report-detail">
          <div class="report-name">Pronunciation Checks</div>
          <div class="report-sub">Your mouth knows more now</div>
        </div>
        <div class="report-value">${totalPron}</div>
      </div>
      <div class="report-stat slide-up" style="animation-delay:0.2s;">
        <span class="report-icon">⭐</span>
        <div class="report-detail">
          <div class="report-name">Level ${Storage.getLevel()}</div>
          <div class="report-sub">${lvProgress.current}/${lvProgress.total} XP to next</div>
        </div>
        <div class="report-value">${Storage.getXP()}</div>
      </div>

      <div style="background: var(--bg-soft); border-radius: 14px; padding: 14px; margin: 14px 0; text-align: center;">
        <div style="font-size: 12px; color: var(--text-soft); font-weight: 900; letter-spacing: 1px; margin-bottom: 8px;">FOCUS NEXT WEEK</div>
        <div style="font-size: 14px; color: var(--text); font-weight: 800; line-height: 1.6;">
          ${this.getNextWeekFocus(totalReps, totalReviews, totalPron, totalDoneDays)}
        </div>
      </div>
      <button class="btn-primary btn-success" onclick="App.confetti(20); App.closeModal();">LET'S GO 💪</button>
    `;
  },

  getNextWeekFocus(reps, reviews, pron, days) {
    if (days < 3) return "Show up daily — even 2 minutes counts. The streak is the asset.";
    if (reps < 50) return "Double the shadowing. Aim for 100+ reps. Mouth memory is everything.";
    if (pron < 5) return "Use Pronunciation Check more. Measurement = improvement.";
    if (reviews < 20) return "Review vocabulary daily. The forgetting curve is your enemy.";
    return "You're crushing it. Add 1 new ambitious thing — Custom Shadowing or Voice Roleplay.";
  },

  // ===========================================
  // ChatGPT API直接連携
  // ===========================================
  chatgptApi() {
    const hasKey = Storage.hasApiKey();
    const chatHist = Storage.get('ai_chat_history', []);
    const chatHtml = chatHist.length === 0
      ? `<div class="chat-msg chat-ai">Hi Zacky! I'm your in-app English tutor. Ask me anything, or just chat. I'll keep us in English.</div>`
      : chatHist.map(m => `<div class="chat-msg chat-${m.role === 'user' ? 'user' : 'ai'}">${m.content}</div>`).join('');

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">AI TUTOR · IN-APP CHAT</div>
      ${!hasKey ? `
        <div class="api-card">
          <div class="api-status">⚙️ SETUP REQUIRED</div>
          <div style="font-size: 12px; color: var(--text); font-weight: 700; line-height: 1.5; margin-bottom: 10px;">
            Paste your OpenAI API key to enable in-app chat.<br>
            Get one at <b>platform.openai.com/api-keys</b>.<br>
            Stored only in your browser.
          </div>
          <input type="text" id="apiKeyInput" placeholder="sk-..." style="margin-bottom: 8px;">
          <button class="btn-primary btn-success" onclick="Modules.saveApiKey()">✓ SAVE KEY</button>
        </div>
      ` : `
        <div style="font-size: 11px; color: var(--text-soft); font-weight: 800; margin-bottom: 8px;">
          API key set ✓ &nbsp;<a href="javascript:Modules.clearApiKey()" style="color: var(--danger);">Remove</a>
        </div>
      `}
      <div class="chat-area" id="aiChatArea">${chatHtml}</div>
      ${hasKey ? `
        <input type="text" id="aiChatInput" placeholder="Type in English..." onkeydown="if(event.key==='Enter')Modules.sendAiMessage()">
        <div class="btn-row">
          <button class="btn-primary" onclick="Modules.sendAiMessage()">SEND</button>
          <button class="btn-secondary" onclick="Modules.aiVoiceInput()">🎙️ SPEAK</button>
        </div>
        <div class="btn-row">
          <button class="btn-secondary" onclick="Modules.startAiScenario('meeting')">🤝 MEETING</button>
          <button class="btn-secondary" onclick="Modules.startAiScenario('smalltalk')">💬 SMALL TALK</button>
        </div>
        <button class="btn-secondary" onclick="Storage.set('ai_chat_history', []); Modules.chatgptApi();">🗑 CLEAR CHAT</button>
      ` : ''}
    `;
  },

  saveApiKey() {
    const key = document.getElementById('apiKeyInput').value.trim();
    if (!key.startsWith('sk-')) { App.toast('Invalid key format'); return; }
    Storage.setApiKey(key);
    App.toast('Key saved ✓');
    this.chatgptApi();
  },

  clearApiKey() {
    if (!confirm('Remove API key?')) return;
    Storage.setApiKey('');
    this.chatgptApi();
  },

  startAiScenario(type) {
    const prompts = {
      meeting: "You are Mr. Tan, a 50yo Chinese-Indonesian luxury hotel owner in Jakarta. I'm Zacky from CAVIN selling premium Japanese flowers. Be skeptical but curious. Ask me one business question at a time, in English. Stay in character. Begin.",
      smalltalk: "You are Ibu Sari, a 45yo Indonesian fashion entrepreneur. We meet at a Jakarta carnival reception. Make natural English small talk about Indonesia, Japan, life. Don't talk about flowers unless I mention them. Limit each turn to 2-3 sentences. Begin by introducing yourself."
    };
    const hist = [{ role: 'system', content: prompts[type] }];
    Storage.set('ai_chat_history', hist);
    this.chatgptApi();
    setTimeout(() => this.sendAiMessage('__start__'), 200);
  },

  async aiVoiceInput() {
    const input = document.getElementById('aiChatInput');
    input.placeholder = '🎙️ Listening...';
    Speech.startRecognition(
      (t) => { input.value = t; input.placeholder = 'Type in English...'; this.sendAiMessage(); },
      (err) => { input.placeholder = 'Type in English...'; App.toast('Mic error'); }
    );
  },

  async sendAiMessage(forceText) {
    const input = document.getElementById('aiChatInput');
    const text = forceText === '__start__' ? null : (forceText || (input ? input.value.trim() : ''));
    if (input) input.value = '';
    const hist = Storage.get('ai_chat_history', []);
    if (text) hist.push({ role: 'user', content: text });
    const area = document.getElementById('aiChatArea');
    if (text) area.innerHTML += `<div class="chat-msg chat-user">${text}</div>`;
    area.innerHTML += `<div class="chat-msg chat-ai" id="aiThinking">...</div>`;
    area.scrollTop = area.scrollHeight;

    try {
      const sysPrompt = hist.find(m => m.role === 'system')
        ? null
        : { role: 'system', content: "You are a warm, encouraging English tutor for a Japanese businessman named Zacky who is preparing for a luxury flower sales trip to Indonesia. Reply in English. Keep replies concise (2-4 sentences). Gently correct major errors with a friendly tone. End with a question to keep practice going." };
      const messages = sysPrompt ? [sysPrompt, ...hist] : [...hist];
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Storage.getApiKey(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.7,
          max_tokens: 250
        })
      });
      if (!r.ok) {
        const e = await r.text();
        document.getElementById('aiThinking').innerHTML = `<span style="color:var(--danger);">Error: ${r.status}. Check API key.</span>`;
        return;
      }
      const data = await r.json();
      const reply = data.choices[0].message.content;
      hist.push({ role: 'assistant', content: reply });
      Storage.set('ai_chat_history', hist);
      document.getElementById('aiThinking').remove();
      area.innerHTML += `<div class="chat-msg chat-ai">${reply}</div>`;
      area.scrollTop = area.scrollHeight;
      Speech.speak(reply, 0.95);
      Storage.addXP(2);
    } catch (e) {
      const t = document.getElementById('aiThinking');
      if (t) t.innerHTML = `<span style="color:var(--danger);">Network error. Try again.</span>`;
    }
  }
};
