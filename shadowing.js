// =====================================================
// シャドーイング（タイマー＋録音＋差分）
// =====================================================
const Shadowing = {
  state: null,
  timerInterval: null,

  start(text, level) {
    const target = level === 1 ? 50 : 20;
    this.state = {
      text, level, target,
      current: 0,
      isRecording: false,
      lastRecordingUrl: null,
      autoMode: false,
      timerRunning: false,
      timerStart: null,
      elapsedMs: 0
    };
    this.startTimer();
    this.render();
  },

  startTimer() {
    if (!this.state) return;
    this.state.timerRunning = true;
    this.state.timerStart = Date.now() - this.state.elapsedMs;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.state) { clearInterval(this.timerInterval); return; }
      this.state.elapsedMs = Date.now() - this.state.timerStart;
      const el = document.getElementById('shadowTimer');
      if (el) el.textContent = this.formatTime(this.state.elapsedMs);
    }, 200);
  },

  stopTimer() {
    if (this.state) this.state.timerRunning = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
  },

  formatTime(ms) {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2,'0')}`;
  },

  async playRound() {
    if (!this.state) return;
    Speech.cancel();
    Speech.speak(this.state.text, 0.85, () => {
      if (this.state && this.state.autoMode) {
        setTimeout(() => this.next(), 800);
      }
    });
  },

  next() {
    if (!this.state) return;
    this.state.current += 1;
    Storage.recordEvent('shadow_rep');
    if (this.state.current >= this.state.target) {
      this.complete();
      return;
    }
    this.render();
    if (this.state.autoMode) this.playRound();
  },

  toggleAuto() {
    if (!this.state) return;
    this.state.autoMode = !this.state.autoMode;
    this.render();
    if (this.state.autoMode) this.playRound();
    else Speech.cancel();
  },

  complete() {
    Speech.cancel();
    this.stopTimer();
    Storage.markDone('shadowing-hub');
    const target = this.state.target;
    const elapsed = this.formatTime(this.state.elapsedMs);
    this.state = null;
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">YOU DID IT!</div>
      <div class="mascot-success">🎉</div>
      <div style="text-align:center; padding: 10px;">
        <div style="font-size:32px; color: var(--success); margin-bottom: 6px; font-weight: 900;">${target} reps</div>
        <div style="font-size:14px; color: var(--text-soft); font-weight: 800;">in ${elapsed}</div>
        <div style="margin-top: 14px;"><span class="xp-badge">+${target * 2} XP</span></div>
      </div>
      <button class="btn-primary btn-success" onclick="App.closeModal()">AWESOME</button>
    `;
    App.toast('+' + (target * 2) + ' XP earned!');
  },

  async recordOnce() {
    if (!this.state) return;
    if (this.state.isRecording) {
      const data = await Speech.stopRecording();
      this.state.isRecording = false;
      this.state.lastRecordingUrl = data ? data.url : null;
      this.render();
    } else {
      const ok = await Speech.startRecording();
      if (!ok) { App.toast('Microphone denied'); return; }
      this.state.isRecording = true;
      this.render();
    }
  },

  async checkPronunciation() {
    if (!this.state) return;
    const target = this.state.text;
    const area = document.getElementById('diffArea');
    if (!area) return;
    area.innerHTML = `
      <div style="text-align:center; padding: 18px; background: var(--bg-soft); border-radius: 14px; margin-bottom: 10px;">
        <div style="font-size: 40px; margin-bottom: 6px;">🎤</div>
        <div style="color: var(--info); font-weight: 900; font-size: 14px;">LISTENING...</div>
        <div style="color: var(--text-soft); font-size: 12px; margin-top: 4px; font-weight: 700;">Read the sentence aloud now</div>
      </div>
    `;
    const ok = Speech.startRecognition(
      (transcript) => {
        const diff = Speech.computeDiff(target, transcript);
        this.renderDiff(transcript, diff);
        Storage.recordEvent('pronunciation_check');
      },
      (err) => {
        area.innerHTML = `
          <div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800; font-size:13px;">
            Recognition failed: ${err}<br>
            <span style="font-weight:700; color: var(--text-soft); font-size:11px;">Tip: works in Safari/Chrome with mic permission and internet.</span>
          </div>
        `;
      }
    );
    if (!ok) {
      area.innerHTML = `<div style="background:#ffe9e9; border:2px solid var(--danger); border-radius:14px; padding:14px; color:var(--danger-dark); font-weight:800;">Speech recognition not supported in this browser.</div>`;
    }
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
      'over': '"over" → 「<b>オウ</b>ヴァ」vを強く'
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

  render() {
    if (!this.state) return;
    const s = this.state;
    const pct = Math.min(100, (s.current / s.target) * 100);
    const recBtn = s.isRecording
      ? '<button class="btn-primary btn-danger" onclick="Shadowing.recordOnce()">⏹ STOP RECORDING</button>'
      : '<button class="btn-secondary" onclick="Shadowing.recordOnce()">🎙️ RECORD MY VOICE</button>';
    const playback = s.lastRecordingUrl
      ? `<audio controls src="${s.lastRecordingUrl}" style="width:100%;margin:8px 0 10px;border-radius:10px;"></audio>`
      : '';
    const autoLabel = s.autoMode ? '⏸ AUTO ON (tap to stop)' : '▶ AUTO MODE OFF';
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">SHADOWING · ${s.level === 1 ? 'SHORT (50×)' : 'LONG (20×)'}</div>
      <div class="timer-display"><span id="shadowTimer">${this.formatTime(s.elapsedMs)}</span></div>
      <div class="shadow-counter">${s.current} <span style="color: var(--text-dim); font-size: 36px;">/ ${s.target}</span></div>
      <div class="shadow-target">REPS DONE${s.isRecording ? '<span class="recording-indicator">REC</span>' : ''}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="shadow-text">${s.text}</div>
      <div class="btn-row">
        <button class="btn-primary" onclick="Shadowing.playRound()">🔊 LISTEN</button>
        <button class="btn-primary btn-success" onclick="Shadowing.next()">✓ NEXT REP</button>
      </div>
      <button class="btn-secondary ${s.autoMode ? 'btn-purple' : ''}" onclick="Shadowing.toggleAuto()">${autoLabel}</button>
      ${recBtn}
      ${playback}
      <button class="btn-primary btn-pink" onclick="Shadowing.checkPronunciation()">📊 CHECK MY PRONUNCIATION</button>
      <div id="diffArea"></div>
    `;
  },

  // カスタムテキストでスタート
  customStart() {
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">CUSTOM SHADOWING</div>
      <div style="font-size:13px; color: var(--text-soft); font-weight: 800; line-height:1.5; margin-bottom: 12px;">
        Type or paste any English sentence.<br>Short = 50× / Long = 20×
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
    this.start(text, level);
  }
};
