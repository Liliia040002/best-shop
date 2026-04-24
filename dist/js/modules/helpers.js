export function getRandomItems(items, count) {
    return [...items].sort(() => Math.random() - 0.5).slice(0, count);
}
export function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? Number(id) : null;
}
export function openProductPage(productId) {
    window.location.href = `product.html?id=${productId}`;
}
