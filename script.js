(() => {
  "use strict";

  const body = document.body;
  const html = document.documentElement;

  const loader = document.getElementById("loader");
  const languageToggle = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const header = document.getElementById("header");
  const progress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  const supportedLanguages = ["fa", "en", "ar", "de"];

  const languageLabels = {
    fa: "EN",
    en: "AR",
    ar: "DE",
    de: "FA"
  };

  const languageNames = {
    fa: "Persian",
    en: "English",
    ar: "Arabic",
    de: "German"
  };

  // بستن منوی موبایل
  function closeMenu() {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }

  // تغییر زبان
  function setLanguage(language) {
    const lang = supportedLanguages.includes(language) ? language : "fa";

    html.lang = lang;
    html.dir = (lang === "fa" || lang === "ar") ? "rtl" : "ltr";

    body.classList.remove("fa", "en", "ar", "de");
    body.classList.add(lang);

    document.querySelectorAll("[data-fa][data-en][data-ar][data-de]").forEach((element) => {
      const value = element.dataset[lang];

      if (value !== undefined) {
        element.innerHTML = value;
      }
    });

    languageToggle.textContent = languageLabels[lang];
    languageToggle.setAttribute(
      "aria-label",
      `Switch language. Current language: ${languageNames[lang]}`
    );

    const titles = {
      fa: "میلاد حیدری | طراح وب",
      en: "Milad Heidari | Web Designer",
      ar: "ميلاد حيدري | مصمم ويب",
      de: "Milad Heidari | Webdesigner"
    };

    const descriptions = {
      fa: "وب‌سایت شخصی میلاد حیدری؛ طراح وب و علاقه‌مند به ساخت تجربه‌های دیجیتال.",
      en: "Milad Heidari — Web Designer & Front-end Developer.",
      ar: "الموقع الشخصي لميلاد حيدري — مصمم ويب ومطور واجهات أمامية.",
      de: "Persönliche Website von Milad Heidari — Webdesigner und Front-end-Entwickler."
    };

    document.title = titles[lang];

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", descriptions[lang]);
    }

    try {
      localStorage.setItem("mh-language", lang);
    } catch (error) {
      // سایت بدون ذخیره زبان هم به کار خود ادامه می‌دهد.
    }

    closeMenu();
  }

  // رفتن به زبان بعدی
  languageToggle.addEventListener("click", () => {
    const current = html.lang || "fa";
    const currentIndex = supportedLanguages.indexOf(current);
    const nextIndex = (currentIndex + 1) % supportedLanguages.length;

    setLanguage(supportedLanguages[nextIndex]);
  });

  // منوی موبایل
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // بستن منو با کلیک بیرون از آن
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navigation.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  // بستن منو با کلید Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // ظاهر شدن بخش‌ها هنگام اسکرول
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // تشخیص بخش فعال در منو
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navigation a");

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach((section) => {
      navObserver.observe(section);
    });
  }

  // افکت‌های وابسته به اسکرول
  let ticking = false;

  function updateScrollEffects() {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    progress.style.width = `${percentage}%`;

    header.classList.toggle("scrolled", scrollTop > 30);
    backToTop.classList.toggle("show", scrollTop > 500);

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }, { passive: true });

  updateScrollEffects();

  // دکمه بازگشت به بالا
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // سال جاری
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // بارگذاری زبان ذخیره‌شده
  let savedLanguage = "fa";

  try {
    const storedLanguage = localStorage.getItem("mh-language");

    if (supportedLanguages.includes(storedLanguage)) {
      savedLanguage = storedLanguage;
    }
  } catch (error) {
    savedLanguage = "fa";
  }

  setLanguage(savedLanguage);

  // مخفی کردن لودر
  function hideLoader() {
    if (loader) {
      loader.classList.add("is-hidden");
    }
  }

  if (document.readyState === "complete") {
    window.setTimeout(hideLoader, 450);
  } else {
    window.addEventListener("load", () => {
      window.setTimeout(hideLoader, 450);
    }, { once: true });
  }

  // جلوگیری از باقی ماندن لودر
  window.setTimeout(hideLoader, 3500);

})();
