import { addToCart } from './cartStorage';
import { openProductPage } from './helpers';
export function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
    <img class="product__image" src="${product.image}" alt="${product.name}">
    <h3 class="product__title">${product.name}</h3>
    <p class="product__rating">★ ${product.rating}</p>
    <p class="product__price">$${product.price}</p>
    <button class="product__button" type="button">Add to Cart</button>
  `;
    const button = card.querySelector('.product__button');
    card.addEventListener('click', () => {
        openProductPage(product.id);
    });
    button === null || button === void 0 ? void 0 : button.addEventListener('click', (event) => {
        event.stopPropagation();
        addToCart(product);
    });
    return card;
}
