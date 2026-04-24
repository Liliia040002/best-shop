import { CartItem, Product } from './types.js';


const CART_KEY = 'cart';

export function getCart(): CartItem[] {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) as CartItem[] : [];
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product, quantity = 1): void {
  const cart = getCart();

  const existingProduct = cart.find(
    (item) =>
      item.id === product.id &&
      item.size === product.size &&
      item.color === product.color
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  updateCartCounter(); // 🔥 ВАЖЛИВО
}

export function removeFromCart(productId: string): void {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartCounter();
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
  updateCartCounter();
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function updateCartCounter(): void {
  const counter = document.querySelector('.cart-counter') as HTMLElement | null;

  if (!counter) return;

  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);

  if (count > 0) {
    counter.textContent = String(count);
    counter.style.display = 'flex';
  } else {
    counter.style.display = 'none';
  }
}