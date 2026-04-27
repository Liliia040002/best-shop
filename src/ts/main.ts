import { initHeader } from './modules/header.js';
import { initLoginModal } from './modules/modal.js';
import { updateCartCounter } from './modules/cartStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initLoginModal();
   updateCartCounter();
});




