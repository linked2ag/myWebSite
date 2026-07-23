(function () {
  "use strict";
  const STORAGE_KEY = "site-lang";
  let typedInstance = null;

  function initTyped(lang) {
    if (typedInstance) {
      typedInstance.destroy();
    }

    const strings = lang === "de"
      ? ['Systems Engineer', 'SAP Senior Consultant', 'VIM Senior Consultant', 'Software Developer']
      : ['System Engineer', 'SAP Senior Consultant', 'VIM Senior Consultant', 'Software Developer'];

    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
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

    document.querySelectorAll("[data-en]").forEach(function (el) {
      const text = lang === "de" ? (el.getAttribute("data-de") || el.getAttribute("data-en")) : el.getAttribute("data-en");
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

    applyLang(localStorage.getItem(STORAGE_KEY) || "en");
  });
})();
