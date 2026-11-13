(() => {
  "use strict";

  // گرفتن عناصر مورد نیاز از HTML
  const body = document.body;
  const loader = document.getElementById("loader");
  const languageToggle = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  // تمام متن‌هایی که ترجمه می‌شوند
  const translated = document.querySelectorAll("[data-en][data-fa]");

  // بستن منوی موبایل
  function closeMenu() {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  // تغییر زبان سایت
  function setLanguage(language) {
    const lang = language === "en" ? "en" : "fa";

    // تنظیم جهت و زبان صفحه
    body.classList.toggle("fa", lang === "fa");

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

    // تغییر متن‌ها
    translated.forEach((item) => {
      item.innerHTML = item.dataset[lang];
    });

    // تغییر متن دکمه زبان
    languageToggle.textContent =
      lang === "fa" ? "EN" : "فارسی";

    languageToggle.setAttribute(
      "aria-label",
      lang === "fa"
        ? "Switch to English"
        : "تغییر زبان به فارسی"
    );

    // تغییر عنوان تب مرورگر
    document.title =
      lang === "fa"
        ? "میلاد حیدری | مهندس طراحی وب"
        : "Milad Heidari | Web Designer";

    // ذخیره زبان انتخاب‌شده
    try {
      localStorage.setItem("em-language", lang);
    } catch (error) {
      // اگر localStorage در دسترس نبود، سایت همچنان کار می‌کند.
    }

    closeMenu();
  }

  // کلیک روی دکمه تغییر زبان
  languageToggle.addEventListener("click", () => {
    const currentLanguage = document.documentElement.lang;

    setLanguage(currentLanguage === "fa" ? "en" : "fa");
  });

  // باز و بسته کردن منوی موبایل
  menuToggle.addEventListener("click", () => {
    const opened = navigation.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(opened)
    );
  });

  // بستن منو بعد از انتخاب یکی از لینک‌ها
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // انیمیشن ظاهر شدن بخش‌ها هنگام اسکرول
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
        threshold: 0.12
      }
    );

    document.querySelectorAll(".reveal").forEach((item) => {
      revealObserver.observe(item);
    });

    // مشخص کردن بخش فعال در منوی بالای سایت
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

            document.querySelectorAll(".navigation a").forEach((link) => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + entry.target.id
              );

            });

          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    document.querySelectorAll("main section[id]").forEach((section) => {
      navObserver.observe(section);
    });

  } else {

    // برای مرورگرهای قدیمی
    document.querySelectorAll(".reveal").forEach((item) => {
      item.classList.add("visible");
    });

  }

  // نمایش سال فعلی در فوتر
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // زبان پیش‌فرض فارسی است
  let savedLanguage = "fa";

  try {
    savedLanguage = localStorage.getItem("em-language") || "fa";
  } catch (error) {
    savedLanguage = "fa";
  }

  // اعمال زبان ذخیره‌شده
  setLanguage(savedLanguage);

  // مخفی کردن صفحه لودینگ
  const hideLoader = () => {
    if (loader) {
      loader.classList.add("is-hidden");
    }
  };

  if (document.readyState === "complete") {

    window.setTimeout(hideLoader, 400);

  } else {

    window.addEventListener(
      "load",
      () => {
        window.setTimeout(hideLoader, 400);
      },
      { once: true }
    );

  }

  // جلوگیری از باقی ماندن لودینگ در صورت مشکل بارگذاری
  window.setTimeout(hideLoader, 3500);

})();
