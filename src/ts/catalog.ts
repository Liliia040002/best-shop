import { getProducts } from './modules/api.js';
import { createProductCard } from './modules/productCard.js';
import { Product } from './modules/types.js';
import { openProductPage } from './modules/helpers.js';

let products: Product[] = [];
let filteredProducts: Product[] = [];

let currentPage = 1;
const productsPerPage = 12;

async function initCatalog(): Promise<void> {
  products = await getProducts();
  filteredProducts = [...products];

  applyFiltersAndSorting();
  initFilters();
  renderTopBestSets();
}

function renderProducts(items: Product[]): void {
  const container = document.querySelector('.products__list') as HTMLElement | null;

  if (!container) return;

  container.innerHTML = '';

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const currentProducts = items.slice(start, end);

  currentProducts.forEach((product) => {
    container.append(createProductCard(product));
  });

  renderPagination(items.length);
  renderPaginationMessage(items.length);
}

function renderPagination(totalItems: number): void {
  const pagination = document.querySelector('.pagination') as HTMLElement | null;

  if (!pagination) return;

  const totalPages = Math.ceil(totalItems / productsPerPage);

  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  pagination.innerHTML = `
    <button class="pagination__btn" id="pagination-prev" type="button">Previous</button>
    <span class="pagination__page">Page ${currentPage} of ${totalPages}</span>
    <button class="pagination__btn" id="pagination-next" type="button">Next</button>
  `;

  const prevBtn = document.querySelector('#pagination-prev') as HTMLButtonElement | null;
  const nextBtn = document.querySelector('#pagination-next') as HTMLButtonElement | null;

  if (prevBtn) {
    prevBtn.disabled = currentPage === 1;

    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts(filteredProducts);
      }
    });
  }

  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages;

    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts(filteredProducts);
      }
    });
  }
}

function renderPaginationMessage(totalItems: number): void {
  const message = document.querySelector('.pagination-message') as HTMLElement | null;

  if (!message) return;

  if (totalItems === 0) {
    message.textContent = 'Showing 0 Results';
    return;
  }

  const start = (currentPage - 1) * productsPerPage + 1;
  const end = Math.min(currentPage * productsPerPage, totalItems);

  message.textContent = `Showing ${start}-${end} of ${totalItems} Results`;
}

function initFilters(): void {
  const sizeSelect = document.querySelector('#filter-size') as HTMLSelectElement | null;
  const colorSelect = document.querySelector('#filter-color') as HTMLSelectElement | null;
  const categorySelect = document.querySelector('#filter-category') as HTMLSelectElement | null;
  const salesCheckbox = document.querySelector('#filter-sales') as HTMLInputElement | null;
  const sortSelect = document.querySelector('#sort-by') as HTMLSelectElement | null;
  const clearBtn = document.querySelector('#clear-filters') as HTMLButtonElement | null;
  const searchInput = document.querySelector('#search-input') as HTMLInputElement | null;

  sizeSelect?.addEventListener('change', applyFiltersAndSorting);
  colorSelect?.addEventListener('change', applyFiltersAndSorting);
  categorySelect?.addEventListener('change', applyFiltersAndSorting);
  salesCheckbox?.addEventListener('change', applyFiltersAndSorting);
  sortSelect?.addEventListener('change', applyFiltersAndSorting);
  searchInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchProduct();
  }
});

  clearBtn?.addEventListener('click', () => {
    if (sizeSelect) sizeSelect.value = '';
    if (colorSelect) colorSelect.value = '';
    if (categorySelect) categorySelect.value = '';
    if (salesCheckbox) salesCheckbox.checked = false;
    if (sortSelect) sortSelect.value = 'default';

    currentPage = 1;
    applyFiltersAndSorting();
  });
}

function applyFiltersAndSorting(): void {
  const sizeValue = (document.querySelector('#filter-size') as HTMLSelectElement | null)?.value ?? '';
  const colorValue = (document.querySelector('#filter-color') as HTMLSelectElement | null)?.value ?? '';
  const categoryValue = (document.querySelector('#filter-category') as HTMLSelectElement | null)?.value ?? '';
  const salesValue = (document.querySelector('#filter-sales') as HTMLInputElement | null)?.checked ?? false;
  const sortValue = (document.querySelector('#sort-by') as HTMLSelectElement | null)?.value ?? 'default';

  // 🔹 1. Фільтрація
  let result = products.filter((product) => {
    const matchesSize = sizeValue === '' || product.size === sizeValue;
    const matchesColor = colorValue === '' || product.color === colorValue;
    const matchesCategory = categoryValue === '' || product.category === categoryValue;
    const matchesSales = !salesValue || product.salesStatus === true;

    return matchesSize && matchesColor && matchesCategory && matchesSales;
  });

  // 🔹 2. Сортування (на копії!)
  switch (sortValue) {
    case 'price-low':
      result = [...result].sort((a, b) => a.price - b.price);
      break;

    case 'price-high':
      result = [...result].sort((a, b) => b.price - a.price);
      break;

    case 'popularity':
      result = [...result].sort((a, b) => b.popularity - a.popularity);
      break;

    case 'rating':
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;

    default:
      break;
  }

  filteredProducts = result;

  currentPage = 1;
  renderProducts(filteredProducts);
}

function searchProduct(): void {
  const searchInput = document.querySelector('#search-input') as HTMLInputElement | null;

  if (!searchInput) return;

  const searchValue = searchInput.value.trim().toLowerCase();

  if (searchValue === '') return;

  const foundProduct = products.find((product) =>
    product.name.toLowerCase().includes(searchValue)
  );

  if (foundProduct) {
    openProductPage(foundProduct.id);
  } else {
    showProductNotFoundPopup();
  }
}

function showProductNotFoundPopup(): void {
  const popup = document.createElement('div');
  popup.className = 'product-popup';
  popup.textContent = 'Product not found';

  document.body.append(popup);

  setTimeout(() => {
    popup.remove();
  }, 2500);
}

function getRandomProducts(items: Product[], count: number): Product[] {
  return [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function renderTopBestSets(): void {
  const sidebar = document.querySelector('.sidebar__list') as HTMLElement | null;

  if (!sidebar) return;

  const suitcaseSets = products.filter((product) => 
    product.category === 'luggage sets'
  );

  const randomSets = getRandomProducts(suitcaseSets, 3);

  sidebar.innerHTML = '';

  randomSets.forEach((product) => {
    const item = document.createElement('li');
    item.className = 'sidebar__item';

    item.innerHTML = `
      <a href="product.html?id=${product.id}" class="sidebar__link">
        <img class="sidebar__image" src="${product.imageUrl}" alt="${product.name}">
        <div class="sidebar__content">
          <p class="category-description">${product.name}</p>
          <span class="rating">★ ${product.rating}</span>
          <span class="price">$${product.price}</span>
        </div>
      </a>
    `;

    sidebar.append(item);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCatalog();
});