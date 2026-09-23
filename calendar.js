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
  id: "event_20260923143325_jcsaa",
  title: "超訳文学 太宰治 ～一人芝居、あるいは二人芝居～",
  type: "イベント",
  members: ["野島裕史さん", "沼倉愛美さん"],
  isRegular: false,
  date: "2026-10-08",
  openTime: "19:00",
  startTime: "19:30",
  venue: "アニメイトシアター(アニメイト池袋本店 B2F)",
  links: [
    { name: "公式サイト", url: "https://www.fwinc.co.jp/rabbit-note-project/archive/ws-dazai/" },
    { name: "X", url: "https://x.com/rabbit_note_p?s=11" }
  ],
  description: "チケット料金\n【現地】6000円(税込・全席指定)\n【配信】3500円(税込)\n\n現地チケット一般先着販売期間\n9月19日 12 : 00 ～ 10月8日 19 : 30\n\n配信チケット販売期間\n9月19日 12 : 00 ～10月20日 23 : 59",
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
  id: "event_20260923135425_ay7uo",
  title: "秋の夜長のゆったり配信",
  type: "配信",
  members: ["野島健児さん"],
  isRegular: false,
  date: "2026-09-22",
  startTime: "20:00",
  endTime: "21:30",
  deliveryPlace: "Peatix",
  links: [
    { name: "公式サイト", url: "https://peatix.com/event/5190220" },
    { name: "X", url: "https://x.com/nojimakyodai?s=11" }
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
  detail.className = "regular-schedule-detail";

  const title = document.createElement("h3");
  title.textContent = schedule.title;
  detail.appendChild(title);

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
      if(schedule.releaseDate){ rows.push(["公開日",schedule.releaseDate]); }
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
      if(schedule.deliveryDate){ rows.push(["配信日",schedule.deliveryDate]); }
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

  if(rows.length){
    const dl = document.createElement("dl");
    rows.forEach(([label,value]) => {
      const dt = document.createElement("dt");
      dt.textContent = label;
      const dd = document.createElement("dd");
      dd.textContent = value;
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    info.appendChild(dl);
  }

  const links = getScheduleLinks(schedule);

if(links.length){

  const dl =
    info.querySelector("dl") ||
    document.createElement("dl");

  const dt =
    document.createElement("dt");

  dt.textContent =
    "公式リンク";

  const dd =
    document.createElement("dd");

  links.forEach(linkData => {

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

  const saveMemoButton = document.createElement("button");
  saveMemoButton.type = "button";
  saveMemoButton.className = "event-memo-save";
  saveMemoButton.textContent = "保存";
  saveMemoButton.addEventListener("click",() => {
    localStorage.setItem(memoKeys.primary,memo.value);
    saveMemoButton.textContent = "保存しました";
    setTimeout(() => { saveMemoButton.textContent = "保存"; },1500);
  });

  detail.appendChild(memoLabel);
  detail.appendChild(memo);
  detail.appendChild(saveMemoButton);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "event-back-button";
  closeButton.textContent = "閉じる";
  closeButton.addEventListener("click",() => {
    if(typeof closeCallback === "function"){ closeCallback(); }
    else { detail.remove(); }
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
  const item = document.createElement("button");
  item.type = "button";
  item.className = "event-item";
  item.innerHTML = `<strong>${schedule.title}</strong><span>${schedule.type}</span>`;
  item.addEventListener("click",() => {
    if(item.classList.contains("selected-search-event")){
      item.classList.remove("selected-search-event");
      const detail = regularScheduleList.querySelector(".regular-schedule-detail");
      if(detail){ detail.remove(); }
      return;
    }
    regularScheduleList.querySelectorAll(".event-item.selected-search-event").forEach(selectedItem => {
      selectedItem.classList.remove("selected-search-event");
    });
    const existingDetail = regularScheduleList.querySelector(".regular-schedule-detail");
    if(existingDetail){ existingDetail.remove(); }
    item.classList.add("selected-search-event");
    showRegularScheduleDetail(schedule);
  });
  regularScheduleList.appendChild(item);
});
}

function showRegularScheduleDetail(schedule){
  const panel = document.querySelector("#regular-schedule-panel");
  if(!panel){ return; }
  const existingDetail = panel.querySelector(".regular-schedule-detail");
  if(existingDetail){ existingDetail.remove(); }
  panel.appendChild(createRegularScheduleDetail(schedule));
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
    const eventItem = document.createElement("button");
    eventItem.type = "button";
    eventItem.className = "event-item";
    eventItem.innerHTML = `<strong>${event.title}</strong><span>${event.type}</span>`;
    eventItem.addEventListener("click",() => { showEventDetail(event); });
    eventList.appendChild(eventItem);
  });

  selectedDate.appendChild(eventList);
}

function showEventDetail(event){
  selectedDate.innerHTML = "";

  const dateTitle = document.createElement("h3");
  dateTitle.textContent = formatDate(event.date);
  selectedDate.appendChild(dateTitle);

  const title = document.createElement("p");
  title.textContent = event.title;
  title.style.fontWeight = "bold";
  title.style.marginBottom = "16px";
  selectedDate.appendChild(title);
if(!event.isBirthday){
  const detail = document.createElement("div");
  detail.className = "event-detail";

  const eventLinks = getScheduleLinks(event);

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

  detail.innerHTML = `
    <dl>
      <dt>種類</dt><dd>${event.type}</dd>
      <dt>出演者</dt><dd>${event.members.join("、")}</dd>
      ${event.startTime || event.endTime ? `<dt>時間</dt><dd>${event.startTime || ""}${event.startTime || event.endTime ? "〜" : ""}${event.endTime || ""}</dd>` : ""}
      ${event.venue ? `<dt>会場</dt><dd>${event.venue}</dd>` : ""}
      ${eventLinksHtml}
    </dl>
    ${event.description ? `<p>${event.description}</p>` : ""}
  `;

  selectedDate.appendChild(detail);
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

  const saveMemoButton = document.createElement("button");
  saveMemoButton.type = "button";
  saveMemoButton.className = "event-memo-save";
  saveMemoButton.textContent = "保存";
  saveMemoButton.addEventListener("click",() => {
    localStorage.setItem(memoKeys.primary,memo.value);
    saveMemoButton.textContent = "保存しました";
    setTimeout(() => { saveMemoButton.textContent = "保存"; },1500);
  });

  selectedDate.appendChild(memoLabel);
  selectedDate.appendChild(memo);
  selectedDate.appendChild(saveMemoButton);

  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.className = "event-back-button";
  backButton.textContent = "閉じる";
  backButton.addEventListener("click",() => { showSelectedDate(event.date); });
  selectedDate.appendChild(backButton);
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
    const searchableText = [event.title,event.type,event.members.join(" "),event.venue,event.description].filter(value => value).join(" ").toLowerCase();
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

        if(
          event.startTime ||
          event.endTime
        ){

          const timeDt =
            document.createElement("dt");

          timeDt.textContent =
            "時間";

          const timeDd =
            document.createElement("dd");

          timeDd.textContent =
            `${event.startTime || ""}${event.startTime || event.endTime ? "〜" : ""}${event.endTime || ""}`;

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
