import { updateCartCounter } from './cartStorage.js';

export function initHeader(): void {
  updateCartCounter();

const logo = document.querySelector<HTMLElement>('.header__logo');
const cartIcon = document.querySelector<HTMLElement>('.header__cart');

  logo?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  cartIcon?.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
}