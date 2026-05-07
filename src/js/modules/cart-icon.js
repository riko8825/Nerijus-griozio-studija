// Header krepšelio ikona — counter visam site'ui.
import {subscribe, getCount} from './cart.js';

export function initCartIcon() {
  const icons = document.querySelectorAll('[data-cart-icon]');
  if (icons.length === 0) return;
  subscribe(() => {
    const count = getCount();
    icons.forEach((icon) => {
      const counter = icon.querySelector('[data-cart-count]');
      if (counter) {
        counter.textContent = count;
        counter.classList.toggle('is-empty', count === 0);
      }
    });
  });
}
