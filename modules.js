// =====================================================
// 各モジュール（モーダル中身）
// =====================================================

// 使用モデル（一元管理）
function _chatModel() {
  return (typeof Storage !== 'undefined' && Storage.get) ? Storage.get('chatModel', 'gpt-4o') : 'gpt-4o';
}

const Modules = {
  declaration() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">MORNING DECLARATION</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">${PURPOSE.declaration.why}</div>
        <div class="why-impact">${PURPOSE.declaration.impact}</div>
      </div>
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
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">${PURPOSE.hook.why}</div>
        <div class="why-impact">${PURPOSE.hook.impact}</div>
      </div>
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
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">${PURPOSE.flash.why}</div>
        <div class="why-impact">${PURPOSE.flash.impact}</div>
      </div>
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
      ${card.qJp ? `
      <div class="lesson-jp">
        <div class="lesson-label">🇯🇵 JAPANESE</div>
        <div class="lesson-text"><b>Q:</b> ${card.qJp}<br><b>A:</b> ${card.aJp || ''}</div>
      </div>
      ` : ''}
      ${card.grammar ? `
      <div class="lesson-grammar">
        <div class="lesson-label">📖 GRAMMAR</div>
        <div class="lesson-text">${card.grammar}</div>
      </div>
      ` : ''}
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
      ${card.qJp ? `
      <div class="lesson-jp">
        <div class="lesson-label">🇯🇵 JAPANESE</div>
        <div class="lesson-text"><b>Q:</b> ${card.qJp}<br><b>A:</b> ${card.aJp || ''}</div>
      </div>
      ` : ''}
      ${card.grammar ? `
      <div class="lesson-grammar">
        <div class="lesson-label">📖 GRAMMAR</div>
        <div class="lesson-text">${card.grammar}</div>
      </div>
      ` : ''}
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
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">${PURPOSE.phraseToday.why}</div>
        <div class="why-impact">${PURPOSE.phraseToday.impact}</div>
      </div>
      <div class="declaration" style="font-style:normal; font-size:24px;">"${phrase}"</div>
      <div style="text-align:center; font-size:11px; color: var(--text-dim); margin-bottom:14px;">SAY IT 3 TIMES</div>
      <button class="btn-primary" onclick="Speech.speak(\`${phrase}\`, 0.9)">🔊 LISTEN</button>
      <button class="btn-primary btn-pink" onclick="Shadowing.start(\`${phrase}\`, 1);">🎬 50× DRILL</button>
      <button class="btn-primary btn-success" onclick="Storage.markDone('phrase-today'); App.awardXP(8, event); App.closeModal();">✓ PRACTICED (+8 XP)</button>
    `;
    setTimeout(() => Speech.speak(phrase, 0.9), 400);
  },

  // ========== シャドーイングHub ==========
  shadowingHub(slot) {
    // slot: 'am' / 'pm' / undefined。Shadowing.completeSession 内で参照
    window._shadowingSlot = slot || null;
    const slotLabel = slot === 'am' ? '☀️ MORNING SHADOWING · ' : slot === 'pm' ? '🌙 MAIN (NIGHT) SHADOWING · ' : '';
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">${slotLabel}SHADOWING SESSION</div>

      <!-- なぜシャドーイングをやるか -->
      <div class="why-card">
        <div class="why-label">🎯 WHY SHADOWING</div>
        <div class="why-text">${PURPOSE.shadowing.why}</div>
        <div class="why-impact">${PURPOSE.shadowing.impact}</div>
      </div>

      <!-- セッション内容説明 -->
      <div style="background: linear-gradient(135deg, #fff7e0, #ffeec2); border: 2px solid var(--accent); border-bottom-width: 3px; border-radius: 16px; padding: 16px; margin-bottom: 14px;">
        <div style="font-size: 11px; color: var(--accent-dark); font-weight: 900; letter-spacing: 1px; margin-bottom: 8px;">📦 TODAY'S SESSION</div>
        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 6px;">
          <span style="background: var(--info); color: #fff; font-size: 11px; font-weight: 900; padding: 4px 10px; border-radius: 8px; border-bottom: 2px solid var(--info-shadow);">SHORT × 2</span>
          <span style="font-size: 12px; color: var(--text-soft); font-weight: 800;">50 reps each</span>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <span style="background: var(--purple); color: #fff; font-size: 11px; font-weight: 900; padding: 4px 10px; border-radius: 8px; border-bottom: 2px solid var(--purple-dark);">LONG × 1</span>
          <span style="font-size: 12px; color: var(--text-soft); font-weight: 800;">20 reps</span>
        </div>
        <div style="font-size: 11px; color: var(--text-soft); margin-top: 10px; font-weight: 700;">→ Auto-selected based on your recent practice. Avoiding repeats.</div>
      </div>

      <button class="btn-primary btn-pink" onclick="Shadowing.startSession()">🚀 START TODAY'S SESSION</button>
      <button class="btn-primary btn-purple" onclick="Shadowing.customStart()">✏️ CUSTOM TEXT</button>

      <div class="section-title" style="margin: 18px 0 8px;">JUMP TO SPECIFIC PHRASE</div>
      <div style="font-size: 11px; color: var(--text-soft); font-weight: 800; margin-bottom: 8px;">All practice library — for free practice anytime.</div>
      ${SHADOW_BANK.short.slice(0, 5).map((s) => `
        <div class="vocab-item" onclick="Shadowing.start(\`${s.text.replace(/`/g,"'")}\`, 1);">
          <div style="flex:1; min-width:0;">
            <div class="vocab-word" style="font-size:14px;">${s.text}</div>
            <div class="vocab-jp">SHORT · 50×</div>
          </div>
          <div class="vocab-due new">START</div>
        </div>
      `).join('')}
      <button class="btn-secondary" onclick="Modules.shadowingFullList()">▼ SHOW ALL ${SHADOW_BANK.short.length + SHADOW_BANK.long.length} PHRASES</button>
    `;
  },

  shadowingFullList() {
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
      <div class="modal-title">ALL SHADOWING PHRASES</div>
      <button class="btn-secondary" onclick="Modules.shadowingHub()">← BACK TO SESSION</button>
      <div class="section-title" style="margin: 14px 0 8px;">📝 SHORT (${SHADOW_BANK.short.length})</div>
      ${shortList}
      <div class="section-title" style="margin: 18px 0 8px;">📜 LONG (${SHADOW_BANK.long.length})</div>
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
      <div class="why-card">
        <div class="why-label">🎯 WHY VOCABULARY</div>
        <div class="why-text">${PURPOSE.vocab.why}</div>
        <div class="why-impact">${PURPOSE.vocab.impact}</div>
      </div>
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
      <div class="why-card">
        <div class="why-label">🎯 WHY SCENES</div>
        <div class="why-text">${PURPOSE.scenes.why}</div>
        <div class="why-impact">${PURPOSE.scenes.impact}</div>
      </div>
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
        ${p.grammar ? `<div style="font-size:11px; color: var(--purple-dark); font-weight: 700; margin-top: 6px; line-height: 1.5; padding: 6px 8px; background: rgba(206, 130, 255, 0.08); border-radius: 6px; border-left: 2px solid var(--purple);">📖 ${p.grammar}</div>` : ''}
        <div style="display:flex; gap:6px; margin-top:8px;">
          <button class="example-speak" onclick="Speech.speak(\`${p.en.replace(/`/g,"'")}\`, 0.9)">🔊 PLAY</button>
          <button class="example-speak" onclick="Shadowing.start(\`${p.en.replace(/`/g,"'")}\`, 1);">🎬 50×</button>
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
      <div class="why-card">
        <div class="why-label">🎯 WHY VOICE ROLEPLAY</div>
        <div class="why-text">${PURPOSE.voiceRoleplay.why}</div>
        <div class="why-impact">${PURPOSE.voiceRoleplay.impact}</div>
      </div>
      <div style="font-size:13px; color: var(--text-soft); margin-bottom: 14px; line-height:1.6; font-weight: 800;">
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
  listen(slot) {
    // slot: 'am' / 'pm' / undefined（クイックアクセスから直接の場合は両方完了扱い）
    const day = new Date().getDay();
    const media = DAILY_MEDIA[day];
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const isAm = slot === 'am';
    const isPm = slot === 'pm';
    const slotLabel = isAm ? '☀️ MORNING SESSION' : isPm ? '🌙 EVENING SESSION' : '';
    const doneCmd = isAm
      ? "Storage.markDone('listen-am')"
      : isPm
      ? "Storage.markDone('listen-pm')"
      : "Storage.markDone('listen-am'); Storage.markDone('listen-pm')";
    const slotWhy = isAm
      ? '朝の通勤・準備中に耳から英語を入れる時間。1日の英語回路を起動。'
      : isPm
      ? '帰り道に同じ番組の続きを聞く、または別パートで耳の筋トレ。1日2回の刺激で定着が違う。'
      : '毎日違うテーマで自動推薦。あなたが教材を探す時間ゼロ。';
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">${slotLabel ? slotLabel + ' · ' : ''}TODAY'S MEDIA · ${dayNames[day].toUpperCase()}</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY TODAY'S PICKS</div>
        <div class="why-text">${slotWhy}</div>
        <div class="why-impact">→ 完全自動・選ぶストレスなし</div>
      </div>

      <!-- Podcast -->
      <div class="media-card media-podcast">
        <div class="media-type">🎙️ PODCAST · ${media.podcast.duration}</div>
        <div class="media-title">${media.podcast.title}</div>
        <div class="media-listen">
          <span class="media-listen-label">📍 LISTEN:</span> ${media.podcast.listen}
        </div>
        <div class="media-why">${media.podcast.why}</div>
        <div class="media-catch">💡 ${media.podcast.catchPhrase}</div>
        <a href="${media.podcast.search || media.podcast.url}" target="_blank" class="btn-primary" style="text-decoration:none; text-align:center; display:block;">🔗 OPEN PODCAST</a>
      </div>

      <!-- Video -->
      <div class="media-card media-video">
        <div class="media-type">🎬 VIDEO · ${media.video.duration}</div>
        <div class="media-title">${media.video.title}</div>
        <div class="media-listen">
          <span class="media-listen-label">📍 WATCH:</span> ${media.video.watch}
        </div>
        <div class="media-why">${media.video.why}</div>
        <div class="media-catch">💡 ${media.video.catchPhrase}</div>
        <a href="${media.video.url}" target="_blank" class="btn-primary btn-pink" style="text-decoration:none; text-align:center; display:block;">🔗 OPEN VIDEO</a>
      </div>

      <button class="btn-primary btn-success" style="margin-top:14px;" onclick="${doneCmd}; App.awardXP(15, event); App.toast('+15 XP for listening ✓', 'xp'); App.closeModal();">✓ I LISTENED (+15 XP)</button>
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
      <div class="why-card">
        <div class="why-label">🎯 WHY DIARY</div>
        <div class="why-text">${PURPOSE.diary.why}</div>
        <div class="why-impact">${PURPOSE.diary.impact}</div>
      </div>
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
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS MODE</div>
        <div class="why-text">${PURPOSE.emergency.why}</div>
        <div class="why-impact">${PURPOSE.emergency.impact}</div>
      </div>
      <div style="font-size:14px; line-height:1.8; padding:8px 0 18px;">
        <div style="color: var(--accent-dark); margin-bottom:10px; font-weight: 900;">FOR BUSY DAYS — PRESERVE STREAK</div>
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
      <div class="why-card">
        <div class="why-label">🎯 WHY TIMELINE</div>
        <div class="why-text">${PURPOSE.timeline.why}</div>
        <div class="why-impact">${PURPOSE.timeline.impact}</div>
      </div>
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
      <div class="why-card">
        <div class="why-label">🎯 WHY WEEKLY REPORT</div>
        <div class="why-text">${PURPOSE.weeklyReport.why}</div>
        <div class="why-impact">${PURPOSE.weeklyReport.impact}</div>
      </div>
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
          &nbsp;·&nbsp;<a href="javascript:Modules.aiSettings()" style="color: var(--info);">⚙️ Voice & Model</a>
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

  // ===========================================
  // 🎙️ AI Tutor 設定（モデル選択・音声選択）
  // ===========================================
  aiSettings() {
    const useTts = Storage.get('useOpenAiTts', true);
    const voice = Storage.get('ttsVoice', 'nova');
    const chatModel = Storage.get('chatModel', 'gpt-4o');
    const transcribeModel = Storage.get('transcribeModel', 'gpt-4o-transcribe');
    const instructions = Storage.get('ttsInstructions', 'Speak in a calm, sophisticated, articulate manner — like a luxury brand ambassador. Clear pronunciation. Natural pacing.');

    const voices = [
      { id: 'nova',    label: 'Nova',    desc: '女性・温かく明瞭（デフォルト推奨）' },
      { id: 'alloy',   label: 'Alloy',   desc: '中性・落ち着いた' },
      { id: 'shimmer', label: 'Shimmer', desc: '女性・若く明るい' },
      { id: 'echo',    label: 'Echo',    desc: '男性・落ち着いた' },
      { id: 'onyx',    label: 'Onyx',    desc: '男性・低音・威厳' },
      { id: 'fable',   label: 'Fable',   desc: '英国系・上品' },
      { id: 'sage',    label: 'Sage',    desc: '中性・穏やか' },
      { id: 'coral',   label: 'Coral',   desc: '女性・親しみやすい' },
      { id: 'ash',     label: 'Ash',     desc: '男性・知的' },
      { id: 'ballad',  label: 'Ballad',  desc: '男性・叙情的' },
      { id: 'verse',   label: 'Verse',   desc: '女性・繊細' }
    ];
    const voiceCards = voices.map(v => `
      <div class="voice-card ${v.id === voice ? 'voice-selected' : ''}" onclick="Modules.pickVoice('${v.id}')">
        <div class="voice-name">${v.label}</div>
        <div class="voice-desc">${v.desc}</div>
        <button class="example-speak" onclick="event.stopPropagation(); Modules.previewVoice('${v.id}')">🔊 PREVIEW</button>
      </div>
    `).join('');

    const chatModels = [
      { id: 'gpt-4o',      label: 'GPT-4o',       desc: '最も滑らか・推奨' },
      { id: 'gpt-4o-mini', label: 'GPT-4o mini',  desc: '安価・速い（精度やや低）' },
      { id: 'gpt-5',       label: 'GPT-5',        desc: '最新フラッグシップ（高価）' },
      { id: 'gpt-5-mini',  label: 'GPT-5 mini',   desc: '最新の中間グレード' }
    ];
    const transcribeModels = [
      { id: 'gpt-4o-transcribe',      label: 'gpt-4o-transcribe', desc: '最高精度（推奨）' },
      { id: 'gpt-4o-mini-transcribe', label: 'gpt-4o-mini-transcribe', desc: '安価・速い' },
      { id: 'whisper-1',              label: 'whisper-1', desc: '従来モデル（互換重視）' }
    ];

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">⚙️ AI VOICE & MODEL SETTINGS</div>
      <button class="btn-secondary" onclick="Modules.chatgptApi()">← BACK TO CHAT</button>

      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">最新のOpenAIモデルを使うと、リスニング・会話・添削の体験が劇的に上がる。Nova/Alloyなど人間に近い音声でシャドーイング教材も自然に。</div>
        <div class="why-impact">→ ネイティブ並みの音で耳と口を鍛える</div>
      </div>

      <div class="label" style="margin-top:14px;">🔊 USE OPENAI TTS</div>
      <div style="background: var(--card); border: 2px solid var(--line); border-bottom-width: 3px; border-radius: 12px; padding: 12px 14px; margin-bottom: 10px;">
        <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-weight: 800; font-size: 13px;">
          <input type="checkbox" id="ttsToggle" ${useTts ? 'checked' : ''} onchange="Storage.set('useOpenAiTts', this.checked); App.toast(this.checked ? 'OpenAI TTS ON' : 'Browser TTS')">
          OpenAIの人間的な音声を使う（ON推奨）
        </label>
        <div style="font-size: 11px; color: var(--text-soft); margin-top: 6px; font-weight: 700; line-height: 1.5;">
          OFFにするとブラウザ標準TTS（無料・棒読み）に切り替わります。<br>
          コスト目安: $0.015/分（10分 = 約23円）
        </div>
      </div>

      <div class="label">🎤 VOICE</div>
      <div class="voice-grid">${voiceCards}</div>

      <div class="label" style="margin-top:14px;">🎭 VOICE STYLE INSTRUCTIONS</div>
      <textarea id="ttsInstr" rows="3" placeholder="話し方を英語で指示（例: Calm, sophisticated, like a luxury brand ambassador）">${instructions}</textarea>
      <button class="btn-secondary" onclick="Storage.set('ttsInstructions', document.getElementById('ttsInstr').value); App.toast('Style saved ✓');">💾 SAVE STYLE</button>

      <div class="label" style="margin-top:14px;">💬 CHAT / FEEDBACK MODEL</div>
      <div class="model-list">
        ${chatModels.map(m => `
          <div class="model-card ${m.id === chatModel ? 'model-selected' : ''}" onclick="Storage.set('chatModel', '${m.id}'); Modules.aiSettings();">
            <div class="model-name">${m.label}</div>
            <div class="model-desc">${m.desc}</div>
          </div>
        `).join('')}
      </div>

      <div class="label" style="margin-top:14px;">🎙️ TRANSCRIBE (SPEECH→TEXT)</div>
      <div class="model-list">
        ${transcribeModels.map(m => `
          <div class="model-card ${m.id === transcribeModel ? 'model-selected' : ''}" onclick="Storage.set('transcribeModel', '${m.id}'); Modules.aiSettings();">
            <div class="model-name">${m.label}</div>
            <div class="model-desc">${m.desc}</div>
          </div>
        `).join('')}
      </div>

      <button class="btn-primary btn-success" style="margin-top:16px;" onclick="Modules.chatgptApi()">✓ DONE</button>
    `;
  },

  pickVoice(v) {
    Storage.set('ttsVoice', v);
    App.toast('Voice: ' + v);
    this.previewVoice(v);
    this.aiSettings();
  },

  previewVoice(v) {
    const old = Storage.get('ttsVoice', 'nova');
    Storage.set('ttsVoice', v);
    Speech.speak("Hi Zacky. Japan grows the world's finest flowers — and I'm here to help you tell that story.", 0.95);
    // 元に戻すのは選択時のみ。プレビュー直後に戻すと再生中の声が変わるため、ここでは戻さない（保存）
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

  // ===========================================
  // ⋯ More Tools — 全機能を整理して表示
  // ===========================================
  moreMenu() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">⋯ ALL TOOLS</div>

      <div class="section-title" style="margin: 6px 0 8px;">RHYTHM RITUALS</div>
      <div class="menu-grid">
        <button class="menu-item tile-pink" onclick="App.openModule('declaration')">
          <div class="menu-icon">🪞</div><div class="menu-name">Declaration</div>
          <div class="menu-desc">Identity reset</div>
        </button>
        <button class="menu-item tile-pink" onclick="App.openModule('hook')">
          <div class="menu-icon">🌸</div><div class="menu-name">Hook</div>
          <div class="menu-desc">Self intro</div>
        </button>
        <button class="menu-item tile-blue" onclick="App.openModule('phrase-today')">
          <div class="menu-icon">📝</div><div class="menu-name">Today's Phrase</div>
          <div class="menu-desc">Daily one-liner</div>
        </button>
        <button class="menu-item tile-yellow" onclick="App.openModule('diary')">
          <div class="menu-icon">📔</div><div class="menu-name">Diary</div>
          <div class="menu-desc">3-line reflection</div>
        </button>
        <button class="menu-item tile-orange" onclick="App.openModule('emergency')">
          <div class="menu-icon">🚨</div><div class="menu-name">2-Min Mode</div>
          <div class="menu-desc">When too busy</div>
        </button>
      </div>

      <div class="section-title" style="margin: 16px 0 8px;">DRILLS</div>
      <div class="menu-grid">
        <button class="menu-item tile-orange" onclick="App.openModule('flash-random')">
          <div class="menu-icon">🃏</div><div class="menu-name">Random Flash</div>
          <div class="menu-desc">28-card drill</div>
        </button>
        <button class="menu-item tile-green" onclick="App.openModule('scenes')">
          <div class="menu-icon">🎭</div><div class="menu-name">Scenes</div>
          <div class="menu-desc">Meeting / Meal</div>
        </button>
        <button class="menu-item tile-green" onclick="App.openModule('listen')">
          <div class="menu-icon">🎧</div><div class="menu-name">Today's Media</div>
          <div class="menu-desc">Auto-picked</div>
        </button>
        <button class="menu-item tile-pink" onclick="App.openModule('vocab-add')">
          <div class="menu-icon">➕</div><div class="menu-name">Add Card</div>
          <div class="menu-desc">Custom flash</div>
        </button>
      </div>

      <div class="section-title" style="margin: 16px 0 8px;">JAKARTA PREP</div>
      <div class="menu-grid">
        <button class="menu-item tile-pink" onclick="App.openModule('timeline')">
          <div class="menu-icon">📅</div><div class="menu-name">Day Timeline</div>
          <div class="menu-desc">Hour-by-hour plan</div>
        </button>
        <button class="menu-item tile-purple" onclick="App.openModule('roleplay')">
          <div class="menu-icon">💼</div><div class="menu-name">ChatGPT Roleplay</div>
          <div class="menu-desc">Weekend deep talk</div>
        </button>
        <button class="menu-item tile-orange" onclick="App.openModule('daily-flow')">
          <div class="menu-icon">☀️</div><div class="menu-name">Daily Flow</div>
          <div class="menu-desc">6-step ritual</div>
        </button>
      </div>

      <div class="section-title" style="margin: 16px 0 8px;">PROGRESS &amp; SETTINGS</div>
      <div class="menu-grid">
        <button class="menu-item tile-yellow" onclick="App.openModule('dashboard')">
          <div class="menu-icon">📊</div><div class="menu-name">Dashboard</div>
          <div class="menu-desc">XP &amp; heatmap</div>
        </button>
        <button class="menu-item tile-yellow" onclick="App.openModule('weekly-report')">
          <div class="menu-icon">📈</div><div class="menu-name">Weekly Report</div>
          <div class="menu-desc">Last 7 days</div>
        </button>
        <button class="menu-item tile-blue" onclick="App.openModule('chatgpt-api')">
          <div class="menu-icon">🤖</div><div class="menu-name">AI Tutor</div>
          <div class="menu-desc">Chat / Settings</div>
        </button>
        <button class="menu-item tile-purple" onclick="App.openModule('report-settings')">
          <div class="menu-icon">📧</div><div class="menu-name">Auto Report</div>
          <div class="menu-desc">Email / Slack</div>
        </button>
        <button class="menu-item tile-blue" onclick="App.openModule('history')">
          <div class="menu-icon">📓</div><div class="menu-name">Diary History</div>
          <div class="menu-desc">Past entries</div>
        </button>
      </div>

      <button class="btn-secondary" style="margin-top: 16px;" onclick="App.closeModal()">CLOSE</button>
    `;
  },

  // ===========================================
  // 🌟 Today's Coach Plan
  // AIがあなたの過去進捗・残り日数・苦手領域から、今日やるべきレッスンを毎日カスタム提案
  // ===========================================
  coachPlan() {
    const today = Storage.todayKey();
    const cached = Storage.get('coach_plan_' + today, null);
    if (cached) {
      this.renderCoachPlan(cached);
      return;
    }
    if (!Storage.hasApiKey()) {
      // API無しでもデフォルトのプランを返す
      const def = this.defaultCoachPlan();
      Storage.set('coach_plan_' + today, def);
      this.renderCoachPlan(def);
      return;
    }
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">🌟 TODAY'S COACH PLAN</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">あなたの進捗・苦手・残り日数を分析し、「今日この一日で最も英語力を上げるための4-6個のレッスン」を提案。毎日違う組み合わせ。</div>
        <div class="why-impact">→ 7/23に最高の状態で立つための最短ルート</div>
      </div>
      <div style="text-align:center; padding: 30px 10px;">
        <div style="font-size: 40px; margin-bottom: 10px;">🤖</div>
        <div style="color: var(--info); font-weight: 900; font-size: 14px;">AI is crafting your plan...</div>
        <div style="color: var(--text-soft); font-size: 12px; margin-top: 8px; font-weight: 700;">Analyzing your progress, weaknesses, and remaining days...</div>
      </div>
    `;
    this.generateCoachPlan().then(plan => {
      Storage.set('coach_plan_' + today, plan);
      this.renderCoachPlan(plan);
    }).catch(e => {
      console.error(e);
      const def = this.defaultCoachPlan();
      Storage.set('coach_plan_' + today, def);
      this.renderCoachPlan(def);
    });
  },

  defaultCoachPlan() {
    const days = Storage.daysUntil(TARGET_DATE);
    const phase = days > 60 ? 'foundation' : days > 30 ? 'building' : days > 14 ? 'sharpening' : days > 3 ? 'final' : 'showtime';
    return {
      headline: 'Today\'s mission: build mouth memory',
      reasoning: `残り${days}日。今は ${phase === 'foundation' ? '土台作り' : phase === 'building' ? '実力構築' : phase === 'sharpening' ? '研磨' : phase === 'final' ? '最終調整' : '本番モード'} のフェーズ。基礎ステップを積み重ねる日。`,
      phase,
      lessons: [
        { id: 'shadowing-am', icon: '🎬', title: 'Shadowing Session', why: '口の筋肉に英語を染み込ませる。最重要レッスン。', minutes: 12 },
        { id: 'composition', icon: '✍️', title: 'Composition + AI Feedback', why: '自分の言葉で書く→添削で語彙と文法を磨く', minutes: 8 },
        { id: 'live-talk', icon: '🎙️', title: 'Live Talk (Meeting scenario)', why: '会話の瞬発力。商談本番のリハーサル。', minutes: 10 },
        { id: 'flash-am', icon: '🃏', title: 'Q&A Flash', why: '想定質問への即答力', minutes: 3 },
        { id: 'listen-am', icon: '🎧', title: 'Daily Media', why: '耳の温度を保つ', minutes: 10 }
      ]
    };
  },

  async generateCoachPlan() {
    const days = Storage.daysUntil(TARGET_DATE);
    // 過去7日の活動量を集計
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      dates.push(`${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`);
    }
    const stats = {
      shadow_rep: dates.reduce((s, d) => s + Storage.getEvent('shadow_rep', d), 0),
      flash_done: dates.reduce((s, d) => s + Storage.getEvent('flash_done', d), 0),
      vocab_review: dates.reduce((s, d) => s + Storage.getEvent('vocab_review', d), 0),
      pronunciation_check: dates.reduce((s, d) => s + Storage.getEvent('pronunciation_check', d), 0),
      live_talk_turn: dates.reduce((s, d) => s + Storage.getEvent('live_talk_turn', d), 0),
      composition_attempt: dates.reduce((s, d) => s + Storage.getEvent('composition_attempt', d), 0)
    };
    const xp = Storage.getXP();
    const streak = parseInt(localStorage.getItem('streak') || '0');

    const sys = `You are an elite English coach for Zacky, a Japanese businessman (TOEIC 800+) preparing for a luxury flower sales trip to Indonesia on July 23, 2026. He needs to interact with HNWI Indonesian clients in sophisticated business English.

Your job: based on his last-7-days stats and remaining days, design TODAY'S optimal lesson plan (4-6 lessons) to maximize his English skill gain by July 23.

Available lesson IDs (use these exact IDs):
- shadowing-am, shadowing-pm: shadowing drill (mouth memory)
- composition: write English & get AI feedback
- live-talk: live voice conversation with AI
- flash-am, flash-noon, flash-pm, flash-night: Q&A flash cards
- vocab-list: vocabulary review (forgetting curve)
- listen-am, listen-pm: today's curated podcast/video
- scenes: scene-specific phrases
- timeline: day-of-meeting walkthrough
- declaration, hook, phrase-today, diary, emergency: short rituals

Rules:
- Pick 4-6 lessons. Order them logically.
- Heavily prioritize ACTIVE OUTPUT (composition, live-talk, shadowing) over passive (listen).
- If he's been weak in one area (low stats), include it. If strong, skip or reduce.
- Last 7 days < 30 days: focus on foundation (lots of shadow, vocab).
- Last 30-60 days: balanced.
- Last < 14 days: scenario rehearsal (live-talk, scenes, timeline) heavily.
- Output STRICT JSON only, no markdown:
{
  "headline": "Today's mission in 1 punchy English line",
  "reasoning": "1-2 sentences in Japanese explaining why this exact mix today",
  "phase": "foundation|building|sharpening|final|showtime",
  "lessons": [
    {"id": "lesson-id", "icon": "emoji", "title": "Lesson name", "why": "1 sentence in Japanese why HE specifically needs this today", "minutes": 8}
  ]
}`;

    const user = `Status:
- Days to Jakarta: ${days}
- Total XP: ${xp}
- Streak: ${streak} days
- Last 7 days activity:
  - Shadowing reps: ${stats.shadow_rep}
  - Flash cards done: ${stats.flash_done}
  - Vocab reviews: ${stats.vocab_review}
  - Pronunciation checks: ${stats.pronunciation_check}
  - Live talk turns: ${stats.live_talk_turn}
  - Composition attempts: ${stats.composition_attempt}
- Vocabulary items: ${typeof Vocab !== 'undefined' ? Vocab.all().length : 0}
- Vocab due now: ${typeof Vocab !== 'undefined' ? Vocab.due().length : 0}

Design today's plan.`;

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + Storage.getApiKey(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: _chatModel(),
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: user }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
        max_tokens: 1200
      })
    });
    if (!r.ok) throw new Error('API: ' + r.status);
    const data = await r.json();
    return JSON.parse(data.choices[0].message.content);
  },

  renderCoachPlan(plan) {
    const today = Storage.todayKey();
    const completedLessons = Storage.get('coach_done_' + today, []);
    const totalMin = (plan.lessons || []).reduce((s, l) => s + (l.minutes || 0), 0);
    const doneCount = (plan.lessons || []).filter(l => completedLessons.includes(l.id)).length;
    const phaseColors = {
      foundation: '#58cc02', building: '#1cb0f6', sharpening: '#ffb84d',
      final: '#ff6f91', showtime: '#ce82ff'
    };
    const phaseColor = phaseColors[plan.phase] || '#ff6f91';

    const lessonsHtml = (plan.lessons || []).map((l, i) => {
      const done = completedLessons.includes(l.id);
      return `
        <div class="coach-lesson ${done ? 'coach-done' : ''}" onclick="Modules.coachLessonStart('${l.id}')">
          <div class="coach-lesson-num">${done ? '✓' : (i+1)}</div>
          <div class="coach-lesson-icon">${l.icon || '📚'}</div>
          <div class="coach-lesson-info">
            <div class="coach-lesson-title">${l.title || ''}</div>
            <div class="coach-lesson-why">${l.why || ''}</div>
          </div>
          <div class="coach-lesson-meta">
            <div class="coach-lesson-min">~${l.minutes || 5}m</div>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">🌟 TODAY'S COACH PLAN</div>
      <div class="coach-headline" style="border-color: ${phaseColor};">
        <div class="coach-phase" style="color: ${phaseColor};">${(plan.phase || 'building').toUpperCase()} PHASE · ${doneCount}/${(plan.lessons || []).length} done · ~${totalMin} min</div>
        <div class="coach-headline-text">${plan.headline || ''}</div>
        <div class="coach-reasoning">${plan.reasoning || ''}</div>
      </div>
      <div class="coach-lessons">
        ${lessonsHtml}
      </div>
      <button class="btn-primary btn-pink" onclick="Modules.coachStartFirst()">${doneCount === 0 ? "🚀 START FIRST LESSON" : doneCount === (plan.lessons || []).length ? '🌸 ALL DONE — REWARDS!' : '▶ CONTINUE NEXT LESSON'}</button>
      <button class="btn-secondary" onclick="Modules.coachRegenerate()">🔄 REGENERATE PLAN</button>
      <div style="font-size: 11px; color: var(--text-soft); text-align: center; font-weight: 700; margin-top: 6px;">
        AIが毎日あなたの状態を見て新しく作る · Tap each lesson to start
      </div>
    `;
  },

  coachStartFirst() {
    const today = Storage.todayKey();
    const plan = Storage.get('coach_plan_' + today, null);
    if (!plan || !plan.lessons || plan.lessons.length === 0) return;
    const done = Storage.get('coach_done_' + today, []);
    const next = plan.lessons.find(l => !done.includes(l.id));
    if (!next) {
      // 全完了！祝祭
      App.confetti(80);
      Storage.addXP(50);
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">🌟 PLAN COMPLETE</div>
        <div class="burst-card">
          <div class="burst-emoji">🌸</div>
          <div class="burst-title">All lessons done!</div>
          <div class="burst-msg">Today's Zacky moved one step closer to Jakarta.</div>
          <div style="margin-top: 12px;"><span class="xp-badge" style="font-size: 14px; padding: 6px 16px;">+50 XP bonus</span></div>
        </div>
        <button class="btn-primary btn-success" onclick="App.closeModal()">CLOSE 🔥</button>
      `;
      return;
    }
    this.coachLessonStart(next.id);
  },

  coachLessonStart(id) {
    // 完了マーク用にidを記録（モジュール側で完了したらmarkDoneも呼ばれる）
    window._coachActiveLesson = id;
    App.openModule(id);
  },

  // モジュール完了時にコーチプランの完了マークを付ける
  markCoachLessonDone(id) {
    if (!id) return;
    const today = Storage.todayKey();
    const done = Storage.get('coach_done_' + today, []);
    if (!done.includes(id)) {
      done.push(id);
      Storage.set('coach_done_' + today, done);
    }
  },

  coachRegenerate() {
    const today = Storage.todayKey();
    Storage.remove('coach_plan_' + today);
    Storage.set('coach_done_' + today, []);
    this.coachPlan();
  },

  // ===========================================
  // ✍️ Composition Trainer
  // お題 → 自分で英作文 → AI添削 → 書き直し
  // ===========================================
  compositionState: null,

  composition() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">✍️ COMPOSITION TRAINER</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY COMPOSITION</div>
        <div class="why-text">${PURPOSE.composition.why}</div>
        <div class="why-impact">${PURPOSE.composition.impact}</div>
      </div>
      <div style="font-size: 13px; color: var(--text-soft); font-weight: 800; margin-bottom: 12px; line-height: 1.6;">
        お題に対して英作文 → AIが文法・語彙・自然さを指摘 → 学んで書き直す → さらに磨く
      </div>
      <div class="label">DIFFICULTY</div>
      <div class="btn-row-3">
        <button class="speed-btn active" id="diff-easy" onclick="Modules.compositionPickLevel('easy')">EASY · 1文</button>
        <button class="speed-btn" id="diff-medium" onclick="Modules.compositionPickLevel('medium')">MEDIUM · 2-3文</button>
        <button class="speed-btn" id="diff-hard" onclick="Modules.compositionPickLevel('hard')">HARD · 段落</button>
      </div>
      <button class="btn-primary btn-pink" onclick="Modules.compositionStart()">🚀 START WITH RANDOM PROMPT</button>
      <button class="btn-secondary" onclick="Modules.compositionHistory()">📓 PAST ATTEMPTS</button>
    `;
    window._compLevel = 'easy';
  },

  compositionPickLevel(lvl) {
    window._compLevel = lvl;
    document.querySelectorAll('[id^=diff-]').forEach(b => b.classList.remove('active'));
    const el = document.getElementById('diff-' + lvl);
    if (el) el.classList.add('active');
  },

  compositionStart() {
    const lvl = window._compLevel || 'easy';
    const pool = COMPOSITION_PROMPTS.filter(p => p.level === lvl);
    const recent = Storage.get('comp_recent', []);
    const fresh = pool.filter(p => !recent.includes(p.situation));
    const candidates = fresh.length > 0 ? fresh : pool;
    const prompt = candidates[Math.floor(Math.random() * candidates.length)];
    Storage.set('comp_recent', [...recent, prompt.situation].slice(-6));
    this.compositionState = {
      prompt,
      attempt: 1,
      attempts: [],
      startedAt: new Date().toISOString()
    };
    this.compositionRender();
  },

  compositionRender() {
    if (!this.compositionState) return;
    const s = this.compositionState;
    const p = s.prompt;
    const lastAttempt = s.attempts[s.attempts.length - 1];
    const isFirstAttempt = s.attempts.length === 0;
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">✍️ COMPOSITION · ATTEMPT ${s.attempt}</div>
      <div class="comp-prompt-card">
        <div class="comp-prompt-label">📝 SITUATION</div>
        <div class="comp-prompt-text">${p.situation}</div>
        ${p.hint ? `<div class="comp-prompt-hint">💡 ${p.hint}</div>` : ''}
        <div class="comp-prompt-level">${p.level === 'easy' ? '🟢 EASY · 1 sentence' : p.level === 'medium' ? '🟡 MEDIUM · 2-3 sentences' : '🔴 HARD · paragraph'}</div>
      </div>
      ${!isFirstAttempt ? `
      <div class="why-card" style="background: linear-gradient(135deg, #ebffe0, #d4f0c0); border-color: var(--success);">
        <div class="why-label" style="color: var(--success-dark);">🔄 RETRY — APPLY WHAT YOU LEARNED</div>
        <div class="why-text">前回の指摘を反映して、もう一度書いてみよう。良くなっているはず。</div>
      </div>
      ` : ''}
      <div class="label">YOUR ENGLISH</div>
      <textarea id="compInput" rows="${p.level === 'easy' ? 3 : p.level === 'medium' ? 5 : 7}" placeholder="${isFirstAttempt ? 'Type your English here...' : 'Write your improved version...'}">${lastAttempt ? lastAttempt.userText : ''}</textarea>
      <div class="btn-row">
        <button class="btn-secondary" onclick="Modules.compositionVoiceInput()">🎙️ SPEAK INSTEAD</button>
        <button class="btn-secondary" onclick="document.getElementById('compInput').value=''">🗑 CLEAR</button>
      </div>
      <button class="btn-primary btn-pink" onclick="Modules.compositionSubmit()">✓ GET FEEDBACK</button>
      <div id="compFeedback"></div>
      <button class="btn-secondary" onclick="Modules.composition()">← BACK</button>
    `;
  },

  async compositionVoiceInput() {
    const input = document.getElementById('compInput');
    if (!input) return;
    if (Storage.hasApiKey()) {
      input.placeholder = '🎙️ Recording... tap STOP when done';
      try {
        await Speech.startRecording();
        const oldText = input.value;
        const btnArea = document.querySelector('button.btn-secondary[onclick*="compositionVoiceInput"]');
        if (btnArea) {
          btnArea.textContent = '⏹ STOP & TRANSCRIBE';
          btnArea.onclick = async () => {
            btnArea.textContent = '🤖 Transcribing...';
            btnArea.disabled = true;
            try {
              const data = await Speech.stopRecording();
              const text = await Speech.transcribeWithWhisper(data.blob, data.mime);
              input.value = (oldText ? oldText + ' ' : '') + text;
              input.placeholder = 'Type your English here...';
            } catch (e) {
              App.toast('Whisper failed: ' + e.message);
            }
            btnArea.textContent = '🎙️ SPEAK INSTEAD';
            btnArea.disabled = false;
            btnArea.onclick = () => Modules.compositionVoiceInput();
          };
        }
      } catch (e) {
        App.toast('Mic error: ' + e.message);
      }
      return;
    }
    Speech.startRecognition(
      (transcript) => {
        const oldText = input.value;
        input.value = (oldText ? oldText + ' ' : '') + transcript;
      },
      (err) => App.toast('Recognition error: ' + err)
    );
  },

  async compositionSubmit() {
    const input = document.getElementById('compInput');
    const text = input.value.trim();
    if (!text) { App.toast('Type something first'); return; }
    const fb = document.getElementById('compFeedback');
    if (!Storage.hasApiKey()) {
      fb.innerHTML = `
        <div class="api-card">
          <div class="api-status">⚙️ API KEY REQUIRED</div>
          <div style="font-size: 12px; color: var(--text); font-weight: 700; line-height: 1.5; margin-bottom: 10px;">
            AI添削にはOpenAI APIキーが必要です。AI Tutor画面で設定してください。<br>1回約 $0.001（コーヒー1杯/月）。
          </div>
          <button class="btn-primary btn-success" onclick="App.openModule('chatgpt-api')">⚙️ SET API KEY</button>
        </div>
      `;
      return;
    }
    fb.innerHTML = `
      <div style="text-align:center; padding: 18px;">
        <div style="font-size: 30px;">🤖</div>
        <div style="margin-top: 6px; color: var(--info); font-weight: 900;">AI is analyzing your writing...</div>
      </div>
    `;
    const s = this.compositionState;
    const sample = s.prompt.sample;
    const situation = s.prompt.situation;
    const previousAttempt = s.attempts.length > 0 ? s.attempts[s.attempts.length - 1].userText : null;

    const systemPrompt = `You are an English writing coach for Zacky, a Japanese businessman preparing for a luxury flower sales trip to Indonesia. He is at TOEIC 800+ level. The target audience for his English is high-net-worth Indonesian buyers (sophisticated, discerning).

Your job: analyze his writing for the given situation, then return STRICTLY VALID JSON in this exact shape:
{
  "score": 0-100 integer,
  "summary": "1 sentence overall in Japanese",
  "grammar": [
    { "issue": "what's wrong (English)", "fix": "corrected version", "explain_jp": "Japanese explanation" }
  ],
  "vocabulary": [
    { "weak": "the word he used", "better": "more elegant alternative", "reason_jp": "why it's better, in Japanese" }
  ],
  "naturalness_jp": "How a native would phrase it differently (Japanese)",
  "model_answer": "A polished native-level version — same meaning but better. Stay close to his intent.",
  "encouragement_jp": "1 specific praise for what he did well, in Japanese"
}

IMPORTANT:
- Be specific, not generic
- Limit grammar/vocabulary arrays to top 3 each
- Match the formality of HNWI Indonesian business context
- Output ONLY the JSON, no markdown fences, no extra text`;

    const userPrompt = `Situation (in Japanese): ${situation}

His writing (attempt #${s.attempt}):
"${text}"

${previousAttempt ? `(For reference, his previous attempt was: "${previousAttempt}")` : ''}

A reference model answer (do not copy directly, but use as quality bar): "${sample}"

Analyze and return JSON.`;

    try {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + Storage.getApiKey(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: _chatModel(),
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.4,
          response_format: { type: 'json_object' },
          max_tokens: 1000
        })
      });
      if (!r.ok) {
        fb.innerHTML = `<div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800;">API error: ${r.status}</div>`;
        return;
      }
      const data = await r.json();
      const result = JSON.parse(data.choices[0].message.content);
      s.attempts.push({ userText: text, feedback: result, ts: new Date().toISOString() });
      this.compositionRenderFeedback(result, text);
      Storage.recordEvent('composition_attempt');
      Storage.addXP(s.attempt === 1 ? 15 : 10);
      this.compositionSaveHistory();
    } catch (e) {
      fb.innerHTML = `<div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800;">Error: ${e.message}</div>`;
    }
  },

  compositionRenderFeedback(fb, userText) {
    const s = this.compositionState;
    const score = fb.score || 0;
    let scoreClass = '';
    if (score < 50) scoreClass = 'low';
    else if (score < 80) scoreClass = 'mid';
    let emoji = '🔥';
    if (score < 50) emoji = '💪';
    else if (score < 80) emoji = '👍';
    else if (score >= 95) emoji = '⭐';

    const grammarHtml = (fb.grammar || []).map(g => `
      <div class="comp-issue">
        <div class="comp-issue-original"><span class="comp-issue-label">❌</span> ${g.issue}</div>
        <div class="comp-issue-fix"><span class="comp-issue-label">✓</span> ${g.fix}</div>
        <div class="comp-issue-explain">💡 ${g.explain_jp}</div>
      </div>
    `).join('');

    const vocabHtml = (fb.vocabulary || []).map(v => `
      <div class="comp-issue">
        <div class="comp-issue-original"><span class="comp-issue-label">使った語</span> <b>${v.weak}</b></div>
        <div class="comp-issue-fix"><span class="comp-issue-label">より上品</span> <b>${v.better}</b></div>
        <div class="comp-issue-explain">💡 ${v.reason_jp}</div>
      </div>
    `).join('');

    const sample = s.prompt.sample;
    const sampleEsc = sample.replace(/`/g, "'");
    const modelEsc = (fb.model_answer || '').replace(/`/g, "'");

    document.getElementById('compFeedback').innerHTML = `
      <div class="comp-score-card" style="background: ${score >= 80 ? '#e8ffd9' : score >= 50 ? '#fff7e0' : '#ffe9e9'};">
        <div style="font-size: 30px;">${emoji}</div>
        <div class="diff-score ${scoreClass}">${score}</div>
        <div class="diff-score-label">COMPOSITION SCORE</div>
        <div class="comp-summary">${fb.summary || ''}</div>
      </div>

      <div class="lesson-jp" style="background: linear-gradient(135deg, #fff5d6, #ffe9a8); border-color: var(--accent);">
        <div class="lesson-label" style="color: var(--accent-dark);">🌸 GREAT JOB</div>
        <div class="lesson-text">${fb.encouragement_jp || ''}</div>
      </div>

      ${grammarHtml ? `
      <div class="section-title" style="margin: 16px 0 8px;">📖 GRAMMAR FIXES (${(fb.grammar || []).length})</div>
      ${grammarHtml}
      ` : ''}

      ${vocabHtml ? `
      <div class="section-title" style="margin: 16px 0 8px;">💎 BETTER VOCABULARY (${(fb.vocabulary || []).length})</div>
      ${vocabHtml}
      ` : ''}

      ${fb.naturalness_jp ? `
      <div class="lesson-grammar">
        <div class="lesson-label">🗣️ HOW A NATIVE WOULD SAY IT</div>
        <div class="lesson-text">${fb.naturalness_jp}</div>
      </div>
      ` : ''}

      <div class="section-title" style="margin: 16px 0 8px;">🎯 AI MODEL ANSWER</div>
      <div class="comp-model-card">
        <div class="comp-model-text">${fb.model_answer || ''}</div>
        <div style="display: flex; gap: 6px; margin-top: 8px;">
          <button class="example-speak" onclick="Speech.speak(\`${modelEsc}\`, 0.9)">🔊 LISTEN</button>
          <button class="example-speak" onclick="Shadowing.start(\`${modelEsc}\`, ${(fb.model_answer || '').length > 60 ? 2 : 1});">🎬 DRILL</button>
        </div>
      </div>

      <div class="section-title" style="margin: 16px 0 8px;">📚 REFERENCE SAMPLE</div>
      <div class="comp-sample-card">
        <div class="comp-model-text">${sample}</div>
        <button class="example-speak" style="margin-top: 8px;" onclick="Speech.speak(\`${sampleEsc}\`, 0.9)">🔊 LISTEN</button>
      </div>

      <div class="section-title" style="margin: 16px 0 8px;">💬 ASK THE AI</div>
      <div style="background: var(--bg-soft); border: 2px dashed var(--purple); border-radius: 12px; padding: 12px; margin-bottom: 10px;">
        <div style="font-size: 12px; color: var(--text-soft); font-weight: 800; margin-bottom: 8px;">この添削について深掘りしたい？「なぜこの語が良い？」「他の言い方は？」など自由に質問</div>
        <input type="text" id="compFollowupInput" placeholder="例: なぜ 'priced' のほうが 'expensive' より上品？" onkeydown="if(event.key==='Enter')Modules.compositionAskFollowup()">
        <button class="btn-secondary" onclick="Modules.compositionAskFollowup()">📨 ASK</button>
      </div>
      <div id="compFollowupArea"></div>

      <div style="margin-top: 16px;">
        <button class="btn-primary btn-pink" onclick="Modules.compositionRetry()">🔄 RETRY — WRITE BETTER VERSION</button>
        <button class="btn-primary btn-success" onclick="Modules.compositionFinish()">✓ FINISH (GOT IT)</button>
        <button class="btn-secondary" onclick="Modules.compositionStart()">🎲 NEW PROMPT</button>
      </div>
    `;
    setTimeout(() => {
      const el = document.getElementById('compFeedback');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  },

  // 添削への質問 — AIが対話的に答える
  async compositionAskFollowup() {
    const q = document.getElementById('compFollowupInput').value.trim();
    if (!q) { App.toast('質問を入力'); return; }
    const s = this.compositionState;
    if (!s || s.attempts.length === 0) return;
    const last = s.attempts[s.attempts.length - 1];
    const area = document.getElementById('compFollowupArea');
    document.getElementById('compFollowupInput').value = '';

    const qEl = document.createElement('div');
    qEl.className = 'chat-msg chat-user pop-in';
    qEl.style.maxWidth = '90%';
    qEl.textContent = q;
    area.appendChild(qEl);

    const aEl = document.createElement('div');
    aEl.className = 'chat-msg chat-coach pop-in';
    aEl.style.maxWidth = '90%';
    aEl.textContent = '...';
    area.appendChild(aEl);

    if (!Storage.hasApiKey()) {
      aEl.textContent = 'AI質問にはAPIキーが必要です';
      return;
    }
    try {
      const sysPrompt = `You are an English writing coach. The user wrote: "${last.userText}". You gave feedback: ${JSON.stringify(last.feedback)}. Answer the user's follow-up question in Japanese, concisely (2-4 sentences). If asked for alternatives, give 2-3 actual examples.`;
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + Storage.getApiKey(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: _chatModel(),
          messages: [
            { role: 'system', content: sysPrompt },
            { role: 'user', content: q }
          ],
          temperature: 0.5,
          max_tokens: 400
        })
      });
      const data = await r.json();
      aEl.innerHTML = data.choices[0].message.content.replace(/\n/g, '<br>');
      Storage.addXP(2);
    } catch (e) {
      aEl.textContent = 'Error: ' + e.message;
    }
  },

  compositionRetry() {
    if (!this.compositionState) return;
    this.compositionState.attempt += 1;
    this.compositionRender();
  },

  compositionFinish() {
    if (!this.compositionState) return;
    const s = this.compositionState;
    const finishBonus = 10;
    const totalXp = (s.attempts.length === 1 ? 15 : 15 + (s.attempts.length - 1) * 10) + finishBonus;
    Storage.addXP(finishBonus);
    App.confetti(40);
    Storage.markDone('composition');
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">✍️ COMPOSITION COMPLETE</div>
      <div class="burst-card">
        <div class="burst-emoji">🌸</div>
        <div class="burst-title">${s.attempts.length} ${s.attempts.length === 1 ? 'attempt' : 'attempts'}</div>
        <div class="burst-msg">Final score: ${s.attempts[s.attempts.length-1].feedback.score}<br>You wrote with your own words.</div>
        <div style="margin-top: 12px;"><span class="xp-badge" style="font-size: 14px; padding: 6px 16px;">+${totalXp} XP total</span></div>
      </div>
      <button class="btn-primary btn-pink" onclick="Modules.compositionStart()">🎲 ANOTHER PROMPT</button>
      <button class="btn-primary btn-success" onclick="App.closeModal()">DONE FOR NOW</button>
    `;
    this.compositionState = null;
  },

  compositionSaveHistory() {
    if (!this.compositionState) return;
    const hist = Storage.get('comp_history', []);
    const s = this.compositionState;
    const existing = hist.findIndex(h => h.startedAt === s.startedAt);
    const record = {
      situation: s.prompt.situation,
      level: s.prompt.level,
      attempts: s.attempts,
      startedAt: s.startedAt,
      lastAt: new Date().toISOString()
    };
    if (existing >= 0) hist[existing] = record;
    else hist.unshift(record);
    Storage.set('comp_history', hist.slice(0, 50));
  },

  compositionHistory() {
    const hist = Storage.get('comp_history', []);
    let html = `<div class="modal-title">📓 PAST COMPOSITION ATTEMPTS · ${hist.length}</div><button class="btn-secondary" onclick="Modules.composition()">← BACK</button>`;
    if (hist.length === 0) {
      html += `<div style="color:var(--text-soft); text-align:center; padding:40px 0; font-weight: 800;">No attempts yet. Start your first one!</div>`;
    } else {
      hist.forEach((h) => {
        const lastFb = h.attempts[h.attempts.length - 1];
        const score = lastFb && lastFb.feedback ? lastFb.feedback.score : '?';
        html += `
          <div class="diary-entry">
            <div class="diary-date">${h.lastAt.slice(0, 10)} · ${h.level.toUpperCase()} · Score ${score} · ${h.attempts.length} ${h.attempts.length === 1 ? 'try' : 'tries'}</div>
            <div class="diary-text"><b>${h.situation}</b><br><br>Your last: "${h.attempts[h.attempts.length-1].userText}"</div>
          </div>
        `;
      });
    }
    document.getElementById('modalBody').innerHTML = html;
  },

  // ===========================================
  // ☀️ 朝の一発スタート（Daily Flow）
  // タップ1回で「シャドー→発音チェック→メディア→日記」を連結
  // ===========================================
  dailyFlowState: null,

  dailyFlow() {
    // 既存進行中なら復帰、なければ初期化
    const today = Storage.todayKey();
    let saved = Storage.get('dailyFlow_' + today, null);
    if (!saved) {
      saved = { step: 0, startedAt: new Date().toISOString(), xpAccumulated: 0 };
      Storage.set('dailyFlow_' + today, saved);
    }
    this.dailyFlowState = saved;
    this.renderDailyFlow();
  },

  renderDailyFlow() {
    const steps = [
      { idx: 0, icon: '🪞', name: 'Declaration', desc: '今日のアイデンティティ宣言（10秒）', xp: 5 },
      { idx: 1, icon: '🎬', name: 'Shadowing Session', desc: '短文2 + 長文1（自動選択）', xp: 60 },
      { idx: 2, icon: '📊', name: 'Pronunciation Check', desc: '発音をチェック（録音→AI判定）', xp: 5 },
      { idx: 3, icon: '✍️', name: 'Composition', desc: '英作文 → AI添削 → 書き直し', xp: 25 },
      { idx: 4, icon: '🎧', name: "Today's Media", desc: '今日のおすすめポッドキャスト＆動画', xp: 15 },
      { idx: 5, icon: '📔', name: '3-Line Diary', desc: '今日の振り返り3行', xp: 15 },
    ];
    const s = this.dailyFlowState;
    const total = steps.length;
    const pct = Math.min(100, (s.step / total) * 100);
    const isComplete = s.step >= total;

    // 完了時：祝祭画面
    if (isComplete) {
      const totalXp = steps.reduce((sum, st) => sum + st.xp, 0);
      App.confetti(80);
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">DAILY FLOW COMPLETE</div>
        <div class="burst-card">
          <div class="burst-emoji">🌸</div>
          <div class="burst-title">Mission accomplished!</div>
          <div class="burst-msg">5 steps · all done · ${totalXp} total XP</div>
        </div>
        <div style="background: var(--bg-soft); border-radius: 14px; padding: 14px; margin: 12px 0; text-align: center;">
          <div style="font-size: 12px; color: var(--text-soft); font-weight: 900; letter-spacing: 1px; margin-bottom: 6px;">TODAY'S BUILDUP</div>
          <div style="font-size: 14px; color: var(--text); font-weight: 800; line-height: 1.6;">
            Today's Zacky is one step closer to Jakarta.<br>
            Your mouth, ear, and mind all moved forward.
          </div>
        </div>
        <button class="btn-primary btn-success" onclick="App.closeModal()">CLOSE 💪</button>
      `;
      return;
    }

    const stepsHtml = steps.map((st, i) => {
      const done = s.step > i;
      const current = s.step === i;
      return `
        <div class="flow-step ${done ? 'flow-done' : ''} ${current ? 'flow-current' : ''}">
          <div class="flow-icon">${done ? '✓' : st.icon}</div>
          <div class="flow-info">
            <div class="flow-name">${st.name}</div>
            <div class="flow-desc">${st.desc}</div>
          </div>
          <div class="flow-xp">+${st.xp} XP</div>
        </div>
      `;
    }).join('');

    const cur = steps[s.step];
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">☀️ DAILY FLOW · ${s.step}/${total}</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY DAILY FLOW</div>
        <div class="why-text">5ステップを連結。タップ1回で完了まで誘導。考える時間ゼロ、続けるだけでネイティブに近づく。</div>
        <div class="why-impact">→ 完全自動・迷いなし・最大効率</div>
      </div>
      <div class="progress-bar" style="height: 12px; margin-bottom: 14px;">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
      <div class="flow-steps">${stepsHtml}</div>
      <div class="flow-current-card">
        <div style="font-size: 11px; color: var(--text-soft); font-weight: 900; letter-spacing: 1px; margin-bottom: 6px;">UP NEXT</div>
        <div style="font-size: 18px; font-weight: 900; color: var(--text); margin-bottom: 4px;">${cur.icon} ${cur.name}</div>
        <div style="font-size: 13px; color: var(--text-soft); font-weight: 800; line-height: 1.5;">${cur.desc}</div>
      </div>
      <button class="btn-primary btn-pink" onclick="Modules.startDailyFlowStep(${s.step})">▶ START STEP ${s.step + 1}</button>
      <button class="btn-secondary" onclick="if(confirm('Reset today\\'s flow?')){Storage.set('dailyFlow_${Storage.todayKey()}', {step:0, startedAt: new Date().toISOString(), xpAccumulated:0}); Modules.dailyFlow();}">🔁 RESTART</button>
      <button class="btn-secondary" onclick="App.closeModal()">PAUSE FOR LATER</button>
    `;
  },

  // 各ステップを起動。完了時に自動でnext
  startDailyFlowStep(step) {
    // ステップごとの誘導：その機能を起動。完了時に dailyFlowAdvance() を呼ぶように
    window._inDailyFlow = true;
    window._dailyFlowStep = step;

    if (step === 0) {
      // Declaration — 完了でadvance
      const onDone = () => { this.dailyFlowAdvance(); };
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">☀️ STEP 1/6 · MORNING DECLARATION</div>
        <div class="why-card">
          <div class="why-label">🎯 WHY THIS</div>
          <div class="why-text">${PURPOSE.declaration.why}</div>
          <div class="why-impact">${PURPOSE.declaration.impact}</div>
        </div>
        <div class="declaration">"${DECLARATION}"</div>
        <button class="btn-primary" onclick="Speech.speak('${DECLARATION}', 0.85)">🔊 LISTEN</button>
        <button class="btn-primary btn-success" onclick="Storage.markDone('declaration'); Modules.dailyFlowAdvance(5);">✓ I DECLARED · NEXT →</button>
        <button class="btn-secondary" onclick="Modules.dailyFlow()">← BACK TO FLOW</button>
      `;
      setTimeout(() => Speech.speak(DECLARATION, 0.85), 400);
      return;
    }

    if (step === 1) {
      // Shadowing Session — 完了時に Shadowing.completeSession() で advance
      window._dailyFlowAfterShadow = true;
      Shadowing.startSession();
      return;
    }

    if (step === 2) {
      // Pronunciation Check — 自由発音チェック画面
      this.dailyFlowPronunciation();
      return;
    }

    if (step === 3) {
      // Composition — フロー専用：軽め（easy）でランダムプロンプト
      this.dailyFlowComposition();
      return;
    }

    if (step === 4) {
      // Today's Media
      this.dailyFlowMedia();
      return;
    }

    if (step === 5) {
      // Diary — 完了時にadvance
      this.dailyFlowDiary();
      return;
    }
  },

  // Daily Flow内のComposition：軽量版でランダム1問
  dailyFlowComposition() {
    const easyPool = COMPOSITION_PROMPTS.filter(p => p.level === 'easy');
    const prompt = easyPool[Math.floor(Math.random() * easyPool.length)];
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">☀️ STEP 4/6 · COMPOSITION</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">${PURPOSE.composition.why}</div>
        <div class="why-impact">${PURPOSE.composition.impact}</div>
      </div>
      <div class="comp-prompt-card">
        <div class="comp-prompt-label">📝 SITUATION</div>
        <div class="comp-prompt-text">${prompt.situation}</div>
        ${prompt.hint ? `<div class="comp-prompt-hint">💡 ${prompt.hint}</div>` : ''}
        <div class="comp-prompt-level">🟢 EASY · 1 sentence</div>
      </div>
      <div class="label">YOUR ENGLISH</div>
      <textarea id="dfCompInput" rows="3" placeholder="Type your English here..."></textarea>
      <div class="btn-row">
        <button class="btn-secondary" onclick="Modules.dailyFlowCompVoice()">🎙️ SPEAK</button>
        <button class="btn-secondary" onclick="document.getElementById('dfCompInput').value=''">🗑 CLEAR</button>
      </div>
      <button class="btn-primary btn-pink" onclick="Modules.dailyFlowCompSubmit()" data-prompt='${JSON.stringify({s: prompt.situation, p: prompt.sample}).replace(/'/g, "&#39;")}'>✓ GET FEEDBACK</button>
      <div id="dfCompFeedback"></div>
      <button class="btn-secondary" onclick="Modules.dailyFlowAdvance(0);">⏭ SKIP & NEXT →</button>
      <button class="btn-secondary" onclick="Modules.dailyFlow()">← BACK TO FLOW</button>
    `;
    window._dfCompPrompt = prompt;
  },

  async dailyFlowCompVoice() {
    const input = document.getElementById('dfCompInput');
    if (!input || !Storage.hasApiKey()) {
      // 簡易フォールバック
      Speech.startRecognition(
        (t) => { input.value = (input.value ? input.value + ' ' : '') + t; },
        (err) => App.toast('Recognition error: ' + err)
      );
      return;
    }
    try {
      await Speech.startRecording();
      const oldText = input.value;
      input.placeholder = '🎙️ Recording... tap voice button again to stop';
      const btnArea = document.querySelector('button[onclick*="dailyFlowCompVoice"]');
      if (btnArea) {
        btnArea.textContent = '⏹ STOP';
        btnArea.onclick = async () => {
          btnArea.textContent = '🤖 Transcribing...';
          btnArea.disabled = true;
          try {
            const data = await Speech.stopRecording();
            const text = await Speech.transcribeWithWhisper(data.blob, data.mime);
            input.value = (oldText ? oldText + ' ' : '') + text;
          } catch (e) { App.toast('Whisper failed'); }
          btnArea.textContent = '🎙️ SPEAK';
          btnArea.disabled = false;
          btnArea.onclick = () => Modules.dailyFlowCompVoice();
        };
      }
    } catch (e) {
      App.toast('Mic error');
    }
  },

  async dailyFlowCompSubmit() {
    const input = document.getElementById('dfCompInput');
    const text = input.value.trim();
    if (!text) { App.toast('Type something first'); return; }
    const fb = document.getElementById('dfCompFeedback');
    if (!Storage.hasApiKey()) {
      fb.innerHTML = `
        <div class="api-card">
          <div class="api-status">⚙️ API KEY REQUIRED</div>
          <div style="font-size: 12px; color: var(--text); font-weight: 700; line-height: 1.5; margin-bottom: 10px;">AI添削にはOpenAI APIキーが必要です。</div>
          <button class="btn-primary btn-success" onclick="App.openModule('chatgpt-api')">⚙️ SET API KEY</button>
        </div>
        <button class="btn-primary btn-success" onclick="Modules.dailyFlowAdvance(10);">✓ NEXT STEP →</button>
      `;
      return;
    }
    fb.innerHTML = `<div style="text-align:center; padding: 18px;"><div style="font-size: 30px;">🤖</div><div style="margin-top: 6px; color: var(--info); font-weight: 900;">Analyzing...</div></div>`;
    const prompt = window._dfCompPrompt;
    try {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + Storage.getApiKey(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: _chatModel(),
          messages: [
            { role: 'system', content: 'You are an English writing coach. Output JSON: {"score":int,"summary":"jp 1 sentence","grammar":[{"issue","fix","explain_jp"}],"vocabulary":[{"weak","better","reason_jp"}],"model_answer":"polished version"}. Be concise. Limit each array to 2 items.' },
            { role: 'user', content: `Situation: ${prompt.situation}\n\nWriting: "${text}"\n\nReference: "${prompt.sample}"` }
          ],
          temperature: 0.4,
          response_format: { type: 'json_object' },
          max_tokens: 600
        })
      });
      const data = await r.json();
      const result = JSON.parse(data.choices[0].message.content);
      Storage.recordEvent('composition_attempt');

      const grammarHtml = (result.grammar || []).map(g => `
        <div class="comp-issue">
          <div class="comp-issue-original"><span class="comp-issue-label">❌</span> ${g.issue}</div>
          <div class="comp-issue-fix"><span class="comp-issue-label">✓</span> ${g.fix}</div>
          <div class="comp-issue-explain">💡 ${g.explain_jp}</div>
        </div>
      `).join('');
      const vocabHtml = (result.vocabulary || []).map(v => `
        <div class="comp-issue">
          <div class="comp-issue-original"><span class="comp-issue-label">使った語</span> <b>${v.weak}</b></div>
          <div class="comp-issue-fix"><span class="comp-issue-label">より上品</span> <b>${v.better}</b></div>
          <div class="comp-issue-explain">💡 ${v.reason_jp}</div>
        </div>
      `).join('');

      fb.innerHTML = `
        <div class="comp-score-card" style="background: ${result.score >= 80 ? '#e8ffd9' : result.score >= 50 ? '#fff7e0' : '#ffe9e9'};">
          <div class="diff-score ${result.score < 50 ? 'low' : result.score < 80 ? 'mid' : ''}">${result.score}</div>
          <div class="diff-score-label">SCORE</div>
          <div class="comp-summary">${result.summary || ''}</div>
        </div>
        ${grammarHtml ? `<div class="section-title" style="margin: 14px 0 6px;">📖 GRAMMAR</div>${grammarHtml}` : ''}
        ${vocabHtml ? `<div class="section-title" style="margin: 14px 0 6px;">💎 VOCABULARY</div>${vocabHtml}` : ''}
        ${result.model_answer ? `
        <div class="section-title" style="margin: 14px 0 6px;">🎯 MODEL ANSWER</div>
        <div class="comp-model-card">
          <div class="comp-model-text">${result.model_answer}</div>
          <button class="example-speak" style="margin-top: 8px;" onclick="Speech.speak(\`${(result.model_answer || '').replace(/`/g,"'")}\`, 0.9)">🔊 LISTEN</button>
        </div>
        ` : ''}
        <button class="btn-primary btn-success" onclick="Modules.dailyFlowAdvance(25);">✓ GOT IT · NEXT STEP →</button>
      `;
    } catch (e) {
      fb.innerHTML = `<div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800;">Error: ${e.message}</div><button class="btn-primary btn-success" onclick="Modules.dailyFlowAdvance(10);">SKIP & NEXT →</button>`;
    }
  },

  dailyFlowAdvance(xp) {
    if (xp) Storage.addXP(xp);
    const today = Storage.todayKey();
    const s = Storage.get('dailyFlow_' + today, { step: 0 });
    s.step = (s.step || 0) + 1;
    Storage.set('dailyFlow_' + today, s);
    this.dailyFlowState = s;
    window._inDailyFlow = (s.step < 6);
    this.dailyFlow();
  },

  // フロー内のシャドーイング完了フック（Shadowing.completeSession内から呼ぶ）
  onDailyFlowShadowComplete() {
    if (!window._dailyFlowAfterShadow) return false;
    window._dailyFlowAfterShadow = false;
    setTimeout(() => this.dailyFlowAdvance(), 1500);
    return true;
  },

  dailyFlowPronunciation() {
    // フロー専用の発音チェック画面（自己紹介Hookを練習）
    const target = "Japan grows some of the most beautiful flowers in the world. I'm Zacky, and I'm here to change that.";
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">☀️ STEP 3/6 · PRONUNCIATION CHECK</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">${PURPOSE.pronunciation.why}</div>
        <div class="why-impact">${PURPOSE.pronunciation.impact}</div>
      </div>
      <div class="shadow-text">${target}</div>
      <div class="lesson-jp">
        <div class="lesson-label">🇯🇵 JAPANESE</div>
        <div class="lesson-text">日本は世界で最も美しい花の一部を育てています。私はザキ。それを変えるためにここに来ました。</div>
      </div>
      <button class="btn-primary" onclick="Speech.speak(\`${target.replace(/`/g,"'")}\`, 0.85)">🔊 LISTEN FIRST</button>
      <button class="btn-primary btn-pink" id="dfPronStartBtn">📊 CHECK MY PRONUNCIATION</button>
      <div id="dfPronArea"></div>
      <button class="btn-secondary" onclick="Modules.dailyFlowAdvance(5);">⏭ SKIP & NEXT →</button>
      <button class="btn-secondary" onclick="Modules.dailyFlow()">← BACK TO FLOW</button>
    `;
    document.getElementById('dfPronStartBtn').onclick = async () => {
      Speech.cancel();
      Speech.stopRecognition();
      await new Promise(r => setTimeout(r, 250));
      const area = document.getElementById('dfPronArea');
      if (Storage.hasApiKey()) {
        area.innerHTML = `
          <div style="text-align:center; padding: 18px; background: var(--bg-soft); border-radius: 14px; margin-bottom: 10px;">
            <div style="font-size: 40px; margin-bottom: 6px;">🎙️</div>
            <div style="color: var(--info); font-weight: 900; font-size: 14px;">RECORDING... READ THE SENTENCE</div>
          </div>
          <button class="btn-primary btn-danger" id="dfStopBtn">⏹ STOP & ANALYZE</button>
        `;
        try {
          await Speech.startRecording();
          document.getElementById('dfStopBtn').onclick = async () => {
            area.innerHTML = `<div style="text-align:center; padding: 18px;"><div style="font-size:30px;">🤖</div><div style="margin-top:6px; color:var(--info); font-weight:900;">Analyzing...</div></div>`;
            try {
              const data = await Speech.stopRecording();
              const transcript = await Speech.transcribeWithWhisper(data.blob, data.mime);
              const diff = Speech.computeDiff(target, transcript);
              Storage.recordEvent('pronunciation_check');
              Shadowing.renderDiff && Shadowing.renderDiff(transcript, diff);
              area.innerHTML = `
                <div style="background: ${diff.score >= 80 ? '#e8ffd9' : diff.score >= 50 ? '#fff7e0' : '#ffe9e9'}; border-radius: 16px; padding: 18px; margin-bottom: 10px; text-align: center;">
                  <div class="diff-score ${diff.score < 50 ? 'low' : diff.score < 80 ? 'mid' : ''}">${diff.score}</div>
                  <div class="diff-score-label">PRONUNCIATION SCORE</div>
                </div>
                <button class="btn-primary btn-success" onclick="Modules.dailyFlowAdvance(5);">✓ NEXT STEP →</button>
              `;
            } catch (e) {
              area.innerHTML = `<div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800;">Analysis failed: ${e.message}</div><button class="btn-primary btn-success" onclick="Modules.dailyFlowAdvance(5);">SKIP & NEXT →</button>`;
            }
          };
        } catch (e) {
          area.innerHTML = `<div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800;">Mic error. Please grant mic permission.</div><button class="btn-primary btn-success" onclick="Modules.dailyFlowAdvance(5);">SKIP & NEXT →</button>`;
        }
        return;
      }
      // Web Speech APIフォールバック
      area.innerHTML = `<div style="text-align:center; padding: 18px;"><div style="font-size:30px;">🎤</div><div style="margin-top:6px; color:var(--info); font-weight:900;">LISTENING...</div></div>`;
      Speech.startRecognition(
        (transcript) => {
          const diff = Speech.computeDiff(target, transcript);
          Storage.recordEvent('pronunciation_check');
          area.innerHTML = `
            <div style="background: ${diff.score >= 80 ? '#e8ffd9' : diff.score >= 50 ? '#fff7e0' : '#ffe9e9'}; border-radius: 16px; padding: 18px; margin-bottom: 10px; text-align: center;">
              <div class="diff-score ${diff.score < 50 ? 'low' : diff.score < 80 ? 'mid' : ''}">${diff.score}</div>
              <div class="diff-score-label">PRONUNCIATION SCORE</div>
            </div>
            <button class="btn-primary btn-success" onclick="Modules.dailyFlowAdvance(5);">✓ NEXT STEP →</button>
          `;
        },
        (err) => {
          area.innerHTML = `<div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800;">${err}</div><button class="btn-primary btn-success" onclick="Modules.dailyFlowAdvance(5);">SKIP & NEXT →</button>`;
        }
      );
    };
  },

  dailyFlowMedia() {
    const day = new Date().getDay();
    const media = DAILY_MEDIA[day];
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">☀️ STEP 5/6 · TODAY'S MEDIA</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">毎日違うテーマで自動推薦。あなたが教材を探す時間ゼロ。</div>
        <div class="why-impact">→ 完全自動・選ぶストレスなし</div>
      </div>
      <div class="media-card media-podcast">
        <div class="media-type">🎙️ PODCAST · ${media.podcast.duration}</div>
        <div class="media-title">${media.podcast.title}</div>
        <div class="media-listen"><span class="media-listen-label">📍 LISTEN:</span> ${media.podcast.listen}</div>
        <div class="media-why">${media.podcast.why}</div>
        <a href="${media.podcast.search || media.podcast.url}" target="_blank" class="btn-primary" style="text-decoration:none; text-align:center; display:block;">🔗 OPEN PODCAST</a>
      </div>
      <div class="media-card media-video">
        <div class="media-type">🎬 VIDEO · ${media.video.duration}</div>
        <div class="media-title">${media.video.title}</div>
        <div class="media-listen"><span class="media-listen-label">📍 WATCH:</span> ${media.video.watch}</div>
        <div class="media-why">${media.video.why}</div>
        <a href="${media.video.url}" target="_blank" class="btn-primary btn-pink" style="text-decoration:none; text-align:center; display:block;">🔗 OPEN VIDEO</a>
      </div>
      <button class="btn-primary btn-success" onclick="Storage.markDone('listen'); Modules.dailyFlowAdvance(15);">✓ I LISTENED · NEXT →</button>
      <button class="btn-secondary" onclick="Modules.dailyFlowAdvance(0);">⏭ SKIP & NEXT</button>
      <button class="btn-secondary" onclick="Modules.dailyFlow()">← BACK TO FLOW</button>
    `;
  },

  dailyFlowDiary() {
    const today = Storage.todayKey();
    const existing = Storage.get('diary_' + today, { a:'', b:'', c:'' });
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">☀️ STEP 6/6 · 3-LINE DIARY</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">${PURPOSE.diary.why}</div>
        <div class="why-impact">${PURPOSE.diary.impact}</div>
      </div>
      <div class="label">① WHAT I DID TODAY</div>
      <textarea id="df_a" placeholder="What I checked off...">${existing.a}</textarea>
      <div class="label">② WHAT WORKED · INSIGHT</div>
      <textarea id="df_b" placeholder="What clicked...">${existing.b}</textarea>
      <div class="label">③ TOMORROW'S FOCUS</div>
      <textarea id="df_c" placeholder="One thing to remember...">${existing.c}</textarea>
      <button class="btn-primary btn-success" onclick="Modules.dailyFlowSaveDiary()">✓ SAVE & FINISH FLOW 🌸</button>
      <button class="btn-secondary" onclick="Modules.dailyFlowAdvance(0);">⏭ SKIP & FINISH</button>
    `;
  },

  dailyFlowSaveDiary() {
    const today = Storage.todayKey();
    Storage.set('diary_' + today, {
      a: document.getElementById('df_a').value,
      b: document.getElementById('df_b').value,
      c: document.getElementById('df_c').value,
      ts: new Date().toISOString()
    });
    Storage.markDone('diary');
    this.dailyFlowAdvance(15);
  },

  // ===========================================
  // 🎙️ GPT-4o リアルタイム会話
  // ===========================================
  liveTalkState: null,

  // ===========================================
  // 🎯 WEAKNESS DRILL
  // 過去のCompositionでAIに繰り返し指摘されたミス・語彙をAIに抽出させ、ドリル化
  // ===========================================
  weaknessState: null,

  weaknessDrill() {
    if (!Storage.hasApiKey()) {
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">🎯 WEAKNESS DRILL</div>
        <div class="why-card">
          <div class="why-label">🎯 WHY THIS</div>
          <div class="why-text">過去のCompositionで何度もAIに指摘された「あなた特有の弱点」をAIに抽出させて、ピンポイントで叩き直すドリル。本番までに同じミスを2度としないために。</div>
          <div class="why-impact">→ 苦手の完全潰し</div>
        </div>
        <div class="api-card">
          <div class="api-status">⚙️ OPENAI API KEY REQUIRED</div>
          <button class="btn-primary btn-success" onclick="App.openModule('chatgpt-api')">⚙️ SET API KEY</button>
        </div>
      `;
      return;
    }
    const hist = Storage.get('comp_history', []);
    if (hist.length < 2) {
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">🎯 WEAKNESS DRILL</div>
        <div class="why-card">
          <div class="why-label">🎯 WHY THIS</div>
          <div class="why-text">過去のCompositionから「あなた特有の繰り返しミス」をAIが抽出し、専用ドリルにしてくれる機能。</div>
          <div class="why-impact">→ 自分専用の弱点ドリル</div>
        </div>
        <div style="text-align:center; padding: 40px 20px;">
          <div style="font-size: 50px; margin-bottom: 12px;">📝</div>
          <div style="font-size: 14px; color: var(--text); font-weight: 800; line-height: 1.6;">
            データがまだ少ないです（${hist.length} 回）。<br>
            <b>Composition</b> を3回以上やると、AIがあなたの弱点を抽出できるようになります。
          </div>
        </div>
        <button class="btn-primary btn-pink" onclick="App.openModule('composition')">✍️ DO COMPOSITION</button>
      `;
      return;
    }
    // キャッシュ確認
    const today = Storage.todayKey();
    const cached = Storage.get('weakness_' + today, null);
    if (cached) {
      this.renderWeaknessDrill(cached);
      return;
    }
    // 生成中表示
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">🎯 WEAKNESS DRILL</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">${PURPOSE.composition ? PURPOSE.composition.why : ''}</div>
      </div>
      <div style="text-align:center; padding: 30px 10px;">
        <div style="font-size: 40px; margin-bottom: 10px;">🤖</div>
        <div style="color: var(--info); font-weight: 900; font-size: 14px;">AI is analyzing your ${hist.length} past attempts...</div>
        <div style="color: var(--text-soft); font-size: 12px; margin-top: 8px; font-weight: 700;">Finding patterns in your mistakes...</div>
      </div>
    `;
    this.generateWeakness().then(weakness => {
      Storage.set('weakness_' + today, weakness);
      this.renderWeaknessDrill(weakness);
    }).catch(e => {
      console.error(e);
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">🎯 WEAKNESS DRILL</div>
        <div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800;">
          Error: ${e.message}
        </div>
        <button class="btn-primary" onclick="Modules.weaknessDrill()">🔁 RETRY</button>
      `;
    });
  },

  async generateWeakness() {
    const hist = Storage.get('comp_history', []).slice(0, 15); // 直近15件
    // AIに送るデータを整形
    const records = hist.map(h => ({
      situation: h.situation,
      level: h.level,
      attempts: h.attempts.map(a => ({
        text: a.userText,
        score: a.feedback && a.feedback.score,
        grammar: a.feedback && a.feedback.grammar,
        vocabulary: a.feedback && a.feedback.vocabulary
      }))
    }));

    const sys = `You are an English-learning data analyst. The user is Zacky, a Japanese businessman preparing for a luxury sales trip to Indonesia. Below are his past Composition attempts and the AI feedback he received.

Analyze them and find his TOP 3-5 RECURRING WEAKNESSES — patterns he makes repeatedly. Output STRICT JSON only:
{
  "summary_jp": "1 sentence Japanese overview of his weakness pattern",
  "weaknesses": [
    {
      "id": "short-slug-id",
      "title_jp": "短い日本語タイトル（10文字以内）",
      "description_jp": "なぜこれが弱点か、何を繰り返してるか（2-3文）",
      "drill_sentences": [
        "An English sentence that targets this weakness — must use the exact correct form",
        "Another targeted English sentence",
        "Third targeted English sentence"
      ],
      "rule_jp": "意識すべきルール（1-2行）"
    }
  ]
}

Rules:
- drill_sentences should be 8-15 words each, business-luxury context
- Pick weaknesses that appear MULTIPLE times across his history
- If history is small, infer likely weaknesses from limited data`;

    const user = JSON.stringify(records);

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + Storage.getApiKey(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: _chatModel(),
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: user }
        ],
        temperature: 0.4,
        response_format: { type: 'json_object' },
        max_tokens: 1800
      })
    });
    if (!r.ok) throw new Error('API: ' + r.status);
    const data = await r.json();
    return JSON.parse(data.choices[0].message.content);
  },

  renderWeaknessDrill(w) {
    const today = Storage.todayKey();
    const doneWeak = Storage.get('weakness_done_' + today, []);
    const list = (w.weaknesses || []).map((wk, i) => {
      const done = doneWeak.includes(wk.id);
      const sentences = (wk.drill_sentences || []).map(s => `
        <div class="comp-issue" style="background: var(--bg-soft);">
          <div style="font-size: 13px; font-weight: 800; color: var(--text); line-height: 1.5;">${s}</div>
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            <button class="example-speak" onclick="Speech.speak(\`${s.replace(/`/g,"'")}\`, 0.9)">🔊 LISTEN</button>
            <button class="example-speak" onclick="Shadowing.start(\`${s.replace(/`/g,"'")}\`, ${s.length > 60 ? 2 : 1});">🎬 DRILL</button>
          </div>
        </div>
      `).join('');
      return `
        <div class="weakness-card ${done ? 'weakness-done' : ''}">
          <div class="weakness-head">
            <span class="weakness-num">${done ? '✓' : (i+1)}</span>
            <span class="weakness-title">${wk.title_jp}</span>
          </div>
          <div class="weakness-desc">${wk.description_jp || ''}</div>
          <div class="weakness-rule">📌 <b>ルール:</b> ${wk.rule_jp || ''}</div>
          <div class="section-title" style="margin: 10px 0 6px;">PRACTICE SENTENCES</div>
          ${sentences}
          ${!done ? `<button class="btn-primary btn-success" style="margin-top: 8px;" onclick="Modules.weaknessMarkDone('${wk.id}')">✓ MARK MASTERED</button>` : ''}
        </div>
      `;
    }).join('');

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">🎯 YOUR WEAKNESSES · ${(w.weaknesses || []).length} found</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">${w.summary_jp || 'あなた特有のミスパターンをAIが抽出'}</div>
        <div class="why-impact">→ ${doneWeak.length}/${(w.weaknesses || []).length} mastered today</div>
      </div>
      ${list}
      <button class="btn-secondary" style="margin-top: 14px;" onclick="Modules.weaknessRegenerate()">🔄 REGENERATE FROM LATEST DATA</button>
    `;
  },

  weaknessMarkDone(id) {
    const today = Storage.todayKey();
    const done = Storage.get('weakness_done_' + today, []);
    if (!done.includes(id)) done.push(id);
    Storage.set('weakness_done_' + today, done);
    Storage.addXP(15);
    App.confetti(20);
    App.toast('+15 XP — Weakness mastered!');
    this.weaknessDrill(); // 再表示
  },

  weaknessRegenerate() {
    const today = Storage.todayKey();
    Storage.remove('weakness_' + today);
    Storage.set('weakness_done_' + today, []);
    this.weaknessDrill();
  },

  // ===========================================
  // ⚡ REALTIME VOICE — 完全双方向（gpt-4o-realtime-preview, WebRTC）
  // 話している途中でも割り込める、本物の電話レベル
  // ===========================================
  realtimeState: null,

  realtime() {
    if (!Storage.hasApiKey()) {
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">⚡ REALTIME VOICE</div>
        <div class="why-card">
          <div class="why-label">🎯 WHY REALTIME</div>
          <div class="why-text">本物の電話レベルの双方向会話。話している途中で割り込める、AIも自然に間を取る。300ms以下の遅延で実会話に最も近い体験。</div>
          <div class="why-impact">→ 商談本番のリアル・リハーサル</div>
        </div>
        <div class="api-card">
          <div class="api-status">⚙️ OPENAI API KEY REQUIRED</div>
          <button class="btn-primary btn-success" onclick="App.openModule('chatgpt-api')">⚙️ SET API KEY</button>
        </div>
      `;
      return;
    }

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">⚡ REALTIME VOICE · gpt-4o-realtime</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY THIS</div>
        <div class="why-text">マイクとスピーカーが繋がって、AIと電話のように話す。話している途中でAIが割り込んだり、あなたが割り込めたりする。実会話の最終練習。</div>
        <div class="why-impact">→ 本番の感覚を体で覚える</div>
      </div>

      <div class="label">PICK A SCENARIO</div>
      <div class="btn-row">
        <button class="btn-primary" onclick="Modules.realtimeStart('meeting')">🤝 MEETING</button>
        <button class="btn-primary btn-pink" onclick="Modules.realtimeStart('smalltalk')">💬 SMALL TALK</button>
      </div>
      <div class="btn-row">
        <button class="btn-secondary" onclick="Modules.realtimeStart('negotiation')">💸 NEGOTIATION</button>
        <button class="btn-secondary" onclick="Modules.realtimeStart('coach')">🎓 COACH</button>
      </div>

      <div id="realtimeStatus" class="live-status" style="margin-top:14px;">Pick a scenario to begin</div>
      <div class="chat-area" id="realtimeChatArea" style="min-height: 180px; max-height: 40vh;"></div>

      <button class="btn-primary btn-pink live-mic-btn" id="realtimeBtn" disabled style="opacity:0.5;">
        <span>⚡</span>
        <span>SCENARIO REQUIRED</span>
      </button>

      <div style="font-size: 11px; color: var(--text-soft); text-align: center; font-weight: 700; margin-top: 6px; line-height: 1.5;">
        Tap mic → AI listens & speaks continuously · Tap again to end.<br>
        <span style="color: var(--accent-dark);">⚠️ Cost: ~$0.06/min audio in + $0.24/min audio out</span>
      </div>
    `;
  },

  async realtimeStart(scenarioKey) {
    const status = document.getElementById('realtimeStatus');
    const area = document.getElementById('realtimeChatArea');
    const btn = document.getElementById('realtimeBtn');

    const prompts = this.liveTalkPrompts();
    const instructions = prompts[scenarioKey] || prompts.coach;
    const voiceCfg = Storage.get('ttsVoice', 'nova');
    const allowed = ['alloy','ash','ballad','coral','echo','sage','shimmer','verse'];
    const voice = allowed.includes(voiceCfg) ? voiceCfg : 'alloy';

    if (status) status.textContent = '🤖 Connecting...';

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      });

      const pc = new RTCPeerConnection();

      const audioEl = document.createElement('audio');
      audioEl.autoplay = true;
      pc.ontrack = (e) => { audioEl.srcObject = e.streams[0]; };

      localStream.getTracks().forEach(t => pc.addTrack(t, localStream));

      const dc = pc.createDataChannel('oai-events');
      dc.addEventListener('open', () => {
        dc.send(JSON.stringify({
          type: 'session.update',
          session: {
            instructions: instructions,
            voice: voice,
            input_audio_transcription: { model: 'whisper-1' },
            turn_detection: { type: 'server_vad', threshold: 0.5, prefix_padding_ms: 300, silence_duration_ms: 700 },
            modalities: ['text', 'audio']
          }
        }));
        dc.send(JSON.stringify({
          type: 'response.create',
          response: { modalities: ['text', 'audio'] }
        }));
      });

      let currentAiMsg = null;
      dc.addEventListener('message', (e) => {
        try {
          const ev = JSON.parse(e.data);
          if (ev.type === 'conversation.item.input_audio_transcription.completed') {
            const transcript = ev.transcript;
            if (transcript && area) {
              const div = document.createElement('div');
              div.className = 'chat-msg chat-user pop-in';
              div.textContent = transcript;
              area.appendChild(div);
              area.scrollTop = area.scrollHeight;
              Storage.recordEvent('live_talk_turn');
              Storage.addXP(8);
            }
          } else if (ev.type === 'response.audio_transcript.delta') {
            if (!currentAiMsg && area) {
              currentAiMsg = document.createElement('div');
              currentAiMsg.className = 'chat-msg chat-ai pop-in';
              currentAiMsg.textContent = '';
              area.appendChild(currentAiMsg);
            }
            if (currentAiMsg) {
              currentAiMsg.textContent += ev.delta || '';
              if (area) area.scrollTop = area.scrollHeight;
            }
          } else if (ev.type === 'response.audio_transcript.done') {
            currentAiMsg = null;
          } else if (ev.type === 'input_audio_buffer.speech_started') {
            const s = document.getElementById('realtimeStatus');
            if (s) s.textContent = '🔴 You speaking...';
          } else if (ev.type === 'input_audio_buffer.speech_stopped') {
            const s = document.getElementById('realtimeStatus');
            if (s) s.textContent = '🤖 AI thinking...';
          } else if (ev.type === 'response.done') {
            const s = document.getElementById('realtimeStatus');
            if (s) s.textContent = '🎙️ Your turn — just speak';
          } else if (ev.type === 'error') {
            console.error('Realtime error:', ev);
            const s = document.getElementById('realtimeStatus');
            if (s) s.textContent = '❌ ' + (ev.error && ev.error.message || 'Error');
          }
        } catch (err) { console.error(err); }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const model = 'gpt-4o-realtime-preview-2024-12-17';
      const r = await fetch(`https://api.openai.com/v1/realtime?model=${model}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Storage.getApiKey(),
          'Content-Type': 'application/sdp'
        },
        body: offer.sdp
      });
      if (!r.ok) {
        const errText = await r.text();
        throw new Error('SDP exchange failed: ' + r.status + ' ' + errText.slice(0, 200));
      }
      const answerSdp = await r.text();
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

      this.realtimeState = { pc, dc, localStream, audioEl, startedAt: Date.now() };

      if (status) status.textContent = '✅ Connected · ' + scenarioKey.toUpperCase() + ' · Start speaking';
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.innerHTML = '<span>⏹</span><span>END SESSION</span>';
        btn.classList.add('btn-danger');
        btn.classList.remove('btn-pink');
        btn.onclick = () => this.realtimeEnd();
      }
    } catch (e) {
      console.error(e);
      if (status) status.textContent = '❌ Failed: ' + e.message;
      App.toast('Realtime error');
    }
  },

  realtimeEnd() {
    if (!this.realtimeState) return;
    const { pc, dc, localStream, audioEl, startedAt } = this.realtimeState;
    try { if (dc) dc.close(); } catch(e){}
    try { if (pc) pc.close(); } catch(e){}
    try { if (localStream) localStream.getTracks().forEach(t => t.stop()); } catch(e){}
    try { if (audioEl) { audioEl.pause(); audioEl.srcObject = null; } } catch(e){}
    const durSec = Math.round((Date.now() - startedAt) / 1000);
    this.realtimeState = null;

    const xpGain = Math.max(10, Math.floor(durSec / 2));
    Storage.addXP(xpGain);
    const area = document.getElementById('realtimeChatArea');
    if (area) {
      area.innerHTML += `<div class="chat-msg chat-coach pop-in">📊 Session ended · ${Math.floor(durSec/60)}m ${durSec%60}s · +${xpGain} XP</div>`;
    }
    const btn = document.getElementById('realtimeBtn');
    if (btn) {
      btn.innerHTML = '<span>⚡</span><span>NEW SESSION</span>';
      btn.classList.remove('btn-danger');
      btn.classList.add('btn-pink');
      btn.onclick = () => this.realtime();
    }
    const status = document.getElementById('realtimeStatus');
    if (status) status.textContent = 'Session ended ✓';
  },

  // ===========================================
  // 🎙️ LIVE TALK v2 — 滑らか・ホールド型・自動応答・ストリーミング
  // ===========================================
  liveTalk(scenario) {
    if (!Storage.hasApiKey()) {
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-title">LIVE VOICE TALK</div>
        <div class="why-card">
          <div class="why-label">🎯 WHY LIVE TALK</div>
          <div class="why-text">本物の会話練習。マイクを押して話す→AIが自然な英語で返す。商談本番のリハーサル。</div>
          <div class="why-impact">→ 商談で詰まらない瞬発力</div>
        </div>
        <div class="api-card">
          <div class="api-status">⚙️ OPENAI API KEY REQUIRED</div>
          <div style="font-size: 12px; color: var(--text); font-weight: 700; line-height: 1.5; margin-bottom: 10px;">
            音声認識+応答+音声合成のフルスタックをOpenAIで動かします。
          </div>
          <button class="btn-primary btn-success" onclick="App.openModule('chatgpt-api')">⚙️ SET API KEY</button>
        </div>
      `;
      return;
    }
    if (scenario) {
      const prompts = this.liveTalkPrompts();
      Storage.set('live_chat_history', [{ role: 'system', content: prompts[scenario] }]);
    }
    const hist = Storage.get('live_chat_history', []);
    const filteredHist = hist.filter(m => m.role !== 'system');
    const chatHtml = filteredHist.length === 0
      ? `<div class="chat-msg chat-ai">👋 Hi Zacky. Pick a scenario or just hold the mic to start speaking.</div>`
      : filteredHist.map(m => `<div class="chat-msg chat-${m.role === 'user' ? 'user' : m.role === 'coach' ? 'coach' : 'ai'}">${m.content}</div>`).join('');
    const hasScenario = !!hist.find(m => m.role === 'system');

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">🎙️ LIVE VOICE TALK</div>
      ${!hasScenario ? `
      <div class="why-card">
        <div class="why-label">🎯 WHY LIVE TALK</div>
        <div class="why-text">押して話す→自動で文字起こし→AIが滑らかに応答→音声で返ってくる。会話の流れを止めない設計。</div>
        <div class="why-impact">→ 商談本番のリハーサル</div>
      </div>
      <div class="label">PICK A SCENARIO</div>
      <div class="btn-row">
        <button class="btn-primary" onclick="Modules.liveTalk('meeting')">🤝 MEETING</button>
        <button class="btn-primary btn-pink" onclick="Modules.liveTalk('smalltalk')">💬 SMALL TALK</button>
      </div>
      <div class="btn-row">
        <button class="btn-secondary" onclick="Modules.liveTalk('negotiation')">💸 NEGOTIATION</button>
        <button class="btn-secondary" onclick="Modules.liveTalk('coach')">🎓 ENGLISH COACH</button>
      </div>
      ` : `
      <div style="text-align: center; font-size: 11px; color: var(--text-soft); font-weight: 800; margin-bottom: 10px;">
        Scenario active · <a href="javascript:Storage.set('live_chat_history',[]); Modules.liveTalk();" style="color: var(--danger);">Change</a>
      </div>
      `}
      <div class="chat-area" id="liveChatArea" style="min-height: 200px; max-height: 45vh;">${chatHtml}</div>
      <div id="liveStatus" class="live-status">Ready when you are 🎙️</div>
      <button class="btn-primary btn-pink live-mic-btn" id="liveMicBtn">
        <span id="liveMicIcon">🎙️</span>
        <span id="liveMicText">HOLD TO TALK</span>
      </button>
      <div style="text-align: center; font-size: 11px; color: var(--text-soft); font-weight: 700; margin: 6px 0 10px;">
        Press &amp; hold to record · Release to send · Or tap to toggle
      </div>
      ${hasScenario ? `
      <div class="btn-row">
        <button class="btn-secondary" onclick="Modules.liveTalkAskCorrection()">📝 GIVE ME FEEDBACK</button>
        <button class="btn-secondary" onclick="Modules.liveTalkResetKeepScenario()">🗑 RESET CHAT</button>
      </div>
      ` : `<button class="btn-secondary" onclick="Storage.set('live_chat_history', []); Modules.liveTalk();">🗑 CLEAR CHAT</button>`}
    `;

    this.bindLiveTalkMic();

    if (scenario && hist.length === 1) {
      setTimeout(() => this.liveTalkAiInitiate(), 200);
    }
  },

  liveTalkPrompts() {
    return {
      meeting: "You are Mr. Tan, a 55-year-old Chinese-Indonesian luxury hotel chain owner in Jakarta. Sophisticated, skeptical of new vendors, but genuinely curious about quality. Speak natural conversational English with thoughtful pacing (use commas/dashes, never robotic). Keep each turn 2-3 sentences. Ask one probing question at a time. The user is Zacky, a Japanese man selling premium flowers from CAVIN.",
      smalltalk: "You are Ibu Sari, a warm 45-year-old Indonesian fashion entrepreneur and art collector. You're at a Jakarta carnival reception. Speak conversational English, be curious about Japan, ask follow-up questions. Each turn 2-3 sentences. The user is Zacky, a Japanese man you just met.",
      negotiation: "You are Pak Budi, a sharp Indonesian event producer who pushes hard on price. You speak fast, direct, business-like English. You'll counter every claim. Keep replies tight — 1-2 sentences. Test the user's ability to defend value without dropping price.",
      coach: "You are an elite English speaking coach for Zacky, a Japanese businessman preparing for a luxury sales trip to Indonesia (TOEIC 800+ level). Speak naturally and conversationally. After he speaks, briefly acknowledge what he said, then in 1 sentence give him ONE specific, actionable improvement (better word, more elegant phrasing, or rhythm). End with a follow-up question. Keep total reply under 3 sentences."
    };
  },

  liveTalkResetKeepScenario() {
    const hist = Storage.get('live_chat_history', []);
    const sys = hist.filter(m => m.role === 'system');
    Storage.set('live_chat_history', sys);
    this.liveTalk();
    if (sys.length > 0) setTimeout(() => this.liveTalkAiInitiate(), 200);
  },

  // hold-to-talk + tap-to-toggle 両対応
  bindLiveTalkMic() {
    const btn = document.getElementById('liveMicBtn');
    if (!btn) return;
    let recording = false;
    let pressedAt = 0;
    let waitingTapStop = false;

    const startRec = async () => {
      if (recording) return;
      Speech.cancel();
      await new Promise(r => setTimeout(r, 150));
      try {
        await Speech.startRecording();
        recording = true;
        btn.classList.add('recording');
        const ic = document.getElementById('liveMicIcon');
        const tx = document.getElementById('liveMicText');
        if (ic) ic.textContent = '🔴';
        if (tx) tx.textContent = 'RELEASE TO SEND';
        const st = document.getElementById('liveStatus');
        if (st) st.textContent = '🔴 Listening...';
      } catch (e) {
        App.toast('Mic error: ' + (e.message || e));
      }
    };
    const stopAndSend = async () => {
      if (!recording) return;
      recording = false;
      btn.classList.remove('recording');
      const ic = document.getElementById('liveMicIcon');
      const tx = document.getElementById('liveMicText');
      if (ic) ic.textContent = '⏳';
      if (tx) tx.textContent = 'PROCESSING';
      btn.disabled = true;
      await this.liveTalkProcess();
      btn.disabled = false;
      const ic2 = document.getElementById('liveMicIcon');
      const tx2 = document.getElementById('liveMicText');
      if (ic2) ic2.textContent = '🎙️';
      if (tx2) tx2.textContent = 'HOLD TO TALK';
    };

    const onDown = (e) => {
      e.preventDefault();
      if (waitingTapStop) {
        // タップモードで2回目のタップ
        waitingTapStop = false;
        stopAndSend();
        return;
      }
      pressedAt = Date.now();
      startRec();
    };
    const onUp = (e) => {
      e.preventDefault();
      if (waitingTapStop) return;
      const dur = Date.now() - pressedAt;
      if (dur < 350 && recording) {
        // 短すぎ＝タップとみなす。次タップで停止するモードへ
        waitingTapStop = true;
        const tx = document.getElementById('liveMicText');
        if (tx) tx.textContent = 'TAP AGAIN TO STOP';
      } else if (recording) {
        stopAndSend();
      }
    };

    btn.addEventListener('mousedown', onDown);
    btn.addEventListener('mouseup', onUp);
    btn.addEventListener('mouseleave', () => { if (recording && !waitingTapStop) stopAndSend(); });
    btn.addEventListener('touchstart', onDown, { passive: false });
    btn.addEventListener('touchend', onUp, { passive: false });
  },

  async liveTalkAiInitiate() {
    const hist = Storage.get('live_chat_history', []);
    if (hist.length !== 1) return;
    const status = document.getElementById('liveStatus');
    if (status) status.textContent = '🤖 Starting...';
    try {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + Storage.getApiKey(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: _chatModel(), messages: [...hist, { role: 'user', content: 'Begin the conversation. Greet me naturally as your character.' }], temperature: 0.8, max_tokens: 120 })
      });
      const data = await r.json();
      const reply = data.choices[0].message.content;
      hist.push({ role: 'assistant', content: reply });
      Storage.set('live_chat_history', hist);
      const area = document.getElementById('liveChatArea');
      if (area) {
        area.innerHTML += `<div class="chat-msg chat-ai pop-in">${reply}</div>`;
        area.scrollTop = area.scrollHeight;
      }
      if (status) status.textContent = '🔊 Speaking...';
      Speech.speak(reply, 1.0, () => {
        const s = document.getElementById('liveStatus');
        if (s) s.textContent = 'Your turn 🎙️';
      });
    } catch (e) {
      if (status) status.textContent = 'Error: ' + e.message;
    }
  },

  async liveTalkAiInitiate() {
    const hist = Storage.get('live_chat_history', []);
    if (hist.length !== 1) return;
    const status = document.getElementById('liveStatus');
    if (status) status.textContent = '🤖 Starting conversation...';
    try {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + Storage.getApiKey(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: _chatModel(), messages: [...hist, { role: 'user', content: 'Begin the scenario by greeting me first.' }], temperature: 0.7, max_tokens: 100 })
      });
      const data = await r.json();
      const reply = data.choices[0].message.content;
      hist.push({ role: 'assistant', content: reply });
      Storage.set('live_chat_history', hist);
      const area = document.getElementById('liveChatArea');
      if (area) area.innerHTML += `<div class="chat-msg chat-ai">${reply}</div>`;
      Speech.speak(reply, 0.95);
      if (status) status.textContent = '';
    } catch (e) {
      if (status) status.textContent = 'Error starting scenario';
    }
  },

  async liveTalkProcess() {
    const status = document.getElementById('liveStatus');
    const area = document.getElementById('liveChatArea');
    try {
      const data = await Speech.stopRecording();
      if (!data || !data.blob || data.blob.size < 800) {
        if (status) status.textContent = 'Too short — hold longer next time.';
        return;
      }
      if (status) status.textContent = '📝 Transcribing...';
      const transcript = await Speech.transcribeWithWhisper(data.blob, data.mime);
      if (!transcript || !transcript.trim()) {
        if (status) status.textContent = "Couldn't catch that. Try again.";
        return;
      }

      const hist = Storage.get('live_chat_history', []);
      hist.push({ role: 'user', content: transcript });
      Storage.set('live_chat_history', hist);
      if (area) {
        area.innerHTML += `<div class="chat-msg chat-user pop-in">${transcript}</div>`;
        area.scrollTop = area.scrollHeight;
      }

      // ストリーミング応答
      if (status) status.textContent = '🤖 Thinking...';
      const sysExists = hist.find(m => m.role === 'system');
      const messages = sysExists ? hist : [
        { role: 'system', content: 'You are a warm, articulate English conversation partner for Zacky, a Japanese businessman preparing for a luxury sales trip to Indonesia. Speak natural conversational English. Reply in 2-3 sentences, ending with a question to keep flowing.' },
        ...hist
      ];

      const aiMsgEl = document.createElement('div');
      aiMsgEl.className = 'chat-msg chat-ai pop-in';
      aiMsgEl.textContent = '...';
      if (area) {
        area.appendChild(aiMsgEl);
        area.scrollTop = area.scrollHeight;
      }

      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + Storage.getApiKey(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: _chatModel(),
          messages,
          temperature: 0.8,
          max_tokens: 200,
          stream: true
        })
      });

      if (!r.ok) {
        aiMsgEl.textContent = 'API error: ' + r.status;
        if (status) status.textContent = '';
        return;
      }

      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let fullReply = '';
      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === '[DONE]') continue;
          try {
            const obj = JSON.parse(payload);
            const delta = obj.choices && obj.choices[0] && obj.choices[0].delta && obj.choices[0].delta.content;
            if (delta) {
              fullReply += delta;
              aiMsgEl.textContent = fullReply;
              if (area) area.scrollTop = area.scrollHeight;
            }
          } catch (e) { /* ignore parse errors */ }
        }
      }

      hist.push({ role: 'assistant', content: fullReply });
      Storage.set('live_chat_history', hist);

      if (status) status.textContent = '🔊 Speaking...';
      Speech.speak(fullReply, 1.0, () => {
        const s = document.getElementById('liveStatus');
        if (s) s.textContent = 'Your turn 🎙️';
      });
      Storage.recordEvent('live_talk_turn');
      Storage.addXP(10);
    } catch (e) {
      console.error(e);
      if (status) status.textContent = 'Error: ' + e.message;
    }
  },

  // 会話途中のフィードバック要請
  async liveTalkAskCorrection() {
    const hist = Storage.get('live_chat_history', []);
    const userTurns = hist.filter(m => m.role === 'user').slice(-3);
    if (userTurns.length === 0) {
      App.toast('Say something first');
      return;
    }
    const status = document.getElementById('liveStatus');
    const area = document.getElementById('liveChatArea');
    if (status) status.textContent = '📝 Analyzing your last lines...';
    try {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + Storage.getApiKey(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: _chatModel(),
          messages: [
            { role: 'system', content: 'You are an English coach. The user just had a conversation. Review their last utterances. Reply in Japanese with: ①最も良かった点（1行） ②最も改善できる1点 — 必ず元の文と「より上品/自然な言い方」を併記 ③次に試すべき1フレーズ。簡潔に。' },
            { role: 'user', content: 'My last utterances:\n' + userTurns.map((m, i) => (i+1) + '. ' + m.content).join('\n') }
          ],
          temperature: 0.4,
          max_tokens: 350
        })
      });
      const data = await r.json();
      const fb = data.choices[0].message.content;
      if (area) {
        area.innerHTML += `<div class="chat-msg chat-coach pop-in">📝 <b>COACH</b><br>${fb.replace(/\n/g, '<br>')}</div>`;
        area.scrollTop = area.scrollHeight;
      }
      if (status) status.textContent = '';
      Storage.addXP(5);
    } catch (e) {
      if (status) status.textContent = 'Coach error: ' + e.message;
    }
  },

  // ===========================================
  // 📧 週次自動レポート（メール/Slack送信）
  // ===========================================
  reportSettings() {
    const email = localStorage.getItem('reportEmail') || '';
    const slack = localStorage.getItem('reportSlackWebhook') || '';
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">📧 WEEKLY REPORT SETTINGS</div>
      <div class="why-card">
        <div class="why-label">🎯 WHY AUTO REPORT</div>
        <div class="why-text">毎週月曜の朝に、先週の進捗が自動でメール/Slackに届く。自分で集計する手間ゼロ。</div>
        <div class="why-impact">→ 振り返りの自動化</div>
      </div>
      <div class="label">YOUR EMAIL (optional)</div>
      <input type="text" id="reportEmail" placeholder="you@example.com" value="${email}">
      <div style="font-size: 11px; color: var(--text-soft); font-weight: 700; margin-bottom: 10px;">月曜のレポート画面で「Send Email」を押すとメールが下書きされます。</div>
      <div class="label">SLACK WEBHOOK URL (optional)</div>
      <input type="text" id="reportSlack" placeholder="https://hooks.slack.com/services/..." value="${slack}">
      <div style="font-size: 11px; color: var(--text-soft); font-weight: 700; margin-bottom: 10px;">Slackで /apps → Incoming Webhooks → URLを発行してここに貼る。</div>
      <button class="btn-primary btn-success" onclick="Modules.saveReportSettings()">✓ SAVE</button>
      <button class="btn-primary" onclick="Modules.sendReportNow()">📤 SEND THIS WEEK'S REPORT NOW</button>
      <button class="btn-secondary" onclick="App.openModule('weekly-report')">📈 VIEW WEEKLY REPORT</button>
    `;
  },

  saveReportSettings() {
    const email = document.getElementById('reportEmail').value.trim();
    const slack = document.getElementById('reportSlack').value.trim();
    if (email) localStorage.setItem('reportEmail', email);
    else localStorage.removeItem('reportEmail');
    if (slack) localStorage.setItem('reportSlackWebhook', slack);
    else localStorage.removeItem('reportSlackWebhook');
    App.toast('Settings saved ✓');
  },

  buildReportText() {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      dates.push(`${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`);
    }
    const totalReps = dates.reduce((s, d) => s + Storage.getEvent('shadow_rep', d), 0);
    const totalFlash = dates.reduce((s, d) => s + Storage.getEvent('flash_done', d), 0);
    const totalReviews = dates.reduce((s, d) => s + Storage.getEvent('vocab_review', d), 0);
    const totalPron = dates.reduce((s, d) => s + Storage.getEvent('pronunciation_check', d), 0);
    const totalLive = dates.reduce((s, d) => s + Storage.getEvent('live_talk_turn', d), 0);
    const totalDoneDays = dates.filter(d => (Storage.get('done_' + d, []).length > 0)).length;
    const days = Storage.daysUntil(TARGET_DATE);
    const xp = Storage.getXP();
    const lv = Storage.getLevel();
    const streak = parseInt(localStorage.getItem('streak') || '0');
    return `
📊 CAVIN English — Weekly Report
${dates[0]} 〜 ${dates[6]}

🎯 TO JAKARTA: ${days >= 0 ? days + ' days' : 'COMPLETED ✓'}

📈 THIS WEEK
• Active days: ${totalDoneDays}/7
• Streak: 🔥 ${streak} days
• Level: LV ${lv} (${xp} XP)

💪 PRACTICE
• Shadowing reps: ${totalReps}
• Flash cards done: ${totalFlash}
• Vocabulary reviews: ${totalReviews}
• Pronunciation checks: ${totalPron}
• Live AI conversations: ${totalLive} turns

${totalDoneDays >= 6 ? '🔥 Iron week! You showed up.' :
  totalDoneDays >= 4 ? '👍 Solid week. Build on this.' :
  totalDoneDays >= 2 ? '💪 Some sparks. Push next week.' :
  '🌱 Fresh start. Tomorrow is yours.'}

— Sent from CAVIN English
    `.trim();
  },

  async sendReportNow() {
    const text = this.buildReportText();
    const email = localStorage.getItem('reportEmail');
    const slack = localStorage.getItem('reportSlackWebhook');
    if (!email && !slack) {
      App.toast('Set email or Slack first');
      return;
    }
    let sentChannels = [];

    if (email) {
      // mailto:でメール下書きを開く
      const subject = encodeURIComponent('CAVIN English Weekly Report — ' + Storage.todayKey());
      const body = encodeURIComponent(text);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      sentChannels.push('Email drafted');
    }

    if (slack) {
      try {
        await fetch(slack, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: text })
        });
        sentChannels.push('Slack sent');
      } catch (e) {
        sentChannels.push('Slack error');
      }
    }

    App.toast(sentChannels.join(' · '));
    localStorage.setItem('lastReportSent', Storage.todayKey());
  },

  // 月曜にレポートを自動表示（initで呼ぶ）
  checkAutoReport() {
    const today = new Date();
    if (today.getDay() !== 1) return; // 月曜のみ
    const lastReport = localStorage.getItem('lastReportShown');
    if (lastReport === Storage.todayKey()) return; // 今日既に表示済み
    // 表示
    setTimeout(() => {
      App.openModal();
      Modules.weeklyReport();
      localStorage.setItem('lastReportShown', Storage.todayKey());
    }, 1500);
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
          model: _chatModel(),
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
