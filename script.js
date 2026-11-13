const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

let currentLanguage = "en";


// LANGUAGE SWITCHER

function changeLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";

  document.body.classList.toggle("fa", language === "fa");

  const elements = document.querySelectorAll("[data-en][data-fa]");

  elements.forEach((element) => {
    element.innerHTML = element.dataset[language];
  });

  langToggle.textContent = language === "en" ? "FA" : "EN";

  document.title =
    language === "fa"
      ? "مهندس میلاد — مهندس نرم‌افزار"
      : "ENGINEER MILAD — Future Software Engineer";

  localStorage.setItem("preferredLanguage", language);
}


// LANGUAGE BUTTON

langToggle.addEventListener("click", () => {
  const newLanguage = currentLanguage === "en" ? "fa" : "en";
  changeLanguage(newLanguage);
});


// MOBILE MENU

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
});


// CLOSE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// LOAD SAVED LANGUAGE

const savedLanguage = localStorage.getItem("preferredLanguage");

if (savedLanguage === "fa" || savedLanguage === "en") {
  changeLanguage(savedLanguage);
} else {
  changeLanguage("en");
}
