// =====================================================
// アプリ統括（ルーティング・初期化・UI更新）
// =====================================================
const App = {
  init() {
    Speech.init();
    Vocab.init();
    this.updateUI();
    setInterval(() => this.updateUI(), 30000);
    document.getElementById('modal').addEventListener('click', (e) => {
      if (e.target.id === 'modal') this.closeModal();
    });
    // Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js?v=10').catch(() => {});
    }
    // 起動時にアチーブメントチェック
    setTimeout(() => this.checkAchievements(), 800);
    // PWA + iOSマイク警告
    this.checkMicEnvironment();
    // 月曜自動レポート
    if (typeof Modules !== 'undefined' && Modules.checkAutoReport) Modules.checkAutoReport();
  },

  checkMicEnvironment() {
    const warning = document.getElementById('micWarning');
    if (!warning) return;
    // PWAホーム画面でiOSの場合、マイクが使えないことが多い
    if (Speech.isStandalone() && Speech.isIOS()) {
      // 既に警告閉じ済みなら出さない
      if (localStorage.getItem('micWarningDismissed') === '1') return;
      warning.style.display = 'block';
      warning.innerHTML = `
        <div style="background: linear-gradient(135deg, #fff7e0, #ffe9a8); border: 2px solid var(--accent); border-bottom-width: 3px; border-radius: 14px; padding: 12px 14px; margin-bottom: 14px; position: relative;">
          <div style="font-size: 11px; color: var(--accent-dark); font-weight: 900; letter-spacing: 1px; margin-bottom: 4px;">⚠️ MIC NOTICE</div>
          <div style="font-size: 12px; color: var(--text); font-weight: 800; line-height: 1.5;">
            録音と発音チェックは<b>Safariで開く</b>と動きます。ホーム画面アイコンからだとiOSが録音をブロックします。
          </div>
          <button onclick="localStorage.setItem('micWarningDismissed','1'); this.parentElement.parentElement.style.display='none';" style="margin-top: 8px; background: var(--accent); color: #fff; border: none; border-bottom: 2px solid var(--accent-shadow); padding: 6px 14px; border-radius: 8px; font-size: 11px; font-weight: 900; font-family: inherit;">OK, GOT IT</button>
        </div>
      `;
    }
  },

  toast(msg, type) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.background = type === 'xp' ? 'var(--accent)' :
                        type === 'fire' ? 'var(--danger)' :
                        'var(--success)';
    t.style.borderBottomColor = type === 'xp' ? 'var(--accent-shadow)' :
                                type === 'fire' ? 'var(--danger-shadow)' :
                                'var(--success-shadow)';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  },

  // XPポップアニメ（タップ位置から数字が浮き上がる）
  popXP(amount, x, y) {
    const el = document.createElement('div');
    el.className = 'xp-pop';
    el.textContent = `+${amount} XP`;
    el.style.left = (x || window.innerWidth / 2) + 'px';
    el.style.top = (y || window.innerHeight / 2) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },

  // 紙吹雪エフェクト
  confetti(count = 30) {
    const colors = ['#ff6f91', '#ffb84d', '#58cc02', '#1cb0f6', '#ce82ff', '#ffc800'];
    for (let i = 0; i < count; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.background = colors[i % colors.length];
      c.style.left = Math.random() * 100 + 'vw';
      c.style.animationDelay = (Math.random() * 0.6) + 's';
      c.style.animationDuration = (1.6 + Math.random() * 1.5) + 's';
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3500);
    }
    if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
  },

  // XP獲得（共通インターフェイス）
  awardXP(amount, evt) {
    const newTotal = Storage.addXP(amount);
    if (evt && evt.clientX) this.popXP(amount, evt.clientX, evt.clientY);
    this.toast(`+${amount} XP earned!`, 'xp');
    this.checkAchievements();
    this.updateUI();
  },

  // アチーブメントチェック→演出
  checkAchievements() {
    const newly = Storage.checkNewAchievements();
    newly.forEach((a, i) => {
      setTimeout(() => this.showAchievement(a), i * 1500);
    });
  },

  showAchievement(a) {
    this.confetti(40);
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-title">ACHIEVEMENT UNLOCKED</div>
      <div class="burst-card">
        <div class="burst-emoji">${a.icon}</div>
        <div class="burst-title">${a.title}</div>
        <div class="burst-msg">${a.msg}</div>
      </div>
      <button class="btn-primary btn-success" onclick="App.closeModal()">CONTINUE 💪</button>
    `;
    document.getElementById('modal').classList.add('active');
  },

  // 時間帯別の挨拶＆メッセージ
  getHeroContent() {
    const h = new Date().getHours();
    let bucket = 'morning', greeting = 'GOOD MORNING';
    if (h >= 5 && h < 11) { bucket = 'morning'; greeting = 'GOOD MORNING'; }
    else if (h >= 11 && h < 17) { bucket = 'noon'; greeting = 'GOOD AFTERNOON'; }
    else if (h >= 17 && h < 22) { bucket = 'evening'; greeting = 'GOOD EVENING'; }
    else { bucket = 'late'; greeting = 'STILL UP?'; }
    const msgs = HERO_MESSAGES[bucket];
    // 日付をシードにして1日中同じメッセージ
    const day = new Date().getDate();
    const msg = msgs[day % msgs.length];
    return { greeting, msg };
  },

  updateUI() {
    const d = new Date();
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    document.getElementById('dateLabel').textContent =
      `${d.getFullYear()}.${(d.getMonth()+1).toString().padStart(2,'0')}.${d.getDate().toString().padStart(2,'0')}  ·  ${dayNames[d.getDay()]}`;

    // ヒーローカード
    const hero = this.getHeroContent();
    document.getElementById('heroGreeting').textContent = hero.greeting;
    document.getElementById('heroMessage').textContent = hero.msg;

    const streak = Storage.updateStreak();
    document.getElementById('streakNum').textContent = streak;
    document.getElementById('todayCount').textContent = `${Storage.todayDoneCount()}/${SCHEDULE.length}`;
    document.getElementById('heroStreak').textContent = `🔥 ${streak}`;
    const xp = Storage.getXP();
    document.getElementById('heroXp').textContent = `⭐ ${xp} XP`;
    const lv = Storage.getLevel();
    document.getElementById('heroLevel').textContent = `LV ${lv}`;

    // レベルプログレスバー
    const lvProg = Storage.getLevelProgress();
    const lvLabel = document.getElementById('lvLabel');
    const lvDetail = document.getElementById('lvDetail');
    const lvProgress = document.getElementById('lvProgress');
    if (lvLabel) lvLabel.textContent = `LEVEL ${lv}`;
    if (lvDetail) lvDetail.textContent = `${lvProg.current} / ${lvProg.total} XP`;
    if (lvProgress) lvProgress.style.width = lvProg.percent + '%';

    // ストリークカードを連続日数で熱く
    const streakCard = document.getElementById('streakNum').closest('.stat-card');
    streakCard.classList.remove('streak-card-hot', 'streak-card-mega');
    if (streak >= 14) streakCard.classList.add('streak-card-mega');
    else if (streak >= 3) streakCard.classList.add('streak-card-hot');
    if (streak >= 3) {
      streakCard.querySelector('.stat-label').innerHTML = `<span class="streak-fire">🔥</span> STREAK`;
    } else {
      streakCard.querySelector('.stat-label').textContent = 'STREAK';
    }

    // カウントダウン
    const days = Storage.daysUntil(TARGET_DATE);
    document.getElementById('countdownNum').textContent = days >= 0 ? days : '✓';
    const cdCard = document.getElementById('countdownNum').closest('.stat-card');
    cdCard.classList.toggle('urgent', days >= 0 && days <= 7);

    // ストーリーバナー
    const due = Vocab.due().length;
    if (due > 0) {
      document.getElementById('storyBanner').style.display = 'flex';
      document.getElementById('storyCount').textContent = `${due} item${due>1?'s':''} waiting`;
    } else {
      document.getElementById('storyBanner').style.display = 'none';
    }

    // 「次にやるべき」
    const cur = d.getHours() * 60 + d.getMinutes();
    let displayItem = SCHEDULE.find(s => s.mins >= cur && !Storage.isDone(s.key));
    if (!displayItem) displayItem = SCHEDULE.find(s => !Storage.isDone(s.key)) || SCHEDULE[0];

    document.getElementById('nowTime').textContent = `${displayItem.time}  ·  ${displayItem.icon}  ${Storage.isDone(displayItem.key) ? 'COMPLETED' : 'NEXT UP'}`;
    document.getElementById('nowTitle').textContent = displayItem.name;
    document.getElementById('nowDesc').textContent = displayItem.desc;
    document.getElementById('nowBtn').onclick = () => this.openModule(displayItem.key);

    // スケジュール
    const list = document.getElementById('scheduleList');
    list.innerHTML = '';
    SCHEDULE.forEach(s => {
      const div = document.createElement('div');
      div.className = 'schedule-item';
      if (s.mins < cur && !Storage.isDone(s.key)) div.classList.add('past');
      if (Storage.isDone(s.key)) div.style.opacity = '0.55';
      if (Math.abs(s.mins - cur) < 30 && !Storage.isDone(s.key)) div.classList.add('now-active');
      div.innerHTML = `
        <span class="sch-time">${s.time}</span>
        <span class="sch-name">${s.icon} ${s.name}</span>
        <span class="sch-arrow">${Storage.isDone(s.key) ? '✓' : '›'}</span>
      `;
      div.onclick = () => this.openModule(s.key);
      list.appendChild(div);
    });
  },

  openModal(html) {
    if (html) document.getElementById('modalBody').innerHTML = html;
    document.getElementById('modal').classList.add('active');
    // モーダル中身にpop-inクラス
    setTimeout(() => {
      const c = document.querySelector('.modal-content');
      if (c) { c.classList.remove('pop-in'); void c.offsetWidth; c.classList.add('pop-in'); }
    }, 10);
  },

  closeModal() {
    document.getElementById('modal').classList.remove('active');
    Speech.cancel();
    if (Speech.mediaRecorder && Speech.mediaRecorder.state === 'recording') {
      Speech.stopRecording();
    }
    if (Shadowing.timerInterval) Shadowing.stopTimer();
    this.updateUI();
  },

  openModule(key, arg) {
    this.openModal();
    if (key.startsWith('vocab-list-')) {
      Modules.vocabList(key.replace('vocab-list-', ''));
      return;
    }
    if (key === 'vocab-list') { Modules.vocabList(); return; }
    if (key === 'vocab-detail') { Modules.vocabDetail(arg); return; }
    if (key === 'vocab-add') { Modules.vocabAdd(); return; }
    if (key === 'vocab-review') { Modules.vocabReview(); return; }
    if (key.startsWith('scene-detail-')) {
      Modules.sceneDetail(key.replace('scene-detail-', ''));
      return;
    }

    switch (key) {
      case 'declaration': Modules.declaration(); break;
      case 'hook': Modules.hook(); break;
      case 'flash-am': Modules.flash('am', 'MORNING FLASH'); break;
      case 'flash-noon': Modules.flash('noon', 'NOON FLASH'); break;
      case 'flash-pm': Modules.flash('pm', 'AFTERNOON FLASH'); break;
      case 'flash-night': Modules.flash('night', 'NIGHT FLASH'); break;
      case 'flash-random': Modules.flashRandom(); break;
      case 'phrase-today': Modules.phraseToday(); break;
      case 'shadowing-hub': Modules.shadowingHub(); break;
      case 'shadowing-active': break;
      case 'scenes': Modules.scenes(); break;
      case 'voice-roleplay': Modules.voiceRoleplay(); break;
      case 'dashboard': Modules.dashboard(); break;
      case 'story-mode': Modules.storyMode(); break;
      case 'listen': Modules.listen(); break;
      case 'listen-am': Modules.listen('am'); break;
      case 'listen-pm': Modules.listen('pm'); break;
      case 'shadowing-am': Modules.shadowingHub('am'); break;
      case 'shadowing-pm': Modules.shadowingHub('pm'); break;
      case 'roleplay': Modules.roleplay(); break;
      case 'diary': Modules.diary(); break;
      case 'emergency': Modules.emergency(); break;
      case 'history': Modules.history(); break;
      case 'timeline': Modules.timeline(); break;
      case 'weekly-report': Modules.weeklyReport(); break;
      case 'chatgpt-api': Modules.chatgptApi(); break;
      case 'daily-flow': Modules.dailyFlow(); break;
      case 'live-talk': Modules.liveTalk(); break;
      case 'report-settings': Modules.reportSettings(); break;
      case 'composition': Modules.composition(); break;
      default:
        document.getElementById('modalBody').innerHTML = `<div class="modal-title">COMING SOON</div><button class="btn-primary" onclick="App.closeModal()">CLOSE</button>`;
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
