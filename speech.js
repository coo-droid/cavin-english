// =====================================================
// 音声合成（TTS）と音声認識（STT）
// =====================================================
const Speech = {
  voices: [],
  preferredVoice: null,

  init() {
    if (!('speechSynthesis' in window)) return;
    const load = () => {
      this.voices = window.speechSynthesis.getVoices();
      // 優先順位：Daniel(英)、Alex、Samantha、その他英語
      const priorities = ['Daniel', 'Alex', 'Samantha', 'Karen', 'Tom', 'Fred'];
      for (const name of priorities) {
        const v = this.voices.find(v => v.name.includes(name));
        if (v) { this.preferredVoice = v; break; }
      }
      if (!this.preferredVoice) {
        this.preferredVoice = this.voices.find(v => v.lang.startsWith('en'));
      }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  },

  speak(text, rate = 0.9, onEnd = null) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    u.pitch = 1;
    if (this.preferredVoice) u.voice = this.preferredVoice;
    if (onEnd) u.onend = onEnd;
    window.speechSynthesis.speak(u);
    return u;
  },

  cancel() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  },

  // ====================================================
  // 音声認識（Speech Recognition）
  // ====================================================
  recognition: null,
  isListening: false,

  startRecognition(onResult, onError) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { onError && onError('Speech Recognition not supported'); return false; }
    this.recognition = new SR();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.continuous = false;
    this.recognition.maxAlternatives = 3;

    this.recognition.onresult = (e) => {
      const result = e.results[0];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;
      onResult && onResult(transcript, confidence, result);
    };
    this.recognition.onerror = (e) => {
      this.isListening = false;
      onError && onError(e.error);
    };
    this.recognition.onend = () => {
      this.isListening = false;
    };
    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch(e) { onError && onError(e.message); return false; }
  },

  stopRecognition() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  },

  // ====================================================
  // 録音（MediaRecorder）
  // ====================================================
  mediaRecorder: null,
  audioChunks: [],
  audioStream: null,

  async startRecording(onLevel) {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.audioStream);
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };
      this.mediaRecorder.start();

      // 音量レベル取得（オプション）
      if (onLevel && window.AudioContext) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(this.audioStream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          if (!this.mediaRecorder || this.mediaRecorder.state !== 'recording') return;
          analyser.getByteFrequencyData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i];
          const level = sum / data.length / 255;
          onLevel(level);
          requestAnimationFrame(tick);
        };
        tick();
      }
      return true;
    } catch(e) {
      console.error('Recording failed:', e);
      return false;
    }
  },

  async stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) { resolve(null); return; }
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
        if (this.audioStream) {
          this.audioStream.getTracks().forEach(t => t.stop());
          this.audioStream = null;
        }
        const url = URL.createObjectURL(blob);
        resolve({ blob, url });
      };
      this.mediaRecorder.stop();
    });
  },

  // ====================================================
  // 発音差分計算（実用版）
  // ====================================================
  // Levenshtein 距離ベース＋単語マッチで色分け
  computeDiff(target, spoken) {
    const tWords = this.tokenize(target);
    const sWords = this.tokenize(spoken);
    const result = [];
    const sUsed = new Set();

    // 各target単語について、最も近いspoken単語を探す
    tWords.forEach((tw, ti) => {
      let best = -1, bestDist = Infinity;
      sWords.forEach((sw, si) => {
        if (sUsed.has(si)) return;
        const d = this.editDist(tw, sw);
        if (d < bestDist) { bestDist = d; best = si; }
      });
      const threshold = Math.max(1, Math.floor(tw.length * 0.3));
      if (best >= 0 && bestDist <= threshold) {
        if (bestDist === 0) result.push({ word: tw, status: 'correct' });
        else result.push({ word: tw, status: 'partial', spoken: sWords[best] });
        sUsed.add(best);
      } else {
        result.push({ word: tw, status: 'missing' });
      }
    });
    // sUsedに入ってないspoken単語は余分
    const extra = sWords.filter((_, i) => !sUsed.has(i));

    // スコア計算（0-100）
    const correct = result.filter(r => r.status === 'correct').length;
    const partial = result.filter(r => r.status === 'partial').length;
    const score = Math.round(((correct + partial * 0.5) / Math.max(1, tWords.length)) * 100);

    return { result, extra, score };
  },

  tokenize(text) {
    return text.toLowerCase()
      .replace(/[.,!?;:'"()\u2018\u2019\u201c\u201d—–]/g, '')
      .split(/\s+/)
      .filter(Boolean);
  },

  editDist(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = new Array(n+1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = a[i-1] === b[j-1]
          ? prev[j-1]
          : 1 + Math.min(prev[j-1], prev[j], cur[j-1]);
      }
      prev = cur;
    }
    return prev[n];
  }
};
