document.addEventListener("DOMContentLoaded", () => {

    /* PRELOADER */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader?.classList.add("hidden");
        }, 700);
    });


    /* CURRENT YEAR */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* HEADER SCROLL EFFECT */

    const header = document.getElementById("header");
    const scrollProgress = document.getElementById("scrollProgress");

    function handleScroll() {

        const scrollY = window.scrollY;

        if (header) {
            header.classList.toggle("scrolled", scrollY > 50);
        }

        if (scrollProgress) {

            const scrollHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const progress =
                scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;

            scrollProgress.style.width = `${progress}%`;
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();


    /* MOBILE MENU */

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            navigation.classList.toggle("open");

            menuToggle.classList.toggle("active");

        });

    }

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigation?.classList.remove("open");

            menuToggle?.classList.remove("active");

        });

    });

    document.addEventListener("click", event => {

        if (
            navigation &&
            menuToggle &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navigation.classList.remove("open");

            menuToggle.classList.remove("active");

        }

    });


    /* LANGUAGE SYSTEM */

    const languageButton = document.getElementById("languageButton");
    const languageMenu = document.getElementById("languageMenu");
    const languageLabel = document.getElementById("languageLabel");

    const languageNames = {
        fa: "فارسی",
        en: "English",
        ar: "عربي",
        de: "Deutsch"
    };

    const languageButtons =
        document.querySelectorAll("[data-lang]");

    function changeLanguage(language) {

        if (!languageNames[language]) return;

        document.documentElement.lang = language;

        document.documentElement.dir =
            language === "fa" || language === "ar" ? "rtl" : "ltr";

        document.body.setAttribute("dir", document.documentElement.dir);

        document.body.setAttribute("data-lang", language);

        if (languageLabel) {
            languageLabel.textContent = languageNames[language];
        }

        document.querySelectorAll("[data-fa]").forEach(element => {

            const translation = element.getAttribute(`data-${language}`);

            if (translation !== null) {
                element.innerHTML = translation;
            }

        });

        languageButtons.forEach(button => {

            button.classList.toggle(
                "selected",
                button.getAttribute("data-lang") === language
            );

        });

        languageMenu?.classList.remove("open");

        document.querySelector(".language-wrapper")?.classList.remove("open");

        try {
            localStorage.setItem("milad-language", language);
        } catch (error) {
            // Local storage may be unavailable.
        }

    }


    if (languageButton) {

        languageButton.addEventListener("click", event => {

            event.stopPropagation();

            document.querySelector(".language-wrapper")?.classList.toggle("open");

        });

    }

    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const language = button.getAttribute("data-lang");

            changeLanguage(language);

        });

    });


    document.addEventListener("click", event => {

        const languageWrapper =
            document.querySelector(".language-wrapper");

        if (
            languageWrapper &&
            !languageWrapper.contains(event.target)
        ) {

            languageWrapper.classList.remove("open");

        }

    });


    let savedLanguage = "fa";

    try {

        const storedLanguage = localStorage.getItem("milad-language");

        if (storedLanguage && languageNames[storedLanguage]) {
            savedLanguage = storedLanguage;
        }

    } catch (error) {
        // Use default language.
    }

    changeLanguage(savedLanguage);


    /* REVEAL ANIMATIONS */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* SKILL BARS */

    const skillItems =
        document.querySelectorAll(".skill-item");

    const skillObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    skillObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.4
        }
    );

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });


    /* ACTIVE NAVIGATION */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {

                        const linkTarget =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            linkTarget === `#${currentId}`
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* BACK TO TOP */

    const backTop = document.getElementById("backTop");

    if (backTop) {

        backTop.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* PARTICLES BACKGROUND */

    const canvas = document.getElementById("particles");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        if (ctx) {

            let particles = [];

            let width = 0;
            let height = 0;

            const particleCount =
                window.innerWidth < 600 ? 25 : 55;

            function resizeCanvas() {

                const pixelRatio =
                    Math.min(window.devicePixelRatio || 1, 2);

                width = window.innerWidth;
                height = window.innerHeight;

                canvas.width = width * pixelRatio;
                canvas.height = height * pixelRatio;

                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;

                ctx.setTransform(
                    pixelRatio,
                    0,
                    0,
                    pixelRatio,
                    0,
                    0
                );

            }


            class Particle {

                constructor() {

                    this.x = Math.random() * width;
                    this.y = Math.random() * height;

                    this.size = Math.random() * 1.5 + 0.3;

                    this.speedX =
                        (Math.random() - 0.5) * 0.25;

                    this.speedY =
                        (Math.random() - 0.5) * 0.25;

                    this.opacity =
                        Math.random() * 0.45 + 0.1;

                }


                update() {

                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.x < 0) this.x = width;
                    if (this.x > width) this.x = 0;

                    if (this.y < 0) this.y = height;
                    if (this.y > height) this.y = 0;

                }


                draw() {

                    ctx.beginPath();

                    ctx.arc(
                        this.x,
                        this.y,
                        this.size,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle =
                        `rgba(190, 25, 60, ${this.opacity})`;

                    ctx.fill();

                }

            }


            function initParticles() {

                particles = [];

                for (let i = 0; i < particleCount; i++) {

                    particles.push(new Particle());

                }

            }


            let animationFrame;

            function animateParticles() {

                ctx.clearRect(0, 0, width, height);

                particles.forEach(particle => {

                    particle.update();

                    particle.draw();

                });

                animationFrame =
                    requestAnimationFrame(animateParticles);

            }


            resizeCanvas();

            initParticles();

            animateParticles();


            let resizeTimeout;

            window.addEventListener("resize", () => {

                clearTimeout(resizeTimeout);

                resizeTimeout = setTimeout(() => {

                    cancelAnimationFrame(animationFrame);

                    resizeCanvas();

                    initParticles();

                    animateParticles();

                }, 200);

            });


            document.addEventListener("visibilitychange", () => {

                if (document.hidden) {

                    cancelAnimationFrame(animationFrame);

                } else {

                    animateParticles();

                }

            });

        }

    }


    /* REDUCE MOTION SUPPORT */

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {

        document.documentElement.style.scrollBehavior = "auto";

    }

});
