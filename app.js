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
  },

  toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
  },

  updateUI() {
    const d = new Date();
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    document.getElementById('dateLabel').textContent =
      `${d.getFullYear()}.${(d.getMonth()+1).toString().padStart(2,'0')}.${d.getDate().toString().padStart(2,'0')}  ·  ${dayNames[d.getDay()]}`;

    document.getElementById('streakNum').textContent = Storage.updateStreak();
    document.getElementById('todayCount').textContent = `${Storage.todayDoneCount()}/11`;

    // カウントダウン
    const days = Storage.daysUntil(TARGET_DATE);
    document.getElementById('countdownNum').textContent = days >= 0 ? days : '✓';

    // ストーリーバナー
    const due = Vocab.due().length;
    if (due > 0) {
      document.getElementById('storyBanner').style.display = 'flex';
      document.getElementById('storyCount').textContent = `${due} item${due>1?'s':''} waiting`;
    } else {
      document.getElementById('storyBanner').style.display = 'none';
    }

    // 「次にやるべき」表示
    const cur = d.getHours() * 60 + d.getMinutes();
    let displayItem = SCHEDULE.find(s => s.mins >= cur && !Storage.isDone(s.key));
    if (!displayItem) displayItem = SCHEDULE.find(s => !Storage.isDone(s.key)) || SCHEDULE[0];

    document.getElementById('nowTime').textContent = `${displayItem.time}  ·  ${displayItem.icon}  ${Storage.isDone(displayItem.key) ? 'COMPLETED' : 'NEXT UP'}`;
    document.getElementById('nowTitle').textContent = displayItem.name;
    document.getElementById('nowDesc').textContent = displayItem.desc;
    document.getElementById('nowBtn').onclick = () => this.openModule(displayItem.key);

    // スケジュールリスト
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
  },

  closeModal() {
    document.getElementById('modal').classList.remove('active');
    Speech.cancel();
    if (Speech.mediaRecorder && Speech.mediaRecorder.state === 'recording') {
      Speech.stopRecording();
    }
  },

  openModule(key, arg) {
    this.openModal();
    // vocab-list-xxx 形式の対応
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
      case 'shadowing-active': /* シャドーイング進行中 */ break;
      case 'scenes': Modules.scenes(); break;
      case 'voice-roleplay': Modules.voiceRoleplay(); break;
      case 'dashboard': Modules.dashboard(); break;
      case 'story-mode': Modules.storyMode(); break;
      case 'listen': Modules.listen(); break;
      case 'roleplay': Modules.roleplay(); break;
      case 'diary': Modules.diary(); break;
      case 'emergency': Modules.emergency(); break;
      case 'history': Modules.history(); break;
      default:
        document.getElementById('modalBody').innerHTML = `<div class="modal-title">COMING SOON</div><button class="btn-primary" onclick="App.closeModal()">CLOSE</button>`;
    }
  }
};

// 起動
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
