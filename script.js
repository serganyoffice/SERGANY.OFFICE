/* =========================================
   MOBILE MENU
========================================= */
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
        });
    });
}
/* =========================================
   YEAR
========================================= */
const year = document.getElementById("year");
if (year) {
    year.textContent =
        new Date().getFullYear();
}
/* =========================================
   CURRENT DAY
========================================= */
const today =
    new Date().getDay();
/*
    JavaScript:
    0 = الأحد
    1 = الاثنين
    2 = الثلاثاء
    3 = الأربعاء
    4 = الخميس
    5 = الجمعة
    6 = السبت
*/
const arabicDays = {
    0: "الأحد",
    1: "الاثنين",
    2: "الثلاثاء",
    3: "الأربعاء",
    4: "الخميس",
    5: "الجمعة",
    6: "السبت"
};
const currentDay =
    arabicDays[today];
const dayCards =
    document.querySelectorAll(".day-card");
dayCards.forEach(card => {
    const title =
        card.querySelector("h3");
    if (
        title &&
        title.textContent.trim() === currentDay
    ) {
        card.classList.add("today");
        const small =
            card.querySelector("small");
        if (small) {
            small.textContent =
                "اليوم • مواعيد العمل";
        }
    }
});
/* =========================================
   OFFICE STATUS
========================================= */
const officeStatus =
    document.getElementById("officeStatus");
if (officeStatus) {
    officeStatus.textContent =
        "مواعيد العمل الأسبوعية";
}
/* =========================================
   BOOKING FORM
   WHATSAPP ONLY
========================================= */
const bookingForm =
    document.getElementById("bookingForm");
if (bookingForm) {
    bookingForm.addEventListener(
        "submit",
        async function (event) {
            event.preventDefault();
            const success =
                document.getElementById(
                    "bookingSuccess"
                );
            const name =
                document
                    .getElementById("bookingName")
                    .value
                    .trim();
            const phone =
                document
                    .getElementById("bookingPhone")
                    .value
                    .trim();
            const service =
                document
                    .getElementById("bookingService")
                    .value;
            const details =
                document
                    .getElementById("bookingDetails")
                    .value
                    .trim();
            /* =========================
               CHECK ALL REQUIRED DATA
            ========================= */
            if (
                !name ||
                !phone ||
                !service ||
                !details
            ) {
                success.textContent =
                    "⚠️ من فضلك أكمل جميع البيانات المطلوبة.";
                success.style.color =
                    "#c0392b";
                return;
            }
            /* =========================
               CHECK PHONE - NUMBERS ONLY
            ========================= */
            if (!/^[0-9]+$/.test(phone)) {
                success.textContent =
                    "⚠️ رقم الموبايل يجب أن يحتوي على أرقام فقط.";
                success.style.color =
                    "#c0392b";
                return;
            }
            /* =========================
               CHECK EGYPTIAN MOBILE
            ========================= */
            if (!/^01[0-9]{9}$/.test(phone)) {
                success.textContent =
                    "⚠️ من فضلك اكتب رقم موبايل مصري صحيح مكون من 11 رقم.";
                success.style.color =
                    "#c0392b";
                return;
            }
            /* =========================
               SHOW LOADING
            ========================= */
            success.textContent =
                "⏳ جاري تجهيز الطلب...";
            success.style.color =
                "#f39c12";
            try {
                /* =========================
                   WHATSAPP MESSAGE
                ========================= */
                let message =
                    "السلام عليكم، أريد حجز طلب / استشارة من خلال موقع مكتب محمد السرجاني.\n\n";
                message +=
                    "👤 الاسم: " +
                    name +
                    "\n";
                message +=
                    "📱 رقم الموبايل: " +
                    phone +
                    "\n";
                message +=
                    "📋 الخدمة: " +
                    service +
                    "\n";
                message +=
                    "📝 تفاصيل الطلب: " +
                    details +
                    "\n";
                message +=
                    "\nشكراً لتواصلكم مع مكتب محمد السرجاني.";
                /* =========================
                   SHOW SUCCESS
                ========================= */
                success.innerHTML =
                    "✅ تم تجهيز الطلب بنجاح<br>" +
                    "جاري فتح واتساب...";
                success.style.color =
                    "#16804b";
                /* =========================
                   OPEN WHATSAPP
                ========================= */
                const whatsappNumber =
                    "201006906248";
                const whatsappUrl =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(message);
                window.open(
                    whatsappUrl,
                    "_blank"
                );
            }
            catch (error) {
                console.error(
                    "WhatsApp Error:",
                    error
                );
                success.textContent =
                    "❌ لم يتم فتح واتساب، حاول مرة أخرى.";
                success.style.color =
                    "#c0392b";
            }
        }
    );
}
/* =========================================
   SERVICE PAGE ANIMATION
========================================= */
const cards =
    document.querySelectorAll(
        ".service-card, .service-large-card"
    );
const observer =
    new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity =
                        "1";
                    entry.target.style.transform =
                        "translateY(0)";
                }
            });
        },
        {
            threshold: 0.1
        }
    );
cards.forEach(card => {
    card.style.opacity =
        "0";
    card.style.transform =
        "translateY(20px)";
    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
});