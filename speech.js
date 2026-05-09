// =====================================================
// 音声合成（TTS）+ 録音 + 発音チェック（iOS互換）
// =====================================================
const Speech = {
  voices: [],
  preferredVoice: null,

  init() {
    if (!('speechSynthesis' in window)) return;
    const load = () => {
      this.voices = window.speechSynthesis.getVoices();
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
  // 環境検出
  // ====================================================
  isStandalone() {
    return (window.navigator.standalone === true) ||
           (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  },
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },
  hasMediaSupport() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  },
  hasSpeechRecognition() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  },

  // ====================================================
  // 音声認識（Web Speech API）— Safari/Chrome用
  // ====================================================
  recognition: null,
  isListening: false,

  startRecognition(onResult, onError) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      onError && onError('SpeechRecognition not supported in this browser. Try Safari or Chrome.');
      return false;
    }
    try {
      this.recognition = new SR();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.continuous = false;
      this.recognition.maxAlternatives = 3;

      this.recognition.onresult = (e) => {
        const result = e.results[0];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        this.isListening = false;
        onResult && onResult(transcript, confidence, result);
      };
      this.recognition.onerror = (e) => {
        this.isListening = false;
        let msg = e.error || 'unknown';
        if (msg === 'not-allowed') msg = 'Microphone permission denied. Please allow mic access.';
        else if (msg === 'no-speech') msg = 'No speech detected. Try speaking louder.';
        else if (msg === 'network') msg = 'Network error. Speech recognition needs internet.';
        else if (msg === 'service-not-allowed') msg = 'Service not allowed. If using Home Screen app, open in Safari instead.';
        onError && onError(msg);
      };
      this.recognition.onend = () => { this.isListening = false; };
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (e) {
      onError && onError(e.message || 'Failed to start recognition');
      return false;
    }
  },

  stopRecognition() {
    if (this.recognition && this.isListening) {
      try { this.recognition.stop(); } catch(e) {}
      this.isListening = false;
    }
  },

  // ====================================================
  // 録音（MediaRecorder）— iOS互換版
  // ====================================================
  mediaRecorder: null,
  audioChunks: [],
  audioStream: null,
  recordingMime: null,

  pickMime() {
    // iOSはaudio/webm非対応。audio/mp4 (m4a) が確実
    const candidates = [
      'audio/mp4',
      'audio/mp4;codecs=mp4a.40.2',
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      ''
    ];
    for (const m of candidates) {
      if (m === '') return ''; // ブラウザのデフォルトに任せる
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) {
        return m;
      }
    }
    return '';
  },

  async startRecording() {
    // 環境チェック
    if (!this.hasMediaSupport()) {
      throw new Error('NO_MEDIA_API');
    }
    if (!window.isSecureContext) {
      throw new Error('NOT_SECURE');
    }

    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      this.audioChunks = [];
      this.recordingMime = this.pickMime();
      const opts = this.recordingMime ? { mimeType: this.recordingMime } : {};
      this.mediaRecorder = new MediaRecorder(this.audioStream, opts);
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) this.audioChunks.push(e.data);
      };
      // 0.5秒ごとにデータを吐く（iOSでも安定）
      this.mediaRecorder.start(500);
      return true;
    } catch (e) {
      console.error('startRecording error:', e);
      this.audioStream = null;
      this.mediaRecorder = null;
      if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
        throw new Error('PERM_DENIED');
      }
      if (e.name === 'NotFoundError') {
        throw new Error('NO_MIC');
      }
      throw e;
    }
  },

  async stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) { resolve(null); return; }
      const finalize = () => {
        const type = this.recordingMime || 'audio/mp4';
        const blob = new Blob(this.audioChunks, { type });
        if (this.audioStream) {
          this.audioStream.getTracks().forEach(t => t.stop());
          this.audioStream = null;
        }
        const url = URL.createObjectURL(blob);
        this.mediaRecorder = null;
        resolve({ blob, url, mime: type });
      };
      if (this.mediaRecorder.state === 'inactive') { finalize(); return; }
      this.mediaRecorder.onstop = finalize;
      try { this.mediaRecorder.stop(); } catch(e) { finalize(); }
    });
  },

  // ====================================================
  // Whisper APIで録音→文字起こし（オプション、APIキーあれば）
  // ====================================================
  async transcribeWithWhisper(blob, mime) {
    if (typeof Storage === 'undefined' || !Storage.hasApiKey()) {
      throw new Error('NO_API_KEY');
    }
    const ext = (mime || '').includes('mp4') ? 'm4a' :
                (mime || '').includes('webm') ? 'webm' :
                (mime || '').includes('ogg') ? 'ogg' : 'm4a';
    const fd = new FormData();
    fd.append('file', blob, 'recording.' + ext);
    fd.append('model', 'whisper-1');
    fd.append('language', 'en');
    const r = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + Storage.getApiKey() },
      body: fd
    });
    if (!r.ok) {
      const t = await r.text();
      throw new Error('WHISPER_FAIL: ' + r.status);
    }
    const data = await r.json();
    return data.text || '';
  },

  // ====================================================
  // 発音差分計算
  // ====================================================
  computeDiff(target, spoken) {
    const tWords = this.tokenize(target);
    const sWords = this.tokenize(spoken);
    const result = [];
    const sUsed = new Set();

    tWords.forEach((tw) => {
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
    const extra = sWords.filter((_, i) => !sUsed.has(i));

    const correct = result.filter(r => r.status === 'correct').length;
    const partial = result.filter(r => r.status === 'partial').length;
    const score = Math.round(((correct + partial * 0.5) / Math.max(1, tWords.length)) * 100);

    return { result, extra, score };
  },

  tokenize(text) {
    return (text || '').toLowerCase()
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
