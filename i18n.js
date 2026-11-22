(() => {
  'use strict';
  const content = window.PORTFOLIO_CONTENT;
  const languageKey = 'steve-portfolio-language:v1';
  const supported = new Set(['en', 'zh-TW']);
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  let language = 'en';
  const requested = new URL(location.href).searchParams.get('lang');
  if (supported.has(requested)) {
    language = requested;
  } else {
    try {
      const stored = localStorage.getItem(languageKey);
      if (supported.has(stored)) language = stored;
    } catch { /* English remains available when browser storage is restricted. */ }
  }

  function t(english, variables = {}) {
    const text = language === 'zh-TW' ? (content.translations[english] || english) : english;
    return text.replace(/\{(\w+)\}/g, (match, key) => String(variables[key] ?? match));
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    for (const element of document.querySelectorAll('[data-i18n]')) {
      element.textContent = t(element.dataset.i18n);
    }
    for (const element of document.querySelectorAll('[data-i18n-aria-label]')) {
      element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
    }
    for (const element of document.querySelectorAll('[data-i18n-placeholder]')) {
      element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder));
    }
    for (const element of document.querySelectorAll('[data-i18n-alt]')) {
      element.setAttribute('alt', t(element.dataset.i18nAlt));
    }
    for (const button of languageButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    }
    for (const card of document.querySelectorAll('.project-card')) {
      const title = card.querySelector('h4').textContent;
      card.querySelector('.project-open').setAttribute('aria-label', t('Open {title} website (opens in a new tab)', { title }));
      const sourceLink = card.querySelector('.source-link');
      if (sourceLink) sourceLink.setAttribute('aria-label', t('{title} source code (opens in a new tab)', { title }));
    }
    document.title = t(content.title);
    document.querySelector('meta[name="description"]').content = t(content.description);
    document.querySelector('meta[property="og:title"]').content = t(content.title);
    document.querySelector('meta[property="og:description"]').content = t(content.description);
    try { localStorage.setItem(languageKey, language); } catch { /* Language still changes for this visit. */ }
    window.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
  }

  window.portfolioI18n = { t, get language() { return language; } };
  for (const button of languageButtons) {
    button.addEventListener('click', () => {
      language = button.dataset.language;
      try {
        const url = new URL(location.href);
        url.searchParams.set('lang', language);
        history.replaceState(null, '', url);
      } catch { /* Local-file previews can have restricted history access. */ }
      applyLanguage();
    });
  }
  applyLanguage();
})();
