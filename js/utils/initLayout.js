import { initFooter, initHeader } from './uiHelper.js';

// Initialize Header and Footer component in all pages but main page
document.addEventListener('DOMContentLoaded', () => {
  initHeader(window.location.pathname);
  initFooter();
});
