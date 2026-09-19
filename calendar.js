const calendarTitle = document.querySelector("#calendar-title");
const calendarDays = document.querySelector("#calendar-days");
const selectedDate = document.querySelector("#selected-date");
const selectedDateTitle = document.querySelector("#selected-date-title");
const monthPicker = document.querySelector("#month-picker");
const prevMonthButton = document.querySelector("#prev-month");
const nextMonthButton = document.querySelector("#next-month");
const events = [
  {
    date:"2026-09-18",
    title:"テスト予定",
    type:"予定"
  },
  {
    date:"2026-09-25",
    title:"もうひとつのテスト予定",
    type:"予定"
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
      showSelectedDate(year,month,date);
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
function showSelectedDate(year,month,date){
  const dateString = `${year}-${String(month + 1).padStart(2,"0")}-${String(date).padStart(2,"0")}`;
  const dayEvents = events.filter(event => event.date === dateString);
  selectedDate.hidden = false;
  selectedDateTitle.textContent = `${year}年${month + 1}月${date}日`;
  selectedDate.innerHTML = `<h3 id="selected-date-title">${year}年${month + 1}月${date}日</h3>`;
  if(dayEvents.length === 0){
    selectedDate.innerHTML += `<p>この日の予定はありません。</p>`;
    return;
  }
  const eventList = document.createElement("div");
  eventList.className = "event-list";
  dayEvents.forEach(event => {
    const eventItem = document.createElement("button");
    eventItem.type = "button";
    eventItem.className = "event-item";
    eventItem.innerHTML = `<strong>${event.title}</strong><span>${event.type}</span>`;
    eventList.appendChild(eventItem);
  });
  selectedDate.appendChild(eventList);
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
