(function () {
  "use strict";
  const STORAGE_KEY = "site-lang";
  let typedInstance = null;

  function initTyped(lang) {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    if (typedInstance) {
      typedInstance.destroy();
      typedInstance = null;
    }

    typedElement.textContent = '';

    const strings = lang === "de"
      ? ['System Ingenieur', 'SAP Senior Berater', 'VIM Senior Berater', 'Entwickler']
      : ['System Engineer', 'SAP Senior Consultant', 'VIM Senior Consultant', 'Software Developer'];

    try {
      if (typeof Typed !== 'undefined') {
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
    } catch (e) {
      console.warn('Typed.js initialization error:', e);
    }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    const currentYear = new Date().getFullYear();
    const devYears = currentYear - 2017;
    const sapYears = currentYear - 2018;
    const vimYears = currentYear - 2021;

    document.querySelectorAll("[data-de]").forEach(function (el) {
      let text;
      if (lang === "de") {
        text = el.getAttribute("data-de");
      } else {
        text = el.getAttribute("data-en");
      }

      if (text) {
        text = text.replace(/\[dev-years\]/g, devYears);
        text = text.replace(/\[sap-years\]/g, sapYears);
        text = text.replace(/\[vim-years\]/g, vimYears);
        el.innerHTML = text;
      }
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
    // Store original English text as data-en attribute for switching between languages
    document.querySelectorAll("[data-de]").forEach(function (el) {
      if (!el.hasAttribute("data-en")) {
        el.setAttribute("data-en", el.innerHTML);
      }
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.dataset.lang);
      });
    });

    applyLang(localStorage.getItem(STORAGE_KEY) || "de");
  });
})();
