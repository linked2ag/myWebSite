(function () {
  "use strict";
  const STORAGE_KEY = "site-lang";
  let typedInstance = null;

  function calculateYears() {
    const currentYear = new Date().getFullYear();
    const yearsElements = [
      { id: 'dev-years', startYear: 2017 },
      { id: 'sap-years', startYear: 2018 },
      { id: 'vim-years', startYear: 2021 }
    ];

    yearsElements.forEach(function(item) {
      const el = document.getElementById(item.id);
      if (el) {
        const years = currentYear - item.startYear;
        el.textContent = years;
      }
    });
  }

  function initTyped(lang) {
    if (typedInstance) {
      typedInstance.destroy();
    }

    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
      typedElement.innerHTML = '';

      const strings = lang === "de"
        ? ['System Engineer', 'SAP Senior Consultant', 'VIM Senior Consultant', 'Software Developer']
        : ['System Engineer', 'SAP Senior Consultant', 'VIM Senior Consultant', 'Software Developer'];

      typedInstance = new Typed('#typed-text', {
        strings: strings,
        typeSpeed: 100,
        backSpeed: 50,
        startDelay: 200,
        showCursor: true,
        cursorChar: '|',
        loop: true
      });
    }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    const currentYear = new Date().getFullYear();
    const devYears = currentYear - 2017;
    const sapYears = currentYear - 2018;
    const vimYears = currentYear - 2021;

    document.querySelectorAll("[data-en]").forEach(function (el) {
      let text = lang === "de" ? (el.getAttribute("data-de") || el.getAttribute("data-en")) : el.getAttribute("data-en");
      text = text.replace(/\[dev-years\]/g, devYears);
      text = text.replace(/\[sap-years\]/g, sapYears);
      text = text.replace(/\[vim-years\]/g, vimYears);
      el.innerHTML = text;
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    initTyped(lang);
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.dataset.lang);
      });
    });

    applyLang(localStorage.getItem(STORAGE_KEY) || "de");
  });
})();
