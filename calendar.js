const calendarTitle = document.querySelector("#calendar-title");
const calendarDays = document.querySelector("#calendar-days");
const selectedDate = document.querySelector("#selected-date");
const monthPicker = document.querySelector("#month-picker");
const prevMonthButton = document.querySelector("#prev-month");
const nextMonthButton = document.querySelector("#next-month");
const birthdays = [
  {
    id:"birthday_syo",
    member:"野島昭生さん",
    name:"昭生さん",
    month:4,
    day:6,
    birthYear:1945
  },
  {
    id:"birthday_hiro",
    member:"野島裕史さん",
    name:"裕史さん",
    month:4,
    day:16,
    birthYear:1973
  },
  {
    id:"birthday_kenji",
    member:"野島健児さん",
    name:"健児さん",
    month:3,
    day:16,
    birthYear:1976
  },
  {
    id:"birthday_toya",
    member:"野島透也さん",
    name:"透也さん",
    month:5,
    day:18,
    birthYear:2003
  }
];
function createBirthdayEvents(year){
  return birthdays.map(birthday => {
    const age = year - birthday.birthYear;
    const date = `${year}-${String(birthday.month).padStart(2,"0")}-${String(birthday.day).padStart(2,"0")}`;
    return {
      id:`${birthday.id}_${year}`,
      date:date,
     title:`${birthday.name}のお誕生日（${age}歳）`,
      type:"誕生日",
      members:[birthday.member],
      isBirthday:true
    };
  });
}
const events = [
  {
  id: "event_20261023211125_wasn2",
  title: "映画「バッド・ルーテナント：トウキョウ」公開日",
  type: "映画",
  members: ["野島裕史さん"],
  isRegular: false,
  date: "2026-10-23",
  links: [
    { name: "公式サイト", url: "https://blt-movie.jp/" },
    { name: "X", url: "https://x.com/blt_movie_jp?s=11" }
  ],
},
  {
  id: "event_20261023210934_6eon8",
  title: "CHILL CHILL BOX 15th BLUE BOX 朗読劇「逢魔時コンフュージョン～妖狐繚乱～」",
  type: "イベント",
  members: ["野島健児さん", "佐藤拓也さん", "立花慎之介さん", "田丸篤志さん", "高橋英則さん", "岩崎諒太さん", "中澤まさともさん", "波多野和俊さん"],
  isRegular: false,
  date: "2026-12-13",
  startTime: "14:30",
  venue: "一ツ橋ホール",
  prices: ["グッズ付き・13500円", "一般・8800円"],
  links: [
    { name: "公式サイト", url: "https://chill2box.com/15th/" },
    { name: "X", url: "https://x.com/chill2box?s=11" }
  ],
  description: "天野静馬(CV. 野島健児)\n二十歳。亡き母の後を継ぎ、陰守神社の神主として氏神の鬼・羅叉と結ばれる。理知的でおおらかな青年だが芯の強いところもある。現在は地方公務員として「まちづくり課」の職員として町立図書館＆郷土資料館の管理や、町内で催されるイベントの企画・運営などに携わる。",
},
  {
  id: "event_20261017211922_rsysc",
  title: "弟配信「ハロウィンは、ピザ食べよ」",
  type: "配信",
  members: ["野島健児さん"],
  isRegular: false,
  date: "2026-10-25",
  startTime: "20:00",
  endTime: "21:30",
  deliveryPlace: "Peatix",
  prices: ["配信・1500円", "(先着65個)サイン入り恒例オリジナルグッズ付・5500円"],
  links: [
    { name: "公式サイト", url: "https://nojiharo.peatix.com/" },
    { name: "X", url: "https://x.com/nojimakyodai?s=11" }
  ],
},
  {
  id: "event_20261017211616_pqovf",
  title: "朗読劇「FGO THE DRAMALOGUE -Cosmos in the Lostbelt-」",
  type: "イベント",
  members: ["野島健児さん", "高橋李依さん", "米澤円さん", "川澄綾子さん", "青木志貴さん", "水島大宙さん"],
  isRegular: false,
  date: "2026-11-01",
  openTime: "16:30",
  startTime: "17:30",
  endTime: "21:00",
  venue: "パシフィコ横浜 国立大ホール",
  prices: ["グッズ付きSS席・14500円", "S席・11000円", "注釈付きS席・10000円", "A席・9500円"],
  links: [
    { name: "公式サイト", url: "https://dramalogue.fate-go.jp/" },
    { name: "X", url: "https://x.com/fgoproject?s=11" }
  ],
},
  {
  id: "event_20261012092844_9dwcs",
  title: "劇場版 薬屋のひとりごと 亡妃の秘宝",
  type: "映画",
  members: ["野島裕史さん"],
  isRegular: false,
  date: "2026-12-11",
  links: [
    { name: "公式サイト", url: "https://kusuriyanohitorigoto.jp/movie/" }
  ],
  description: "未泉(CV. 野島裕史)\n未の一族の長兄。",
},
  {
  id: "event_20261011105450_osdua",
  title: "キャラクターデュアスロン",
  type: "イベント",
  members: ["野島裕史さん"],
  isRegular: false,
  date: "2026-10-11",
  startTime: "11:30",
  venue: "千葉市稲毛海浜公園周辺",
  links: [
    { name: "公式サイト", url: "https://chiba-tra.jp/" },
    { name: "X", url: "https://x.com/charathlonchiba?s=11" }
  ],
},
  {
  id: "event_20261011092132_sm2wu",
  title: "JFN系ラジオ番組「サイクリスト・ステーション ツアー・オブ・ジャパン」公開収録ステージ",
  type: "イベント",
  members: ["野島裕史さん"],
  isRegular: false,
  date: "2026-10-10",
  startTime: "15:00",
  venue: "道の駅なみえ・HAMDOORI CIRCLE PROJECTステージ",
  links: [
    { name: "公式サイト", url: "https://hamadori-coast.com/about-hamafes2026/" }
  ],
},
  {
  id: "event_20261011090541_it501",
  title: "野島健児と阪口大助のプレミアムな応援トークショー",
  type: "イベント",
  members: ["野島健児さん", "阪口大助さん"],
  isRegular: false,
  date: "2026-10-11",
  startTime: "13:00",
  venue: "イオンモール富士宮 さくらコート",
  links: [
    { name: "公式サイト", url: "https://www.aeon.jp/sc/fujinomiya/event/event_e92311_as.html" }
  ],
},
  {
  id: "event_20261007210420_xkfr7",
  title: "高座を飛び出せ！！ヘロQ落語演劇～落Q語～",
  type: "イベント",
  members: ["野島健児さん"],
  isRegular: false,
  date: "2026-11-13",
  startTime: "19:00",
  endTime: "20:30",
  venue: "TACCS1179",
  links: [
    { name: "公式サイト", url: "https://heroq.com/" },
    { name: "X", url: "https://x.com/1heroq?s=11" }
  ],
},
  {
  id: "event_20260927153929_ml1vf",
  title: "喫茶しーぷいへようこそ！3周年めぇ～っちゃ感謝祭【10部】",
  type: "イベント",
  members: ["野島裕史さん", "野島健児さん", "浅沼晋太郎さん", "小林裕介さん", "豊永利行さん"],
  isRegular: false,
  date: "2027-03-14",
  openTime: "10:30",
  startTime: "11:00",
  venue: "メイシアター(吹田市文化会館) 中ホール",
  prices: ["12000円"],
  links: [
    { name: "公式サイト", url: "https://sheepui.com/2026/08/26/20260314e/" },
    { name: "X", url: "https://x.com/sheepui0110?s=11" }
  ],
},
  {
  id: "event_20260927153929_ml1vf",
  title: "喫茶しーぷいへようこそ！3周年めぇ～っちゃ感謝祭【9部】",
  type: "イベント",
  members: ["野島裕史さん", "野島健児さん", "浅沼晋太郎さん", "小林裕介さん", "豊永利行さん"],
  isRegular: false,
  date: "2027-03-13",
  openTime: "18:00",
  startTime: "18:30",
  venue: "メイシアター(吹田市文化会館) 中ホール",
  prices: ["12000円"],
  links: [
    { name: "公式サイト", url: "https://sheepui.com/2026/08/26/20260314e/" },
    { name: "X", url: "https://x.com/sheepui0110?s=11" }
  ],
},
  {
  id: "event_20260927153408_ipsvb",
  title: "岸尾だいすけと野島裕史のHalloween Talk Party!",
  type: "イベント",
  members: ["野島裕史さん", "岸尾だいすけさん"],
  isRegular: false,
  date: "2026-11-08",
  startTime: "14:00",
  endTime: "15:30",
  venue: "専修大学 生田キャンパス",
  prices: ["3000円"],
  links: [
    { name: "X", url: "https://x.com/senshu_seiyu?s=11" }
  ],
},
  {
  id: "event_20260927152859_8ygff",
  title: "面会",
  type: "イベント",
  members: ["野島健児さん", "保志総一朗さん", "増田俊樹さん", "広瀬裕也さん", "服部想之介さん", "望月晶さん"],
  isRegular: false,
  date: "2026-11-08",
  openTime: "14:15",
  startTime: "15:00",
  venue: "藤岡市みかぼみらい館 大ホール",
  prices: ["5500円"],
  links: [
    { name: "公式サイト", url: "https://www.seiyuroudokugeki-vorlesen.com/#schedule" },
    { name: "X", url: "https://x.com/vorlesen_info?s=11" }
  ],
},
  {
  id: "event_20260927152113_1rgz1",
  title: "物語とおいしいの",
  type: "イベント",
  members: ["野島健児さん"],
  isRegular: false,
  date: "2026-10-31",
  startTime: "10:30",
  endTime: "18:00",
  venue: "GONZUI (東京都台東区入谷2-3-1)",
  prices: ["7700円＋1ドリンク(650円から)"],
  links: [
    { name: "公式サイト", url: "https://nojicafe.peatix.com/" },
    { name: "X", url: "https://x.com/nojimakyodai?s=11" }
  ],
},
  {
  id: "event_20260927151253_j12o5",
  title: "野島兄弟 2 on 1 オンライントーク会",
  type: "その他",
  members: ["野島裕史さん", "野島健児さん"],
  isRegular: false,
  date: "2026-10-24",
},
  {
  id: "event_20260927104252_fkql6",
  title: "声優トークショー＆オリジナル朗読劇 in 野々市",
  type: "イベント",
  members: ["野島健児さん", "池田秀一さん", "置鮎龍太郎さん", "梶原岳人さん", "多田このみさん"],
  isRegular: false,
  date: "2026-10-18",
  openTime: "12:00",
  startTime: "13:00",
  endTime: "14:30",
  venue: "野々市市文化会館フォルテ(石川県野々市市本町5丁目4-1)",
  prices: ["5500円(全席指定)"],
  links: [
    { name: "X", url: "https://x.com/seiyutalk_?s=11" },
    { name: "Instagram", url: "https://www.instagram.com/ishikawakoeasobi?stkn=ZTV1NGpscXEwbncx" },
    { name: "Threads", url: "https://www.threads.com/@ishikawakoeasobi?igshid=NTc4MTIwNjQ2YQ==" }
  ],
},
  {
  id: "event_20260923220815_kvr9o",
  title: "STONE FES. 2026",
  type: "イベント",
  members: ["野島健児さん"],
  isRegular: false,
  date: "2026-10-10",
  openTime: "12:00",
  startTime: "13:00",
  venue: "横浜BUNTAI (〒 231-0032 神奈川県横浜市中区不老町2丁目7番1)",
  prices: ["SS席・15000円(税込)", "S席・13000円(税込)", "A席・11000円(税込)", "注釈付きSS席・15000円(税込)", "注釈付きA席・11000円(税込)", "見切れ席・9000円(税込)", "配信・3800円(税込)"],
  links: [
    { name: "公式サイト", url: "https://dr-stone.jp/stonefes2026/" },
    { name: "X", url: "https://x.com/stone_anime_off?s=11" }
  ],
},
  {
  id: "event_20260923220330_adxcx",
  title: "超訳文学 太宰治 ～一人芝居、あるいは二人芝居～",
  type: "イベント",
  members: ["野島裕史さん", "沼倉愛美さん"],
  isRegular: false,
  date: "2026-10-08",
  openTime: "19:00",
  startTime: "19:30",
  venue: "アニメイトシアター(アニメイト池袋本店 B2F)",
  prices: ["現地・6000円(税込、全席指定)", "配信・3500円(税込)"],
  links: [
    { name: "公式サイト", url: "https://www.fwinc.co.jp/rabbit-note-project/archive/ws-dazai/" },
    { name: "X", url: "https://x.com/rabbit_note_p?s=11" }
  ],
},
  {
  id: "event_20260923215826_vjnii",
  title: "秋の夜長のゆったり配信",
  type: "配信",
  members: ["野島健児さん"],
  isRegular: false,
  date: "2026-09-22",
  startTime: "20:00",
  endTime: "21:30",
  deliveryPlace: "Peatix",
  prices: ["野島健児2027年オリジナルカレンダー付・5888円", "通常・1500円"],
  links: [
    { name: "公式サイト", url: "https://peatix.com/event/5190220" },
    { name: "X", url: "https://x.com/nojimakyodai?s=11" }
  ],
},
  {
  id: "event_20260923140444_1al1k",
  title: "「下町やぶさか診療所」トークライブ",
  type: "イベント",
  members: ["野島裕史さん", "橋爪功さん", "日髙のり子さん", "置鮎龍太郎さん", "保村真さん"],
  isRegular: false,
  date: "2026-09-27",
  startTime: "15:00",
  endTime: "16:15",
  venue: "NCBホール 福岡市博多区博多駅前3-1-1 西日本シティビル地下2階",
  links: [
    { name: "公式サイト", url: "https://kbc.co.jp/r-radio/yabusaka-shinryojo/form.php" },
    { name: "X", url: "https://x.com/yabusaka_kbc?s=11" },
    { name: "配信ページ", url: "https://www.youtube.com/live/yrFazI40C2U?si=wc-NTzQpsVLGI9H_" }
  ]
},
  {
  id: "event_20260923103252_lgry9",
  title: "野島兄弟のくじメイト",
  type: "配信",
  members: ["野島昭生さん", "野島裕史さん", "野島健児さん", "野島透也さん", "野島悠生さん", "野島瑠玖さん", "野島智司さん"],
  isRegular: false,
  date: "2026-09-20",
  startTime: "19:30",
  deliveryPlace: "ニコニコ生放送",
  links: [
    { name: "X", url: "https://x.com/animelo_staff?s=11" },
    { name: "配信ページ", url: "https://live.nicovideo.jp/watch/lv351304304?ref=lvapp_tanzaku_share_copy" }
  ]
  }
];

const regularSchedules = [
  {
  id: "event_20261017215146_u2q63",
  title: "ミュージカル「忍たま乱太郎」第16弾後伝 シリーズタイムワープ ～尼崎を巡って歌って大騒ぎ、入学説明会！の段～",
  type: "イベント",
  members: ["野島悠生さん"],
  isRegular: true,
  startTime: "12:00",
  venue: "尼崎市記念公園 ベイコム総合体育館",
  startDate: "2026-12-12",
  endDate: "2026-12-13",
  prices: ["アリーナSS席・12000円", "アリーナSS席 / グッズ付き・15000円", "アリーナS席・10500円", "アリーナS席 / グッズ付き・13500円", "アリーナひな壇・9000円", "アリーナひな壇 / グッズ付き・12000円", "2階A席・7500円", "2階A席 / グッズ付き・10500円", "2階B席・7000円", "2階B席 / グッズ付き・10000円", "注釈付き2階席・6000円"],
  links: [
    { name: "公式サイト", url: "https://www.musical-nintama.jp/16koden/" },
    { name: "X", url: "https://x.com/nin_myu_info?s=11" }
  ],
},
  {
  id: "event_20261017214343_2blxu",
  title: "「ミュージカル『忍たま乱太郎』第16弾 忍術学園学園祭」東京公演",
  type: "イベント",
  members: ["野島悠生さん"],
  isRegular: true,
  startTime: "18:30",
  venue: "Shibuya LOVEZ",
  startDate: "2027-01-21",
  endDate: "2027-01-24",
  prices: ["1階SS席・13000円", "2階S席・11000円", "3階A席(着席)・8000円"],
  links: [
    { name: "公式サイト", url: "https://www.musical-nintama.jp/16fes/#wrapper" },
    { name: "X", url: "https://x.com/nin_myu_info?s=11" }
  ],
},
  {
  id: "event_20261011090849_cy21c",
  title: "「ミュージカル『忍たま乱太郎』第16弾再演 タソガレドキで忍者修行！」大阪公演",
  type: "舞台",
  members: ["野島悠生さん"],
  isRegular: true,
  startTime: "18:30",
  venue: "COOL JAPAN PARK OSAKA TTホール",
  startDate: "2026-11-07",
  endDate: "2026-11-14",
  prices: ["プレビュー公演SS席・11000円", "プレビュー公演S席・9000円", "プレビュー公演A席・5000円", "本公演SS席・13000円", "本公演SS席・11000円", "本公演SS席・7000円", "U-18限定席・5000円", "親子ペア席・12000円"],
  links: [
    { name: "公式サイト", url: "https://www.musical-nintama.jp/" },
    { name: "X", url: "https://x.com/nin_myu_info?s=11" },
    { name: "YouTube", url: "https://youtube.com/channel/UCJWzq-AptBY7z4t58v_F1ug?si=ndRlawTmZ4FQ6iBH" }
  ],
},
  {
  id: "event_20261011090849_cy21c",
  title: "「ミュージカル『忍たま乱太郎』第16弾再演 タソガレドキで忍者修行！」東京公演",
  type: "舞台",
  members: ["野島悠生さん"],
  isRegular: true,
  startTime: "13:00",
  venue: "東京ドームシティ シアターGロッソ",
  startDate: "2026-10-09",
  endDate: "2026-10-25",
  prices: ["SS席・13000円", "S席・11000円", "A席・7000円", "U-18限定席・5000円", "親子ペア席・12000円"],
  links: [
    { name: "公式サイト", url: "https://www.musical-nintama.jp/" },
    { name: "X", url: "https://x.com/nin_myu_info?s=11" },
    { name: "YouTube", url: "https://youtube.com/channel/UCJWzq-AptBY7z4t58v_F1ug?si=ndRlawTmZ4FQ6iBH" }
  ],
},
  {
  id: "event_20261007205529_iz8ed",
  title: "日曜劇場「VIVANT」",
  type: "ドラマ",
  members: ["野島瑠玖さん"],
  isRegular: true,
  startTime: "21:00",
  station: "TBS",
  startDate: "2026-10-04",
  links: [
    { name: "公式サイト", url: "https://www.tbs.co.jp/VIVANT_tbs/" },
    { name: "X", url: "https://x.com/tbs_vivant?s=11" },
    { name: "Instagram", url: "https://www.instagram.com/tbs_vivant?stkn=MXExOWo3aml1MnZzZg==" },
    { name: "TikTok", url: "https://www.tiktok.com/@vivant_tbs?lang=ja-JP&is_from_webapp=1&sender_device=mobile&sender_web_id=7690085629354673672" }
  ],
},
  {
  id: "event_20260927103620_jfg5z",
  title: "朱色の仮面",
  type: "アニメ",
  members: ["野島健児さん"],
  isRegular: true,
  startTime: "17:30",
  station: "読売テレビ・日本テレビ系全国ネット",
  startDate: "2026-10-10",
  links: [
    { name: "公式サイト", url: "https://the-vermilion-mask.com/" },
    { name: "X", url: "https://x.com/vermilion_pr?s=11" }
  ],
  description: "ヒエン(CV. 野島健児)\nリスブランの統治隊。\nゴウオンを父親のように強く慕っている。\nある出来事をきっかけにペルを憎むようになり、その行方を追う。",
},
  {
  id: "event_20260923141315_hc0iv",
  title: "ミヤリサン製薬 ラジオ劇場「下町やぶさか診療所」",
  type: "ラジオ",
  members: ["野島裕史さん"],
  isRegular: true,
  startTime: "18:30",
  endTime: "18:45",
  station: "KBC九州朝日放送",
  startDate: "2026-03-30",
  links: [
    { name: "公式サイト", url: "https://kbc.co.jp/r-radio/yabusaka-shinryojo/" },
    { name: "X", url: "https://x.com/yabusaka_kbc?s=11" }
  ]
},
  {
  id: "event_20260923110920_sdoyj",
  title: "サイクリスト・ステーション ツアー・オブ・ジャパン",
  type: "ラジオ",
  members: ["野島裕史さん"],
  isRegular: true,
  startDate: "2015-10-01",
  links: [
    { name: "公式サイト", url: "https://jfn-pods.com/program/24662" },
    { name: "X", url: "https://x.com/toj_info?s=11" }
  ]
}
];
window.NojimaInfoCalendarData = {
  birthdays,
  createBirthdayEvents,
  events,
  regularSchedules
};
if (calendarTitle && calendarDays && selectedDate && monthPicker && prevMonthButton && nextMonthButton) {
  let currentDate = new Date();
  let selectedDateString = "";
const memberOrder = [
  "野島昭生さん",
  "野島裕史さん",
  "野島健児さん",
  "野島透也さん",
  "野島悠生さん",
  "野島瑠玖さん"
];

function formatDate(dateString){
  if(!dateString){ return ""; }
  const [year,month,date] = dateString.split("-").map(Number);
  return `${year}年${month}月${date}日`;
}

function getScheduleLinks(schedule){

  if(Array.isArray(schedule.links)){
    return schedule.links
      .filter(link =>
        link &&
        link.name &&
        link.url
      )
      .map(link => ({
        name: link.name,
        url: link.url
      }));
  }

  /* 古いレギュラー予定データとの互換用 */
  if(Array.isArray(schedule.urls)){
    return schedule.urls
      .filter(url => url)
      .map(url => ({
        name: "公式サイト",
        url
      }));
  }

  /* さらに古い1本だけのリンクとの互換用 */
  if(schedule.url){
    return [
      {
        name: "公式サイト",
        url: schedule.url
      }
    ];
  }

  return [];
}
function getRegularSearchableText(schedule){
  return [
    schedule.title, schedule.type,
    Array.isArray(schedule.members) ? schedule.members.join(" ") : "",
    schedule.broadcastDay, schedule.startDate, schedule.endDate,
    schedule.startTime, schedule.endTime, schedule.openTime,
    schedule.venue, schedule.deliveryPlace, schedule.station,
    schedule.episodes, schedule.releaseDate, schedule.eventDate,
    schedule.deliveryDate, schedule.description
  ].filter(value => value).join(" ").toLowerCase();
}

function getMemberTags(members){
  if(!Array.isArray(members)){ return ""; }
  const orderedMembers = [
    ...memberOrder.filter(member => members.includes(member)),
    ...members.filter(member => !memberOrder.includes(member))
  ];
  return orderedMembers
    .map(member => {
      const displayName = memberOrder.includes(member)
        ? member.replace("野島","")
        : member;
      return `<span>${displayName}</span>`;
    })
    .join("");
}
/* IDを優先してメモを保存。古い予定のメモも引き継ぐ */
function getEventMemoKeys(event){
  const legacyKey = `calendar-memo-${event.date}-${event.title}`;
  return event.id
    ? { primary:`calendar-memo-${event.id}`, legacy:legacyKey }
    : { primary:legacyKey, legacy:"" };
}

function getRegularMemoKeys(schedule){
  const legacyKey =
    `calendar-regular-memo-${schedule.title}-${schedule.startDate || ""}-${schedule.endDate || ""}`;
  return schedule.id
    ? { primary:`calendar-regular-memo-${schedule.id}`, legacy:legacyKey }
    : { primary:legacyKey, legacy:"" };
}

function loadMemo(primaryKey,legacyKey){
  const currentMemo = localStorage.getItem(primaryKey);
  if(currentMemo !== null){ return currentMemo; }

  if(legacyKey){
    const legacyMemo = localStorage.getItem(legacyKey);
    if(legacyMemo !== null){
      localStorage.setItem(primaryKey,legacyMemo);
      return legacyMemo;
    }
  }
  return "";
}
/* レギュラー詳細 */
function createRegularScheduleDetail(schedule,closeCallback){
  const detail = document.createElement("div");
  detail.className = "regular-schedule-detail event-inline-detail";
  const info = document.createElement("div");
  info.className = "event-detail";
  const rows = [];

  if(schedule.type){ rows.push(["種類",schedule.type]); }
  if(Array.isArray(schedule.members) && schedule.members.length > 0){
    rows.push(["出演者",schedule.members.join("、")]);
  }

  switch(schedule.type){
    case "アニメ":
    case "ドラマ":
      if(schedule.broadcastDay){ rows.push(["放送日",schedule.broadcastDay]); }
      if(schedule.startDate){ rows.push(["初回",formatDate(schedule.startDate)]); }
      if(schedule.endDate){ rows.push(["最終回",formatDate(schedule.endDate)]); }
      if(schedule.startTime){ rows.push(["開始時刻",schedule.startTime]); }
      if(schedule.endTime){ rows.push(["終了時刻",schedule.endTime]); }
      if(schedule.episodes){ rows.push(["話数",schedule.episodes]); }
      if(schedule.station){ rows.push(["放送局",schedule.station]); }
      break;

    case "映画":
      if(schedule.releaseDate){ rows.push(["公開日",formatDate(schedule.releaseDate)]); }
      if(schedule.startDate){ rows.push(["初回",formatDate(schedule.startDate)]); }
      if(schedule.endDate){ rows.push(["最終回",formatDate(schedule.endDate)]); }
      break;

    case "ナレーション":
    case "ラジオ":
      if(schedule.broadcastDay){ rows.push(["放送日",schedule.broadcastDay]); }
      if(schedule.startDate){ rows.push(["初回",formatDate(schedule.startDate)]); }
      if(schedule.endDate){ rows.push(["最終回",formatDate(schedule.endDate)]); }
      if(schedule.startTime){ rows.push(["開始時刻",schedule.startTime]); }
      if(schedule.endTime){ rows.push(["終了時刻",schedule.endTime]); }
      if(schedule.station){ rows.push(["放送局",schedule.station]); }
      break;

    case "舞台":
    case "イベント":
      if(schedule.eventDate){ rows.push(["開催日",schedule.eventDate]); }
      if(schedule.startDate){ rows.push(["初回",formatDate(schedule.startDate)]); }
      if(schedule.endDate){ rows.push(["最終回",formatDate(schedule.endDate)]); }
      if(schedule.openTime){ rows.push(["開場時刻",schedule.openTime]); }
      if(schedule.startTime){
        rows.push([schedule.type === "舞台" ? "開演時刻" : "開始時刻",schedule.startTime]);
      }
      if(schedule.endTime){
        rows.push([schedule.type === "舞台" ? "終演時刻" : "終了時刻",schedule.endTime]);
      }
      if(schedule.venue){ rows.push(["場所",schedule.venue]); }
      break;

    case "配信":
      if(schedule.deliveryDate){ rows.push(["配信日",formatDate(schedule.deliveryDate)]); }
      if(schedule.startDate){ rows.push(["初回",formatDate(schedule.startDate)]); }
      if(schedule.endDate){ rows.push(["最終回",formatDate(schedule.endDate)]); }
      if(schedule.startTime){ rows.push(["開始時刻",schedule.startTime]); }
      if(schedule.endTime){ rows.push(["終了時刻",schedule.endTime]); }
      if(schedule.deliveryPlace){ rows.push(["配信場所",schedule.deliveryPlace]); }
      break;

    case "CD":
    case "DVD":
      if(schedule.releaseDate){ rows.push(["発売日",formatDate(schedule.releaseDate)]); }
      break;

    default:
      if(schedule.broadcastDay){ rows.push(["放送日",schedule.broadcastDay]); }
      if(schedule.startDate){ rows.push(["初回",formatDate(schedule.startDate)]); }
      if(schedule.endDate){ rows.push(["最終回",formatDate(schedule.endDate)]); }
      if(schedule.startTime){ rows.push(["開始時刻",schedule.startTime]); }
      if(schedule.endTime){ rows.push(["終了時刻",schedule.endTime]); }
      if(schedule.venue){ rows.push(["場所",schedule.venue]); }
  }

  if(Array.isArray(schedule.prices) && schedule.prices.length){
    rows.push(["価格",schedule.prices.join("\n")]);
  }

  if(rows.length){
    const dl = document.createElement("dl");

    rows.forEach(([label,value]) => {
      const dt = document.createElement("dt");
      dt.textContent = label;

      const dd = document.createElement("dd");
      dd.textContent = value;

      if(label === "価格"){
        dd.style.whiteSpace = "pre-line";
      }

      dl.appendChild(dt);
      dl.appendChild(dd);
    });

    info.appendChild(dl);
  }

  const links = getScheduleLinks(schedule);

  if(links.length){
    const dl = info.querySelector("dl") || document.createElement("dl");
    const dt = document.createElement("dt");
    dt.textContent = "公式リンク";

    const dd = document.createElement("dd");

    links.forEach(linkData => {
      const link = document.createElement("a");
      link.href = linkData.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = linkData.name;
      dd.appendChild(link);
    });

    dl.appendChild(dt);
    dl.appendChild(dd);

    if(!info.querySelector("dl")){
      info.appendChild(dl);
    }
  }

  if(schedule.description){
    const description = document.createElement("p");
    description.className = "event-description";
    description.textContent = schedule.description;
    info.appendChild(description);
  }

  detail.appendChild(info);

  const memoLabel = document.createElement("label");
  memoLabel.className = "event-memo-label";
  memoLabel.textContent = "メモ";

  const memo = document.createElement("textarea");
  memo.className = "event-memo";
  memo.placeholder = "このメモは自分以外には表示されません";
  memo.rows = 5;

  const memoKeys = getRegularMemoKeys(schedule);
  memo.value = loadMemo(memoKeys.primary,memoKeys.legacy);

  memoLabel.htmlFor = `regular-memo-${schedule.id || schedule.title}`;
  memo.id = memoLabel.htmlFor;

  const saveMemoButton = document.createElement("button");
  saveMemoButton.type = "button";
  saveMemoButton.className = "event-memo-save";
  saveMemoButton.textContent = "保存";

  saveMemoButton.addEventListener("click",() => {
    localStorage.setItem(memoKeys.primary,memo.value);
    saveMemoButton.textContent = "保存しました";
    setTimeout(() => {
      saveMemoButton.textContent = "保存";
    },1500);
  });

  detail.appendChild(memoLabel);
  detail.appendChild(memo);
  detail.appendChild(saveMemoButton);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "event-back-button";
  closeButton.textContent = "閉じる";

  closeButton.addEventListener("click",() => {
    if(typeof closeCallback === "function"){
      closeCallback();
    }else{
      detail.remove();
    }
  });

  detail.appendChild(closeButton);

  return detail;
}
function getActiveRegularSchedules(year,month,lastDate){
  const currentMonthStart = `${year}-${String(month + 1).padStart(2,"0")}-01`;
  const currentMonthEnd = `${year}-${String(month + 1).padStart(2,"0")}-${String(lastDate).padStart(2,"0")}`;
  return regularSchedules.filter(schedule => {
    const startsBeforeMonthEnd = !schedule.startDate || schedule.startDate <= currentMonthEnd;
    const hasNotEnded = !schedule.endDate || schedule.endDate >= currentMonthStart;
    return startsBeforeMonthEnd && hasNotEnded;
  });
}

function renderRegularSchedules(year,month,lastDate){
  const regularScheduleList = document.querySelector("#regular-schedule-list");
  if(!regularScheduleList){ return; }
  regularScheduleList.innerHTML = "";
  const activeRegularSchedules = getActiveRegularSchedules(year,month,lastDate);

  if(activeRegularSchedules.length === 0){
    regularScheduleList.innerHTML = "<p>この月のレギュラー予定はありません。</p>";
    return;
  }

  activeRegularSchedules.forEach(schedule => {
  const wrapper = document.createElement("div");
  wrapper.className = "regular-schedule-item";
  const item = document.createElement("button");
  item.type = "button";
  item.className = "event-item";
  item.innerHTML = `<strong>${schedule.title}</strong><span>${schedule.type}</span>`;
  item.addEventListener("click",() => {
  if(item.classList.contains("selected-search-event")){
    item.classList.remove("selected-search-event");
    const detail=wrapper.querySelector(".regular-schedule-detail");
    if(detail){ detail.remove(); }
    const spacer=wrapper.nextElementSibling;
    if(spacer && spacer.classList.contains("regular-schedule-spacer")){
      spacer.remove();
    }
    return;
  }
  item.classList.add("selected-search-event");
  showRegularScheduleDetail(schedule,wrapper);
});
  wrapper.appendChild(item);
  regularScheduleList.appendChild(wrapper);
});
}
function showRegularScheduleDetail(schedule,wrapper){
  if(!wrapper){ return; }
  const oldSpacer=wrapper.nextElementSibling;
  if(oldSpacer && oldSpacer.classList.contains("regular-schedule-spacer")){
    oldSpacer.remove();
  }
  const spacer=document.createElement("div");
  spacer.className="regular-schedule-spacer";
  spacer.style.height="20px";
  spacer.style.minHeight="20px";
  spacer.style.flex="0 0 20px";
  spacer.setAttribute("aria-hidden","true");
  let detail;
  detail=createRegularScheduleDetail(schedule,()=>{
    detail.remove();
    const item=wrapper.querySelector(".event-item");
    if(item){
      item.classList.remove("selected-search-event");
    }
    spacer.remove();
  });
  wrapper.appendChild(detail);
  wrapper.after(spacer);
}
/* カレンダー */
function renderCalendar(){
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const birthdayEvents = createBirthdayEvents(year);
  calendarTitle.textContent = `${year}年${month + 1}月`;
  monthPicker.value = `${year}-${String(month + 1).padStart(2,"0")}`;
  calendarDays.innerHTML = "";
  const firstDay = new Date(year,month,1).getDay();
  const lastDate = new Date(year,month + 1,0).getDate();
  const previousLastDate = new Date(year,month,0).getDate();
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  for(let i = firstDay - 1;i >= 0;i--){
    const day = document.createElement("button");
    day.type = "button";
    day.className = "calendar-day other-month";
    day.textContent = previousLastDate - i;
    day.disabled = true;
    calendarDays.appendChild(day);
  }
  for(let date = 1;date <= lastDate;date++){
    const day = document.createElement("button");
    day.type = "button";
    day.className = "calendar-day";
    day.dataset.date = `${year}-${String(month + 1).padStart(2,"0")}-${String(date).padStart(2,"0")}`;
    day.innerHTML = `<span class="calendar-day-number">${date}</span>`;
    if(day.dataset.date === todayString){
      day.classList.add("today");
      day.innerHTML += `<span class="calendar-today">Today</span>`;
    }
    const hasEvent = events.some(event => event.date === day.dataset.date);
    const hasBirthday = birthdayEvents.some(event => event.date === day.dataset.date);
    if(hasEvent || hasBirthday){
      day.classList.add("has-event");
    }
    if(day.dataset.date === selectedDateString){
      day.classList.add("selected");
    }
    day.addEventListener("click",() => { showSelectedDate(day.dataset.date); });
    calendarDays.appendChild(day);
  }
  const totalCells = firstDay + lastDate;
  const remainingCells = (7 - totalCells % 7) % 7;
  for(let date = 1;date <= remainingCells;date++){
    const day = document.createElement("button");
    day.type = "button";
    day.className = "calendar-day other-month";
    day.textContent = date;
    day.disabled = true;
    calendarDays.appendChild(day);
  }
  renderRegularSchedules(year,month,lastDate);
}
function showSelectedDate(dateString){
  selectedDateString = dateString;
  document.querySelectorAll(".calendar-day.selected").forEach(day => day.classList.remove("selected"));
  const selectedDay = document.querySelector(`.calendar-day[data-date="${dateString}"]`);
  if(selectedDay){ selectedDay.classList.add("selected"); }
  const [year,month,date] = dateString.split("-").map(Number);
  const dayEvents = [
    ...events.filter(event => event.date === dateString),
    ...createBirthdayEvents(year).filter(event => event.date === dateString)
  ];
  selectedDate.hidden = false;
  selectedDate.innerHTML = `<h3>${year}年${month}月${date}日</h3>`;
  if(dayEvents.length === 0){
    selectedDate.innerHTML += "<p>この日の予定はありません。</p>";
    return;
  }
  const eventList = document.createElement("div");
  eventList.className = "event-list";
  dayEvents.forEach(event => {
    const eventEntry = document.createElement("div");
    eventEntry.className = "event-entry";
    const eventItem = document.createElement("button");
    eventItem.type = "button";
    eventItem.className = "event-item";
    eventItem.innerHTML = `<strong>${event.title}</strong><span>${event.type}</span>`;
    const detailContainer = document.createElement("div");
    detailContainer.className = "event-inline-detail";
    detailContainer.hidden = true;
    eventItem.addEventListener("click",() => {
      if(!detailContainer.hidden){
        detailContainer.hidden = true;
        detailContainer.innerHTML = "";
        eventItem.classList.remove("selected-search-event");
        return;
      }
    detailContainer.hidden = false;
detailContainer.style.marginBottom = "20px";
eventItem.classList.add("selected-search-event");
showEventDetail(event,detailContainer);  
    });
    eventEntry.appendChild(eventItem);
    eventEntry.appendChild(detailContainer);
    eventList.appendChild(eventEntry);
  });
  selectedDate.appendChild(eventList);
}
function showEventDetail(event,detailContainer){
  detailContainer.innerHTML = "";
  if(!event.isBirthday){
    const detail = document.createElement("div");
    detail.className = "event-detail";
    const eventLinks = getScheduleLinks(event);
    const eventLinksHtml = eventLinks.length
      ? `<dt>公式リンク</dt><dd>${eventLinks.map(link => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>`).join("<br>")}</dd>`
      : "";
    detail.innerHTML = `
      <dl>
        <dt>種類</dt><dd>${event.type}</dd>
        <dt>出演者</dt><dd>${(event.members || []).join("、")}</dd>
        ${event.openTime ? `<dt>開場時刻</dt><dd>${event.openTime}</dd>` : ""}
        ${event.startTime ? `<dt>${event.type === "舞台" ? "開演時間" : "開始時間"}</dt><dd>${event.startTime}</dd>` : ""}
        ${event.endTime ? `<dt>${event.type === "舞台" ? "終演時間" : "終了時間"}</dt><dd>${event.endTime}</dd>` : ""}
        ${event.venue ? `<dt>会場</dt><dd>${event.venue}</dd>` : ""}
        ${event.deliveryPlace ? `<dt>配信場所</dt><dd>${event.deliveryPlace}</dd>` : ""}
        ${Array.isArray(event.prices) && event.prices.length ? `<dt>価格</dt><dd>${event.prices.map(price => String(price).replace(/\n/g,"<br>")).join("<br>")}</dd>` : ""}
        ${eventLinksHtml}
      </dl>
      ${event.description ? `<p class="event-description">${event.description}</p>` : ""}
    `;
    detailContainer.appendChild(detail);
  }
  const memoLabel = document.createElement("label");
  memoLabel.className = "event-memo-label";
  memoLabel.textContent = "メモ";
  const memo = document.createElement("textarea");
  memo.className = "event-memo";
  memo.placeholder = "このメモは自分以外には表示されません";
  memo.rows = 5;
  const memoKeys = getEventMemoKeys(event);
  memo.value = loadMemo(memoKeys.primary,memoKeys.legacy);
  memoLabel.htmlFor = `memo-${event.id || event.date}`;
  memo.id = memoLabel.htmlFor;
  const saveMemoButton = document.createElement("button");
  saveMemoButton.type = "button";
  saveMemoButton.className = "event-memo-save";
  saveMemoButton.textContent = "保存";
  saveMemoButton.addEventListener("click",() => {
    localStorage.setItem(memoKeys.primary,memo.value);
    saveMemoButton.textContent = "保存しました";
    setTimeout(() => { saveMemoButton.textContent = "保存"; },1500);
  });
  detailContainer.appendChild(memoLabel);
  detailContainer.appendChild(memo);
  detailContainer.appendChild(saveMemoButton);
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "event-back-button";
  closeButton.textContent = "閉じる";
  closeButton.addEventListener("click",() => {
    detailContainer.hidden = true;
    detailContainer.innerHTML = "";
    const eventItem = detailContainer.previousElementSibling;
    if(eventItem){ eventItem.classList.remove("selected-search-event"); }
  });
  detailContainer.appendChild(closeButton);
}
prevMonthButton.addEventListener("click",() => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click",() => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

monthPicker.addEventListener("change",() => {
  if(!monthPicker.value){ return; }
  const [year,month] = monthPicker.value.split("-").map(Number);
  currentDate = new Date(year,month - 1,1);
  renderCalendar();
});

renderCalendar();

/* 検索パネル */
const searchToggle = document.querySelector("#search-toggle");
const searchPanel = document.querySelector("#calendar-search-panel");
const searchToggleIcon = document.querySelector("#search-toggle-icon");

searchToggle.addEventListener("click",() => {
  const isOpen = searchPanel.hidden;
  searchPanel.hidden = !isOpen;
  searchToggle.setAttribute("aria-expanded",String(isOpen));
  searchToggleIcon.textContent = isOpen ? "－" : "＋";
});

/* 検索 */
const searchResults = document.querySelector("#search-results");
const searchResultCount = document.querySelector("#search-result-count");
const searchResultList = document.querySelector("#search-result-list");
const memberCheckboxes = document.querySelectorAll('input[name="member"]');
const typeCheckboxes = document.querySelectorAll('input[name="type"]');
const keywordInput = document.querySelector("#search-keyword");
const searchGroups = document.querySelectorAll(".search-group");
const searchRegular = document.querySelector("#search-regular");
let committedKeyword = "";

function updateSearchResults(){
  const selectedMembers = [...memberCheckboxes].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  const selectedTypes = [...typeCheckboxes].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  const keyword = committedKeyword.toLowerCase();
  const includeRegular = searchRegular ? searchRegular.checked : false;

  const filteredEvents = events.filter(event => {
    if(event.isBirthday){
  return false;
}
    const memberMatch = selectedMembers.length === 0 || selectedMembers.some(member => event.members.includes(member));
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(event.type);
   const searchableText = [
  event.title,
  event.type,
  event.members.join(" "),
  event.date,
  event.startTime,
  event.endTime,
  event.venue,
  event.deliveryPlace,
  event.description,
  Array.isArray(event.prices) ? event.prices.join(" ") : ""
].filter(value => value).join(" ").toLowerCase();
    const keywordMatch = keyword === "" || searchableText.includes(keyword);
    return memberMatch && typeMatch && keywordMatch;
  });

  const filteredRegularSchedules = includeRegular ? regularSchedules.filter(schedule => {
    const members = Array.isArray(schedule.members) ? schedule.members : [];
    const memberMatch = selectedMembers.length === 0 || selectedMembers.some(member => members.includes(member));
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(schedule.type);
    const searchableText = getRegularSearchableText(schedule);
    const keywordMatch = keyword === "" || searchableText.includes(keyword);
    return memberMatch && typeMatch && keywordMatch;
  }) : [];

  const totalResults = filteredEvents.length + filteredRegularSchedules.length;
  searchResults.hidden = false;
  searchResultCount.textContent = `ヒット数・${totalResults}件`;
  searchResultList.innerHTML = "";

  if(totalResults === 0){
    searchResultList.innerHTML = "<p>条件に一致する予定はありません。</p>";
    return;
  }

    filteredEvents.forEach(event => {

    const [year,month,date] =
      event.date
        .split("-")
        .map(Number);

    const wrapper =
      document.createElement("div");

    wrapper.className =
      "search-normal-result";

    const eventItem =
      document.createElement("button");

    eventItem.type = "button";

    eventItem.className =
      "event-item";

    const memberTags =
      getMemberTags(event.members);

    eventItem.innerHTML = `
      <div class="search-result-info">
        <small>${year}年${month}月${date}日</small>
        <strong>${event.title}</strong>
      </div>

      <div class="search-result-tags">
        ${memberTags}
        <span>${event.type}</span>
      </div>
    `;

    const detail =
      document.createElement("div");

    detail.className =
      "search-normal-detail";

    detail.hidden = true;

    eventItem.addEventListener("click",() => {

      if(detail.hidden){
        eventItem.classList.add("selected-search-event");

        detail.innerHTML = "";

        const title =
          document.createElement("h3");

        title.textContent =
          event.title;

        detail.appendChild(title);

        const info =
          document.createElement("div");

        info.className =
          "event-detail";
        const eventLinks =
  getScheduleLinks(event);

const eventLinksHtml =
  eventLinks.length
    ? `
      <dt>公式リンク</dt>
      <dd>
        ${eventLinks.map(link => `
          <a
            href="${link.url}"
            target="_blank"
            rel="noopener noreferrer"
          >${link.name}</a>
        `).join("")}
      </dd>
    `
    : "";

        const dl =
          document.createElement("dl");

        const typeDt =
          document.createElement("dt");

        typeDt.textContent =
          "種類";

        const typeDd =
          document.createElement("dd");

        typeDd.textContent =
          event.type;

        dl.appendChild(typeDt);
        dl.appendChild(typeDd);

        if(
          Array.isArray(event.members) &&
          event.members.length > 0
        ){

          const memberDt =
            document.createElement("dt");

          memberDt.textContent =
            "出演者";

          const memberDd =
            document.createElement("dd");

          memberDd.textContent =
            event.members.join("、");

          dl.appendChild(memberDt);
          dl.appendChild(memberDd);
        }

        if(event.startTime){
  const timeDt = document.createElement("dt");
  timeDt.textContent = event.type === "舞台" ? "開演時間" : event.type === "イベント" ? "開始時間" : "開始時間";
  const timeDd = document.createElement("dd");
  timeDd.textContent = event.startTime;
  dl.appendChild(timeDt);
  dl.appendChild(timeDd);
}
if(event.endTime){
  const timeDt = document.createElement("dt");
  timeDt.textContent = event.type === "舞台" ? "終演時間" : event.type === "イベント" ? "終了時間" : "終了時間";
  const timeDd = document.createElement("dd");
  timeDd.textContent = event.endTime;
  dl.appendChild(timeDt);
  dl.appendChild(timeDd);
}

        if(event.venue){

          const venueDt =
            document.createElement("dt");

          venueDt.textContent =
            "会場";

          const venueDd =
            document.createElement("dd");

          venueDd.textContent =
            event.venue;

          dl.appendChild(venueDt);
          dl.appendChild(venueDd);
        }
if(Array.isArray(event.prices) && event.prices.length){

  const priceDt =
    document.createElement("dt");

  priceDt.textContent =
    event.type === "舞台" || event.type === "イベント"
      ? "価格"
      : "価格";

  const priceDd =
    document.createElement("dd");

  priceDd.innerHTML =
    event.prices
      .map(price => String(price).replace(/\n/g,"<br>"))
      .join("<br>");

  dl.appendChild(priceDt);
  dl.appendChild(priceDd);
}
        if(eventLinks.length){

  const linkDt =
    document.createElement("dt");

  linkDt.textContent =
    "公式リンク";

  const linkDd =
    document.createElement("dd");

  eventLinks.forEach(linkData => {

    const link =
      document.createElement("a");

    link.href =
      linkData.url;

    link.target =
      "_blank";

    link.rel =
      "noopener noreferrer";

    link.textContent =
      linkData.name;

    linkDd.appendChild(link);
  });

  dl.appendChild(linkDt);
  dl.appendChild(linkDd);
}
        info.appendChild(dl);

                if(event.description){

          const description =
            document.createElement("p");

          description.className =
            "event-description";

          description.textContent =
            event.description;

          info.appendChild(
            description
          );
        }
        detail.appendChild(info);

        /* =========================
           メモ
        ========================= */

        const memoLabel =
          document.createElement("label");

        memoLabel.className =
          "event-memo-label";

        memoLabel.textContent =
          "メモ";

        const memo =
          document.createElement("textarea");

        memo.className =
          "event-memo";

        memo.placeholder =
          "このメモは自分以外には表示されません";

        memo.rows = 5;

        const memoKeys =
          getEventMemoKeys(event);

        memo.value =
          loadMemo(
            memoKeys.primary,
            memoKeys.legacy
          );

        const saveMemoButton =
          document.createElement("button");

        saveMemoButton.type =
          "button";

        saveMemoButton.className =
          "event-memo-save";

        saveMemoButton.textContent =
          "保存";

        saveMemoButton.addEventListener(
          "click",
          () => {

            localStorage.setItem(
              memoKeys.primary,
              memo.value
            );

            saveMemoButton.textContent =
              "保存しました";

            setTimeout(() => {

              saveMemoButton.textContent =
                "保存";

            },1500);
          }
        );

        detail.appendChild(
          memoLabel
        );

        detail.appendChild(
          memo
        );

        detail.appendChild(
          saveMemoButton
        );

        /* =========================
           閉じる
        ========================= */

        const closeButton =
          document.createElement("button");

        closeButton.type =
          "button";

        closeButton.className =
          "event-back-button";

        closeButton.textContent =
          "閉じる";

        closeButton.addEventListener(
          "click",
          () => {

            detail.hidden = true;

          }
        );

        detail.appendChild(
          closeButton
        );

        detail.hidden = false;

      }else{

        detail.hidden = true;
        eventItem.classList.remove("selected-search-event");

      }

    });

    wrapper.appendChild(
      eventItem
    );

    wrapper.appendChild(
      detail
    );

    searchResultList.appendChild(
      wrapper
    );

  });

  filteredRegularSchedules.forEach(schedule => {
    const wrapper = document.createElement("div");
    wrapper.className = "search-regular-result";

    const eventItem = document.createElement("button");
    eventItem.type = "button";
    eventItem.className = "event-item";

    const memberTags = getMemberTags(schedule.members);
    const regularDate = schedule.startDate ? formatDate(schedule.startDate) : "レギュラー";

    eventItem.innerHTML = `
      <div class="search-result-info">
        <small>${regularDate}</small>
        <strong>${schedule.title}</strong>
      </div>
      <div class="search-result-tags">${memberTags}<span>${schedule.type}</span><span>レギュラー</span></div>
    `;

    const detail = document.createElement("div");
    detail.className = "search-regular-detail";
    detail.hidden = true;

    eventItem.addEventListener("click",() => {
  if(detail.hidden){
    eventItem.classList.add("selected-search-event");
    const newDetail = createRegularScheduleDetail(schedule,() => {
      detail.hidden = true;
      eventItem.classList.remove("selected-search-event");
    });
    detail.innerHTML = "";
    detail.appendChild(newDetail);
    detail.hidden = false;
  }else{
    detail.hidden = true;
    eventItem.classList.remove("selected-search-event");
  }
});
    wrapper.appendChild(eventItem);
    wrapper.appendChild(detail);
    searchResultList.appendChild(wrapper);
  });
}

memberCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change",() => { updateSearchResults(); });
});

typeCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change",() => { updateSearchResults(); });
});

if(searchRegular){
  searchRegular.addEventListener("change",() => { updateSearchResults(); });
}

searchGroups[0].querySelector(".clear-button").addEventListener("click",() => {
  memberCheckboxes.forEach(checkbox => { checkbox.checked = false; });
  updateSearchResults();
});

searchGroups[1].querySelector(".clear-button").addEventListener("click",() => {
  typeCheckboxes.forEach(checkbox => { checkbox.checked = false; });
  updateSearchResults();
});

searchGroups[2].querySelector(".search-button").addEventListener("click",() => {
  committedKeyword = keywordInput.value.trim();
  updateSearchResults();
  searchResults.scrollIntoView({behavior:"smooth",block:"start"});
});

searchGroups[2].querySelector(".clear-button").addEventListener("click",() => {
  keywordInput.value = "";
  committedKeyword = "";
  updateSearchResults();
});

searchGroups[0].querySelector(".search-button").addEventListener("click",() => {
  searchGroups[2].scrollIntoView({behavior:"smooth",block:"center"});
});

searchGroups[1].querySelector(".search-button").addEventListener("click",() => {
  searchGroups[2].scrollIntoView({behavior:"smooth",block:"center"});
});
/* レギュラー予定パネル */
const regularScheduleToggle = document.querySelector("#regular-schedule-toggle");
const regularSchedulePanel = document.querySelector("#regular-schedule-panel");
const regularScheduleToggleIcon = document.querySelector("#regular-schedule-toggle-icon");

regularScheduleToggle.addEventListener("click",() => {
  const isOpen = regularSchedulePanel.hidden;
  regularSchedulePanel.hidden = !isOpen;
  regularScheduleToggle.setAttribute("aria-expanded",String(isOpen));
  regularScheduleToggleIcon.textContent = isOpen ? "－" : "＋";
});
}
