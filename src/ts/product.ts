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
  const title = document.querySelector('.product-hero__title') as HTMLElement | null;
  const price = document.querySelector('.product-hero__price') as HTMLElement | null;
  const image = document.querySelector('.product-image') as HTMLImageElement | null;
  const rating = document.querySelector('.product-hero__stars') as HTMLElement | null;

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
  const minusBtn = document.querySelector('#qty-minus') as HTMLButtonElement | null;
  const plusBtn = document.querySelector('#qty-plus') as HTMLButtonElement | null;
  const input = document.querySelector('#qty-input') as HTMLInputElement | null;

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
  const button = document.querySelector('.product-hero__cart-btn') as HTMLButtonElement | null;

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
  const form = document.querySelector('.review-form') as HTMLFormElement | null;

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const textarea = form.querySelector('.review-form__textarea') as HTMLTextAreaElement | null;
    const nameInput = form.querySelector('input[type="text"]') as HTMLInputElement | null;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement | null;

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

  const form = document.querySelector('.review-form');
  form?.append(message);
}

function renderRelatedProducts(products: Product[], currentId: string): void {
  const container = document.querySelector('.product-related-list') as HTMLElement | null;

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