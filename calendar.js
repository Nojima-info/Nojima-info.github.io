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
let selectedDateString = "";
function renderCalendar(){
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
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
    if(hasEvent){
      day.classList.add("has-event");
    }
    if(day.dataset.date === selectedDateString){
      day.classList.add("selected");
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
  selectedDateString = dateString;
  document.querySelectorAll(".calendar-day.selected").forEach(day => {
    day.classList.remove("selected");
  });
  const selectedDay = document.querySelector(`.calendar-day[data-date="${dateString}"]`);
  if(selectedDay){
    selectedDay.classList.add("selected");
  }
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
  const memoLabel = document.createElement("label");
  memoLabel.className = "event-memo-label";
  memoLabel.textContent = "メモ";
  const memo = document.createElement("textarea");
  memo.className = "event-memo";
  memo.placeholder = "このメモは自分以外には表示されません";
  memo.rows = 5;
  const memoKey = `calendar-memo-${event.date}-${event.title}`;
  memo.value = localStorage.getItem(memoKey) || "";
  const saveMemoButton = document.createElement("button");
  saveMemoButton.type = "button";
  saveMemoButton.className = "event-memo-save";
  saveMemoButton.textContent = "保存";
  saveMemoButton.addEventListener("click",() => {
    localStorage.setItem(memoKey,memo.value);
    saveMemoButton.textContent = "保存しました";
    setTimeout(() => {
      saveMemoButton.textContent = "保存";
    },1500);
  });
  selectedDate.appendChild(memoLabel);
  selectedDate.appendChild(memo);
  selectedDate.appendChild(saveMemoButton);
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
const searchToggle = document.querySelector("#search-toggle");
const searchPanel = document.querySelector("#calendar-search-panel");
const searchToggleIcon = document.querySelector("#search-toggle-icon");
searchToggle.addEventListener("click",() => {
  const isOpen = searchPanel.hidden;
  searchPanel.hidden = !isOpen;
  searchToggle.setAttribute("aria-expanded",String(isOpen));
  searchToggleIcon.textContent = isOpen ? "－" : "＋";
});
const searchResults = document.querySelector("#search-results");
const searchResultCount = document.querySelector("#search-result-count");
const searchResultList = document.querySelector("#search-result-list");
const memberCheckboxes = document.querySelectorAll('input[name="member"]');
const typeCheckboxes = document.querySelectorAll('input[name="type"]');
const keywordInput = document.querySelector("#search-keyword");
const searchGroups = document.querySelectorAll(".search-group");
let committedKeyword = "";
function updateSearchResults(){
  const selectedMembers = [...memberCheckboxes].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  const selectedTypes = [...typeCheckboxes].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  const keyword = committedKeyword.toLowerCase();
  const filteredEvents = events.filter(event => {
    const memberMatch = selectedMembers.length === 0 || selectedMembers.some(member => event.members.includes(member));
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(event.type);
    const searchableText = [
      event.title,
      event.type,
      event.members.join(" "),
      event.venue,
      event.description
    ].join(" ").toLowerCase();
    const keywordMatch = keyword === "" || searchableText.includes(keyword);
    return memberMatch && typeMatch && keywordMatch;
  });
  searchResults.hidden = false;
  searchResultCount.textContent = `ヒット数・${filteredEvents.length}件`;
  searchResultList.innerHTML = "";
  if(filteredEvents.length === 0){
    searchResultList.innerHTML = "<p>条件に一致する予定はありません。</p>";
    return;
  }
  filteredEvents.forEach(event => {
    const [year,month,date] = event.date.split("-").map(Number);
    const eventItem = document.createElement("button");
    eventItem.type = "button";
    eventItem.className = "event-item";
    eventItem.innerHTML = `
      <div>
        <small>${year}年${month}月${date}日</small>
        <strong>${event.title}</strong>
      </div>
      <span>${event.type}</span>
    `;
    eventItem.addEventListener("click",() => {
      showEventDetail(event);
    });
    searchResultList.appendChild(eventItem);
  });
}
memberCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change",() => {
    updateSearchResults();
  });
});
typeCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change",() => {
    updateSearchResults();
  });
});
searchGroups[0].querySelector(".clear-button").addEventListener("click",() => {
  memberCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  updateSearchResults();
});
searchGroups[1].querySelector(".clear-button").addEventListener("click",() => {
  typeCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  updateSearchResults();
});
searchGroups[2].querySelector(".search-button").addEventListener("click",() => {
  committedKeyword = keywordInput.value.trim();
  updateSearchResults();
  searchResults.scrollIntoView({
    behavior:"smooth",
    block:"start"
  });
});
searchGroups[2].querySelector(".clear-button").addEventListener("click",() => {
  keywordInput.value = "";
  committedKeyword = "";
  updateSearchResults();
});
searchGroups[0].querySelector(".search-button").addEventListener("click",() => {
  searchGroups[2].scrollIntoView({
    behavior:"smooth",
    block:"center"
  });
});
searchGroups[1].querySelector(".search-button").addEventListener("click",() => {
  searchGroups[2].scrollIntoView({
    behavior:"smooth",
    block:"center"
  });
});
const searchButtons = document.querySelectorAll(".search-button");
const clearButtons = document.querySelectorAll(".clear-button");
const searchResults = document.querySelector("#search-results");
const searchResultCount = document.querySelector("#search-result-count");
const searchResultList = document.querySelector("#search-result-list");
function performSearch(){
  const selectedMembers = Array.from(document.querySelectorAll('input[name="member"]:checked')).map(input => input.value);
  const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);
  const keyword = document.querySelector("#search-keyword").value.trim().toLowerCase();
  const results = events.filter(event => {
    const memberMatch = selectedMembers.length === 0 || selectedMembers.some(member => event.members.includes(member));
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(event.type);
    const keywordMatch = keyword === "" || [event.title,event.description,event.venue,event.members.join(" "),event.type].some(value => value.toLowerCase().includes(keyword));
    return memberMatch && typeMatch && keywordMatch;
  });
  searchResults.hidden = false;
  searchResultCount.textContent = `ヒット数・${results.length}件`;
  searchResultList.innerHTML = "";
  if(results.length === 0){
    searchResultList.innerHTML = "<p>条件に一致する予定はありません。</p>";
  }else{
    results.forEach(event => {
      const eventItem = document.createElement("button");
      eventItem.type = "button";
      eventItem.className = "event-item";
      const [eventYear,eventMonth,eventDate] = event.date.split("-").map(Number);
      eventItem.innerHTML = `<div><small>${eventYear}年${eventMonth}月${eventDate}日</small><strong>${event.title}</strong></div><span>${event.type}</span>`;
      eventItem.addEventListener("click",() => {
        showEventDetail(event);
      });
      searchResultList.appendChild(eventItem);
    });
  }
  searchResults.scrollIntoView({behavior:"smooth",block:"start"});
}
searchButtons.forEach(button => {
  button.addEventListener("click",performSearch);
});
clearButtons.forEach(button => {
  button.addEventListener("click",() => {
    const searchGroup = button.closest(".search-group");
    searchGroup.querySelectorAll('input[name="member"],input[name="type"]').forEach(input => {
      input.checked = false;
    });
    const keywordInput = searchGroup.querySelector("#search-keyword");
    if(keywordInput){
      keywordInput.value = "";
    }
  });
});
const searchButtons = document.querySelectorAll(".search-button");
const clearButtons = document.querySelectorAll(".clear-button");
const searchResults = document.querySelector("#search-results");
const searchResultCount = document.querySelector("#search-result-count");
const searchResultList = document.querySelector("#search-result-list");
function performSearch(){
  const selectedMembers = Array.from(document.querySelectorAll('input[name="member"]:checked')).map(input => input.value);
  const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);
  const keyword = document.querySelector("#search-keyword").value.trim().toLowerCase();
  const results = events.filter(event => {
    const memberMatch = selectedMembers.length === 0 || selectedMembers.some(member => event.members.includes(member));
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(event.type);
    const keywordMatch = keyword === "" || [event.title,event.description,event.venue,event.members.join(" "),event.type].some(value => value.toLowerCase().includes(keyword));
    return memberMatch && typeMatch && keywordMatch;
  });
  searchResults.hidden = false;
  searchResultCount.textContent = `ヒット数・${results.length}件`;
  searchResultList.innerHTML = "";
  if(results.length === 0){
    searchResultList.innerHTML = "<p>条件に一致する予定はありません。</p>";
  }else{
    results.forEach(event => {
      const eventItem = document.createElement("button");
      eventItem.type = "button";
      eventItem.className = "event-item";
      eventItem.innerHTML = `<strong>${event.title}</strong><span>${event.type}</span>`;
      eventItem.addEventListener("click",() => {
        showEventDetail(event);
      });
      searchResultList.appendChild(eventItem);
    });
  }
  searchResults.scrollIntoView({behavior:"smooth",block:"start"});
}
searchButtons.forEach(button => {
  button.addEventListener("click",performSearch);
});
clearButtons.forEach(button => {
  button.addEventListener("click",() => {
    const searchGroup = button.closest(".search-group");
    searchGroup.querySelectorAll('input[name="member"],input[name="type"]').forEach(input => {
      input.checked = false;
    });
    const keywordInput = searchGroup.querySelector("#search-keyword");
    if(keywordInput){
      keywordInput.value = "";
    }
  });
});
const searchButtons = document.querySelectorAll(".search-button");
const clearButtons = document.querySelectorAll(".clear-button");
const searchResults = document.querySelector("#search-results");
const searchResultCount = document.querySelector("#search-result-count");
const searchResultList = document.querySelector("#search-result-list");
function performSearch(){
  const selectedMembers = Array.from(document.querySelectorAll('input[name="member"]:checked')).map(input => input.value);
  const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);
  const keyword = document.querySelector("#search-keyword").value.trim().toLowerCase();
  const results = events.filter(event => {
    const memberMatch = selectedMembers.length === 0 || selectedMembers.some(member => event.members.includes(member));
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(event.type);
    const keywordMatch = keyword === "" || [event.title,event.description,event.venue,event.members.join(" "),event.type].some(value => value.toLowerCase().includes(keyword));
    return memberMatch && typeMatch && keywordMatch;
  });
  searchResults.hidden = false;
  searchResultCount.textContent = `ヒット数・${results.length}件`;
  searchResultList.innerHTML = "";
  if(results.length === 0){
    searchResultList.innerHTML = "<p>条件に一致する予定はありません。</p>";
  }else{
    results.forEach(event => {
      const eventItem = document.createElement("button");
      eventItem.type = "button";
      eventItem.className = "event-item";
      eventItem.innerHTML = `<strong>${event.title}</strong><span>${event.type}</span>`;
      eventItem.addEventListener("click",() => {
        showEventDetail(event);
      });
      searchResultList.appendChild(eventItem);
    });
  }
  searchResults.scrollIntoView({behavior:"smooth",block:"start"});
}
searchButtons.forEach(button => {
  button.addEventListener("click",performSearch);
});
clearButtons.forEach(button => {
  button.addEventListener("click",() => {
    const searchGroup = button.closest(".search-group");
    if(searchGroup.querySelectorAll('input[name="member"]').length > 0){
      searchGroup.querySelectorAll('input[name="member"]').forEach(input => {
        input.checked = false;
      });
    }
    if(searchGroup.querySelectorAll('input[name="type"]').length > 0){
      searchGroup.querySelectorAll('input[name="type"]').forEach(input => {
        input.checked = false;
      });
    }
    const keywordInput = searchGroup.querySelector("#search-keyword");
    if(keywordInput){
      keywordInput.value = "";
    }
  });
});
