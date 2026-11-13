document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    // =====================================
    // LOADING SCREEN
    // =====================================

    const loader = document.getElementById("loader");

    function hideLoader() {

        if (!loader) return;

        loader.classList.add("hide");

        document.body.classList.add("loaded");

        setTimeout(function () {
            loader.style.display = "none";
        }, 700);

    }

    // حتی اگر انیمیشن مشکلی داشته باشد،
    // صفحه بعد از مدت کوتاهی نمایش داده می‌شود.

    setTimeout(hideLoader, 1800);

    window.addEventListener("load", hideLoader);


    // =====================================
    // MOBILE MENU
    // =====================================

    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            navigation.classList.toggle("open");

        });

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("open");

            });

        });

        document.addEventListener("click", function (event) {

            if (
                !navigation.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                navigation.classList.remove("open");
            }

        });

    }


    // =====================================
    // LANGUAGE SWITCH
    // =====================================

    const languageButton = document.getElementById("languageButton");

    let currentLanguage = localStorage.getItem("em-language") || "en";


    function changeLanguage(language) {

        currentLanguage = language;

        document.body.classList.toggle("fa", language === "fa");

        document.documentElement.lang = language;

        document.documentElement.dir =
            language === "fa" ? "rtl" : "ltr";


        document.querySelectorAll("[data-en][data-fa]").forEach(function (element) {

            const translation = element.getAttribute("data-" + language);

            if (translation !== null) {
                element.innerHTML = translation;
            }

        });


        if (languageButton) {

            languageButton.textContent =
                language === "fa" ? "EN" : "FA";

        }


        document.title =
            language === "fa"
                ? "مهندس میلاد | پورتفولیوی دیجیتال"
                : "ENGINEER MILAD | Digital Portfolio";


        localStorage.setItem("em-language", language);

    }


    if (languageButton) {

        languageButton.addEventListener("click", function () {

            const newLanguage =
                currentLanguage === "en" ? "fa" : "en";

            changeLanguage(newLanguage);

        });

    }

    changeLanguage(currentLanguage);


    // =====================================
    // SCROLL REVEAL
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-art, .about-content, .skill-card, .service-item, .project-card, .timeline-item, .contact-box"
    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================

    const header = document.getElementById("header");

    window.addEventListener("scroll", function () {

        if (!header) return;

        if (window.scrollY > 50) {

            header.style.background = "rgba(5,6,8,.96)";

        } else {

            header.style.background = "rgba(8,9,11,.78)";

        }

    });


    // =====================================
    // PROJECT CARD INTERACTION
    // =====================================

    document.querySelectorAll(".project-card").forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.style.transition = "transform .3s ease";

        });

    });


    // =====================================
    // BACK TO TOP
    // =====================================

    const backTop = document.querySelector(".back-top");

    if (backTop) {

        backTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    console.log("ENGINEER MILAD website initialized successfully.");

});
