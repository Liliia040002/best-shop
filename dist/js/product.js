var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getProducts } from './modules/api.js';
import { addToCart } from './modules/cartStorage.js';
import { createProductCard } from './modules/productCard.js';
let currentProduct = null;
let quantity = 1;
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? id : null;
}
function initProductPage() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const products = yield getProducts();
        const productId = getProductIdFromUrl();
        if (!productId)
            return;
        currentProduct = (_a = products.find((product) => product.id === productId)) !== null && _a !== void 0 ? _a : null;
        if (!currentProduct)
            return;
        renderProduct(currentProduct);
        initQuantity();
        initAddToCart();
        initTabs();
        initReviewForm();
        renderRelatedProducts(products, currentProduct.id);
    });
}
function renderProduct(product) {
    const title = document.querySelector('.product-hero__title');
    const price = document.querySelector('.product-hero__price');
    const image = document.querySelector('.product-image');
    const rating = document.querySelector('.product-hero__stars');
    if (title)
        title.textContent = product.name;
    if (price)
        price.textContent = `$${product.price}`;
    if (image) {
        image.src = product.imageUrl;
        image.alt = product.name;
    }
    if (rating) {
        rating.textContent = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
    }
}
function initQuantity() {
    const minusBtn = document.querySelector('#qty-minus');
    const plusBtn = document.querySelector('#qty-plus');
    const input = document.querySelector('#qty-input');
    if (!input)
        return;
    minusBtn === null || minusBtn === void 0 ? void 0 : minusBtn.addEventListener('click', () => {
        quantity = Math.max(1, quantity - 1);
        input.value = String(quantity);
    });
    plusBtn === null || plusBtn === void 0 ? void 0 : plusBtn.addEventListener('click', () => {
        quantity += 1;
        input.value = String(quantity);
    });
    input.addEventListener('input', () => {
        quantity = Math.max(1, Number(input.value) || 1);
        input.value = String(quantity);
    });
}
function initAddToCart() {
    const button = document.querySelector('.product-hero__cart-btn');
    button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
        if (!currentProduct)
            return;
        addToCart(currentProduct, quantity);
        window.location.href = '/src/html/cart.html';
    });
}
function initTabs() {
    const tabs = document.querySelectorAll('.product-tabs__tab');
    const panes = document.querySelectorAll('.product-tabs__pane');
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            var _a;
            const tabId = tab.dataset.tab;
            tabs.forEach((item) => item.classList.remove('product-tabs__tab--active'));
            panes.forEach((pane) => pane.classList.remove('product-tabs__pane--active'));
            tab.classList.add('product-tabs__tab--active');
            (_a = document.querySelector(`#${tabId}`)) === null || _a === void 0 ? void 0 : _a.classList.add('product-tabs__pane--active');
        });
    });
}
function initReviewForm() {
    const form = document.querySelector('.review-form');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => {
        var _a;
        event.preventDefault();
        const textarea = form.querySelector('.review-form__textarea');
        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const isValid = (textarea === null || textarea === void 0 ? void 0 : textarea.value.trim()) &&
            (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim()) &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((_a = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value.trim()) !== null && _a !== void 0 ? _a : '');
        showReviewMessage(Boolean(isValid));
        if (isValid) {
            form.reset();
        }
    });
}
function showReviewMessage(isSuccess) {
    const oldMessage = document.querySelector('.review-form__message');
    oldMessage === null || oldMessage === void 0 ? void 0 : oldMessage.remove();
    const message = document.createElement('p');
    message.className = 'review-form__message';
    message.textContent = isSuccess
        ? 'Review submitted successfully!'
        : 'Please fill all required fields correctly.';
    const form = document.querySelector('.review-form');
    form === null || form === void 0 ? void 0 : form.append(message);
}
function renderRelatedProducts(products, currentId) {
    const container = document.querySelector('.product-related-list');
    if (!container)
        return;
    const randomProducts = products
        .filter((product) => product.id !== currentId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
    container.innerHTML = '';
    randomProducts.forEach((product) => {
        container.append(createProductCard(product));
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initProductPage();
});
