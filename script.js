document.addEventListener("DOMContentLoaded", () => {

    // Mobile Menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Language Toggle
    const langToggle = document.getElementById("langToggle");

    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const isPersian = document.body.classList.toggle("fa");

            document.documentElement.lang = isPersian ? "fa" : "en";
            document.documentElement.dir = isPersian ? "rtl" : "ltr";

            langToggle.textContent = isPersian ? "EN" : "FA";
        });
    }

    // Automatic Footer Year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Smooth Navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

});
