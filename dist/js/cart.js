import { getCart, saveCart, clearCart, updateCartCounter, } from './modules/cartStorage.js';
const SHIPPING_PRICE = 30;
const DISCOUNT_LIMIT = 3000;
const DISCOUNT_PERCENT = 0.1;
function initCartPage() {
    renderCart();
    const clearBtn = document.querySelector('.cart__button--clear');
    const checkoutBtn = document.querySelector('.cart__checkout-btn');
    const continueBtn = document.querySelector('.cart__button--continue');
    continueBtn === null || continueBtn === void 0 ? void 0 : continueBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '/src/html/catalog.html';
    });
    clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener('click', () => {
        clearCart();
        renderCart('Your cart is empty. Use the catalog to add new items.');
    });
    checkoutBtn === null || checkoutBtn === void 0 ? void 0 : checkoutBtn.addEventListener('click', () => {
        clearCart();
        renderCart('Thank you for your purchase.');
    });
}
function renderCart(messageText) {
    const cart = getCart();
    const table = document.querySelector('.cart__table');
    const bottom = document.querySelector('.cart__bottom');
    if (!table || !bottom)
        return;
    table.querySelectorAll('.cart__item, .cart__empty-message').forEach((item) => item.remove());
    if (cart.length === 0) {
        const message = document.createElement('p');
        message.className = 'cart__empty-message';
        message.textContent = messageText !== null && messageText !== void 0 ? messageText : 'Your cart is empty. Use the catalog to add new items.';
        table.append(message);
        bottom.style.display = 'none';
        updateCartCounter();
        return;
    }
    bottom.style.display = '';
    cart.forEach((item, index) => {
        table.append(createCartItem(item, index));
    });
    renderSummary(cart);
    updateCartCounter();
}
function createCartItem(item, index) {
    const row = document.createElement('div');
    row.className = 'cart__item';
    row.innerHTML = `
    <div class="cart__col cart__col--image">
      <img src="${item.imageUrl}" alt="${item.name}">
    </div>

    <div class="cart__col cart__col--name">
      ${item.name}
      <span class="cart__item-details">Size: ${item.size}, Color: ${item.color}</span>
    </div>

    <div class="cart__col cart__col--price">$${item.price}</div>

    <div class="cart__col cart__col--quantity">
      <button class="cart__quantity-btn" data-action="minus" type="button">−</button>
      <span class="cart__quantity-value">${item.quantity}</span>
      <button class="cart__quantity-btn" data-action="plus" type="button">+</button>
    </div>

    <div class="cart__col cart__col--total">$${item.price * item.quantity}</div>

    <div class="cart__col cart__col--delete">
      <button class="cart__delete-btn" type="button" aria-label="Delete product">×</button>
    </div>
  `;
    const minusBtn = row.querySelector('[data-action="minus"]');
    const plusBtn = row.querySelector('[data-action="plus"]');
    const deleteBtn = row.querySelector('.cart__delete-btn');
    minusBtn === null || minusBtn === void 0 ? void 0 : minusBtn.addEventListener('click', () => {
        updateQuantity(index, -1);
    });
    plusBtn === null || plusBtn === void 0 ? void 0 : plusBtn.addEventListener('click', () => {
        updateQuantity(index, 1);
    });
    deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener('click', () => {
        removeItem(index);
    });
    return row;
}
function updateQuantity(index, change) {
    const cart = getCart();
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }
    saveCart(cart);
    renderCart();
}
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}
function renderSummary(cart) {
    const summaryValues = document.querySelectorAll('.cart__summary-value');
    const subtotal = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
    const discount = subtotal > DISCOUNT_LIMIT ? subtotal * DISCOUNT_PERCENT : 0;
    const total = subtotal - discount + SHIPPING_PRICE;
    if (summaryValues[0]) {
        summaryValues[0].textContent = `$${subtotal.toFixed(2)}`;
    }
    if (summaryValues[1]) {
        summaryValues[1].textContent = `$${SHIPPING_PRICE.toFixed(2)}`;
    }
    if (summaryValues[2]) {
        summaryValues[2].textContent = `$${total.toFixed(2)}`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initCartPage();
});
