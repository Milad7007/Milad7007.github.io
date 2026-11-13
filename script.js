/* =========================================
   MILAD HEIDARI — INTERACTIVE EXPERIENCE
========================================= */


/* PRELOADER */

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 900);
});


/* CURRENT YEAR */

document.getElementById("year").textContent = new Date().getFullYear();


/* LANGUAGE SYSTEM */

const languageButton = document.getElementById("languageButton");
const languageWrapper = document.querySelector(".language-wrapper");
const languageLabel = document.getElementById("languageLabel");
const languageOptions = document.querySelectorAll(".language-menu button");

const languageNames = {
    fa: "فارسی",
    en: "English",
    ar: "عربي",
    de: "Deutsch"
};


function changeLanguage(language) {

    if (!languageNames[language]) return;

    const direction = ["fa", "ar"].includes(language) ? "rtl" : "ltr";

    document.documentElement.lang = language;
    document.documentElement.dir = direction;

    document.body.dataset.lang = language;
    document.body.dir = direction;

    languageLabel.textContent = languageNames[language];

    const translatedElements = document.querySelectorAll("[data-fa]");

    translatedElements.forEach(element => {

        const translation = element.getAttribute(`data-${language}`);

        if (translation !== null) {
            element.innerHTML = translation;
        }

    });

    languageOptions.forEach(option => {

        option.classList.toggle(
            "selected",
            option.dataset.lang === language
        );

    });

    localStorage.setItem("milad-language", language);

    languageWrapper.classList.remove("open");

    document.title = language === "fa"
        ? "میلاد حیدری | طراح تجربه‌های دیجیتال"
        : "Milad Heidari | Digital Experience Designer";
}


/* OPEN LANGUAGE MENU */

languageButton.addEventListener("click", (event) => {

    event.stopPropagation();

    languageWrapper.classList.toggle("open");

});


/* LANGUAGE OPTIONS */

languageOptions.forEach(option => {

    option.addEventListener("click", () => {

        changeLanguage(option.dataset.lang);

    });

});


/* CLOSE LANGUAGE MENU */

document.addEventListener("click", event => {

    if (!languageWrapper.contains(event.target)) {
        languageWrapper.classList.remove("open");
    }

});


/* LOAD SAVED LANGUAGE */

const savedLanguage = localStorage.getItem("milad-language") || "fa";

changeLanguage(savedLanguage);


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const navLinks = document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

    navigation.classList.toggle("open");

    menuToggle.classList.toggle("active");

});


/* CLOSE MOBILE MENU AFTER CLICK */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");
        menuToggle.classList.remove("active");

    });

});


/* CLOSE MOBILE MENU OUTSIDE */

document.addEventListener("click", event => {

    const clickedInsideNavigation = navigation.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideNavigation && !clickedMenuButton) {

        navigation.classList.remove("open");
        menuToggle.classList.remove("active");

    }

});


/* HEADER SCROLL EFFECT */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    header.classList.toggle("scrolled", window.scrollY > 50);

});


/* SCROLL PROGRESS */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;

}

window.addEventListener("scroll", updateScrollProgress);


/* REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

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


/* SKILL ANIMATIONS */

const skillItems = document.querySelectorAll(".skill-item");

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


skillItems.forEach(skill => {

    skillObserver.observe(skill);

});


/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("main section[id]");

const activeObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navLinks.forEach(link => {

                    const isActive =
                        link.getAttribute("href") === `#${currentId}`;

                    link.classList.toggle("active", isActive);

                });

            }

        });

    },

    {
        threshold: 0.3
    }

);


sections.forEach(section => {

    activeObserver.observe(section);

});


/* BACK TO TOP */

const backTop = document.getElementById("backTop");

backTop.addEventListener("click", event => {

    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* PARTICLE BACKGROUND */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

let canvasWidth = 0;
let canvasHeight = 0;

const particleCount = window.innerWidth < 600 ? 35 : 75;


function resizeCanvas() {

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth * pixelRatio;
    canvas.height = canvasHeight * pixelRatio;

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

}


function createParticles() {

    particles = [];

    for (let i = 0; i < particleCount; i++) {

        particles.push({

            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,

            size: Math.random() * 1.5 + 0.3,

            speedX: (Math.random() - 0.5) * 0.25,
            speedY: (Math.random() - 0.5) * 0.25,

            opacity: Math.random() * 0.45 + 0.1,

            phase: Math.random() * Math.PI * 2

        });

    }

}


function drawParticles() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach(particle => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        particle.phase += 0.012;

        const opacity =
            particle.opacity * (0.65 + Math.sin(particle.phase) * 0.35);

        if (particle.x < 0) particle.x = canvasWidth;
        if (particle.x > canvasWidth) particle.x = 0;

        if (particle.y < 0) particle.y = canvasHeight;
        if (particle.y > canvasHeight) particle.y = 0;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(205, 35, 72, ${opacity})`;

        ctx.fill();

    });


    /* CONNECTIONS */

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 115) {

                const opacity = (1 - distance / 115) * 0.1;

                ctx.beginPath();

                ctx.moveTo(particles[i].x, particles[i].y);

                ctx.lineTo(particles[j].x, particles[j].y);

                ctx.strokeStyle = `rgba(180, 25, 60, ${opacity})`;

                ctx.lineWidth = 0.6;

                ctx.stroke();

            }

        }

    }

}


let animationFrame;

function animateParticles() {

    drawParticles();

    animationFrame = requestAnimationFrame(animateParticles);

}


resizeCanvas();

createParticles();

animateParticles();


window.addEventListener("resize", () => {

    resizeCanvas();

    createParticles();

});


/* PAUSE PARTICLES WHEN TAB IS HIDDEN */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        cancelAnimationFrame(animationFrame);

    } else {

        animateParticles();

    }

});


/* MOUSE PARALLAX */

const heroVisual = document.querySelector(".hero-visual");

const visualRings = document.querySelectorAll(".visual-ring");

const canUsePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canUsePointer) {

    heroVisual.addEventListener("mousemove", event => {

        const rect = heroVisual.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        visualRings.forEach((ring, index) => {

            const strength = (index + 1) * 8;

            ring.style.translate = `${x * strength}px ${y * strength}px`;

        });

    });


    heroVisual.addEventListener("mouseleave", () => {

        visualRings.forEach(ring => {

            ring.style.translate = "0 0";

        });

    });

}


/* SMOOTH ANCHOR NAVIGATION */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

        const targetId = anchor.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});


/* PROJECT CARD POINTER LIGHT */

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

    });

});


/* PAGE READY */

document.documentElement.classList.add("js-ready");
