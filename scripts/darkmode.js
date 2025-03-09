const darkModeButton = document.querySelector(".darkMode");
const body = document.body;

darkModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
