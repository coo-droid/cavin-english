// =====================================================
// データ：スケジュール・フラッシュ・フレーズ・シーン
// =====================================================

const TARGET_DATE = '2026-07-23'; // インドネシア商談日

const SCHEDULE = [
  { time: '06:30', mins: 390, key: 'declaration', icon: '🪞', name: 'Morning Declaration', desc: 'Identity reset in front of the mirror.' },
  { time: '06:45', mins: 405, key: 'hook',        icon: '🚿', name: 'Shower Hook',         desc: 'Recite self-intro hook 3 times.' },
  { time: '07:15', mins: 435, key: 'listen',      icon: '☕', name: 'Morning Podcast',     desc: 'Launch Monocle: The Entrepreneurs.' },
  { time: '08:00', mins: 480, key: 'shadowing-hub', icon: '🎧', name: 'Commute Shadowing', desc: 'Shadowing drill with target reps.' },
  { time: '10:00', mins: 600, key: 'flash-am',    icon: '🃏', name: 'Morning Flash',       desc: "Today's Q&A — morning slot." },
  { time: '12:00', mins: 720, key: 'flash-noon',  icon: '🃏', name: 'Noon Flash',          desc: "Today's Q&A — noon slot." },
  { time: '12:45', mins: 765, key: 'phrase-today',icon: '📝', name: "Today's Phrase",      desc: "Speak today's phrase aloud 3 times." },
  { time: '15:00', mins: 900, key: 'flash-pm',    icon: '🃏', name: 'Afternoon Flash',     desc: "Today's Q&A — afternoon slot." },
  { time: '18:00', mins: 1080,key: 'listen',      icon: '🚶', name: 'Evening Listen',      desc: 'Podcast on the way home.' },
  { time: '21:00', mins: 1260,key: 'shadowing-hub', icon: '🎬', name: 'Main Shadowing',    desc: '10-min focused practice + recording.' },
  { time: '22:00', mins: 1320,key: 'flash-night', icon: '🃏', name: 'Night Flash',         desc: 'Last Q&A before bed.' },
  { time: '22:10', mins: 1330,key: 'diary',       icon: '📔', name: '3-Line Diary',        desc: 'Reflect and sleep.' },
];

// 28枚フラッシュ（曜日 0:Sun ... 6:Sat）
const FLASH = {
  am: [
    { q: "How did you leave VC for this?", a: "Numbers stopped moving me. I wanted to do something my future children could touch." },
    { q: "How was your flight?", a: "Smooth, thank you. The warmth here caught me off guard in the best way." },
    { q: "Is this your first time in Indonesia?", a: "It is. And I've already promised myself it won't be the last." },
    { q: "How did you end up in flowers?", a: "I was a VC looking for what Japan has that the world needs. CAVIN gave me the answer." },
    { q: "What do you think of Jakarta?", a: "It holds tradition and ambition at once. Japan has lost some of that balance — I'm here to learn it back." },
    { q: "Are you the founder?", a: "Partner. I came from VC. I invested in CAVIN before I joined — I crossed the table." },
    { q: "How do you ensure quality?", a: "We hand-pick growers, inspect at three points, and control temperature throughout." },
  ],
  noon: [
    { q: "Are Dutch flowers better?", a: "Different philosophies. Dutch is volume. Japanese is seasonality, story, soul. We don't compete." },
    { q: "Tell me about CAVIN.", a: "We bring Japan's finest flowers to the world. Direct grower network plus FedEx partnership for fastest international delivery." },
    { q: "Why flowers?", a: "Japan grows some of the world's best flowers, but almost no one outside knows it. I'm changing that." },
    { q: "How fresh are the flowers?", a: "Cut in Japan in the morning, in your hands within 48 to 72 hours. Almost as fresh as if you'd picked them yourself." },
    { q: "Who are your customers?", a: "Luxury hotels, private clients who appreciate craft, and high-end event producers." },
    { q: "Won't flowers wilt in Indonesian heat?", a: "We control the cold chain end to end. With proper care, they last as long here as in Tokyo." },
    { q: "Can you do custom orders?", a: "Absolutely. Tell me the occasion and feeling — we design from there." },
  ],
  pm: [
    { q: "Have you worked with Indonesians before?", a: "We're at the very beginning here. The first partners we choose will define our brand in Indonesia." },
    { q: "That's expensive. Why?", a: "It's priced where it is because of what's behind it — generations of grower craft and a cold chain no one else has." },
    { q: "What makes CAVIN different?", a: "Three things — direct grower relationships, FedEx-speed delivery, and curation. Quality, not volume." },
    { q: "Can you do better on the price?", a: "I appreciate you asking. Pricing reflects quality. Let's find efficiency through a long-term partnership." },
    { q: "What's the minimum order?", a: "For one-time, we start from a base level. For partnerships, we tailor to your rhythm — weekly, monthly." },
    { q: "Show me your portfolio.", a: "Of course. Here's our look book — and I'll send a full version to you today." },
    { q: "How do payments work?", a: "50% on confirmation, 50% on delivery. Monthly billing for ongoing partnerships." },
  ],
  night: [
    { q: "One last thing?", a: "If someone in your circle would care about Japanese flowers, I'd be honored if you mentioned us." },
    { q: "What do you need from me?", a: "Your honesty. If this resonates, let's talk seriously. If not, tell me — I'd rather know now." },
    { q: "Why Indonesia?", a: "The grace, the warmth, the love of beauty here speaks the same language as Japanese flowers." },
    { q: "What's your long-term vision?", a: "Japan's flower industry globally recognized within ten years — like Japanese whisky became." },
    { q: "Why should I work with you specifically?", a: "You're not getting a salesperson. You're getting someone who left a comfortable career for this." },
    { q: "What does success look like for you?", a: "When someone in Jakarta gives a Japanese flower to someone they love — and the moment matters." },
    { q: "What's your dream for this trip?", a: "To find partners who believe in what we believe in. Not customers — co-founders of a new flower culture." },
  ]
};

const DAILY_PHRASE = [
  "Let's continue this conversation.",
  "What brings you here today?",
  "I'd love to hear the story behind that.",
  "Tell me more about that.",
  "What drew you to this work?",
  "That's fascinating — how did you start?",
  "What matters most to you about this?",
];

const DECLARATION = "I am someone who speaks English with the world.";

const HOOK = `Japan grows some of the most beautiful flowers in the world.
But almost no one outside Japan knows it.

I'm Zacky. And I'm here to change that.`;

const ROLEPLAY_PROMPTS = {
  meeting: `You are Mr. Tan, a 50-year-old Chinese-Indonesian luxury hotel owner in Jakarta. You're meeting Zacky for the first time at a fashion carnival. He sells premium Japanese flowers from CAVIN — a Japanese company with direct grower relationships and a FedEx partnership for international delivery.

Be skeptical but curious. You care about quality and exclusivity. You don't trust salespeople easily. Ask 5 business questions in English, one at a time. Wait for my answer between questions before asking the next. After all 5 questions, give honest feedback on my answers — what was strong, what could be sharper.

Stay in character throughout. Speak like a sophisticated businessman, not a chatbot.

Begin.`,
  smalltalk: `You are Ibu Sari, a 45-year-old Indonesian fashion entrepreneur and art collector based in Jakarta. You're at a fashion carnival reception, drinking water (you don't drink alcohol). You meet Zacky, a Japanese man who works with luxury flowers.

Engage in natural small talk in English — about Indonesia, Japan, fashion, beauty, life. Don't talk about flowers unless I bring it up. Ask thoughtful questions. Show interest in cultural differences. Be warm but observant.

Speak naturally, with occasional Indonesian English patterns. Limit each turn to 2-3 sentences. Wait for my response before continuing.

Begin by introducing yourself.`,
  negotiation: `You are Pak Budi, a successful Indonesian event producer who specializes in luxury weddings. You're interested in Zacky's Japanese flowers but you push hard on price. You'll try to negotiate down significantly — at least 30%.

Use realistic negotiation tactics: comparing to Dutch flowers, suggesting volume discounts, hinting at long-term contracts, expressing budget constraints. Test if Zacky can hold his ground while staying respectful.

Conduct this in English. Five exchanges minimum. Give feedback at the end on negotiation skill.

Begin.`
};

// シーン別フレーズ
const SCENES = {
  meeting: {
    name: '🤝 Business Meeting',
    phrases: [
      { en: "It's a pleasure to finally meet you in person.", jp: "ようやく直接お会いできて光栄です。" },
      { en: "Thank you for making time in your schedule.", jp: "お時間をいただきありがとうございます。" },
      { en: "I'd love to learn more about your business.", jp: "御社のビジネスをもっと知りたいです。" },
      { en: "What's your vision for the next five years?", jp: "今後5年のビジョンは？" },
      { en: "Let me think about that and get back to you.", jp: "考えて、改めてご連絡します。" },
      { en: "I appreciate your honesty.", jp: "正直に話してくれて感謝します。" },
      { en: "Could we explore a long-term partnership?", jp: "長期的なパートナーシップを検討できますか？" },
      { en: "Let's continue this conversation over dinner.", jp: "ディナーで続きを話しましょう。" },
      { en: "I'll send you a proposal tomorrow.", jp: "明日、提案書をお送りします。" },
      { en: "What would make this a yes for you?", jp: "何があれば、Yesと言えますか？" },
    ]
  },
  meal: {
    name: '🍽️ Meals & Dining',
    phrases: [
      { en: "What do you recommend?", jp: "おすすめは何ですか？" },
      { en: "I'd love to try something authentically Indonesian.", jp: "本場のインドネシア料理を試したいです。" },
      { en: "This is delicious — what's it called?", jp: "これは美味しい、何という料理ですか？" },
      { en: "Could you tell me more about this dish?", jp: "この料理についてもっと教えてください。" },
      { en: "I have no dietary restrictions, please order what you love.", jp: "食事制限はありません、お好きなものを。" },
      { en: "Let me get the bill this time.", jp: "今回は私が払わせてください。" },
      { en: "Thank you for such a generous evening.", jp: "素敵な夜をありがとうございます。" },
      { en: "I'd love to host you when you visit Tokyo.", jp: "東京に来られたら、ぜひ私が招待させてください。" },
      { en: "Cheers to new beginnings.", jp: "新しい始まりに乾杯。" },
      { en: "I'll definitely remember this meal.", jp: "この食事は絶対に忘れません。" },
    ]
  },
  smalltalk: {
    name: '💬 Small Talk',
    phrases: [
      { en: "How was your weekend?", jp: "週末はどうでしたか？" },
      { en: "Have you been to Japan?", jp: "日本に行かれたことはありますか？" },
      { en: "What part of Indonesia are you originally from?", jp: "もともとインドネシアのどちらのご出身ですか？" },
      { en: "Do you spend most of your time in Jakarta?", jp: "ほとんどジャカルタで過ごされていますか？" },
      { en: "What's your favorite spot in the city?", jp: "この街でお気に入りの場所は？" },
      { en: "How do you like to spend your free time?", jp: "休日はどう過ごされますか？" },
      { en: "Do you travel often for work?", jp: "仕事でよく旅行されますか？" },
      { en: "What's been on your mind lately?", jp: "最近気になっていることは？" },
      { en: "I'd love to hear about your family.", jp: "ご家族について聞かせてください。" },
      { en: "It's been wonderful talking with you.", jp: "お話しできて本当に嬉しかったです。" },
    ]
  },
  closing: {
    name: '🌙 Closing & Follow-up',
    phrases: [
      { en: "May I follow up with you next week?", jp: "来週ご連絡してもよろしいですか？" },
      { en: "I hope our paths cross again soon.", jp: "また近いうちにお会いできますように。" },
      { en: "I'll be in touch.", jp: "また連絡します。" },
      { en: "Thank you for an unforgettable evening.", jp: "忘れられない夜をありがとうございます。" },
      { en: "Please give my regards to your family.", jp: "ご家族によろしくお伝えください。" },
      { en: "Safe travels home.", jp: "お気をつけてお帰りください。" },
      { en: "I'll send you something we discussed.", jp: "お話ししたものをお送りします。" },
      { en: "Looking forward to our next chapter.", jp: "次のステップを楽しみにしています。" },
      { en: "Sampai jumpa, terima kasih banyak.", jp: "また会いましょう、本当にありがとうございました。（インドネシア語）" },
      { en: "Until next time.", jp: "また次回お会いしましょう。" },
    ]
  }
};

// シャドーイング教材（短文・長文）— 各文に「なぜこれを練習するか」のwhyを付与
const SHADOW_BANK = {
  short: [
    { text: "What brings you here today?", why: "初対面で相手を喋らせる魔法の一言。商談はこれで主導権を渡す。" },
    { text: "It's a pleasure to finally meet you.", why: "対面挨拶の品格。'finally'を入れると相手を立てられる。" },
    { text: "Tell me more about that.", why: "富裕層は自分の話を聞く人を信頼する。沈黙の代わりにこれ。" },
    { text: "I'd love to hear the story behind that.", why: "相手の物語を引き出す。商談を雑談から深い関係へ昇格させる。" },
    { text: "Thank you for making time.", why: "富裕層への敬意。会えたことそのものへの感謝で開く。" },
    { text: "What matters most to you?", why: "押し売りせず、相手のニーズを引き出す質問。" },
    { text: "May I ask a question?", why: "踏み込む前のワンクッション。失礼にならない。" },
    { text: "Let's continue this conversation.", why: "別れ際の定番。次に繋げる魔法のフレーズ。" },
    { text: "I'm Zacky, partner at CAVIN.", why: "自分の名前と立場を一息で言える練習。商談の最初の3秒。" },
    { text: "Japan grows the world's finest flowers.", why: "あなたのHookの核。これが言えなければ何も始まらない。" },
    { text: "Almost as fresh as if you picked them yourself.", why: "FedEx連携の強みを体感で伝える殺し文句。" },
    { text: "Nobody else can do this.", why: "断言する勇気を体に入れる。富裕層は自信ある人を信頼する。" },
    { text: "Quality, not volume.", why: "ラグジュアリーの哲学を一言で。あなたのスタンスが伝わる。" },
    { text: "Let me see what's possible.", why: "即決を避け、誠実さを示す。価格交渉での切り返し。" },
    { text: "I appreciate your honesty.", why: "相手の本音を歓迎する姿勢。信頼を一段深める。" },
    { text: "What would make this a yes for you?", why: "営業の超能力。相手の障害を聞き出して扉を開く。" },
    { text: "I'd rather know now.", why: "拒否を恐れない誠実さ。時間を尊重するプロの姿勢。" },
    { text: "Selamat pagi, terima kasih.", why: "現地語で開く敬意。インドネシア人富裕層に必ず効く。" },
    { text: "I came to find partners, not customers.", why: "売り手ではなくビジョン共有者として立つ。" },
    { text: "I'd love to send you something — no business attached.", why: "見返りなしの贈与。富裕層の心を最も動かす一言。" }
  ],
  long: [
    {
      text: "Japan grows some of the most beautiful flowers in the world. But almost no one outside Japan knows it. I'm Zacky, and I'm here to change that.",
      why: "あなたの3分自己紹介の最初の20秒。商談の運命を決めるHook。淀みなく言えるまで体に染み込ませる。"
    },
    {
      text: "We've built Japan's most direct grower-to-customer logistics network. Through our FedEx partnership, we deliver internationally as fast as we deliver within Japan.",
      why: "CAVINの差別化ポイント。なぜ高くても買う価値があるのかの根拠。これを淀みなく言えれば信頼が生まれる。"
    },
    {
      text: "Indonesia, to me, is one of the most exciting markets in the world. The energy here, the love of beauty, the way people celebrate life — it speaks the same language as Japanese flowers.",
      why: "「なぜインドネシアか」を聞かれた時の本命答え。お世辞でなく観察として語る練習。"
    },
    {
      text: "I'm not here to sell. I'm here to share. To meet people who appreciate craft, story, and quiet beauty — and to see if our worlds can grow together.",
      why: "売り込み感を消す決め台詞。富裕層が嫌う「営業臭」を消し去る。"
    },
    {
      text: "Quality, story, and craftsmanship are not luxuries. They're a way of living. That's what we offer — not just flowers, but a presence.",
      why: "値段の話を哲学に昇華させるフレーズ。価格交渉を価値の議論に切り替える。"
    },
    {
      text: "It's priced where it is because of what's behind it — generations of grower craft, the freshest flowers in the world, and the only international cold chain that can deliver them this fast.",
      why: "「高い」と言われた時の最強の答え。謝らず、説明する。これを言えれば値引き圧力に負けない。"
    },
    {
      text: "I belong to what we call Japan's lost generation — we grew up watching our country lose its confidence. Our role is to remind Japan, and the world, that Japan still has things worth bringing out.",
      why: "あなたの個人的な使命を語る決め台詞。これが言えると相手は応援したくなる。"
    },
    {
      text: "If this resonates, let's talk seriously about what a partnership could look like. If it doesn't, tell me — I'd rather know now. And if there's someone in your circle who would care, I'd be grateful for an introduction.",
      why: "クロージングの完成形。押し売りせず、紹介まで促す。商談の終わり方の理想形。"
    }
  ]
};

// 教材ごとの「なぜ」を引きやすくする検索関数
function getShadowWhy(text) {
  const all = [...SHADOW_BANK.short, ...SHADOW_BANK.long];
  const found = all.find(s => s.text === text);
  return found ? found.why : null;
}

// 初期語彙データ（30個）
const INITIAL_VOCAB = [
  // 単語
  { type: 'word', en: 'acquire', jp: '手に入れる、獲得する', examples: [
    { en: "He acquired a rare painting at the auction.", jp: "彼はオークションで珍しい絵を手に入れた。" },
    { en: "We acquired three new clients this month.", jp: "今月、3社の新規顧客を獲得した。" },
    { en: "It took years to acquire this skill.", jp: "このスキルを身につけるのに何年もかかった。" }
  ]},
  { type: 'word', en: 'discerning', jp: '審美眼のある、目の肥えた', examples: [
    { en: "She's a discerning collector of Japanese art.", jp: "彼女は目の肥えた日本美術コレクターだ。" },
    { en: "Our flowers appeal to discerning clients.", jp: "我々の花は目の肥えた顧客に響く。" },
    { en: "He has a discerning eye for quality.", jp: "彼は品質を見抜く眼を持っている。" }
  ]},
  { type: 'word', en: 'exquisite', jp: '極上の、絶妙な', examples: [
    { en: "The arrangement was simply exquisite.", jp: "そのアレンジは実に絶妙だった。" },
    { en: "She wore an exquisite silk kimono.", jp: "彼女は極上のシルクの着物を着ていた。" },
    { en: "This is exquisite craftsmanship.", jp: "これは極上の職人技だ。" }
  ]},
  { type: 'word', en: 'craftsmanship', jp: '職人技、巧みな技術', examples: [
    { en: "The craftsmanship is unmatched.", jp: "その職人技は比類ない。" },
    { en: "Japanese craftsmanship is world-renowned.", jp: "日本の職人技は世界的に有名だ。" },
    { en: "You can feel the craftsmanship in every piece.", jp: "一品一品に職人技を感じる。" }
  ]},
  { type: 'word', en: 'heritage', jp: '遺産、伝統', examples: [
    { en: "These growers preserve a centuries-old heritage.", jp: "これらの生産者は何世紀もの伝統を守っている。" },
    { en: "Bali has a rich cultural heritage.", jp: "バリは豊かな文化遺産を持つ。" },
    { en: "Our heritage is what defines us.", jp: "私たちの伝統が私たちを形作る。" }
  ]},
  { type: 'word', en: 'curation', jp: 'キュレーション、選定', examples: [
    { en: "Our curation is what makes us different.", jp: "我々のキュレーションが差別化要因だ。" },
    { en: "She handles the curation of all events.", jp: "彼女が全イベントのキュレーションを担当する。" },
    { en: "Good curation respects the audience.", jp: "良いキュレーションは観客を尊重する。" }
  ]},
  { type: 'word', en: 'resonates', jp: '響く、共鳴する', examples: [
    { en: "If this resonates with you, let's talk.", jp: "これが響くなら、話しましょう。" },
    { en: "Her message resonates with young people.", jp: "彼女のメッセージは若者に響く。" },
    { en: "The story resonates across cultures.", jp: "その物語は文化を越えて響く。" }
  ]},
  { type: 'word', en: 'bespoke', jp: 'オーダーメイドの、特注の', examples: [
    { en: "We offer bespoke arrangements for each client.", jp: "顧客ごとにオーダーメイドのアレンジを提供する。" },
    { en: "He wore a bespoke suit from Savile Row.", jp: "彼はサヴィル・ロウのオーダースーツを着ていた。" },
    { en: "Bespoke service requires deep listening.", jp: "オーダーメイドのサービスには深い傾聴が要る。" }
  ]},
  { type: 'word', en: 'refined', jp: '洗練された、上品な', examples: [
    { en: "She has refined taste in art.", jp: "彼女は洗練された芸術の趣味を持つ。" },
    { en: "Tokyo's most refined restaurants.", jp: "東京で最も洗練されたレストラン。" },
    { en: "Refined doesn't mean expensive.", jp: "洗練されているとは高価という意味ではない。" }
  ]},
  { type: 'word', en: 'philosophy', jp: '哲学、考え方', examples: [
    { en: "Our company has a clear philosophy.", jp: "我々の会社には明確な哲学がある。" },
    { en: "What's your philosophy on partnerships?", jp: "パートナーシップの哲学は何ですか？" },
    { en: "Different philosophies, both valid.", jp: "異なる哲学、どちらも正当。" }
  ]},

  // 熟語
  { type: 'phrase', en: 'cross the table', jp: '立場を変える（投資する側→経営する側など）', examples: [
    { en: "I crossed the table from VC to operator.", jp: "私はVCからオペレーター側に立場を変えた。" },
    { en: "Crossing the table is a leap of faith.", jp: "立場を変えるのは信念の跳躍だ。" },
    { en: "Few investors cross the table successfully.", jp: "立場を変えて成功する投資家は少ない。" }
  ]},
  { type: 'phrase', en: 'caught me off guard', jp: '不意を突かれた', examples: [
    { en: "The warmth here caught me off guard.", jp: "ここの温かさに不意を突かれた。" },
    { en: "Her question caught me off guard.", jp: "彼女の質問に不意を突かれた。" },
    { en: "Don't let small things catch you off guard.", jp: "些細なことで不意を突かれるな。" }
  ]},
  { type: 'phrase', en: 'in your hands', jp: 'あなたの手に届く、あなた次第で', examples: [
    { en: "Cut today, in your hands tomorrow.", jp: "今日カット、明日あなたの手元へ。" },
    { en: "The decision is in your hands.", jp: "決断はあなた次第です。" },
    { en: "It's in your hands now.", jp: "今やあなたの手の中だ。" }
  ]},
  { type: 'phrase', en: 'speaks the same language', jp: '同じ価値観を持つ、共鳴する', examples: [
    { en: "Indonesia speaks the same language as Japan.", jp: "インドネシアは日本と同じ価値観を共有する。" },
    { en: "We speak the same language about quality.", jp: "私たちは品質について同じ価値観を持つ。" },
    { en: "Designers speak the same language worldwide.", jp: "デザイナーは世界で同じ言語を話す。" }
  ]},
  { type: 'phrase', en: 'I appreciate that', jp: 'ありがたく思う、感謝します', examples: [
    { en: "I appreciate your honesty.", jp: "正直さに感謝します。" },
    { en: "I really appreciate that.", jp: "本当にありがたく思います。" },
    { en: "We appreciate your patience.", jp: "ご辛抱に感謝します。" }
  ]},
  { type: 'phrase', en: 'what brings you here', jp: '何があってここに？', examples: [
    { en: "What brings you here today?", jp: "今日は何でこちらへ？" },
    { en: "What brings you to Tokyo?", jp: "東京へ来られた理由は？" },
    { en: "What brings you here at this hour?", jp: "こんな時間にどうされたんですか？" }
  ]},
  { type: 'phrase', en: 'cold chain', jp: '低温物流、コールドチェーン', examples: [
    { en: "We control the cold chain end to end.", jp: "我々は低温物流を端から端まで管理する。" },
    { en: "Cold chain is critical for fresh flowers.", jp: "生花にはコールドチェーンが不可欠だ。" },
    { en: "Few companies have a real cold chain.", jp: "本物の低温物流を持つ会社は少ない。" }
  ]},
  { type: 'phrase', en: 'long-term partnership', jp: '長期的なパートナーシップ', examples: [
    { en: "We're looking for a long-term partnership.", jp: "長期的なパートナーシップを求めています。" },
    { en: "Long-term partnerships build trust.", jp: "長期的なパートナーシップは信頼を築く。" },
    { en: "Our pricing favors long-term partnerships.", jp: "価格は長期的な関係に有利だ。" }
  ]},
  { type: 'phrase', en: 'circle of trust', jp: '信頼の輪、近しい人間関係', examples: [
    { en: "Anyone in your circle would appreciate this.", jp: "あなたの近しい方なら理解してくれるでしょう。" },
    { en: "She's in his inner circle of trust.", jp: "彼女は彼の信頼の輪の中にいる。" },
    { en: "Building a circle of trust takes years.", jp: "信頼の輪を築くには何年もかかる。" }
  ]},
  { type: 'phrase', en: 'lost generation', jp: 'ロストジェネレーション', examples: [
    { en: "I'm part of Japan's lost generation.", jp: "私は日本のロストジェネレーションの一員だ。" },
    { en: "The lost generation grew up in stagnation.", jp: "ロストジェネレーションは停滞の中で育った。" },
    { en: "Our role is to redefine the lost generation.", jp: "我々の役割はロスジェネを再定義することだ。" }
  ]},

  // 文章丸ごと
  { type: 'sentence', en: "It's priced where it is because of what's behind it.", jp: "その価格は、背景にあるものに値するからです。", examples: [
    { en: "It's priced where it is because of what's behind it — heritage, craft, story.", jp: "その価格は、背景の伝統、技、物語に値するからです。" },
    { en: "Don't apologize for price. Explain what's behind it.", jp: "価格に謝るな、背景を説明せよ。" },
    { en: "What's behind a product matters more than the product.", jp: "商品の背景は商品自体より大切だ。" }
  ]},
  { type: 'sentence', en: "I'd rather know now.", jp: "今知っておきたいです。（無駄な期待を避けるための定型句）", examples: [
    { en: "If it's a no, I'd rather know now.", jp: "ノーなら今知りたい。" },
    { en: "I'd rather know now than waste your time.", jp: "あなたの時間を無駄にするより今知りたい。" },
    { en: "Honesty saves everyone time. I'd rather know now.", jp: "正直さは皆の時間を節約する。今知りたい。" }
  ]},
  { type: 'sentence', en: "Different philosophies, both valid.", jp: "異なる哲学、どちらも正当。", examples: [
    { en: "Dutch and Japanese flowers — different philosophies, both valid.", jp: "オランダと日本の花は哲学が違う、どちらも正当。" },
    { en: "I respect both views. Different philosophies, both valid.", jp: "両方の見解を尊重する。哲学は違うがどちらも正しい。" },
    { en: "There's no single right answer. Different philosophies, both valid.", jp: "唯一の正解はない。異なる哲学、どちらも正当。" }
  ]},
  { type: 'sentence', en: "Nobody else can do this.", jp: "他の誰にもできない。（自信の表明フレーズ）", examples: [
    { en: "Cut today, delivered globally tomorrow. Nobody else can do this.", jp: "今日カット、明日世界へ。他の誰にもできない。" },
    { en: "Say it with confidence: nobody else can do this.", jp: "自信を持って言え：他の誰にもできない。" },
    { en: "What's your 'nobody else can do this' moment?", jp: "あなたの「他の誰にもできない」瞬間は？" }
  ]},
  { type: 'sentence', en: "Let me see what's possible.", jp: "何ができるか考えさせてください。", examples: [
    { en: "Let me see what's possible and get back to you.", jp: "何ができるか考えて、ご連絡します。" },
    { en: "Don't say no. Say: let me see what's possible.", jp: "ノーと言うな、「何ができるか考える」と言え。" },
    { en: "Let me see what's possible — that opens doors.", jp: "「何ができるか考えます」が扉を開く。" }
  ]},
  { type: 'sentence', en: "Quality, not volume.", jp: "量より質。", examples: [
    { en: "Our philosophy is simple: quality, not volume.", jp: "我々の哲学はシンプル、量より質。" },
    { en: "We chose quality, not volume — and it changed everything.", jp: "我々は量より質を選んだ、それが全てを変えた。" },
    { en: "In luxury, it's always quality, not volume.", jp: "ラグジュアリーでは常に量より質だ。" }
  ]},
  { type: 'sentence', en: "What would make this a yes for you?", jp: "何があれば、Yesと言えますか？", examples: [
    { en: "I appreciate your hesitation. What would make this a yes for you?", jp: "迷うのも分かります。何があればYesと言えますか？" },
    { en: "What would make this a yes for you? Let's start there.", jp: "何があればYesと言える？そこから始めよう。" },
    { en: "Asking 'what would make this a yes' is a sales superpower.", jp: "「何があればYesか」を問うのは営業の超能力だ。" }
  ]},
  { type: 'sentence', en: "I came to find partners, not customers.", jp: "顧客ではなく、パートナーを探しに来ました。", examples: [
    { en: "I came to find partners, not customers — that's the vision.", jp: "顧客ではなくパートナーを探す、それがビジョン。" },
    { en: "When you find partners, customers follow.", jp: "パートナーを見つければ顧客は後からついてくる。" },
    { en: "The first ten partners define the brand.", jp: "最初の10社のパートナーがブランドを定義する。" }
  ]},
  { type: 'sentence', en: "I'd rather give you the right number than a fast one.", jp: "急ぐより、正しい数字をお出ししたいです。", examples: [
    { en: "I'd rather give you the right number than a fast one. Let me think.", jp: "急ぐより正しい数字を。考えさせてください。" },
    { en: "Speed isn't always trust. The right number builds trust.", jp: "速さが信頼ではない、正しさが信頼を築く。" },
    { en: "Take time. Give the right number, not a fast one.", jp: "時間をかけて。正しい数字を、急がず。" }
  ]},
  { type: 'sentence', en: "The moment matters.", jp: "その瞬間こそが大切。", examples: [
    { en: "When the flower arrives, the moment matters.", jp: "花が届くその瞬間が大切。" },
    { en: "Revenue follows. But the moment matters first.", jp: "売上は後から来る。まずはその瞬間。" },
    { en: "Build for the moment, not the metric.", jp: "数字でなく瞬間のために作れ。" }
  ]},
];

// =====================================================
// 商談当日タイムライン（時系列シナリオ）
// =====================================================
const JAKARTA_TIMELINE = [
  { time: '06:00', type: 'prep', icon: '🌅', title: 'Wake & Prepare',
    desc: 'Shower, declaration, light breakfast. Wear suit jacket but loose. Pack: 50 cards, look book on phone, gifts.',
    script: 'I am someone who speaks English with the world. Today, I represent Japan.' },
  { time: '08:00', type: 'prep', icon: '🚗', title: 'Arrive Venue',
    desc: 'Greet staff warmly. Stay relaxed. Smile to everyone — that\'s how high-status people behave.',
    script: 'Selamat pagi! I\'m Zacky from CAVIN. Could you point me to the VIP area?' },
  { time: '10:00', type: 'meeting', icon: '🌟', title: 'Carnival Floor — Soft Approach',
    desc: 'Don\'t sell. Get 3-5 business cards. Find 2 people interested enough for lunch or dinner.',
    script: 'I love the design you\'re wearing. Is it a local designer? I\'m Zacky, I came from Japan, working with luxury flowers.' },
  { time: '12:30', type: 'meal', icon: '🍽️', title: 'Lunch Meeting #1',
    desc: 'Wait until they sit. 20 min small talk first. Show flowers only when asked. End with: send sample arrangement.',
    script: 'Thank you for making time. How was your morning? ... If you\'d like, I could prepare a small arrangement for you.' },
  { time: '15:00', type: 'meeting', icon: '🎪', title: 'Back to Carnival',
    desc: 'Reconnect with lunch contact. Be remembered for being the one who LISTENS. Ask 1 sharp question per group.',
    script: 'There you are! Did you find that designer you mentioned earlier?' },
  { time: '18:00', type: 'meal', icon: '🍷', title: 'Dinner #2 — Deep Talk',
    desc: 'Open with their earlier comment. Move to business mid-meal. Offer 3 partnership options. Don\'t push.',
    script: 'I\'ve been thinking about what you said earlier — about [their comment]. It stayed with me.' },
  { time: '21:00', type: 'night', icon: '🌙', title: 'Closing & Bridge',
    desc: 'Hand business card with handwritten note. Use one Indonesian phrase. Promise follow-up within 24h.',
    script: 'I wrote something small on the back. Sampai jumpa, terima kasih banyak.' },
  { time: '22:00', type: 'night', icon: '📱', title: 'WhatsApp Follow-up',
    desc: 'Send within 24h. Reference SPECIFIC topic from conversation. Offer to send something — no business attached.',
    script: 'Thank you for an unforgettable evening. The conversation about [topic] gave me a lot to think about.' },
];

// =====================================================
// モチベーションメッセージ
// =====================================================
const HERO_MESSAGES = {
  morning: [
    "Today is a brick in the wall to Jakarta.",
    "You're not learning English. You're building your future.",
    "10 minutes today > 2 hours next week.",
    "The Zacky who lands in Jakarta is built right now.",
    "Lost generation? Watch us prove them wrong."
  ],
  noon: [
    "Half the day done. Half the day to win.",
    "5 minutes between meetings = 1 phrase mastered.",
    "Your competitors aren't preparing. You are.",
    "Show up to yourself today.",
    "One more rep. That's how mastery looks."
  ],
  evening: [
    "Tonight's reps = tomorrow's confidence.",
    "Your mouth needs to know what your mind knows.",
    "Sleep on what you practiced. Wake up better.",
    "The boring 30 minutes builds the magic moment.",
    "End strong. Tomorrow starts here."
  ],
  late: [
    "Even 2 minutes preserves the streak.",
    "Don't break the chain. Just open one card.",
    "Your future self thanks you for showing up.",
    "Sleep is recovery. But touch English first.",
    "Quiet effort, loud results."
  ]
};

// =====================================================
// 各機能の「なぜやるか」（モチベーション×目的の明示）
// =====================================================
const PURPOSE = {
  declaration: {
    why: "1日の最初のアイデンティティセット。脳に「私は世界と英語で話す人間だ」と宣言することで、その後の練習効率が3倍になる。",
    impact: "→ 商談本番の自信に直結"
  },
  hook: {
    why: "あなたの自己紹介の最初の20秒は、商談の運命を決める。何度も口に出すことで、緊張下でも自動で口が動くようになる。",
    impact: "→ 7/23の最初の名刺交換で勝つ"
  },
  shadowing: {
    why: "脳ではなく口の筋肉に英語を染み込ませる。本番で「考えてから話す」では遅い。シャドーイングは、無意識のレベルで英語が出るようにする唯一の方法。",
    impact: "→ 商談中に詰まらない、自然な英語"
  },
  vocab: {
    why: "富裕層相手の商談では、語彙の質が「品」を作る。'buy'ではなく'acquire'、'expensive'ではなく'reflects the value'を使えるかで印象が変わる。忘却曲線で確実に定着させる。",
    impact: "→ 富裕層に「教養ある日本人」と認識される"
  },
  flash: {
    why: "想定質問への即答力。富裕層は「考え込む人」より「軽やかに答える人」を信頼する。Q&Aを脳に焼き付けることで、商談中に間が空かない。",
    impact: "→ 30の想定質問にすべて10秒で答えられる"
  },
  scenes: {
    why: "シーン別フレーズは「使う場所」とセットで覚える。商談、食事、雑談、別れ際 — それぞれで使う英語が違う。場面ごとの定型句で会話の流れを止めない。",
    impact: "→ 食事や別れ際で品格を出せる"
  },
  voiceRoleplay: {
    why: "実戦想定。AIと会話することで「想定外の質問への対応力」が鍛えられる。商談本番で初めて聞かれた質問にも対処できるようになる。",
    impact: "→ 想定外質問への臨機応変力"
  },
  pronunciation: {
    why: "発音は「品」と「自信」の両方を作る。R/L、TH、語尾の子音 — 日本人特有の弱点を意識的に直すことで、聞き返される回数が激減する。",
    impact: "→ 聞き返されないコミュニケーション"
  },
  diary: {
    why: "今日の振り返り3行は、潜在意識に「学習した感覚」を刻む。記録は習慣化の最大の鍵。書くことで、明日もまた開く理由ができる。",
    impact: "→ 連続日数を支える儀式"
  },
  timeline: {
    why: "7/23当日のイメージトレーニング。シーン別の英語を時系列で見ることで、本番での流れが脳に刻まれる。当日「初めて」を減らす。",
    impact: "→ 本番で焦らない準備"
  },
  weeklyReport: {
    why: "進捗の可視化は習慣の燃料。「やった量」が見えるとモチベーションが続く。先週との比較で、自分の成長を実感する。",
    impact: "→ 続ける理由を作る"
  },
  phraseToday: {
    why: "1日1フレーズで語彙のリズムを保つ。短くても毎日触ることが、長期記憶への王道。",
    impact: "→ 引き出しを毎日1つ増やす"
  },
  emergency: {
    why: "完璧主義は習慣の最大の敵。忙しい日でも2分だけ触ることで、連続が途切れない。「やめないこと」が「上達すること」より大事な時期がある。",
    impact: "→ ストリークを守る最終手段"
  }
};

const ACHIEVEMENTS = [
  { id: 'streak3', threshold: 3, type: 'streak', icon: '🔥', title: '3-Day Streak!', msg: 'You\'re building the habit.' },
  { id: 'streak7', threshold: 7, type: 'streak', icon: '🔥', title: 'Week Warrior!', msg: '1 week without missing.' },
  { id: 'streak14', threshold: 14, type: 'streak', icon: '🔥', title: 'Two Weeks Strong!', msg: 'This is who you are now.' },
  { id: 'streak30', threshold: 30, type: 'streak', icon: '🏆', title: 'Iron Discipline!', msg: '30 days. Few make it here.' },
  { id: 'shadow100', threshold: 100, type: 'shadow_total', icon: '🎬', title: '100 Reps!', msg: 'Your mouth is changing.' },
  { id: 'shadow500', threshold: 500, type: 'shadow_total', icon: '🎬', title: '500 Reps!', msg: 'Native-like rhythm forming.' },
  { id: 'shadow1000', threshold: 1000, type: 'shadow_total', icon: '⭐', title: '1000 Reps Master!', msg: 'You earned this.' },
  { id: 'vocab50', threshold: 50, type: 'vocab_total', icon: '📚', title: '50 Words!', msg: 'Your vocabulary is growing.' },
  { id: 'pron10', threshold: 10, type: 'pron_total', icon: '📊', title: '10 Pronunciation Checks!', msg: 'You\'re measuring progress.' },
];
