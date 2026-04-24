const CART_KEY = 'cart';
export function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}
export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
export function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existingProduct = cart.find((item) => item.id === product.id &&
        item.size === product.size &&
        item.color === product.color);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    }
    else {
        cart.push(Object.assign(Object.assign({}, product), { quantity }));
    }
    saveCart(cart);
    updateCartCounter(); // 🔥 ВАЖЛИВО
}
export function removeFromCart(productId) {
    const cart = getCart().filter((item) => item.id !== productId);
    saveCart(cart);
    updateCartCounter();
}
export function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCounter();
}
export function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
export function updateCartCounter() {
    const counter = document.querySelector('.cart-counter');
    if (!counter)
        return;
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    if (count > 0) {
        counter.textContent = String(count);
        counter.style.display = 'flex';
    }
    else {
        counter.style.display = 'none';
    }
}
