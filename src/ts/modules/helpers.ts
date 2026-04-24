export function getRandomItems<T>(items: T[], count: number): T[] {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
}

export function getProductIdFromUrl(): number | null {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  return id ? Number(id) : null;
}

export function openProductPage(productId: string): void {
  window.location.href = `product.html?id=${productId}`;
}