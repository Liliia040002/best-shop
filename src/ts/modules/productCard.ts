import { Product } from './types.js';
import { addToCart } from './cartStorage.js';
import { openProductPage } from './helpers.js';

export function createProductCard(product: Product): HTMLElement {
  const card = document.createElement('article');
  card.className = 'product';

  card.innerHTML = `
    <img class="product__image" src="${product.imageUrl}" alt="${product.name}">
    <h3 class="product__title">${product.name}</h3>
    <p class="product__rating">★ ${product.rating}</p>
    <p class="product__price">$${product.price}</p>
    <button class="product__button" type="button">Add to Cart</button>
  `;

const button = card.querySelector<HTMLButtonElement>('.product__button');
  card.addEventListener('click', () => {
    openProductPage(product.id);
  });

  button?.addEventListener('click', (event) => {
    event.stopPropagation();
    addToCart(product);
  });

  return card;
}