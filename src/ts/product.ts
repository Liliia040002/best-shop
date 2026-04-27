import { getProducts } from './modules/api.js';
import { addToCart } from './modules/cartStorage.js';
import { createProductCard } from './modules/productCard.js';
import { Product } from './modules/types.js';

let currentProduct: Product | null = null;
let quantity = 1;

function getProductIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  return id ? id : null;
}

async function initProductPage(): Promise<void> {
  const products = await getProducts();
  const productId = getProductIdFromUrl();

  if (!productId) return;

  currentProduct = products.find((product) => product.id === productId) ?? null;

  if (!currentProduct) return;

  renderProduct(currentProduct);
  initQuantity();
  initAddToCart();
  initTabs();
  initReviewForm();
  renderRelatedProducts(products, currentProduct.id);
}

function renderProduct(product: Product): void {
  const title = document.querySelector<HTMLElement>('.product-hero__title');
  const price = document.querySelector<HTMLElement>('.product-hero__price');
  const image = document.querySelector<HTMLImageElement>('.product-image');
  const rating = document.querySelector<HTMLElement>('.product-hero__stars');

  if (title) title.textContent = product.name;
  if (price) price.textContent = `$${product.price}`;
  if (image) {
    image.src = product.imageUrl;
    image.alt = product.name;
  }

  if (rating) {
    rating.textContent = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  }
}

function initQuantity(): void {
  const minusBtn = document.querySelector<HTMLButtonElement>('#qty-minus');
  const plusBtn = document.querySelector<HTMLButtonElement>('#qty-plus');
  const input = document.querySelector<HTMLInputElement>('#qty-input');

  if (!input) return;

  minusBtn?.addEventListener('click', () => {
    quantity = Math.max(1, quantity - 1);
    input.value = String(quantity);
  });

  plusBtn?.addEventListener('click', () => {
    quantity += 1;
    input.value = String(quantity);
  });

  input.addEventListener('input', () => {
    quantity = Math.max(1, Number(input.value) || 1);
    input.value = String(quantity);
  });
}

function initAddToCart(): void {
  const button = document.querySelector<HTMLButtonElement>('.product-hero__cart-btn');

  button?.addEventListener('click', () => {
    if (!currentProduct) return;

    addToCart(currentProduct, quantity);
    window.location.href = '/src/html/cart.html';
  });
}

function initTabs(): void {
  const tabs = document.querySelectorAll('.product-tabs__tab');
  const panes = document.querySelectorAll('.product-tabs__pane');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = (tab as HTMLElement).dataset.tab;

      tabs.forEach((item) => item.classList.remove('product-tabs__tab--active'));
      panes.forEach((pane) => pane.classList.remove('product-tabs__pane--active'));

      tab.classList.add('product-tabs__tab--active');
      document.querySelector(`#${tabId}`)?.classList.add('product-tabs__pane--active');
    });
  });
}

function initReviewForm(): void {
  const form = document.querySelector<HTMLFormElement>('.review-form');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const textarea = form.querySelector<HTMLTextAreaElement>('.review-form__textarea');
    const nameInput = form.querySelector<HTMLInputElement>('input[type="text"]');
    const emailInput = form.querySelector<HTMLInputElement>('input[type="email"]');

    const isValid =
      textarea?.value.trim() &&
      nameInput?.value.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput?.value.trim() ?? '');

    showReviewMessage(Boolean(isValid));

    if (isValid) {
      form.reset();
    }
  });
}

function showReviewMessage(isSuccess: boolean): void {
  const oldMessage = document.querySelector('.review-form__message');
  oldMessage?.remove();

  const message = document.createElement('p');
  message.className = 'review-form__message';
  message.textContent = isSuccess
    ? 'Review submitted successfully!'
    : 'Please fill all required fields correctly.';

  const form = document.querySelector<HTMLFormElement>('.review-form');
  form?.append(message);
}

function renderRelatedProducts(products: Product[], currentId: string): void {
  const container = document.querySelector<HTMLElement>('.product-related-list');

  if (!container) return;

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