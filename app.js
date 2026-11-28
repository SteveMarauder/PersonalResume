(() => {
  'use strict';

  const t = (english, variables) => window.portfolioI18n.t(english, variables);

  const cards = [...document.querySelectorAll('.project-card')];
  const groups = [...document.querySelectorAll('.project-group')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const search = document.querySelector('#project-search');
  const storageStatus = document.querySelector('#storage-status');
  const validIds = new Set(cards.map(card => card.dataset.id));
  const storageKey = 'steve-learning-portfolio:v1';
  let activeFilter = 'all';
  let saved = new Set();
  let lastOpened = null;
  let storageAvailable = true;

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (stored && typeof stored === 'object') {
      if (Array.isArray(stored.saved)) saved = new Set(stored.saved.filter(id => validIds.has(id)));
      if (validIds.has(stored.lastOpened)) lastOpened = stored.lastOpened;
    }
  } catch {
    storageAvailable = false;
  }

  function updateStorageStatus() {
    storageStatus.textContent = storageAvailable
      ? t('Saves and last opened stay in this browser.')
      : t('Browser storage is unavailable. Saves last for this visit.');
  }

  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ saved: [...saved], lastOpened }));
      storageAvailable = true;
    } catch {
      storageAvailable = false;
    }
    updateStorageStatus();
  }

  function showLastOpened() {
    const card = cards.find(item => item.dataset.id === lastOpened);
    const box = document.querySelector('#last-opened');
    if (!card?.querySelector('.project-open')) { box.hidden = true; return; }
    const source = card.querySelector('.project-open');
    const link = document.querySelector('#last-opened-link');
    link.textContent = card.querySelector('h4').textContent;
    link.href = source.href;
    link.setAttribute('aria-label', t('Reopen {title} (opens in a new tab)', { title: link.textContent }));
    box.hidden = false;
  }

  function updateSavedButtons() {
    for (const card of cards) {
      const button = card.querySelector('.save-button');
      const isSaved = saved.has(card.dataset.id);
      const title = card.querySelector('h4').textContent;
      button.setAttribute('aria-pressed', String(isSaved));
      button.setAttribute('aria-label', t(isSaved ? 'Unsave {title}' : 'Save {title}', { title }));
      button.querySelector('span').textContent = t(isSaved ? 'Saved' : 'Save');
      button.hidden = false;
    }
    document.querySelector('#saved-count').textContent = String(saved.size);
  }

  function applyFilters() {
    const words = search.value.trim().toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
    let visibleCount = 0;
    for (const card of cards) {
      const matchesCategory = activeFilter === 'all'
        || card.dataset.category === activeFilter
        || (activeFilter === 'saved' && saved.has(card.dataset.id));
      const haystack = `${card.dataset.keywords} ${card.querySelector('h4').textContent} ${card.querySelector('.card-description').textContent}`.toLocaleLowerCase('en');
      card.hidden = !matchesCategory || !words.every(word => haystack.includes(word));
      if (!card.hidden) visibleCount += 1;
    }
    let visibleGroups = 0;
    for (const group of groups) {
      const visible = [...group.querySelectorAll('.project-card')].filter(card => !card.hidden).length;
      group.hidden = visible === 0;
      group.querySelector('.group-count').textContent = t(visible === 1 ? '{count} project' : '{count} projects', { count: visible });
      if (visible) visibleGroups += 1;
    }
    for (const button of filters) {
      const selected = button.dataset.filter === activeFilter;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('is-active', selected);
    }
    const resultTemplate = `{count} project${visibleCount === 1 ? '' : 's'} across {categories} categor${visibleGroups === 1 ? 'y' : 'ies'}`;
    document.querySelector('#results-count').textContent = t(resultTemplate, { count: visibleCount, categories: visibleGroups });
    document.querySelector('#empty-state').hidden = visibleCount !== 0;
    const emptySaved = activeFilter === 'saved' && saved.size === 0;
    document.querySelector('#empty-title').textContent = t(emptySaved ? 'Your personal shortlist starts here.' : 'No projects found.');
    document.querySelector('#empty-description').textContent = emptySaved
      ? t('Choose Save on any project to keep it close at hand.')
      : t('Try another topic or a shorter search.');
  }

  for (const button of filters) {
    button.addEventListener('click', () => { activeFilter = button.dataset.filter; applyFilters(); });
  }
  for (const button of document.querySelectorAll('[data-category-shortcut]')) {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.categoryShortcut;
      search.value = '';
      applyFilters();
      const filter = filters.find(item => item.dataset.filter === activeFilter);
      filter.focus({ preventScroll: true });
      document.querySelector('#explore').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  }
  for (const card of cards) {
    card.querySelector('.save-button').addEventListener('click', () => {
      const id = card.dataset.id;
      if (saved.has(id)) saved.delete(id); else saved.add(id);
      persist();
      updateSavedButtons();
      if (activeFilter === 'saved' && !saved.has(id)) {
        filters.find(button => button.dataset.filter === 'saved').focus({ preventScroll: true });
      }
      applyFilters();
    });
    const rememberVisit = () => {
      lastOpened = card.dataset.id;
      persist();
      showLastOpened();
    };
    const openLink = card.querySelector('.project-open');
    openLink?.addEventListener('click', rememberVisit);
    openLink?.addEventListener('auxclick', event => { if (event.button === 1) rememberVisit(); });
  }
  search.addEventListener('input', applyFilters);
  document.querySelector('#reset-filters').addEventListener('click', () => {
    activeFilter = 'all';
    search.value = '';
    applyFilters();
    search.focus({ preventScroll: true });
  });
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    try {
      const stored = JSON.parse(event.newValue || '{}');
      saved = new Set(Array.isArray(stored?.saved) ? stored.saved.filter(id => validIds.has(id)) : []);
      lastOpened = validIds.has(stored?.lastOpened) ? stored.lastOpened : null;
      updateSavedButtons();
      showLastOpened();
      applyFilters();
    } catch { /* Keep this tab's usable state if another tab writes invalid data. */ }
  });

  window.addEventListener('portfolio:languagechange', () => {
    updateStorageStatus();
    updateSavedButtons();
    showLastOpened();
    applyFilters();
  });

  document.querySelector('#collection-tools').hidden = false;
  updateStorageStatus();
  updateSavedButtons();
  showLastOpened();
  applyFilters();
})();
