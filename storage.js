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
  }
};
