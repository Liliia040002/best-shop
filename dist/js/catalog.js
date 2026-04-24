var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getProducts } from './modules/api.js';
import { createProductCard } from './modules/productCard.js';
import { openProductPage } from './modules/helpers.js';
let products = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;
function initCatalog() {
    return __awaiter(this, void 0, void 0, function* () {
        products = yield getProducts();
        filteredProducts = [...products];
        applyFiltersAndSorting();
        initFilters();
        renderTopBestSets();
    });
}
function renderProducts(items) {
    const container = document.querySelector('.products__list');
    if (!container)
        return;
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
function renderPagination(totalItems) {
    const pagination = document.querySelector('.pagination');
    if (!pagination)
        return;
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
    const prevBtn = document.querySelector('#pagination-prev');
    const nextBtn = document.querySelector('#pagination-next');
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
function renderPaginationMessage(totalItems) {
    const message = document.querySelector('.pagination-message');
    if (!message)
        return;
    if (totalItems === 0) {
        message.textContent = 'Showing 0 Results';
        return;
    }
    const start = (currentPage - 1) * productsPerPage + 1;
    const end = Math.min(currentPage * productsPerPage, totalItems);
    message.textContent = `Showing ${start}-${end} of ${totalItems} Results`;
}
function initFilters() {
    const sizeSelect = document.querySelector('#filter-size');
    const colorSelect = document.querySelector('#filter-color');
    const categorySelect = document.querySelector('#filter-category');
    const salesCheckbox = document.querySelector('#filter-sales');
    const sortSelect = document.querySelector('#sort-by');
    const clearBtn = document.querySelector('#clear-filters');
    const searchInput = document.querySelector('#search-input');
    sizeSelect === null || sizeSelect === void 0 ? void 0 : sizeSelect.addEventListener('change', applyFiltersAndSorting);
    colorSelect === null || colorSelect === void 0 ? void 0 : colorSelect.addEventListener('change', applyFiltersAndSorting);
    categorySelect === null || categorySelect === void 0 ? void 0 : categorySelect.addEventListener('change', applyFiltersAndSorting);
    salesCheckbox === null || salesCheckbox === void 0 ? void 0 : salesCheckbox.addEventListener('change', applyFiltersAndSorting);
    sortSelect === null || sortSelect === void 0 ? void 0 : sortSelect.addEventListener('change', applyFiltersAndSorting);
    searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchProduct();
        }
    });
    clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener('click', () => {
        if (sizeSelect)
            sizeSelect.value = '';
        if (colorSelect)
            colorSelect.value = '';
        if (categorySelect)
            categorySelect.value = '';
        if (salesCheckbox)
            salesCheckbox.checked = false;
        if (sortSelect)
            sortSelect.value = 'default';
        currentPage = 1;
        applyFiltersAndSorting();
    });
}
function applyFiltersAndSorting() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const sizeValue = (_b = (_a = document.querySelector('#filter-size')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
    const colorValue = (_d = (_c = document.querySelector('#filter-color')) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
    const categoryValue = (_f = (_e = document.querySelector('#filter-category')) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '';
    const salesValue = (_h = (_g = document.querySelector('#filter-sales')) === null || _g === void 0 ? void 0 : _g.checked) !== null && _h !== void 0 ? _h : false;
    const sortValue = (_k = (_j = document.querySelector('#sort-by')) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : 'default';
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
function searchProduct() {
    const searchInput = document.querySelector('#search-input');
    if (!searchInput)
        return;
    const searchValue = searchInput.value.trim().toLowerCase();
    if (searchValue === '')
        return;
    const foundProduct = products.find((product) => product.name.toLowerCase().includes(searchValue));
    if (foundProduct) {
        openProductPage(foundProduct.id);
    }
    else {
        showProductNotFoundPopup();
    }
}
function showProductNotFoundPopup() {
    const popup = document.createElement('div');
    popup.className = 'product-popup';
    popup.textContent = 'Product not found';
    document.body.append(popup);
    setTimeout(() => {
        popup.remove();
    }, 2500);
}
function getRandomProducts(items, count) {
    return [...items]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
}
function renderTopBestSets() {
    const sidebar = document.querySelector('.sidebar__list');
    if (!sidebar)
        return;
    const suitcaseSets = products.filter((product) => product.category === 'luggage sets');
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
