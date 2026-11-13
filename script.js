const firmwareInput = document.getElementById("firmware");
const result = document.getElementById("result");
const langBtn = document.getElementById("langBtn");

let language = "ar";
const copy = {
  ar: {
    waiting: "بانتظار إدخال الإصدار",
    waitingText: "أدخل رقم النظام بين 9.00 و13.50 لعرض بطاقة المعلومات.",
    selected: "تم إدخال إصدار النظام",
    selectedText: v => `الإصدار الذي أدخلته هو ${v}. راجع توثيقًا موثوقًا خاصًا بهذا الإصدار للتحقق من التوافق. هذه الصفحة لا تشغّل أي ملفات أو ثغرات.`,
    invalid: "إصدار خارج النطاق",
    invalidText: "أدخل رقمًا من 9.00 إلى 13.50.",
    lang: "English"
  },
  en: {
    waiting: "WAITING FOR FIRMWARE",
    waitingText: "Enter a version between 9.00 and 13.50 to show its information card.",
    selected: "FIRMWARE ENTERED",
    selectedText: v => `The version you entered is ${v}. Consult trusted documentation for this exact version to verify compatibility. This page does not run exploits or payloads.`,
    invalid: "VERSION OUT OF RANGE",
    invalidText: "Enter a number from 9.00 to 13.50.",
    lang: "العربية"
  }
};

function updateResult() {
  const raw = firmwareInput.value.trim();
  const value = Number(raw);
  const c = copy[language];
  if (!raw) {
    result.querySelector("strong").textContent = c.waiting;
    result.querySelector("p").textContent = c.waitingText;
  } else if (!Number.isFinite(value) || value < 9 || value > 13.5) {
    result.querySelector("strong").textContent = c.invalid;
    result.querySelector("p").textContent = c.invalidText;
  } else {
    result.querySelector("strong").textContent = c.selected;
    result.querySelector("p").textContent = c.selectedText(raw);
  }
}
firmwareInput.addEventListener("input", updateResult);

langBtn.addEventListener("click", () => {
  language = language === "ar" ? "en" : "ar";
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  langBtn.textContent = copy[language].lang;
  document.querySelectorAll("[data-ar][data-en]").forEach(el => {
    el.textContent = el.dataset[language];
  });
  updateResult();
});
