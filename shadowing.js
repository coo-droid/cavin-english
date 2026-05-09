// =====================================================
// シャドーイング（タイマー＋録音＋差分）
// =====================================================
const Shadowing = {
  state: null, // { text, level, target, current, autoNext, isRecording, recordingUrl }

  start(text, level) {
    const target = level === 1 ? 50 : 20;
    this.state = {
      text, level, target,
      current: 0,
      isRecording: false,
      lastRecordingUrl: null,
      autoMode: false
    };
    this.render();
  },

  // 1回再生→ユーザー音読→次へ
  async playRound() {
    if (!this.state) return;
    Speech.cancel();
    Speech.speak(this.state.text, 0.85, () => {
      // 再生終了後にUI更新（自動モードならカウント増やす）
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
    Storage.markDone('shadowing-hub');
    const target = this.state.target;
    this.state = null;
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">SHADOWING COMPLETE</div>
      <div style="text-align:center; padding: 30px 10px;">
        <div style="font-size:60px; margin-bottom:10px;">🎉</div>
        <div style="font-size:22px; color: var(--gold); margin-bottom: 8px;">${target} reps done</div>
        <div style="font-size:13px; color: var(--text-dim);">Streak preserved. Mind sharpened.</div>
      </div>
      <button class="btn-primary" onclick="App.closeModal()">CLOSE</button>
    `;
    App.toast('Shadowing complete ✓');
  },

  // 録音 → 再生 → 差分
  async recordOnce(buttonEl) {
    if (!this.state) return;
    if (this.state.isRecording) {
      // 停止
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

  // 発音差分チェック（音声認識）
  async checkPronunciation() {
    if (!this.state) return;
    const target = this.state.text;
    document.getElementById('diffArea').innerHTML = `
      <div style="text-align:center; color:var(--gold); padding:14px;">🎙️ Listening... speak now</div>
    `;
    const ok = Speech.startRecognition(
      (transcript, confidence) => {
        const diff = Speech.computeDiff(target, transcript);
        this.renderDiff(transcript, diff);
        Storage.recordEvent('pronunciation_check');
      },
      (err) => {
        document.getElementById('diffArea').innerHTML = `
          <div style="color:var(--red); text-align:center; padding:14px;">Error: ${err}<br><span style="font-size:11px;color:var(--text-dim);">Speech recognition may not be available in this browser.</span></div>
        `;
      }
    );
    if (!ok) {
      document.getElementById('diffArea').innerHTML = `
        <div style="color:var(--red); text-align:center; padding:14px;">Speech recognition not supported. Try Safari or Chrome.</div>
      `;
    }
  },

  renderDiff(transcript, diff) {
    const html = diff.result.map(r => {
      if (r.status === 'correct') return `<span class="diff-correct">${r.word}</span>`;
      if (r.status === 'partial') return `<span class="diff-correct" title="You said: ${r.spoken}">${r.word}</span>`;
      return `<span class="diff-missing">${r.word}</span>`;
    }).join(' ');
    const extraHtml = diff.extra.length
      ? `<div style="font-size:11px; color: var(--text-dim); margin-top:8px;">Extra: ${diff.extra.map(w=>`<span class="diff-wrong">${w}</span>`).join(' ')}</div>`
      : '';
    document.getElementById('diffArea').innerHTML = `
      <div class="diff-score">${diff.score}</div>
      <div class="diff-score-label">PRONUNCIATION SCORE</div>
      <div style="font-size:11px; color: var(--text-dim); margin-bottom: 6px;">YOU SAID:</div>
      <div class="diff-result" style="margin-bottom:8px; font-size: 13px; color: var(--text-dim);">${transcript}</div>
      <div style="font-size:11px; color: var(--text-dim); margin-bottom: 6px;">BREAKDOWN:</div>
      <div class="diff-result">${html}${extraHtml}</div>
      <div style="font-size:11px; color: var(--text-dim); margin-top:10px; line-height:1.6;">
        <span class="diff-correct">●</span> Correct &nbsp;
        <span class="diff-missing">●</span> Missing/Unclear
      </div>
    `;
  },

  render() {
    if (!this.state) return;
    const s = this.state;
    const pct = Math.min(100, (s.current / s.target) * 100);
    const recBtn = s.isRecording
      ? '<button class="btn-primary btn-danger" onclick="Shadowing.recordOnce(this)">⏹ STOP RECORDING</button>'
      : '<button class="btn-secondary" onclick="Shadowing.recordOnce(this)">🎙️ RECORD MY VOICE</button>';
    const playback = s.lastRecordingUrl
      ? `<audio controls src="${s.lastRecordingUrl}" style="width:100%;margin-bottom:10px;"></audio>`
      : '';
    const autoLabel = s.autoMode ? '⏸ AUTO ON' : '▶ AUTO OFF';
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">SHADOWING · ${s.level === 1 ? 'SHORT' : 'LONG'}</div>
      <div class="shadow-counter">${s.current} / ${s.target}</div>
      <div class="shadow-target">REPS DONE${s.isRecording ? '<span class="recording-indicator">REC</span>' : ''}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="shadow-text">${s.text}</div>
      <div class="btn-row">
        <button class="btn-primary" onclick="Shadowing.playRound()">🔊 LISTEN</button>
        <button class="btn-primary btn-success" onclick="Shadowing.next()">✓ NEXT REP</button>
      </div>
      <button class="btn-secondary" onclick="Shadowing.toggleAuto()">${autoLabel}</button>
      ${recBtn}
      ${playback}
      <button class="btn-secondary" onclick="Shadowing.checkPronunciation()">📊 CHECK PRONUNCIATION</button>
      <div id="diffArea"></div>
    `;
  }
};
