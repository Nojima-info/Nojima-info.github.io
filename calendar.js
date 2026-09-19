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
let currentDate = new Date();
function renderCalendar(){
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  calendarTitle.textContent = `${year}年${month + 1}月`;
  monthPicker.value = `${year}-${String(month + 1).padStart(2,"0")}`;
  calendarDays.innerHTML = "";
  const firstDay = new Date(year,month,1).getDay();
  const lastDate = new Date(year,month + 1,0).getDate();
  const previousLastDate = new Date(year,month,0).getDate();
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
    day.textContent = date;
    day.dataset.date = `${year}-${String(month + 1).padStart(2,"0")}-${String(date).padStart(2,"0")}`;
    const hasEvent = events.some(event => event.date === day.dataset.date);
    if(hasEvent){
      day.classList.add("has-event");
    }
    day.addEventListener("click",() => {
      showSelectedDate(day.dataset.date);
    });
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
}
function showSelectedDate(dateString){
  const [year,month,date] = dateString.split("-").map(Number);
  const dayEvents = events.filter(event => event.date === dateString);
  selectedDate.hidden = false;
  selectedDate.innerHTML = `<h3>${year}年${month}月${date}日</h3>`;
  if(dayEvents.length === 0){
    selectedDate.innerHTML += `<p>この日の予定はありません。</p>`;
    return;
  }
  const eventList = document.createElement("div");
  eventList.className = "event-list";
  dayEvents.forEach((event,index) => {
    const eventItem = document.createElement("button");
    eventItem.type = "button";
    eventItem.className = "event-item";
    eventItem.innerHTML = `<strong>${event.title}</strong><span>${event.type}</span>`;
    eventItem.addEventListener("click",() => {
      showEventDetail(event);
    });
    eventList.appendChild(eventItem);
  });
  selectedDate.appendChild(eventList);
}
function showEventDetail(event){
  selectedDate.innerHTML = "";
  const title = document.createElement("h3");
  title.textContent = event.title;
  selectedDate.appendChild(title);
  const detail = document.createElement("div");
  detail.className = "event-detail";
  detail.innerHTML = `
    <dl>
      <dt>種類</dt>
      <dd>${event.type}</dd>
      <dt>出演者</dt>
      <dd>${event.members.join("、")}</dd>
      <dt>時間</dt>
      <dd>${event.startTime}〜${event.endTime}</dd>
      <dt>会場</dt>
      <dd>${event.venue}</dd>
      ${event.url ? `<dt>関連リンク</dt><dd><a href="${event.url}" target="_blank" rel="noopener noreferrer">公式サイトを見る</a></dd>` : ""}
    </dl>
    <p>${event.description}</p>
  `;
  selectedDate.appendChild(detail);
  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.className = "event-back-button";
  backButton.textContent = "閉じる";
  backButton.addEventListener("click",() => {
    showSelectedDate(event.date);
  });
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
  if(!monthPicker.value){
    return;
  }
  const [year,month] = monthPicker.value.split("-").map(Number);
  currentDate = new Date(year,month - 1,1);
  renderCalendar();
});
renderCalendar();
