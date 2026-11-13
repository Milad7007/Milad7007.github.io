// ===================================
// ENGINEER MILAD
// RED DIMENSION EXPERIENCE
// ===================================


// PAGE LOADER

window.addEventListener("load", () => {

    const loader = document.getElementById("pageLoader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 700);

});


// LANGUAGE SYSTEM

const langToggle = document.getElementById("langToggle");

let currentLanguage = "en";


function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    document.documentElement.dir =
        language === "fa" ? "rtl" : "ltr";

    document.body.classList.toggle(
        "fa",
        language === "fa"
    );

    const translatedElements =
        document.querySelectorAll("[data-en][data-fa]");

    translatedElements.forEach((element) => {

        element.innerHTML =
            element.getAttribute(`data-${language}`);

    });

    langToggle.textContent =
        language === "en" ? "FA" : "EN";

    document.title =
        language === "fa"
            ? "مهندس میلاد | پورتفولیوی دیجیتال"
            : "ENGINEER MILAD | Digital Portfolio";

    localStorage.setItem(
        "preferredLanguage",
        language
    );

}


// LANGUAGE BUTTON

langToggle.addEventListener("click", () => {

    const nextLanguage =
        currentLanguage === "en" ? "fa" : "en";

    changeLanguage(nextLanguage);

});


// MOBILE MENU

const menuToggle =
    document.getElementById("menuToggle");

const navigation =
    document.getElementById("navigation");


menuToggle.addEventListener("click", () => {

    const isOpen =
        navigation.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});


// CLOSE MENU AFTER CLICK

document.querySelectorAll(".navigation a").forEach((link) => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// SCROLL REVEAL ANIMATION

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


document.querySelectorAll(".reveal").forEach((element) => {

    revealObserver.observe(element);

});


// ACTIVE NAVIGATION

const sections =
    document.querySelectorAll("main section[id]");

const navItems =
    document.querySelectorAll(".navigation a");


const sectionObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                navItems.forEach((link) => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    },

    {
        rootMargin: "-35% 0px -55% 0px"
    }

);


sections.forEach((section) => {

    sectionObserver.observe(section);

});


// SAVE LANGUAGE AND RESTORE IT

const savedLanguage =
    localStorage.getItem("preferredLanguage");

if (savedLanguage === "fa" || savedLanguage === "en") {

    changeLanguage(savedLanguage);

} else {

    changeLanguage("en");

}


// CLOSE MOBILE MENU WHEN RESIZING TO DESKTOP

window.addEventListener("resize", () => {

    if (window.innerWidth > 850) {

        navigation.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});
