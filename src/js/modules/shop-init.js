// Shop init — vienas entry point visiems shop puslapiams.
// Detect'ina kuris puslapis pagal data-* selector'ius ir paleidžia tinkamą init.
import {initCartIcon} from './cart-icon.js?v=20261018';
import {initCatalog} from './products.js?v=20261018';
import {initProductDetail} from './product-detail.js?v=20261018';
import {initCartPage} from './cart-page.js?v=20261018';

function initMobileNav() {
  const burger = document.querySelector('.nav-burger');
  const overlay = document.getElementById('mobile-nav');
  const close = document.querySelector('.mobile-nav-close');
  if (!burger || !overlay) return;
  const open = () => overlay.classList.add('is-open');
  const dismiss = () => overlay.classList.remove('is-open');
  burger.addEventListener('click', open);
  close?.addEventListener('click', dismiss);
  overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', dismiss));
}

function init() {
  initMobileNav();
  initCartIcon();
  initCatalog();
  initProductDetail();
  initCartPage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
