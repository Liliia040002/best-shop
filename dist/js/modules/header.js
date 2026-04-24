import { updateCartCounter } from './cartStorage.js';
export function initHeader() {
    updateCartCounter();
    const logo = document.querySelector('.header__logo');
    const cartIcon = document.querySelector('.header__cart');
    logo === null || logo === void 0 ? void 0 : logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    cartIcon === null || cartIcon === void 0 ? void 0 : cartIcon.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
}
