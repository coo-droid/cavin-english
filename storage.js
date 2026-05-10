// =====================================================
// LocalStorage 管理
// =====================================================
const Storage = {
  get(key, def) {
    try { return JSON.parse(localStorage.getItem(key)) ?? def; } catch { return def; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
  remove(key) { localStorage.removeItem(key); },
  todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
  },
  yesterdayKey() {
    const d = new Date(); d.setDate(d.getDate()-1);
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
  },

  // タスク完了
  markDone(scheduleKey) {
    const k = 'done_' + this.todayKey();
    const set = new Set(this.get(k, []));
    set.add(scheduleKey);
    this.set(k, Array.from(set));
    // Coach Planの完了マーク連動
    if (typeof Modules !== 'undefined' && Modules.markCoachLessonDone) {
      Modules.markCoachLessonDone(scheduleKey);
      if (window._coachActiveLesson === scheduleKey) window._coachActiveLesson = null;
    }
  },
  isDone(scheduleKey) {
    return this.get('done_' + this.todayKey(), []).includes(scheduleKey);
  },
  todayDoneCount() {
    return this.get('done_' + this.todayKey(), []).length;
  },

  // ストリーク
  updateStreak() {
    const today = this.todayKey();
    const lastActive = localStorage.getItem('lastActive');
    let streak = parseInt(localStorage.getItem('streak') || '0');
    if (lastActive === today) return streak;
    if (this.todayDoneCount() === 0) return streak;
    const yk = this.yesterdayKey();
    if (lastActive === yk) streak += 1;
    else streak = 1;
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastActive', today);
    return streak;
  },

  // ダッシュボード集計
  recordEvent(type) {
    // type: 'shadow_rep', 'flash_done', 'recording', 'vocab_review' etc.
    const k = 'events_' + this.todayKey();
    const events = this.get(k, {});
    events[type] = (events[type] || 0) + 1;
    this.set(k, events);
  },
  getEvent(type, date) {
    return (this.get('events_' + (date || this.todayKey()), {})[type] || 0);
  },

  // カウントダウン
  daysUntil(targetDateStr) {
    const target = new Date(targetDateStr + 'T00:00:00');
    const now = new Date();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff;
  },

  // XP管理
  addXP(amount) {
    const cur = parseInt(localStorage.getItem('totalXP') || '0', 10);
    const next = cur + amount;
    localStorage.setItem('totalXP', next);
    return next;
  },
  getXP() { return parseInt(localStorage.getItem('totalXP') || '0', 10); },
  getLevel() {
    // Lv1: 0, Lv2: 100, Lv3: 250, Lv4: 500, Lv5: 1000, Lv N: N*200
    const xp = this.getXP();
    if (xp < 100) return 1;
    if (xp < 250) return 2;
    if (xp < 500) return 3;
    if (xp < 1000) return 4;
    return 5 + Math.floor((xp - 1000) / 500);
  },
  getLevelProgress() {
    const xp = this.getXP();
    const thresholds = [0, 100, 250, 500, 1000];
    const lv = this.getLevel();
    let lo, hi;
    if (lv <= 4) { lo = thresholds[lv - 1]; hi = thresholds[lv]; }
    else { lo = 1000 + (lv - 5) * 500; hi = lo + 500; }
    return { current: xp - lo, total: hi - lo, percent: Math.round((xp - lo) / (hi - lo) * 100) };
  },

  // 累計集計
  totalEvent(type) {
    let total = 0;
    Object.keys(localStorage).filter(k => k.startsWith('events_')).forEach(k => {
      const e = this.get(k, {});
      total += e[type] || 0;
    });
    return total;
  },

  // アチーブメント
  getUnlocked() { return this.get('unlocked_achievements', []); },
  unlockAchievement(id) {
    const list = this.getUnlocked();
    if (list.includes(id)) return false;
    list.push(id);
    this.set('unlocked_achievements', list);
    return true;
  },
  checkNewAchievements() {
    if (typeof ACHIEVEMENTS === 'undefined') return [];
    const unlocked = this.getUnlocked();
    const newly = [];
    const streak = parseInt(localStorage.getItem('streak') || '0');
    const shadowTotal = this.totalEvent('shadow_rep');
    const pronTotal = this.totalEvent('pronunciation_check');
    const vocabTotal = (typeof Vocab !== 'undefined') ? Vocab.all().length : 0;
    ACHIEVEMENTS.forEach(a => {
      if (unlocked.includes(a.id)) return;
      let val = 0;
      if (a.type === 'streak') val = streak;
      else if (a.type === 'shadow_total') val = shadowTotal;
      else if (a.type === 'pron_total') val = pronTotal;
      else if (a.type === 'vocab_total') val = vocabTotal;
      if (val >= a.threshold) {
        this.unlockAchievement(a.id);
        newly.push(a);
      }
    });
    return newly;
  },

  // APIキー管理
  setApiKey(key) {
    if (key) localStorage.setItem('openai_api_key', key);
    else localStorage.removeItem('openai_api_key');
  },
  getApiKey() { return localStorage.getItem('openai_api_key') || ''; },
  hasApiKey() { return !!this.getApiKey(); }
};
