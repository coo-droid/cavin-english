// =====================================================
// 語彙管理 + SM-2 忘却曲線アルゴリズム
// =====================================================
const Vocab = {
  KEY: 'vocab_db',

  // 初期化（初回のみINITIAL_VOCABを投入）
  init() {
    if (Storage.get(this.KEY, null) === null) {
      const items = INITIAL_VOCAB.map((v, i) => ({
        id: 'v' + i + '_' + Date.now(),
        type: v.type,
        en: v.en,
        jp: v.jp,
        examples: v.examples,
        // SM-2 パラメータ
        ef: 2.5,        // easiness factor
        interval: 0,    // 次回までの日数
        repetitions: 0, // 連続正解回数
        nextReview: null, // ISO日付
        addedAt: new Date().toISOString(),
        lastReviewed: null
      }));
      Storage.set(this.KEY, items);
    }
  },

  all() { return Storage.get(this.KEY, []); },
  save(items) { Storage.set(this.KEY, items); },

  add(item) {
    const items = this.all();
    items.unshift({
      id: 'v' + items.length + '_' + Date.now(),
      type: item.type || 'word',
      en: item.en,
      jp: item.jp || '',
      examples: item.examples || [],
      ef: 2.5,
      interval: 0,
      repetitions: 0,
      nextReview: null,
      addedAt: new Date().toISOString(),
      lastReviewed: null
    });
    this.save(items);
  },

  remove(id) {
    this.save(this.all().filter(v => v.id !== id));
  },

  getById(id) {
    return this.all().find(v => v.id === id);
  },

  // SM-2 アルゴリズム
  // quality: 0=完全に忘れた, 3=曖昧, 5=完全に覚えてた
  // 簡略版で 1=Forgot, 3=Hard, 5=Easy
  review(id, quality) {
    const items = this.all();
    const idx = items.findIndex(v => v.id === id);
    if (idx < 0) return;
    const item = items[idx];

    if (quality < 3) {
      // 忘れた → 最初からやり直し
      item.repetitions = 0;
      item.interval = 1;
    } else {
      item.repetitions += 1;
      if (item.repetitions === 1) item.interval = 1;
      else if (item.repetitions === 2) item.interval = 3;
      else item.interval = Math.round(item.interval * item.ef);
      // EF更新
      item.ef = Math.max(1.3, item.ef + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    }

    const next = new Date();
    next.setDate(next.getDate() + item.interval);
    item.nextReview = next.toISOString();
    item.lastReviewed = new Date().toISOString();

    items[idx] = item;
    this.save(items);
    Storage.recordEvent('vocab_review');
  },

  // 復習が必要なアイテム
  due() {
    const now = Date.now();
    return this.all().filter(v => {
      if (!v.nextReview) return true; // 未学習は常にdue
      return new Date(v.nextReview).getTime() <= now;
    });
  },

  dueSoon() {
    const now = Date.now();
    const tomorrow = now + 24 * 60 * 60 * 1000;
    return this.all().filter(v => {
      if (!v.nextReview) return false;
      const t = new Date(v.nextReview).getTime();
      return t > now && t <= tomorrow;
    });
  },

  newItems() {
    return this.all().filter(v => !v.nextReview);
  },

  // ステータス文字列（リスト表示用）
  status(v) {
    if (!v.nextReview) return { label: 'NEW', cls: 'new' };
    const now = Date.now();
    const t = new Date(v.nextReview).getTime();
    if (t <= now) return { label: 'DUE', cls: 'due' };
    const hours = (t - now) / (1000 * 60 * 60);
    if (hours < 24) return { label: 'SOON', cls: 'soon' };
    if (hours < 24 * 7) return { label: `${Math.ceil(hours / 24)}d`, cls: '' };
    return { label: `${Math.ceil(hours / 24 / 7)}w`, cls: '' };
  },

  filterByType(type) {
    if (type === 'all') return this.all();
    return this.all().filter(v => v.type === type);
  }
};
