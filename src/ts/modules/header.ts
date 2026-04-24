import { updateCartCounter } from './cartStorage.js';

export function initHeader(): void {
  updateCartCounter();

  const logo = document.querySelector('.header__logo') as HTMLElement | null;
  const cartIcon = document.querySelector('.header__cart') as HTMLElement | null;

  logo?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  cartIcon?.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
}