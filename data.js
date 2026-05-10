// =====================================================
// データ：スケジュール・フラッシュ・フレーズ・シーン
// =====================================================

const TARGET_DATE = '2026-07-23'; // インドネシア商談日

const SCHEDULE = [
  { time: '06:30', mins: 390, key: 'declaration',   icon: '🪞', name: 'Morning Declaration', desc: 'Identity reset in front of the mirror.' },
  { time: '06:45', mins: 405, key: 'hook',          icon: '🚿', name: 'Shower Hook',         desc: 'Recite self-intro hook 3 times.' },
  { time: '07:15', mins: 435, key: 'listen-am',     icon: '☕', name: 'Morning Podcast',     desc: "Today's auto-picked podcast & video." },
  { time: '08:00', mins: 480, key: 'shadowing-am',  icon: '🎧', name: 'Commute Shadowing',   desc: 'Shadowing drill — short 2 + long 1.' },
  { time: '10:00', mins: 600, key: 'flash-am',      icon: '🃏', name: 'Morning Flash',       desc: "Today's Q&A — morning slot." },
  { time: '12:00', mins: 720, key: 'flash-noon',    icon: '🃏', name: 'Noon Flash',          desc: "Today's Q&A — noon slot." },
  { time: '12:45', mins: 765, key: 'phrase-today',  icon: '📝', name: "Today's Phrase",      desc: "Speak today's phrase aloud 3 times." },
  { time: '13:30', mins: 810, key: 'composition',   icon: '✍️', name: 'Composition',         desc: 'Write English & get AI feedback.' },
  { time: '15:00', mins: 900, key: 'flash-pm',      icon: '🃏', name: 'Afternoon Flash',     desc: "Today's Q&A — afternoon slot." },
  { time: '18:00', mins: 1080,key: 'listen-pm',     icon: '🚶', name: 'Evening Listen',      desc: 'Same media — finish or rewatch on the go.' },
  { time: '21:00', mins: 1260,key: 'shadowing-pm',  icon: '🎬', name: 'Main Shadowing',      desc: '10-min focused practice + recording.' },
  { time: '22:00', mins: 1320,key: 'flash-night',   icon: '🃏', name: 'Night Flash',         desc: 'Last Q&A before bed.' },
  { time: '22:10', mins: 1330,key: 'diary',         icon: '📔', name: '3-Line Diary',        desc: 'Reflect and sleep.' },
];

// 28枚フラッシュ — q（質問）+ qJp（質問訳）+ a（答え）+ aJp（答え訳）+ grammar（文法）
const FLASH = {
  am: [
    { q: "How did you leave VC for this?", qJp: "VCをやめてこれに来たきっかけは？",
      a: "Numbers stopped moving me. I wanted to do something my future children could touch.",
      aJp: "数字に心が動かなくなった。将来の子どもが触れられるものをやりたかった。",
      grammar: "①'stop + Ving'=『〜するのをやめる』。②'something + 関係詞節(my future children could touch)'で後置修飾。③仮定法could。" },
    { q: "How was your flight?", qJp: "フライトはいかがでしたか？",
      a: "Smooth, thank you. The warmth here caught me off guard in the best way.",
      aJp: "快適でした、ありがとうございます。ここの温かさにいい意味で不意を突かれました。",
      grammar: "①'caught me off guard'=不意を突いたのイディオム。②'in the best way'=ポジティブな副詞句。catch-caught-caughtの不規則変化。" },
    { q: "Is this your first time in Indonesia?", qJp: "インドネシアは初めてですか？",
      a: "It is. And I've already promised myself it won't be the last.",
      aJp: "はい、初めてです。そして、これが最後にならないと自分に約束しました。",
      grammar: "①'It is.'は前文の受け答え。②現在完了'have promised'。③'promise + oneself + 名詞節'で『自分に〜と約束する』。④won't=will notの短縮。" },
    { q: "How did you end up in flowers?", qJp: "なぜ花の世界に？",
      a: "I was a VC looking for what Japan has that the world needs. CAVIN gave me the answer.",
      aJp: "私はVCで、日本が持つもので世界が必要とするものを探していた。CAVINがその答えをくれた。",
      grammar: "①過去進行'was looking'（背景動作）。②関係代名詞what。③関係代名詞that（先行詞は'what Japan has'）。④give + 人 + 物のSVOO。" },
    { q: "What do you think of Jakarta?", qJp: "ジャカルタの印象は？",
      a: "It holds tradition and ambition at once. Japan has lost some of that balance — I'm here to learn it back.",
      aJp: "伝統と野心を同時に抱えている。日本はそのバランスを失った — それを学び直しに来た。",
      grammar: "①'at once'=同時に。②現在完了'has lost'で結果を強調。③'learn it back'は『学んで取り戻す』の口語的表現。" },
    { q: "Are you the founder?", qJp: "創業者ですか？",
      a: "Partner. I came from VC. I invested in CAVIN before I joined — I crossed the table.",
      aJp: "パートナーです。VC出身。参加前にCAVINに投資した — テーブルを越えたんです。",
      grammar: "①一語回答Partnerで簡潔に。②'cross the table'=『立場を変える』の業界イディオム（投資家→経営側）。③過去形+過去形の時間順序。" },
    { q: "How do you ensure quality?", qJp: "品質はどう保証していますか？",
      a: "We hand-pick growers, inspect at three points, and control temperature throughout.",
      aJp: "生産者を厳選し、3地点で検査し、全行程で温度管理しています。",
      grammar: "①3つの動詞の並列（hand-pick, inspect, control）で説得力。②'throughout'は副詞『最初から最後まで』。③ハイフン付き複合動詞hand-pick。" },
  ],
  noon: [
    { q: "Are Dutch flowers better?", qJp: "オランダの花の方がいいのでは？",
      a: "Different philosophies. Dutch is volume. Japanese is seasonality, story, soul. We don't compete.",
      aJp: "哲学が違うんです。オランダは量。日本は季節性、物語、魂。私たちは競合しません。",
      grammar: "①省略文'Different philosophies'で印象的に。②be動詞+名詞の同一表現で本質を示す。③'compete'は自動詞。" },
    { q: "Tell me about CAVIN.", qJp: "CAVINについて教えて。",
      a: "We bring Japan's finest flowers to the world. Direct grower network plus FedEx partnership for fastest international delivery.",
      aJp: "日本最高峰の花を世界に届けています。生産者直結ネットワーク＋FedEx提携で世界最速配送。",
      grammar: "①'bring A to B'=AをBに届ける。②最上級finest。③省略文（We have...省略）で要点を畳みかける。" },
    { q: "Why flowers?", qJp: "なぜ花を？",
      a: "Japan grows some of the world's best flowers, but almost no one outside knows it. I'm changing that.",
      aJp: "日本は世界最高の花の一部を育てているのに、外ではほぼ誰も知らない。それを変えています。",
      grammar: "①現在進行'I'm changing'で『今この瞬間も』を強調。②'some of the + 最上級'で部分最上級。③almost no one=ほぼ誰も〜ない。" },
    { q: "How fresh are the flowers?", qJp: "鮮度はどのくらい？",
      a: "Cut in Japan in the morning, in your hands within 48 to 72 hours. Almost as fresh as if you'd picked them yourself.",
      aJp: "朝に日本でカット、48〜72時間以内にあなたの手に。自分で摘んだかのような鮮度。",
      grammar: "①過去分詞cutで分詞構文（受動）。②'within + 期間'で『〜以内に』。③'as fresh as if 仮定法過去完了'で『まるで〜のように』。" },
    { q: "Who are your customers?", qJp: "顧客は誰ですか？",
      a: "Luxury hotels, private clients who appreciate craft, and high-end event producers.",
      aJp: "ラグジュアリーホテル、職人技を理解する個人客、ハイエンドのイベントプロデューサー。",
      grammar: "①3要素並列（comma + and）。②関係代名詞who（人）で'private clients'を修飾。③appreciate=価値を認める。" },
    { q: "Won't flowers wilt in Indonesian heat?", qJp: "インドネシアの暑さで枯れませんか？",
      a: "We control the cold chain end to end. With proper care, they last as long here as in Tokyo.",
      aJp: "コールドチェーンを全工程管理しています。適切なケアで、東京と同じだけここで持ちます。",
      grammar: "①'end to end'=端から端まで。②'with + 名詞'で条件。③同等比較'as long as'。④省略'as in Tokyo'（'as they last in Tokyo'）。" },
    { q: "Can you do custom orders?", qJp: "オーダーメイドは可能？",
      a: "Absolutely. Tell me the occasion and feeling — we design from there.",
      aJp: "もちろん。場面と感情を教えてください — そこからデザインします。",
      grammar: "①Absolutelyで強い肯定。②命令形tellは丁寧な依頼。③'from there'=そこから（出発点）の副詞句。" },
  ],
  pm: [
    { q: "Have you worked with Indonesians before?", qJp: "インドネシア人と仕事をしたことは？",
      a: "We're at the very beginning here. The first partners we choose will define our brand in Indonesia.",
      aJp: "ここではまだ始まったばかり。最初に選ぶパートナーがインドネシアでの私たちのブランドを決める。",
      grammar: "①'at the very beginning'=very強調で『本当に始まり』。②関係代名詞that省略（The partners we choose）。③未来形willで重要性。" },
    { q: "That's expensive. Why?", qJp: "高いですね、なぜ？",
      a: "It's priced where it is because of what's behind it — generations of grower craft and a cold chain no one else has.",
      aJp: "この価格である理由は、その背景にあるもの — 何世代もの生産者の技と、誰も持たないコールドチェーン — のためです。",
      grammar: "①受動態'is priced'。②関係副詞where。③'because of + 名詞句'。④関係代名詞what。⑤関係代名詞that省略。" },
    { q: "What makes CAVIN different?", qJp: "CAVINの何が違うのか？",
      a: "Three things — direct grower relationships, FedEx-speed delivery, and curation. Quality, not volume.",
      aJp: "3つあります — 生産者との直接関係、FedEx速度の配送、キュレーション。量ではなく質。",
      grammar: "①使役動詞make + O + C。②3要素並列。③ハイフン複合語FedEx-speed。④省略・対比'A, not B'。" },
    { q: "Can you do better on the price?", qJp: "もう少し安くなりませんか？",
      a: "I appreciate you asking. Pricing reflects quality. Let's find efficiency through a long-term partnership.",
      aJp: "聞いてくださりありがとうございます。価格は品質を反映しています。長期パートナーシップで効率を見つけましょう。",
      grammar: "①'appreciate + 人 + Ving'で『〜が〜してくれて感謝』。②動詞reflectは他動詞。③Let's + V提案。④through=〜を通じて。" },
    { q: "What's the minimum order?", qJp: "最低発注量は？",
      a: "For one-time, we start from a base level. For partnerships, we tailor to your rhythm — weekly, monthly.",
      aJp: "単発なら、基本レベルから。パートナーシップなら、あなたのリズムに合わせます — 週次、月次。",
      grammar: "①'For + 名詞'で条件。②動詞tailor=『仕立てる』の比喩用法。③'to your rhythm'=合わせる対象。" },
    { q: "Show me your portfolio.", qJp: "ポートフォリオを見せて。",
      a: "Of course. Here's our look book — and I'll send a full version to you today.",
      aJp: "もちろん。これが我々のルックブック — 完全版は今日お送りします。",
      grammar: "①'Of course'同意の定型。②'Here is/are X'=『これがXです』の提示構文。③'send + 人 + 物'=SVOO（ここではsend X to youで前置詞使用）。" },
    { q: "How do payments work?", qJp: "支払いはどう？",
      a: "50% on confirmation, 50% on delivery. Monthly billing for ongoing partnerships.",
      aJp: "確定時に50%、納品時に50%。継続パートナーシップは月次請求。",
      grammar: "①省略文（'we ask for'省略）で簡潔に。②'on + 名詞'で『〜時点で』。③'for + 目的'で対象を示す。" },
  ],
  night: [
    { q: "One last thing?", qJp: "最後に一つ？",
      a: "If someone in your circle would care about Japanese flowers, I'd be honored if you mentioned us.",
      aJp: "もしあなたの周りに日本の花を気にかける方がいれば、私たちのことを話していただけたら光栄です。",
      grammar: "①仮定法'would care'。②'I'd be honored if 仮定法過去'=もし〜なら光栄。③'in your circle'=人脈の中で。" },
    { q: "What do you need from me?", qJp: "私に何を求めますか？",
      a: "Your honesty. If this resonates, let's talk seriously. If not, tell me — I'd rather know now.",
      aJp: "あなたの正直さです。響くなら真剣に話しましょう。響かないなら教えてください — 今知りたいので。",
      grammar: "①一語答えYour honestyで強い印象。②条件If S V。③省略'If not'='if it does not resonate'。④I'd rather + V原形。" },
    { q: "Why Indonesia?", qJp: "なぜインドネシア？",
      a: "The grace, the warmth, the love of beauty here speaks the same language as Japanese flowers.",
      aJp: "ここの優雅さ、温かさ、美への愛が、日本の花と同じ言葉を話しています。",
      grammar: "①3要素並列が単一主語として機能（speaks単数）。②比喩'speak the same language as'=価値観を共有する。" },
    { q: "What's your long-term vision?", qJp: "長期ビジョンは？",
      a: "Japan's flower industry globally recognized within ten years — like Japanese whisky became.",
      aJp: "10年以内に世界で認知される日本の花産業 — 日本のウイスキーがそうなったように。",
      grammar: "①省略文（'I see'省略）。②過去分詞recognizedで受動修飾。③'like + S + V'=『〜のように』比喩。④becameは前置詞節の中で過去形。" },
    { q: "Why should I work with you specifically?", qJp: "なぜあなたと？",
      a: "You're not getting a salesperson. You're getting someone who left a comfortable career for this.",
      aJp: "あなたが得るのは営業マンではない。快適なキャリアを捨ててこれに来た人間です。",
      grammar: "①'be getting + 名詞'=現在進行形で『〜を得つつある』感覚。②関係代名詞who。③'leave A for B'=AをやめてBへ。" },
    { q: "What does success look like for you?", qJp: "あなたにとって成功とは？",
      a: "When someone in Jakarta gives a Japanese flower to someone they love — and the moment matters.",
      aJp: "ジャカルタの誰かが、愛する人に日本の花を贈る — その瞬間が大切に感じられること。",
      grammar: "①'look like'=見える/感じる。②時を表すwhen節。③関係代名詞that省略（someone they love）。④動詞matter=重要である自動詞。" },
    { q: "What's your dream for this trip?", qJp: "今回の旅の夢は？",
      a: "To find partners who believe in what we believe in. Not customers — co-founders of a new flower culture.",
      aJp: "私たちが信じるものを信じてくれるパートナーを見つけること。顧客ではなく — 新しい花文化の共同創設者を。",
      grammar: "①不定詞名詞用法（To find...）が補語。②関係代名詞who+前置詞in（'believe in what...'）。③co-founders=接頭辞co-で『共同〜』。" },
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

// シーン別フレーズ — jp（訳）+ grammar（文法）付き
const SCENES = {
  meeting: {
    name: '🤝 Business Meeting',
    phrases: [
      { en: "It's a pleasure to finally meet you in person.", jp: "ようやく直接お会いできて光栄です。",
        grammar: "形式主語'It is'+不定詞構文。'in person'は副詞句で『直接、対面で』。'finally'で待ち望んでいた感を演出。" },
      { en: "Thank you for making time in your schedule.", jp: "お時間をいただきありがとうございます。",
        grammar: "Thank you for + 動名詞(Ving)。'in your schedule'で具体性を増し、より丁寧な響きに。" },
      { en: "I'd love to learn more about your business.", jp: "御社のビジネスをもっと知りたいです。",
        grammar: "I'd love to (= I would love to) は丁寧な希望表現。比較級'more'で深い興味を示す。" },
      { en: "What's your vision for the next five years?", jp: "今後5年のビジョンは？",
        grammar: "'for the next + 期間'で『今後の〜』。経営層への定番質問で、相手を立てる効果。" },
      { en: "Let me think about that and get back to you.", jp: "考えて、改めてご連絡します。",
        grammar: "'Let me + 動詞原形'で『〜させてください』。'get back to 人'は『折り返し連絡する』のイディオム。" },
      { en: "I appreciate your honesty.", jp: "正直に話してくれて感謝します。",
        grammar: "appreciate + 名詞 で『〜を高く評価する/感謝する』。Thank youより重みがある。" },
      { en: "Could we explore a long-term partnership?", jp: "長期的なパートナーシップを検討できますか？",
        grammar: "'Could we + 動詞原形'で柔らかい提案。'explore'は『可能性を探る』のビジネス頻出動詞。" },
      { en: "Let's continue this conversation over dinner.", jp: "ディナーで続きを話しましょう。",
        grammar: "'over + 食事'で『〜しながら』を示す前置詞句。Let'sで対等な提案。" },
      { en: "I'll send you a proposal tomorrow.", jp: "明日、提案書をお送りします。",
        grammar: "'I will'は意志未来。'send + 人 + 物'のSVOO第4文型。約束を明示する形。" },
      { en: "What would make this a yes for you?", jp: "何があれば、Yesと言えますか？",
        grammar: "仮定法'would'+使役動詞make。'a yes'は名詞化。営業・交渉の超強力フレーズ。" },
    ]
  },
  meal: {
    name: '🍽️ Meals & Dining',
    phrases: [
      { en: "What do you recommend?", jp: "おすすめは何ですか？",
        grammar: "現在形の単純疑問文。'recommend'は他動詞だが目的語省略OK。最短で品の良い質問。" },
      { en: "I'd love to try something authentically Indonesian.", jp: "本場のインドネシア料理を試したいです。",
        grammar: "'something + 形容詞'は後置修飾。'authentically'は副詞で『本物の感じで』Indonesian修飾。" },
      { en: "This is delicious — what's it called?", jp: "これは美味しい、何という料理ですか？",
        grammar: "'what is X called?'は『Xは何と呼ばれている？』の受動態疑問文。Whatが補語。" },
      { en: "Could you tell me more about this dish?", jp: "この料理についてもっと教えてください。",
        grammar: "Could you = 丁寧な依頼。'tell + 人 + about + 物'のSVOO + 前置詞句。" },
      { en: "I have no dietary restrictions, please order what you love.", jp: "食事制限はありません、お好きなものを。",
        grammar: "'no + 名詞'で完全否定。'what you love'は関係代名詞what（'the things that you love'と同義）。" },
      { en: "Let me get the bill this time.", jp: "今回は私が払わせてください。",
        grammar: "'Let me + 動詞原形'で許可を求める。'get the bill'=『勘定を持つ』のイディオム。" },
      { en: "Thank you for such a generous evening.", jp: "素敵な夜をありがとうございます。",
        grammar: "Thank you for + 名詞句。'such + a + 形容詞 + 名詞'で強調。'generous'で品格。" },
      { en: "I'd love to host you when you visit Tokyo.", jp: "東京に来られたら、ぜひ私が招待させてください。",
        grammar: "'host'は他動詞『接待する』。時を表すwhen節は未来でも現在形ルール（visit）。" },
      { en: "Cheers to new beginnings.", jp: "新しい始まりに乾杯。",
        grammar: "'Cheers to + 名詞'は乾杯の定型。'new beginnings'は複数形で抽象的な縁起のよさ。" },
      { en: "I'll definitely remember this meal.", jp: "この食事は絶対に忘れません。",
        grammar: "'definitely'は副詞で確信を強調。動詞remember + 目的語のシンプル構造。" },
    ]
  },
  smalltalk: {
    name: '💬 Small Talk',
    phrases: [
      { en: "How was your weekend?", jp: "週末はどうでしたか？",
        grammar: "How is/was + 主語？で状態を尋ねる定型。過去形で先週末を指す。挨拶後の鉄板。" },
      { en: "Have you been to Japan?", jp: "日本に行かれたことはありますか？",
        grammar: "現在完了の経験用法（have been to）。'have gone to'は『行ってまだ戻っていない』なので使い分けに注意。" },
      { en: "What part of Indonesia are you originally from?", jp: "もともとインドネシアのどちらのご出身ですか？",
        grammar: "'What part of X'で『Xのどの部分』。'originally'で出身地を尋ねる丁寧な響き。前置詞fromが文末。" },
      { en: "Do you spend most of your time in Jakarta?", jp: "ほとんどジャカルタで過ごされていますか？",
        grammar: "'spend + 時間 + in + 場所'のパターン。'most of'は『〜のほとんど』。" },
      { en: "What's your favorite spot in the city?", jp: "この街でお気に入りの場所は？",
        grammar: "'favorite + 名詞'で『お気に入りの〜』。'spot'はplaceよりカジュアルで会話的。" },
      { en: "How do you like to spend your free time?", jp: "休日はどう過ごされますか？",
        grammar: "'How do you like to V'=『どう〜するのが好き？』、相手の好みを尋ねる丁寧形。" },
      { en: "Do you travel often for work?", jp: "仕事でよく旅行されますか？",
        grammar: "頻度副詞oftenを動詞の後に置く位置がポイント。'for work'で目的を示す。" },
      { en: "What's been on your mind lately?", jp: "最近気になっていることは？",
        grammar: "現在完了進行'has been'で継続を示す。'on one's mind'=『気にかかっている』のイディオム。" },
      { en: "I'd love to hear about your family.", jp: "ご家族について聞かせてください。",
        grammar: "I'd love to + V で丁寧な希望。'hear about + 名詞'で『〜について聞く』。" },
      { en: "It's been wonderful talking with you.", jp: "お話しできて本当に嬉しかったです。",
        grammar: "現在完了+形容詞+動名詞構造。別れ際の上品な締め言葉。'with you'がより対等な響き。" },
    ]
  },
  closing: {
    name: '🌙 Closing & Follow-up',
    phrases: [
      { en: "May I follow up with you next week?", jp: "来週ご連絡してもよろしいですか？",
        grammar: "May I = 最丁寧な許可求め。'follow up with 人'=『〜に追って連絡する』のビジネスイディオム。" },
      { en: "I hope our paths cross again soon.", jp: "また近いうちにお会いできますように。",
        grammar: "'paths cross'=『道が交わる』比喩で『再会する』。'again soon'で時期を曖昧に上品に。" },
      { en: "I'll be in touch.", jp: "また連絡します。",
        grammar: "未来形 + 'be in touch'=『連絡を取り合う』のイディオム。短いが約束の重み。" },
      { en: "Thank you for an unforgettable evening.", jp: "忘れられない夜をありがとうございます。",
        grammar: "Thank you for + 名詞句。'un + forget + able'の語形成、否定の接頭辞unと可能の-able。" },
      { en: "Please give my regards to your family.", jp: "ご家族によろしくお伝えください。",
        grammar: "'give one's regards to 人'=『〜によろしく伝える』のフォーマル定型。" },
      { en: "Safe travels home.", jp: "お気をつけてお帰りください。",
        grammar: "省略文（Have safe travels home）。'travels'と複数形で旅程を示す慣用。" },
      { en: "I'll send you something we discussed.", jp: "お話ししたものをお送りします。",
        grammar: "'something (that) we discussed'は関係代名詞thatの省略。SVOO+関係節。" },
      { en: "Looking forward to our next chapter.", jp: "次のステップを楽しみにしています。",
        grammar: "'I am'省略のカジュアル形。'look forward to + 名詞/Ving'で『〜を楽しみにする』。'next chapter'は比喩。" },
      { en: "Sampai jumpa, terima kasih banyak.", jp: "また会いましょう、本当にありがとうございました。（インドネシア語）",
        grammar: "Sampai='〜まで'、jumpa='会う'。Banyak='多く'で強調。挨拶の最後を現地語で締める文化敬意。" },
      { en: "Until next time.", jp: "また次回お会いしましょう。",
        grammar: "省略表現（'See you until next time'の短縮）。シンプルで余韻のある締め。" },
    ]
  }
};

// シャドーイング教材 — why（目的）+ jp（訳）+ grammar（文法解説）
const SHADOW_BANK = {
  short: [
    { text: "What brings you here today?",
      why: "初対面で相手を喋らせる魔法の一言。商談はこれで主導権を渡す。",
      jp: "今日は何があってこちらへ？／何のご用事ですか？",
      grammar: "「bring」は無生物主語構文。直訳「何があなたをここに連れてきましたか」。'Why are you here?'より柔らかく品がある言い回し。" },
    { text: "It's a pleasure to finally meet you.",
      why: "対面挨拶の品格。'finally'を入れると相手を立てられる。",
      jp: "ようやく直接お会いできて光栄です。",
      grammar: "「It is a pleasure to V」の形式主語構文。'finally'は『お待ちしてました』のニュアンスを足す副詞。'Nice to meet you'より格上。" },
    { text: "Tell me more about that.",
      why: "富裕層は自分の話を聞く人を信頼する。沈黙の代わりにこれ。",
      jp: "それについて、もっと聞かせてください。",
      grammar: "命令形だが柔らかい関心表現。'about that'で相手の発言を受ける。比較級'more'が興味の深さを示す。" },
    { text: "I'd love to hear the story behind that.",
      why: "相手の物語を引き出す。商談を雑談から深い関係へ昇格させる。",
      jp: "その背景にある物語をぜひ聞かせてください。",
      grammar: "'I'd love to' = 'I would love to'の短縮。仮定法で『とても〜したい』を上品に。'behind that'で背景を意味する前置詞句。" },
    { text: "Thank you for making time.",
      why: "富裕層への敬意。会えたことそのものへの感謝で開く。",
      jp: "お時間を作ってくださりありがとうございます。",
      grammar: "Thank you for + 動名詞(Ving)の定型。'making time'は『時間を作る』という英語のイディオム。'spending time'より能動的で重みがある。" },
    { text: "What matters most to you?",
      why: "押し売りせず、相手のニーズを引き出す質問。",
      jp: "あなたにとって、何が一番大切ですか？",
      grammar: "matter = 自動詞『重要である』。最上級'most'を副詞で使う高度な表現。'to you'で相手にフォーカス。" },
    { text: "May I ask a question?",
      why: "踏み込む前のワンクッション。失礼にならない。",
      jp: "1つ質問してもよろしいですか？",
      grammar: "助動詞'May'は'Can'より丁寧で、許可を求める高品位な表現。ビジネスや初対面で多用される。" },
    { text: "Let's continue this conversation.",
      why: "別れ際の定番。次に繋げる魔法のフレーズ。",
      jp: "この会話、また続けましょう。",
      grammar: "'Let us'の短縮形による提案。'continue'は他動詞で目的語'this conversation'を直接取る。'Let's keep talking'よりフォーマル。" },
    { text: "I'm Zacky, partner at CAVIN.",
      why: "自分の名前と立場を一息で言える練習。商談の最初の3秒。",
      jp: "ザキです、CAVINでパートナーをしています。",
      grammar: "同格構造：'Zacky' と 'partner at CAVIN'が同じ人物を指す。冠詞なし'partner'で『複数いる中の1人』を示し、控えめな自己紹介に。" },
    { text: "Japan grows the world's finest flowers.",
      why: "あなたのHookの核。これが言えなければ何も始まらない。",
      jp: "日本は世界最高峰の花を育てている。",
      grammar: "現在形で『普遍の事実』を述べる。'finest'は'fine'の最上級『最高品質の』。所有格's'で『世界の』を簡潔に。" },
    { text: "Almost as fresh as if you picked them yourself.",
      why: "FedEx連携の強みを体感で伝える殺し文句。",
      jp: "まるであなた自身が摘んだかのように新鮮です。",
      grammar: "'as 形容詞 as if 仮定法'の高度な比喩構文。'almost'で控えめに。'yourself'は再帰代名詞で強調。" },
    { text: "Nobody else can do this.",
      why: "断言する勇気を体に入れる。富裕層は自信ある人を信頼する。",
      jp: "他の誰にもこれはできません。",
      grammar: "'Nobody else'=『他の誰も〜ない』の否定全称。'No one else'と同義。短く強い断言の代表形。" },
    { text: "Quality, not volume.",
      why: "ラグジュアリーの哲学を一言で。あなたのスタンスが伝わる。",
      jp: "量ではなく、質。",
      grammar: "省略構文（'It is quality, not volume'の省略）。対比を最短で示すラグジュアリー業界の典型修辞。" },
    { text: "Let me see what's possible.",
      why: "即決を避け、誠実さを示す。価格交渉での切り返し。",
      jp: "何ができるか考えさせてください。",
      grammar: "'Let me + 動詞原形'で『〜させてください』。間接疑問文'what's possible'が目的語。「No」の代わりに使える万能フレーズ。" },
    { text: "I appreciate your honesty.",
      why: "相手の本音を歓迎する姿勢。信頼を一段深める。",
      jp: "正直に話してくださって感謝します。",
      grammar: "'appreciate'は他動詞で『価値を認める/感謝する』。'Thank you'よりフォーマルで上品。所有格+名詞の構造。" },
    { text: "What would make this a yes for you?",
      why: "営業の超能力。相手の障害を聞き出して扉を開く。",
      jp: "どうなれば、あなたにとってYesになりますか？",
      grammar: "仮定法'would'で控えめな質問に。'make + O + C(補語)'の第5文型。'a yes'は名詞化された返答。" },
    { text: "I'd rather know now.",
      why: "拒否を恐れない誠実さ。時間を尊重するプロの姿勢。",
      jp: "今のうちに知っておきたいです。",
      grammar: "'would rather + 動詞原形'=『むしろ〜したい』の定型。'now'で時間を強調。後ろに'than later'が省略されている。" },
    { text: "Selamat pagi, terima kasih.",
      why: "現地語で開く敬意。インドネシア人富裕層に必ず効く。",
      jp: "おはようございます、ありがとうございます。（インドネシア語）",
      grammar: "Selamat=『無事/良い』、pagi=『朝』。Terima kasih=『感謝を受け取る』。挨拶の最初に現地語を入れると敬意が伝わる。" },
    { text: "I came to find partners, not customers.",
      why: "売り手ではなくビジョン共有者として立つ。",
      jp: "私は顧客ではなく、パートナーを探しに来ました。",
      grammar: "'to find'は不定詞の副詞用法（目的）。'A, not B'の対比構造で意図を明確化。過去形'came'で行動の確定性を示す。" },
    { text: "I'd love to send you something — no business attached.",
      why: "見返りなしの贈与。富裕層の心を最も動かす一言。",
      jp: "何かお送りしたいんです — ビジネス抜きで。",
      grammar: "'I'd love to' + 動詞原形で丁寧な希望。'no business attached'は分詞構文（『ビジネスは付いていない』）。ダッシュで補足。" }
  ],
  long: [
    {
      text: "Japan grows some of the most beautiful flowers in the world. But almost no one outside Japan knows it. I'm Zacky, and I'm here to change that.",
      why: "あなたの3分自己紹介の最初の20秒。商談の運命を決めるHook。淀みなく言えるまで体に染み込ませる。",
      jp: "日本は世界で最も美しい花の一部を育てています。けれど、日本国外ではほぼ誰も知らない。私はザキ。それを変えるためにここに来ました。",
      grammar: "①最上級'the most beautiful'+部分'some of'で『最高峰の中の一部』を示す。②'almost no one'は『ほぼ誰も〜ない』。③'to change that'は不定詞の副詞用法（目的）。"
    },
    {
      text: "We've built Japan's most direct grower-to-customer logistics network. Through our FedEx partnership, we deliver internationally as fast as we deliver within Japan.",
      why: "CAVINの差別化ポイント。なぜ高くても買う価値があるのかの根拠。これを淀みなく言えれば信頼が生まれる。",
      jp: "我々は日本で最も直接的な、生産者から消費者への物流網を構築しました。FedExとのパートナーシップにより、海外へも国内と同じ速さで届けられます。",
      grammar: "①現在完了'have built'で『すでに完成済み』を示す。②'grower-to-customer'はハイフンで複合形容詞化。③'as fast as'は同等比較。"
    },
    {
      text: "Indonesia, to me, is one of the most exciting markets in the world. The energy here, the love of beauty, the way people celebrate life — it speaks the same language as Japanese flowers.",
      why: "「なぜインドネシアか」を聞かれた時の本命答え。お世辞でなく観察として語る練習。",
      jp: "私にとってインドネシアは、世界で最もエキサイティングな市場のひとつです。ここのエネルギー、美への愛、人々の人生の祝い方 — それは日本の花と同じ言語を話しています。",
      grammar: "①挿入句'to me'で個人的見解を示す。②'one of the most + 形容詞'は最上級の典型形。③'the way + S V'で『〜する方法』を名詞化。④比喩'speaks the same language'で抽象を具体化。"
    },
    {
      text: "I'm not here to sell. I'm here to share. To meet people who appreciate craft, story, and quiet beauty — and to see if our worlds can grow together.",
      why: "売り込み感を消す決め台詞。富裕層が嫌う「営業臭」を消し去る。",
      jp: "売りに来たのではありません。分かち合うために来ました。職人技、物語、静かな美を理解する方々に会うため — そして我々の世界が共に育つかを見るため。",
      grammar: "①'not...but'の対比（売る/分かち合う）。②関係代名詞'who'で人を修飾。③不定詞句のリスト'to meet... and to see...'で目的を並列。④'see if S V'=『〜かどうか確かめる』。"
    },
    {
      text: "Quality, story, and craftsmanship are not luxuries. They're a way of living. That's what we offer — not just flowers, but a presence.",
      why: "値段の話を哲学に昇華させるフレーズ。価格交渉を価値の議論に切り替える。",
      jp: "品質、物語、職人技は贅沢品ではありません。それは生き方です。我々が提供するのは — ただの花ではなく、ひとつの存在感です。",
      grammar: "①3つの名詞並列で重みを出す。②'a way of + Ving'で抽象概念を表現。③'That's what + S V'で強調構文。④'not just A, but B'で価値を上書き。"
    },
    {
      text: "It's priced where it is because of what's behind it — generations of grower craft, the freshest flowers in the world, and the only international cold chain that can deliver them this fast.",
      why: "「高い」と言われた時の最強の答え。謝らず、説明する。これを言えれば値引き圧力に負けない。",
      jp: "この価格である理由は、その背景にあるもの — 何世代もの生産者の技、世界最高の鮮度、そしてこの速さで届けられる唯一の国際低温物流網 — のためです。",
      grammar: "①関係副詞'where it is'で『その位置にある』。②'because of + 名詞'で理由。③'what's behind it'は関係代名詞what。④3つの名詞句の並列で根拠を厚くする。⑤関係代名詞'that'で'cold chain'を修飾。"
    },
    {
      text: "I belong to what we call Japan's lost generation — we grew up watching our country lose its confidence. Our role is to remind Japan, and the world, that Japan still has things worth bringing out.",
      why: "あなたの個人的な使命を語る決め台詞。これが言えると相手は応援したくなる。",
      jp: "私は『失われた世代』と呼ばれる世代に属します — 我々は国が自信を失っていく姿を見ながら育ちました。我々の役割は、日本にも世界にも、日本にはまだ世に出す価値あるものがあると思い出させることです。",
      grammar: "①'belong to + 名詞'=『〜に属する』。②'what we call X'=『いわゆるX』の名詞節。③知覚動詞構文'watching our country lose'で『〜が失っていくのを見る』。④'remind X that S V'=『XにSVを思い出させる』。⑤'worth + Ving'=『〜する価値がある』。"
    },
    {
      text: "If this resonates, let's talk seriously about what a partnership could look like. If it doesn't, tell me — I'd rather know now. And if there's someone in your circle who would care, I'd be grateful for an introduction.",
      why: "クロージングの完成形。押し売りせず、紹介まで促す。商談の終わり方の理想形。",
      jp: "もしこれが響くなら、パートナーシップの形を真剣に話しましょう。響かないなら、教えてください — 今知っておきたいので。そしてもし、あなたの周りに気にかけてくれそうな方がいれば、ご紹介をいただけたら嬉しいです。",
      grammar: "①3つのIf節で選択肢を並べる構造。②'what a partnership could look like'は仮定法+間接疑問文。③'I'd rather know now'は仮定法。④関係代名詞'who would care'で人を修飾。⑤'be grateful for + 名詞'で感謝。"
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
  },
  composition: {
    why: "受け身の練習だけでは話せるようにならない。お題に対して自分で英文を組み立て、AIに文法・語彙・自然さを指摘してもらい、改善版で書き直す。これで本当に「使える英語」になる。",
    impact: "→ 商談で自分の言葉で話せる力"
  }
};

// =====================================================
// 毎日のメディアおすすめ（ローテーション）
// 各日 = ポッドキャスト1 + 動画1。範囲指定で「ここまで聞けばOK」を明示
// =====================================================
// =====================================================
// 各URLは実在チェック済み or 検索URL（必ず開ける）
// =====================================================
const DAILY_MEDIA = [
  // Day 0 (日曜) - 雑談・人生観
  {
    podcast: {
      title: "How I Built This: Tatcha — Vicky Tsai",
      url: "https://open.spotify.com/search/How%20I%20Built%20This%20Tatcha%20Vicky%20Tsai",
      search: "https://open.spotify.com/search/How%20I%20Built%20This%20Tatcha%20Vicky%20Tsai",
      duration: "53 min",
      listen: "0:00 〜 18:00（最初の18分のみ）",
      why: "日本文化×ラグジュアリーブランドの起業ストーリー。あなたと完全に同じテーマ。Vickyが語る『日本の美意識』をどう英語で売るかの教科書。",
      catchPhrase: "Listen for: how she translates Japanese craft into Western luxury vocabulary."
    },
    video: {
      title: "Issey Miyake on the philosophy of design",
      url: "https://www.youtube.com/results?search_query=issey+miyake+interview+english+philosophy",
      duration: "8 min",
      watch: "全編（字幕オン推奨）",
      why: "三宅一生の英語インタビュー。日本人が英語で哲学を語る最高の手本。間の取り方も学べる。",
      catchPhrase: "Watch for: Japanese pacing in English speech."
    }
  },
  // Day 1 (月曜) - 商談・交渉
  {
    podcast: {
      title: "HBR IdeaCast: Negotiation",
      url: "https://open.spotify.com/search/HBR%20IdeaCast%20negotiation",
      search: "https://open.spotify.com/search/HBR%20IdeaCast%20negotiation",
      duration: "27 min",
      listen: "0:00 〜 15:00（前半のみで充分）",
      why: "富裕層相手に押し売りせず勝つ方法。あなたの価格交渉に直結する英語表現が満載。",
      catchPhrase: "Listen for: phrases like 'reframe', 'leverage', 'walk away point'."
    },
    video: {
      title: "Bloomberg: How the ultra-rich shop",
      url: "https://www.youtube.com/results?search_query=bloomberg+ultra+rich+luxury+shopping",
      duration: "10 min",
      watch: "0:00 〜 7:00（要点のみ）",
      why: "富裕層営業のリアル。ナレーターの英語スピード感に慣れる。",
      catchPhrase: "Notice: 'discerning', 'bespoke', 'curated' — luxury vocabulary."
    }
  },
  // Day 2 (火曜) - インドネシア文化
  {
    podcast: {
      title: "Monocle Radio: The Foreign Desk — Indonesia",
      url: "https://open.spotify.com/search/Monocle%20The%20Foreign%20Desk%20Indonesia",
      search: "https://open.spotify.com/search/Monocle%20The%20Foreign%20Desk%20Indonesia",
      duration: "30 min",
      listen: "0:00 〜 20:00",
      why: "インドネシアのビジネス文化を英語で学ぶ。商談相手への理解が深まる。",
      catchPhrase: "Listen for: how British English pronounces Indonesian names."
    },
    video: {
      title: "Tatler Asia: Inside Jakarta's elite",
      url: "https://www.youtube.com/results?search_query=tatler+asia+jakarta+billionaire+interview",
      duration: "12 min",
      watch: "全編",
      why: "ジャカルタ富裕層の生活を英語で見る。会話のネタになる。",
      catchPhrase: "Notice: how they describe luxury without saying 'expensive'."
    }
  },
  // Day 3 (水曜) - ラグジュアリー
  {
    podcast: {
      title: "Monocle: The Entrepreneurs",
      url: "https://open.spotify.com/search/Monocle%20The%20Entrepreneurs",
      search: "https://open.spotify.com/search/Monocle%20The%20Entrepreneurs",
      duration: "30 min",
      listen: "Pick the latest episode, listen 0:00 〜 15:00",
      why: "毎週新エピソード。ラグジュアリー起業家の英語の生の音。あなたの自己紹介が洗練される。",
      catchPhrase: "Imitate: their pacing, the pauses, the calm authority."
    },
    video: {
      title: "Sotheby's: A masterclass in Asian art",
      url: "https://www.youtube.com/results?search_query=sothebys+asian+art+masterclass",
      duration: "15 min",
      watch: "0:00 〜 10:00",
      why: "アート×アジア×英語。富裕層が話す話題。",
      catchPhrase: "Vocabulary: 'provenance', 'timeless', 'crafted'."
    }
  },
  // Day 4 (木曜) - 日本文化を英語で語る
  {
    podcast: {
      title: "NHK World: Direct Talk",
      url: "https://open.spotify.com/search/NHK%20World%20Direct%20Talk",
      search: "https://open.spotify.com/search/NHK%20World%20Direct%20Talk",
      duration: "20 min",
      listen: "Pick any episode, full",
      why: "日本のものを英語で説明する語彙集。海外で日本を語る武器。",
      catchPhrase: "Borrow: how they translate Japanese concepts ('mottainai', 'omotenashi') into English."
    },
    video: {
      title: "Kengo Kuma on Japanese architecture (TED)",
      url: "https://www.youtube.com/results?search_query=kengo+kuma+ted+architecture",
      duration: "18 min",
      watch: "0:00 〜 12:00",
      why: "日本人建築家の英語プレゼン。あなたの3分自己紹介の参考。",
      catchPhrase: "Study: how he uses simple words for deep ideas."
    }
  },
  // Day 5 (金曜) - リスニング筋トレ
  {
    podcast: {
      title: "BBC Business Daily",
      url: "https://open.spotify.com/search/BBC%20Business%20Daily",
      search: "https://open.spotify.com/search/BBC%20Business%20Daily",
      duration: "18 min",
      listen: "Pick today's episode, full",
      why: "毎日更新。最新ビジネスニュースの英語に触れる。商談前の話題作り。",
      catchPhrase: "Just listen — don't translate. Train passive listening."
    },
    video: {
      title: "Financial Times: CEO interviews",
      url: "https://www.youtube.com/results?search_query=financial+times+ceo+interview",
      duration: "10 min",
      watch: "Latest CEO interview, 0:00 〜 8:00",
      why: "Financial Timesの経営者インタビュー。あなたが読まれる側の言葉。",
      catchPhrase: "Notice: how CEOs deflect tough questions."
    }
  },
  // Day 6 (土曜) - スピーチ・ストーリーテリング
  {
    podcast: {
      title: "TED Business",
      url: "https://open.spotify.com/search/TED%20Business",
      search: "https://open.spotify.com/search/TED%20Business",
      duration: "12-15 min",
      listen: "Pick latest, full",
      why: "短いビジネス話の宝庫。ストーリーテリングの構成が学べる。",
      catchPhrase: "Steal: their opening hooks. Use them in your pitch."
    },
    video: {
      title: "Steve Jobs Stanford Commencement Speech (2005)",
      url: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
      duration: "15 min",
      watch: "全編（聞き慣れたら字幕なしで）",
      why: "英語スピーチの最高峰。'stay hungry, stay foolish'のリズムを体に。",
      catchPhrase: "Goal: shadow the first 3 minutes after 5 listens."
    }
  }
];

// =====================================================
// Composition Trainer 用プロンプト
// 各お題：situation（状況・日本語）/ hint（英語で使うべき要素）/ level / sample（モデル回答）
// =====================================================
const COMPOSITION_PROMPTS = [
  // === Easy（1文） ===
  { level: 'easy', situation: '商談相手に、CAVINの強みを一言で。',
    hint: 'Use: direct grower network / FedEx / fastest delivery',
    sample: "We bring Japan's finest flowers to the world through our direct grower network and FedEx partnership for fastest international delivery." },
  { level: 'easy', situation: '初対面の挨拶。あなたが何者かを名乗る。',
    hint: 'Use: partner, CAVIN, Japan, flowers',
    sample: "I'm Zacky, partner at CAVIN — we bring Japan's finest flowers to the world." },
  { level: 'easy', situation: '相手に時間を作ってくれた感謝を伝える。',
    hint: 'Use: making time / pleasure / look forward',
    sample: "Thank you for making time. It's a real pleasure to meet you." },
  { level: 'easy', situation: '「高い」と言われたとき、ひとことで価値を返す。',
    hint: "Use: priced / what's behind / craft",
    sample: "It's priced where it is because of the craft behind every stem." },
  { level: 'easy', situation: '相手の話に深く興味を持っていることを伝える。',
    hint: 'Use: love to / story / behind',
    sample: "I'd love to hear the story behind that." },
  { level: 'easy', situation: '初対面の相手に、何が一番大切か聞く。',
    hint: 'Use: matters most',
    sample: "What matters most to you in a partnership?" },
  { level: 'easy', situation: '相手が正直に話してくれたことに感謝。',
    hint: 'Use: appreciate / honesty',
    sample: "I appreciate your honesty — it means a lot." },
  { level: 'easy', situation: '即決を避け、誠実に時間をもらう。',
    hint: 'Use: rather / right number',
    sample: "I'd rather give you the right number than a fast one." },

  // === Medium（2-3文） ===
  { level: 'medium', situation: 'なぜインドネシアに来たのかを2文で語る。お世辞ではなく観察として。',
    hint: 'Use: love of beauty / same language / Japanese flowers',
    sample: "Indonesia is one of the most exciting markets I've seen. The way people here celebrate beauty speaks the same language as Japanese flowers." },
  { level: 'medium', situation: '相手が「Dutch flowersのほうが安い」と言ってきた。3文で品よく返す。',
    hint: 'Use: different philosophies / volume vs story / not compete',
    sample: "Different philosophies. Dutch is volume — and they're great at it. We offer seasonality, story, and soul. We don't compete with them." },
  { level: 'medium', situation: '商談を「売る」ではなく「分かち合う」場として位置づけ直す。3文。',
    hint: 'Use: not here to sell / share / craft and story',
    sample: "I'm not here to sell. I'm here to share. To meet people who appreciate craft, story, and quiet beauty." },
  { level: 'medium', situation: '商談の終盤、紹介をお願いする。押し売りせず2-3文で。',
    hint: 'Use: someone in your circle / honored / introduction',
    sample: "If someone in your circle would care about Japanese flowers, I'd be honored if you mentioned us. Beyond that — nothing today." },
  { level: 'medium', situation: '「あなたから買う理由は？」と聞かれた。営業マンではないことを伝える。',
    hint: 'Use: not a salesperson / left a comfortable career',
    sample: "You're not getting a salesperson. You're getting someone who left a comfortable career to do this — because I believe in it." },

  // === Hard（パラグラフ） ===
  { level: 'hard', situation: '自己紹介の最初の20秒（Hook）を自分の言葉で書く。日本の花の現状を描き、自分の使命を宣言する。',
    hint: 'Structure: Reality → Problem → Your role',
    sample: "Japan grows some of the most beautiful flowers in the world. But almost no one outside Japan knows it. I'm Zacky, and I'm here to change that." },
  { level: 'hard', situation: 'CAVINの差別化ポイントを4文で。物流の強みとFedExパートナーシップを盛り込む。',
    hint: 'Structure: Network → Speed → Result → Authority',
    sample: "We've built Japan's most direct grower-to-customer logistics network. Through our FedEx partnership, we deliver internationally as fast as we deliver within Japan. A flower cut in the morning can be in your hands anywhere in the world within 48 to 72 hours. Almost no one else can do that." },
  { level: 'hard', situation: '「失われた世代」の使命を、自分の言葉で語る。3-4文。',
    hint: 'Structure: Background → Observation → Mission',
    sample: "I belong to what we call Japan's lost generation — we grew up watching our country lose its confidence. But I think our role is exactly that. To remind Japan, and the world, that Japan still has things worth bringing out." },
  { level: 'hard', situation: 'クロージング。資産家相手に「Yes / No / 紹介」の3つの選択肢を品よく出す。',
    hint: 'Structure: If yes → If no → Referral ask',
    sample: "If this resonates, let's talk seriously about a partnership. If it doesn't, tell me — I'd rather know now. And if there's someone in your circle who would care, I'd be grateful for an introduction." },
];

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
