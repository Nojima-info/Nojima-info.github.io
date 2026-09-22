const calendarTitle = document.querySelector("#calendar-title");
const calendarDays = document.querySelector("#calendar-days");
const selectedDate = document.querySelector("#selected-date");
const monthPicker = document.querySelector("#month-picker");
const prevMonthButton = document.querySelector("#prev-month");
const nextMonthButton = document.querySelector("#next-month");

const events = [
  {
    date:"2026-09-18",
    title:"テスト予定",
    type:"予定",
    members:["野島裕史さん"],
    startTime:"18:00",
    endTime:"20:00",
    venue:"○○ホール",
    url:"https://example.com",
    description:"これはテスト用の予定です。"
  },
  {
    date:"2026-09-25",
    title:"もうひとつのテスト予定",
    type:"イベント",
    members:["野島健児さん","野島裕史さん"],
    startTime:"14:00",
    endTime:"16:00",
    venue:"○○会館",
    url:"",
    description:"こちらもテスト用の予定です。"
  }
];

const regularSchedules = [
  {
    title:"テスト用レギュラー",
    type:"ラジオ",
    members:["野島裕史さん"],
    startDate:"2026-09-01",
    endDate:"",
    broadcastDay:"",
    startTime:"",
    endTime:"",
    venue:"",
    url:"",
    urls:[],
    description:"これはテスト用のレギュラー予定です。"
  }
];

let currentDate = new Date();
let selectedDateString = "";

/* =========================
   共通
========================= */

const memberOrder = [
  "野島昭生さん",
  "野島裕史さん",
  "野島健児さん",
  "野島透也さん",
  "野島悠生さん",
  "野島瑠玖さん"
];

function formatDate(dateString){
  if(!dateString){
    return "";
  }

  const [year,month,date] =
    dateString.split("-").map(Number);

  return `${year}年${month}月${date}日`;
}

function getRegularUrls(schedule){
  if(Array.isArray(schedule.urls)){
    return schedule.urls.filter(url => url);
  }

  if(schedule.url){
    return [schedule.url];
  }

  return [];
}

function getRegularSearchableText(schedule){
  return [
    schedule.title,
    schedule.type,
    Array.isArray(schedule.members)
      ? schedule.members.join(" ")
      : "",
    schedule.broadcastDay,
    schedule.startDate,
    schedule.endDate,
    schedule.startTime,
    schedule.endTime,
    schedule.openTime,
    schedule.venue,
    schedule.deliveryPlace,
    schedule.station,
    schedule.episodes,
    schedule.releaseDate,
    schedule.eventDate,
    schedule.deliveryDate,
    schedule.description
  ]
    .filter(value => value)
    .join(" ")
    .toLowerCase();
}

function getMemberTags(members){
  if(!Array.isArray(members)){
    return "";
  }

  return memberOrder
    .filter(member => members.includes(member))
    .map(member =>
      `<span>${member.replace("野島","")}</span>`
    )
    .join("");
}

/* =========================
   レギュラー詳細を作成
========================= */

function createRegularScheduleDetail(schedule,closeCallback){

  const detail =
    document.createElement("div");

  detail.className =
    "regular-schedule-detail";

  const title =
    document.createElement("h3");

  title.textContent =
    schedule.title;

  detail.appendChild(title);

  const info =
    document.createElement("div");

  info.className =
    "event-detail";

  const rows = [];

  if(schedule.type){
    rows.push([
      "種類",
      schedule.type
    ]);
  }

  if(
    Array.isArray(schedule.members) &&
    schedule.members.length > 0
  ){
    rows.push([
      "出演者",
      schedule.members.join("、")
    ]);
  }

  switch(schedule.type){

    case "アニメ":

      if(schedule.broadcastDay){
        rows.push([
          "放送日",
          schedule.broadcastDay
        ]);
      }

      if(schedule.startDate){
        rows.push([
          "初回",
          formatDate(schedule.startDate)
        ]);
      }

      if(schedule.endDate){
        rows.push([
          "最終回",
          formatDate(schedule.endDate)
        ]);
      }

      if(schedule.startTime){
        rows.push([
          "開始時刻",
          schedule.startTime
        ]);
      }

      if(schedule.endTime){
        rows.push([
          "終了時刻",
          schedule.endTime
        ]);
      }

      if(schedule.episodes){
        rows.push([
          "話数",
          schedule.episodes
        ]);
      }

      if(schedule.station){
        rows.push([
          "放送局",
          schedule.station
        ]);
      }

      break;

    case "ドラマ":

      if(schedule.broadcastDay){
        rows.push([
          "放送日",
          schedule.broadcastDay
        ]);
      }

      if(schedule.startDate){
        rows.push([
          "初回",
          formatDate(schedule.startDate)
        ]);
      }

      if(schedule.endDate){
        rows.push([
          "最終回",
          formatDate(schedule.endDate)
        ]);
      }

      if(schedule.startTime){
        rows.push([
          "開始時刻",
          schedule.startTime
        ]);
      }

      if(schedule.endTime){
        rows.push([
          "終了時刻",
          schedule.endTime
        ]);
      }

      if(schedule.episodes){
        rows.push([
          "話数",
          schedule.episodes
        ]);
      }

      if(schedule.station){
        rows.push([
          "放送局",
          schedule.station
        ]);
      }

      break;

    case "映画":

      if(schedule.releaseDate){
        rows.push([
          "公開日",
          schedule.releaseDate
        ]);
      }

      if(schedule.startDate){
        rows.push([
          "初回",
          formatDate(schedule.startDate)
        ]);
      }

      if(schedule.endDate){
        rows.push([
          "最終回",
          formatDate(schedule.endDate)
        ]);
      }

      break;

    case "ナレーション":

      if(schedule.broadcastDay){
        rows.push([
          "放送日",
          schedule.broadcastDay
        ]);
      }

      if(schedule.startDate){
        rows.push([
          "初回",
          formatDate(schedule.startDate)
        ]);
      }

      if(schedule.endDate){
        rows.push([
          "最終回",
          formatDate(schedule.endDate)
        ]);
      }

      if(schedule.startTime){
        rows.push([
          "開始時刻",
          schedule.startTime
        ]);
      }

      if(schedule.endTime){
        rows.push([
          "終了時刻",
          schedule.endTime
        ]);
      }

      if(schedule.station){
        rows.push([
          "放送局",
          schedule.station
        ]);
      }

      break;

    case "ラジオ":

      if(schedule.broadcastDay){
        rows.push([
          "放送日",
          schedule.broadcastDay
        ]);
      }

      if(schedule.startDate){
        rows.push([
          "初回",
          formatDate(schedule.startDate)
        ]);
      }

      if(schedule.endDate){
        rows.push([
          "最終回",
          formatDate(schedule.endDate)
        ]);
      }

      if(schedule.startTime){
        rows.push([
          "開始時刻",
          schedule.startTime
        ]);
      }

      if(schedule.endTime){
        rows.push([
          "終了時刻",
          schedule.endTime
        ]);
      }

      if(schedule.station){
        rows.push([
          "放送局",
          schedule.station
        ]);
      }

      break;

    case "舞台":

      if(schedule.eventDate){
        rows.push([
          "開催日",
          schedule.eventDate
        ]);
      }

      if(schedule.startDate){
        rows.push([
          "初回",
          formatDate(schedule.startDate)
        ]);
      }

      if(schedule.endDate){
        rows.push([
          "最終回",
          formatDate(schedule.endDate)
        ]);
      }

      if(schedule.openTime){
        rows.push([
          "開場時刻",
          schedule.openTime
        ]);
      }

      if(schedule.startTime){
        rows.push([
          "開演時刻",
          schedule.startTime
        ]);
      }

      if(schedule.endTime){
        rows.push([
          "終演時刻",
          schedule.endTime
        ]);
      }

      if(schedule.venue){
        rows.push([
          "場所",
          schedule.venue
        ]);
      }

      break;

    case "イベント":

      if(schedule.eventDate){
        rows.push([
          "開催日",
          schedule.eventDate
        ]);
      }

      if(schedule.startDate){
        rows.push([
          "初回",
          formatDate(schedule.startDate)
        ]);
      }

      if(schedule.endDate){
        rows.push([
          "最終回",
          formatDate(schedule.endDate)
        ]);
      }

      if(schedule.openTime){
        rows.push([
          "開場時刻",
          schedule.openTime
        ]);
      }

      if(schedule.startTime){
        rows.push([
          "開始時刻",
          schedule.startTime
        ]);
      }

      if(schedule.endTime){
        rows.push([
          "終了時刻",
          schedule.endTime
        ]);
      }

      if(schedule.venue){
        rows.push([
          "場所",
          schedule.venue
        ]);
      }

      break;

    case "配信":

      if(schedule.deliveryDate){
        rows.push([
          "配信日",
          schedule.deliveryDate
        ]);
      }

      if(schedule.startDate){
        rows.push([
          "初回",
          formatDate(schedule.startDate)
        ]);
      }

      if(schedule.endDate){
        rows.push([
          "最終回",
          formatDate(schedule.endDate)
        ]);
      }

      if(schedule.startTime){
        rows.push([
          "開始時刻",
          schedule.startTime
        ]);
      }

      if(schedule.endTime){
        rows.push([
          "終了時刻",
          schedule.endTime
        ]);
      }

      if(schedule.deliveryPlace){
        rows.push([
          "配信場所",
          schedule.deliveryPlace
        ]);
      }

      break;

    case "CD":

      if(schedule.releaseDate){
        rows.push([
          "発売日",
          schedule.releaseDate
        ]);
      }

      break;

    case "DVD":

      if(schedule.releaseDate){
        rows.push([
          "発売日",
          schedule.releaseDate
        ]);
      }

      break;

    default:

      if(schedule.broadcastDay){
        rows.push([
          "放送日",
          schedule.broadcastDay
        ]);
      }

      if(schedule.startDate){
        rows.push([
          "初回",
          formatDate(schedule.startDate)
        ]);
      }

      if(schedule.endDate){
        rows.push([
          "最終回",
          formatDate(schedule.endDate)
        ]);
      }

      if(schedule.startTime){
        rows.push([
          "開始時刻",
          schedule.startTime
        ]);
      }

      if(schedule.endTime){
        rows.push([
          "終了時刻",
          schedule.endTime
        ]);
      }

      if(schedule.venue){
        rows.push([
          "場所",
          schedule.venue
        ]);
      }

      break;
  }

  if(rows.length > 0){

    const dl =
      document.createElement("dl");

    rows.forEach(([label,value]) => {

      const dt =
        document.createElement("dt");

      dt.textContent =
        label;

      const dd =
        document.createElement("dd");

      dd.textContent =
        value;

      dl.appendChild(dt);
      dl.appendChild(dd);
    });

    info.appendChild(dl);
  }

  const urls =
    getRegularUrls(schedule);

  if(urls.length > 0){

    const dl =
      info.querySelector("dl") ||
      document.createElement("dl");

    urls.forEach((url,index) => {

      const dt =
        document.createElement("dt");

      dt.textContent =
        urls.length === 1
          ? "公式リンク"
          : `公式リンク${index + 1}`;

      const dd =
        document.createElement("dd");

      const link =
        document.createElement("a");

      link.href = url;
      link.target = "_blank";
      link.rel =
        "noopener noreferrer";

      link.textContent =
        "公式サイトを見る";

      dd.appendChild(link);
      dl.appendChild(dt);
      dl.appendChild(dd);
    });

    if(!info.querySelector("dl")){
      info.appendChild(dl);
    }
  }

  if(schedule.description){

    const description =
      document.createElement("p");

    description.textContent =
      schedule.description;

    info.appendChild(description);
  }

    detail.appendChild(info);

  /* =========================
     レギュラー予定のメモ
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

  const memoKey =
    `calendar-regular-memo-${schedule.title}-${schedule.startDate || ""}-${schedule.endDate || ""}`;

  memo.value =
    localStorage.getItem(memoKey) || "";

  const saveMemoButton =
    document.createElement("button");

  saveMemoButton.type = "button";

  saveMemoButton.className =
    "event-memo-save";

  saveMemoButton.textContent =
    "保存";

  saveMemoButton.addEventListener(
    "click",
    () => {

      localStorage.setItem(
        memoKey,
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

  const closeButton =
    document.createElement("button");

  closeButton.type = "button";

  closeButton.className =
    "event-back-button";

  closeButton.textContent =
    "閉じる";

  closeButton.addEventListener("click",() => {

    if(typeof closeCallback === "function"){
      closeCallback();
    }else{
      detail.remove();
    }

  });

  detail.appendChild(
    closeButton
  );

  return detail;
}

/* =========================
   レギュラー予定
========================= */

function getActiveRegularSchedules(
  year,
  month,
  lastDate
){

  const currentMonthStart =
    `${year}-${String(month + 1).padStart(2,"0")}-01`;

  const currentMonthEnd =
    `${year}-${String(month + 1).padStart(2,"0")}-${String(lastDate).padStart(2,"0")}`;

  return regularSchedules.filter(schedule => {

    const startsBeforeMonthEnd =
      !schedule.startDate ||
      schedule.startDate <= currentMonthEnd;

    const hasNotEnded =
      !schedule.endDate ||
      schedule.endDate >= currentMonthStart;

    return (
      startsBeforeMonthEnd &&
      hasNotEnded
    );
  });
}

function renderRegularSchedules(
  year,
  month,
  lastDate
){

  const regularScheduleList =
    document.querySelector(
      "#regular-schedule-list"
    );

  if(!regularScheduleList){
    return;
  }

  regularScheduleList.innerHTML = "";

  const activeRegularSchedules =
    getActiveRegularSchedules(
      year,
      month,
      lastDate
    );

  if(activeRegularSchedules.length === 0){

    regularScheduleList.innerHTML =
      "<p>この月のレギュラー予定はありません。</p>";

    return;
  }

  activeRegularSchedules.forEach(schedule => {

    const item =
      document.createElement("button");

    item.type = "button";
    item.className = "event-item";

    item.innerHTML = `
      <strong>${schedule.title}</strong>
      <span>${schedule.type}</span>
    `;

    item.addEventListener("click",() => {
      showRegularScheduleDetail(schedule);
    });

    regularScheduleList.appendChild(item);
  });
}

function showRegularScheduleDetail(schedule){

  const panel =
    document.querySelector(
      "#regular-schedule-panel"
    );

  if(!panel){
    return;
  }

  const existingDetail =
    panel.querySelector(
      ".regular-schedule-detail"
    );

  if(existingDetail){
    existingDetail.remove();
  }

  const detail =
    createRegularScheduleDetail(
      schedule
    );

  panel.appendChild(detail);
}

/* =========================
   カレンダー
========================= */

function renderCalendar(){

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  calendarTitle.textContent =
    `${year}年${month + 1}月`;

  monthPicker.value =
    `${year}-${String(month + 1).padStart(2,"0")}`;

  calendarDays.innerHTML = "";

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();

  const lastDate =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const previousLastDate =
    new Date(
      year,
      month,
      0
    ).getDate();

  const today =
    new Date();

  const todayString =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  for(
    let i = firstDay - 1;
    i >= 0;
    i--
  ){

    const day =
      document.createElement("button");

    day.type = "button";
    day.className =
      "calendar-day other-month";

    day.textContent =
      previousLastDate - i;

    day.disabled = true;

    calendarDays.appendChild(day);
  }

  for(
    let date = 1;
    date <= lastDate;
    date++
  ){

    const day =
      document.createElement("button");

    day.type = "button";
    day.className =
      "calendar-day";

    day.dataset.date =
      `${year}-${String(month + 1).padStart(2,"0")}-${String(date).padStart(2,"0")}`;

    day.innerHTML =
      `<span class="calendar-day-number">${date}</span>`;

    if(day.dataset.date === todayString){

      day.classList.add("today");

      day.innerHTML +=
        `<span class="calendar-today">Today</span>`;
    }

    const hasEvent =
      events.some(event =>
        event.date === day.dataset.date
      );

    if(hasEvent){
      day.classList.add("has-event");
    }

    if(
      day.dataset.date ===
      selectedDateString
    ){
      day.classList.add("selected");
    }

    day.addEventListener("click",() => {
      showSelectedDate(
        day.dataset.date
      );
    });

    calendarDays.appendChild(day);
  }

  const totalCells =
    firstDay + lastDate;

  const remainingCells =
    (7 - totalCells % 7) % 7;

  for(
    let date = 1;
    date <= remainingCells;
    date++
  ){

    const day =
      document.createElement("button");

    day.type = "button";
    day.className =
      "calendar-day other-month";

    day.textContent =
      date;

    day.disabled = true;

    calendarDays.appendChild(day);
  }

  renderRegularSchedules(
    year,
    month,
    lastDate
  );
}

/* =========================
   選択日の予定
========================= */

function showSelectedDate(dateString){

  selectedDateString =
    dateString;

  document
    .querySelectorAll(
      ".calendar-day.selected"
    )
    .forEach(day => {
      day.classList.remove("selected");
    });

  const selectedDay =
    document.querySelector(
      `.calendar-day[data-date="${dateString}"]`
    );

  if(selectedDay){
    selectedDay.classList.add("selected");
  }

  const [year,month,date] =
    dateString.split("-").map(Number);

  const dayEvents =
    events.filter(event =>
      event.date === dateString
    );

  selectedDate.hidden = false;

  selectedDate.innerHTML =
    `<h3>${year}年${month}月${date}日</h3>`;

  if(dayEvents.length === 0){

    selectedDate.innerHTML +=
      "<p>この日の予定はありません。</p>";

    return;
  }

  const eventList =
    document.createElement("div");

  eventList.className =
    "event-list";

  dayEvents.forEach(event => {

    const eventItem =
      document.createElement("button");

    eventItem.type = "button";
    eventItem.className =
      "event-item";

    eventItem.innerHTML = `
      <strong>${event.title}</strong>
      <span>${event.type}</span>
    `;

    eventItem.addEventListener("click",() => {
      showEventDetail(event);
    });

    eventList.appendChild(eventItem);
  });

  selectedDate.appendChild(
    eventList
  );
}

/* =========================
   通常予定の詳細
========================= */

function showEventDetail(event){

  selectedDate.innerHTML = "";

  const dateTitle =
    document.createElement("h3");

  dateTitle.textContent =
    formatDate(event.date);

  selectedDate.appendChild(
    dateTitle
  );

  const title =
    document.createElement("p");

  title.textContent =
    event.title;

  title.style.fontWeight =
    "bold";

  title.style.marginBottom =
    "16px";

  selectedDate.appendChild(
    title
  );

  const detail =
    document.createElement("div");

  detail.className =
    "event-detail";

  detail.innerHTML = `
    <dl>

      <dt>種類</dt>
      <dd>${event.type}</dd>

      <dt>出演者</dt>
      <dd>${event.members.join("、")}</dd>

      ${
        event.startTime ||
        event.endTime
          ? `
            <dt>時間</dt>
            <dd>
              ${event.startTime || ""}
              ${
                event.startTime ||
                event.endTime
                  ? "〜"
                  : ""
              }
              ${event.endTime || ""}
            </dd>
          `
          : ""
      }

      ${
        event.venue
          ? `
            <dt>会場</dt>
            <dd>${event.venue}</dd>
          `
          : ""
      }

      ${
        event.url
          ? `
            <dt>関連リンク</dt>
            <dd>
              <a
                href="${event.url}"
                target="_blank"
                rel="noopener noreferrer"
              >
                公式サイトを見る
              </a>
            </dd>
          `
          : ""
      }

    </dl>

    ${
      event.description
        ? `<p>${event.description}</p>`
        : ""
    }
  `;

  selectedDate.appendChild(
    detail
  );

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

  const memoKey =
    `calendar-memo-${event.date}-${event.title}`;

  memo.value =
    localStorage.getItem(memoKey) || "";

  const saveMemoButton =
    document.createElement("button");

  saveMemoButton.type = "button";

  saveMemoButton.className =
    "event-memo-save";

  saveMemoButton.textContent =
    "保存";

  saveMemoButton.addEventListener(
    "click",
    () => {

      localStorage.setItem(
        memoKey,
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

  selectedDate.appendChild(
    memoLabel
  );

  selectedDate.appendChild(
    memo
  );

  selectedDate.appendChild(
    saveMemoButton
  );

  const backButton =
    document.createElement("button");

  backButton.type = "button";

  backButton.className =
    "event-back-button";

  backButton.textContent =
    "閉じる";

  backButton.addEventListener(
    "click",
    () => {
      showSelectedDate(
        event.date
      );
    }
  );

  selectedDate.appendChild(
    backButton
  );
}

/* =========================
   月移動
========================= */

prevMonthButton.addEventListener(
  "click",
  () => {

    currentDate.setMonth(
      currentDate.getMonth() - 1
    );

    renderCalendar();
  }
);

nextMonthButton.addEventListener(
  "click",
  () => {

    currentDate.setMonth(
      currentDate.getMonth() + 1
    );

    renderCalendar();
  }
);

monthPicker.addEventListener(
  "change",
  () => {

    if(!monthPicker.value){
      return;
    }

    const [year,month] =
      monthPicker.value
        .split("-")
        .map(Number);

    currentDate =
      new Date(
        year,
        month - 1,
        1
      );

    renderCalendar();
  }
);

/* =========================
   初回カレンダー表示
========================= */

renderCalendar();

/* =========================
   検索パネル
========================= */

const searchToggle =
  document.querySelector(
    "#search-toggle"
  );

const searchPanel =
  document.querySelector(
    "#calendar-search-panel"
  );

const searchToggleIcon =
  document.querySelector(
    "#search-toggle-icon"
  );

searchToggle.addEventListener(
  "click",
  () => {

    const isOpen =
      searchPanel.hidden;

    searchPanel.hidden =
      !isOpen;

    searchToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    searchToggleIcon.textContent =
      isOpen
        ? "－"
        : "＋";
  }
);

/* =========================
   検索
========================= */

const searchResults =
  document.querySelector(
    "#search-results"
  );

const searchResultCount =
  document.querySelector(
    "#search-result-count"
  );

const searchResultList =
  document.querySelector(
    "#search-result-list"
  );

const memberCheckboxes =
  document.querySelectorAll(
    'input[name="member"]'
  );

const typeCheckboxes =
  document.querySelectorAll(
    'input[name="type"]'
  );

const keywordInput =
  document.querySelector(
    "#search-keyword"
  );

const searchGroups =
  document.querySelectorAll(
    ".search-group"
  );

const searchRegular =
  document.querySelector(
    "#search-regular"
  );

let committedKeyword = "";

function updateSearchResults(){

  const selectedMembers =
    [...memberCheckboxes]
      .filter(
        checkbox =>
          checkbox.checked
      )
      .map(
        checkbox =>
          checkbox.value
      );

  const selectedTypes =
    [...typeCheckboxes]
      .filter(
        checkbox =>
          checkbox.checked
      )
      .map(
        checkbox =>
          checkbox.value
      );

  const keyword =
    committedKeyword.toLowerCase();

  const includeRegular =
    searchRegular
      ? searchRegular.checked
      : false;

  /* 通常予定 */

  const filteredEvents =
    events.filter(event => {

      const memberMatch =
        selectedMembers.length === 0 ||
        selectedMembers.some(
          member =>
            event.members.includes(
              member
            )
        );

      const typeMatch =
        selectedTypes.length === 0 ||
        selectedTypes.includes(
          event.type
        );

      const searchableText = [
        event.title,
        event.type,
        event.members.join(" "),
        event.venue,
        event.description
      ]
        .filter(value => value)
        .join(" ")
        .toLowerCase();

      const keywordMatch =
        keyword === "" ||
        searchableText.includes(
          keyword
        );

      return (
        memberMatch &&
        typeMatch &&
        keywordMatch
      );
    });

  /* レギュラー予定 */

  const filteredRegularSchedules =
    includeRegular
      ? regularSchedules.filter(
          schedule => {

            const members =
              Array.isArray(
                schedule.members
              )
                ? schedule.members
                : [];

            const memberMatch =
              selectedMembers.length === 0 ||
              selectedMembers.some(
                member =>
                  members.includes(
                    member
                  )
              );

            const typeMatch =
              selectedTypes.length === 0 ||
              selectedTypes.includes(
                schedule.type
              );

            const searchableText =
              getRegularSearchableText(
                schedule
              );

            const keywordMatch =
              keyword === "" ||
              searchableText.includes(
                keyword
              );

            return (
              memberMatch &&
              typeMatch &&
              keywordMatch
            );
          }
        )
      : [];

  const totalResults =
    filteredEvents.length +
    filteredRegularSchedules.length;

  searchResults.hidden =
    false;

  searchResultCount.textContent =
    `ヒット数・${totalResults}件`;

  searchResultList.innerHTML = "";

  if(totalResults === 0){

    searchResultList.innerHTML =
      "<p>条件に一致する予定はありません。</p>";

    return;
  }

  /* =========================
     通常予定の検索結果
  ========================= */

  filteredEvents.forEach(event => {

    const [year,month,date] =
      event.date
        .split("-")
        .map(Number);

    const eventItem =
      document.createElement(
        "button"
      );

    eventItem.type = "button";

    eventItem.className =
      "event-item";

    const memberTags =
      getMemberTags(
        event.members
      );

    eventItem.innerHTML = `
      <div class="search-result-info">

        <small>
          ${year}年${month}月${date}日
        </small>

        <strong>
          ${event.title}
        </strong>

      </div>

      <div class="search-result-tags">

        ${memberTags}

        <span>
          ${event.type}
        </span>

      </div>
    `;

    eventItem.addEventListener(
      "click",
      () => {
        showEventDetail(
          event
        );
      }
    );

    searchResultList.appendChild(
      eventItem
    );
  });

  /* =========================
     レギュラー予定の検索結果
  ========================= */

  filteredRegularSchedules.forEach(
    schedule => {

      const wrapper =
        document.createElement(
          "div"
        );

      wrapper.className =
        "search-regular-result";

      const eventItem =
        document.createElement(
          "button"
        );

      eventItem.type = "button";

      eventItem.className =
        "event-item";

      const memberTags =
        getMemberTags(
          schedule.members
        );

      const regularDate =
        schedule.startDate
          ? formatDate(
              schedule.startDate
            )
          : "レギュラー";

      eventItem.innerHTML = `
        <div class="search-result-info">

          <small>
            ${regularDate}
          </small>

          <strong>
            ${schedule.title}
          </strong>

        </div>

        <div class="search-result-tags">

          ${memberTags}

          <span>
            ${schedule.type}
          </span>

          <span>
            レギュラー
          </span>

        </div>
      `;

      const detail =
        document.createElement(
          "div"
        );

      detail.className =
        "search-regular-detail";

      detail.hidden = true;

      eventItem.addEventListener(
        "click",
        () => {

          if(detail.hidden){

            const newDetail =
              createRegularScheduleDetail(
                schedule,
                () => {
                  detail.hidden = true;
                }
              );

            detail.innerHTML = "";

            detail.appendChild(
              newDetail
            );

            detail.hidden = false;

          }else{

            detail.hidden = true;

          }
        }
      );

      wrapper.appendChild(
        eventItem
      );

      wrapper.appendChild(
        detail
      );

      searchResultList.appendChild(
        wrapper
      );
    }
  );
}

/* =========================
   チェックボックス即時検索
========================= */

memberCheckboxes.forEach(
  checkbox => {

    checkbox.addEventListener(
      "change",
      () => {
        updateSearchResults();
      }
    );
  }
);

typeCheckboxes.forEach(
  checkbox => {

    checkbox.addEventListener(
      "change",
      () => {
        updateSearchResults();
      }
    );
  }
);

if(searchRegular){

  searchRegular.addEventListener(
    "change",
    () => {
      updateSearchResults();
    }
  );
}

/* =========================
   出演者検索 クリア
========================= */

searchGroups[0]
  .querySelector(
    ".clear-button"
  )
  .addEventListener(
    "click",
    () => {

      memberCheckboxes.forEach(
        checkbox => {
          checkbox.checked = false;
        }
      );

      updateSearchResults();
    }
  );

/* =========================
   種類検索 クリア
========================= */

searchGroups[1]
  .querySelector(
    ".clear-button"
  )
  .addEventListener(
    "click",
    () => {

      typeCheckboxes.forEach(
        checkbox => {
          checkbox.checked = false;
        }
      );

      updateSearchResults();
    }
  );

/* =========================
   キーワード検索
========================= */

searchGroups[2]
  .querySelector(
    ".search-button"
  )
  .addEventListener(
    "click",
    () => {

      committedKeyword =
        keywordInput.value.trim();

      updateSearchResults();

      searchResults.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    }
  );

searchGroups[2]
  .querySelector(
    ".clear-button"
  )
  .addEventListener(
    "click",
    () => {

      keywordInput.value = "";

      committedKeyword = "";

      updateSearchResults();
    }
  );

/* =========================
   出演者検索ボタン
   → キーワード欄へ
========================= */

searchGroups[0]
  .querySelector(
    ".search-button"
  )
  .addEventListener(
    "click",
    () => {

      searchGroups[2].scrollIntoView({
        behavior:"smooth",
        block:"center"
      });
    }
  );

/* =========================
   種類検索ボタン
   → キーワード欄へ
========================= */

searchGroups[1]
  .querySelector(
    ".search-button"
  )
  .addEventListener(
    "click",
    () => {

      searchGroups[2].scrollIntoView({
        behavior:"smooth",
        block:"center"
      });
    }
  );

/* =========================
   レギュラー予定パネル
========================= */

const regularScheduleToggle =
  document.querySelector(
    "#regular-schedule-toggle"
  );

const regularSchedulePanel =
  document.querySelector(
    "#regular-schedule-panel"
  );

const regularScheduleToggleIcon =
  document.querySelector(
    "#regular-schedule-toggle-icon"
  );

regularScheduleToggle.addEventListener(
  "click",
  () => {

    const isOpen =
      regularSchedulePanel.hidden;

    regularSchedulePanel.hidden =
      !isOpen;

    regularScheduleToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    regularScheduleToggleIcon.textContent =
      isOpen
        ? "－"
        : "＋";
  }
);
