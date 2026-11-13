document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // MOBILE MENU
    // =========================

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


    // =========================
    // AUTOMATIC YEAR
    // =========================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // =========================
    // LANGUAGE SYSTEM
    // =========================

    const langToggle = document.getElementById("langToggle");

    const translations = {

        ".site-header .wordmark":
            "مهندس <span>میلاد</span>",

        ".nav-links a:nth-child(1)": "خانه",
        ".nav-links a:nth-child(2)": "درباره من",
        ".nav-links a:nth-child(3)": "مهارت‌ها",
        ".nav-links a:nth-child(4)": "پروژه‌ها",
        ".nav-links a:nth-child(5)": "مسیر من",
        ".nav-links a:nth-child(6)": "ارتباط با من",

        ".header-cta":
            'بیا در ارتباط باشیم <span>↗️</span>',

        ".eyebrow":
            '<span class="status-dot"></span> آماده برای ایده‌های جدید',

        ".hero-kicker":
            "نسل بعدی دنیای برنامه‌نویسی",

        ".hero h1":
            'مهندس<br><span class="outline-text">میلاد</span><span class="hero-period">.</span>',

        ".role":
            "مهندس نرم‌افزار آینده",

        ".tagline":
            "رویاپردازی با کد، ساختن آینده.",

        ".label-top":
            "دیجیتال / آینده / ۰۰۱",

        ".label-bottom":
            'شکل ۰۰۱ <span>مهندس میلاد</span>',

        ".hero-index span:last-child":
            "معرفی",

        ".intro .section-heading span:last-child":
            "درباره من",

        ".intro-grid h2":
            'فقط یک<br>رویاپرداز نیستم.<br><em>من سازنده‌ام.</em>',

        ".intro-text p:nth-child(1)":
            "من میلاد هستم؛ علاقه‌مند به مهندسی نرم‌افزار، با اشتیاقی فراوان به فناوری، خلاقیت و دنیای بی‌پایان برنامه‌نویسی.",

        ".intro-text p:nth-child(2)":
            "مسیر من تازه شروع شده است. هر خط کد، قدمی دیگر برای ساختن چیزی ارزشمند، قدرتمند و منحصربه‌فرد است.",

        ".text-link":
            'مسیر من را کشف کن <b>↗️</b>',

        ".skills .section-heading span:last-child":
            "مهارت‌های من",

        ".skills .section-title-row h2":
            'یادگیری.<br><em>خلق کردن.</em>',

        ".skills .section-title-row p":
            "در حال ساختن پایه‌های دانش خودم، کشف فناوری‌های جدید و تبدیل کنجکاوی به مهارت‌های کاربردی هستم.",

        ".skill-item:nth-child(1) p":
            "ساختار صفحات وب را ایجاد می‌کند.",

        ".skill-item:nth-child(2) p":
            "طراحی تجربه‌های دیجیتال زیبا.",

        ".skill-item:nth-child(3) p":
            "زنده کردن ایده‌ها و رابط‌های کاربری.",

        ".skill-item:nth-child(4) h3":
            "تفکر خلاق",

        ".skill-item:nth-child(4) p":
            "حل مسائل با استفاده از خلاقیت و تخیل.",

        ".projects .section-heading span:last-child":
            "پروژه‌های منتخب",

        ".projects .section-title-row h2":
            'تبدیل ایده‌ها<br>به <em>واقعیت.</em>',

        ".projects .section-title-row p":
            "مجموعه‌ای در حال رشد از آزمایش‌ها، ایده‌ها و پروژه‌های مسیر یادگیری من.",

        ".project-card:nth-child(1) .visual-caption":
            "هویت دیجیتال",

        ".project-card:nth-child(1) .project-meta div > span":
            "۰۱ / طراحی وب",

        ".project-card:nth-child(1) h3":
            "وب‌سایت شخصی مهندس میلاد",

        ".project-card:nth-child(1) .project-status":
            "در حال ساخت",

        ".project-card:nth-child(2) .visual-caption":
            "آزمایش / سه‌بعدی",

        ".project-card:nth-child(2) .project-meta div > span":
            "۰۲ / آزمایش",

        ".project-card:nth-child(2) h3":
            "آزمایش‌های دیجیتال",

        ".project-card:nth-child(2) .project-status":
            "در حال بررسی",

        ".journey .section-heading span:last-child":
            "مسیر من",

        ".journey-content h2":
            'آینده<br><em>در حال ساخته شدن است.</em>',

        ".journey-content > p":
            "هر متخصصی روزی یک مبتدی بوده است. من هر روز یاد می‌گیرم، تجربه می‌کنم و پیشرفت می‌کنم. هدفم تبدیل شدن به مهندس نرم‌افزاری است که فناوری‌هایی تأثیرگذار خلق می‌کند.",

        ".journey-stamp":
            'مهندس<br>آینده <span>↗️</span>',

        ".contact .section-heading span:last-child":
            "ارتباط با من",

        ".contact h2":
            'بیا چیزی<br><em>متفاوت بسازیم.</em>',

        ".contact-hint":
            "قبل از انتشار، نشانی ایمیل را به‌روزرسانی کنید.",

        ".site-footer > span":
            "با کنجکاوی طراحی شده؛ با کدنویسی ساخته شده.",

        ".site-footer small":
            '© <span id="year">' + new Date().getFullYear() + '</span> مهندس میلاد',

        ".back-top":
            "بازگشت به بالا ↑"
    };


    // Save Original English Texts

    const originalTexts = new Map();

    Object.keys(translations).forEach(selector => {

        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {

            originalTexts.set(${selector}-${index}, {
                element: element,
                html: element.innerHTML
            });

        });

    });


    // Change Language

    let isPersian = false;

    function changeLanguage(persian) {

        isPersian = persian;

        document.documentElement.lang = persian ? "fa" : "en";
        document.documentElement.dir = persian ? "rtl" : "ltr";

        document.body.classList.toggle("fa", persian);


        Object.keys(translations).forEach(selector => {

            const elements = document.querySelectorAll(selector);

            elements.forEach((element, index) => {

                if (persian) {

                    element.innerHTML = translations[selector];

                } else {

                    const original = originalTexts.get(${selector}-${index});

                    if (original) {
                        element.innerHTML = original.html;
                    }

                }

            });

        });


        // Browser Tab Title

        document.title = persian
            ? "مهندس میلاد — مهندس نرم‌افزار آینده"
            : "ENGINEER MILAD — Future Software Engineer";


        // Language Button

        if (langToggle) {
            langToggle.textContent = persian ? "EN" : "FA";
        }

    }


    if (langToggle) {

        langToggle.addEventListener("click", () => {

            changeLanguage(!isPersian);

        });

    }


    // =========================
    // SMOOTH SCROLLING
    // =========================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const target = document.querySelector(
                link.getAttribute("href")
            );

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
