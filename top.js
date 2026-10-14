document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#upcoming-events");

  if (!container) return;

  const calendarData = window.NojimaInfoCalendarData;

  if (!calendarData || !Array.isArray(calendarData.events)) {
    container.textContent = "予定を読み込めませんでした。";
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = calendarData.events
    .filter(event => {
      if (!event.date) return false;

      const eventDate = new Date(`${event.date}T00:00:00`);
      return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
    })
    .sort((a, b) => {
      const dateDifference = a.date.localeCompare(b.date);

      if (dateDifference !== 0) return dateDifference;

      return (a.startTime || "99:99").localeCompare(
        b.startTime || "99:99"
      );
    })
    .slice(0, 3);

  if (upcomingEvents.length === 0) {
    container.textContent = "現在、掲載予定はありません。";
    return;
  }

  container.replaceChildren();

  upcomingEvents.forEach(event => {
    const article = document.createElement("article");
    article.className = "upcoming-event";

    const date = document.createElement("p");
    date.className = "upcoming-event-date";
    date.textContent = event.date.replace(/-/g, "/");

    if (event.startTime) {
      date.textContent += ` ${event.startTime}`;
    }

    const title = document.createElement("h3");
    title.className = "upcoming-event-title";
    title.textContent = event.title;

    article.append(date, title);
    container.appendChild(article);
  });
});
