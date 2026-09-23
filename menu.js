const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
}
const pageTopButton = document.querySelector("#page-top-button");
if(pageTopButton){
  pageTopButton.addEventListener("click",() => {
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  });
}
