"use strict";
// type Product = {
//     id: string;
//     name: string;
//     price: number;
//     imageUrl: string;
//     category: string;
//     color: string;
//     size: string;
//     salesStatus: boolean;
//     rating: number;
//     popularity: number;
// };
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 12;
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('../assets/data.json');
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = yield response.json();
            allProducts = data.data;
            filteredProducts = [...allProducts];
            initControls();
            applyFiltersAndSort();
            renderRandomSets();
        }
        catch (error) {
            console.error('Error fetching products:', error);
        }
    });
}
function initControls() {
    const sizeSelect = document.querySelector('#filter-size');
    const colorSelect = document.querySelector('#filter-color');
    const categorySelect = document.querySelector('#filter-category');
    const salesCheckbox = document.querySelector('#filter-sales');
    const sortSelect = document.querySelector('#sort-by');
    const searchInput = document.querySelector('#search-input');
    const clearButton = document.querySelector('#clear-filters');
    const hideButton = document.querySelector('#hide-filters');
    const filtersBox = document.querySelector('.filters__box');
    sizeSelect === null || sizeSelect === void 0 ? void 0 : sizeSelect.addEventListener('change', handleControlChange);
    colorSelect === null || colorSelect === void 0 ? void 0 : colorSelect.addEventListener('change', handleControlChange);
    categorySelect === null || categorySelect === void 0 ? void 0 : categorySelect.addEventListener('change', handleControlChange);
    salesCheckbox === null || salesCheckbox === void 0 ? void 0 : salesCheckbox.addEventListener('change', handleControlChange);
    sortSelect === null || sortSelect === void 0 ? void 0 : sortSelect.addEventListener('change', handleControlChange);
    searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('input', () => {
        currentPage = 1;
        applyFiltersAndSort();
    });
    clearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener('click', (event) => {
        event.preventDefault();
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
        if (searchInput)
            searchInput.value = '';
        currentPage = 1;
        applyFiltersAndSort();
    });
    hideButton === null || hideButton === void 0 ? void 0 : hideButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (!filtersBox)
            return;
        filtersBox.classList.toggle('filters__box--hidden');
        hideButton.textContent = filtersBox.classList.contains('filters__box--hidden')
            ? 'Show Filters'
            : 'Hide Filters';
    });
}
function handleControlChange() {
    currentPage = 1;
    applyFiltersAndSort();
}
function applyFiltersAndSort() {
    var _a, _b, _c, _d, _e, _f;
    const sizeValue = ((_a = document.querySelector('#filter-size')) === null || _a === void 0 ? void 0 : _a.value) || '';
    const colorValue = ((_b = document.querySelector('#filter-color')) === null || _b === void 0 ? void 0 : _b.value) || '';
    const categoryValue = ((_c = document.querySelector('#filter-category')) === null || _c === void 0 ? void 0 : _c.value) || '';
    const salesValue = ((_d = document.querySelector('#filter-sales')) === null || _d === void 0 ? void 0 : _d.checked) || false;
    const sortValue = ((_e = document.querySelector('#sort-by')) === null || _e === void 0 ? void 0 : _e.value) || 'default';
    const searchValue = (((_f = document.querySelector('#search-input')) === null || _f === void 0 ? void 0 : _f.value) || '')
        .trim()
        .toLowerCase();
    filteredProducts = allProducts.filter((product) => {
        const matchesSize = !sizeValue || product.size.toLowerCase().includes(sizeValue.toLowerCase());
        const matchesColor = !colorValue || product.color.toLowerCase() === colorValue.toLowerCase();
        const matchesCategory = !categoryValue || product.category.toLowerCase() === categoryValue.toLowerCase();
        const matchesSales = !salesValue || product.salesStatus === true;
        const matchesSearch = !searchValue || product.name.toLowerCase().includes(searchValue);
        return (matchesSize &&
            matchesColor &&
            matchesCategory &&
            matchesSales &&
            matchesSearch);
    });
    sortProducts(sortValue);
    if (currentPage > getTotalPages()) {
        currentPage = 1;
    }
    renderProducts();
    updatePagination();
    updateShowingText();
}
function sortProducts(sortValue) {
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popularity':
            filteredProducts.sort((a, b) => b.popularity - a.popularity);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts = [...filteredProducts];
    }
}
function renderProducts() {
    const container = document.querySelector('.products__list');
    if (!container)
        return;
    container.innerHTML = '';
    if (filteredProducts.length === 0) {
        container.innerHTML = `<p class="products__empty">No products found.</p>`;
        return;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    for (const product of productsToShow) {
        container.innerHTML += `
            <div class="product" data-id="${product.id}">
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3 class="product__title">${product.name}</h3>
                <span class="product__price">${product.price} uah</span>
                <button class="product__button" type="button" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
    }
    addProductClickEvents();
}
function addProductClickEvents() {
    const cards = document.querySelectorAll('.product');
    cards.forEach((card) => {
        card.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('product__button')) {
                return;
            }
            const productId = card.dataset.id;
            if (!productId)
                return;
            window.location.href = `../html/product-details.html?id=${productId}`;
        });
    });
}
function updatePagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination)
        return;
    pagination.innerHTML = '';
    const totalPages = getTotalPages();
    if (totalPages <= 1)
        return;
    if (currentPage > 1) {
        pagination.innerHTML += `
            <a href="#" class="pagination__prev">Previous</a>
        `;
    }
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <a
                href="#"
                class="pagination__item ${i === currentPage ? 'pagination__item--active' : ''}"
                data-page="${i}"
            >
                ${i}
            </a>
        `;
    }
    if (currentPage < totalPages) {
        pagination.innerHTML += `
            <a href="#" class="pagination__next">
                Next <span>></span>
            </a>
        `;
    }
    addPaginationEvents();
}
function addPaginationEvents() {
    const pageButtons = document.querySelectorAll('.pagination__item');
    const prevButton = document.querySelector('.pagination__prev');
    const nextButton = document.querySelector('.pagination__next');
    pageButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const page = Number(event.currentTarget.dataset.page);
            currentPage = page;
            renderProducts();
            updatePagination();
            updateShowingText();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    prevButton === null || prevButton === void 0 ? void 0 : prevButton.addEventListener('click', (event) => {
        event.preventDefault();
        currentPage--;
        renderProducts();
        updatePagination();
        updateShowingText();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        currentPage++;
        renderProducts();
        updatePagination();
        updateShowingText();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
function updateShowingText() {
    const message = document.querySelector('.pagination-message');
    if (!message)
        return;
    if (filteredProducts.length === 0) {
        message.textContent = 'Showing 0 of 0 results';
        return;
    }
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, filteredProducts.length);
    message.textContent = `Showing ${start}–${end} of ${filteredProducts.length} results`;
}
function getTotalPages() {
    return Math.ceil(filteredProducts.length / itemsPerPage);
}
function renderRandomSets() {
    const sidebar = document.querySelector('.sidebar__list');
    if (!sidebar)
        return;
    const sets = allProducts.filter((product) => product.category === 'luggage sets');
    const shuffled = [...sets].sort(() => 0.5 - Math.random());
    const randomSets = shuffled.slice(0, Math.min(4, shuffled.length));
    sidebar.innerHTML = '';
    if (randomSets.length === 0) {
        sidebar.innerHTML = `<li class="sidebar__item">No sets found.</li>`;
        return;
    }
    for (const item of randomSets) {
        sidebar.innerHTML += `
            <li class="sidebar__item">
                <a href="../html/product-details.html?id=${item.id}" class="sidebar__link">
                    <img class="sidebar__image" src="${item.imageUrl}" alt="${item.name}">
                    <div class="sidebar__content">
                        <p class="category-description">${item.name}</p>
                        <span class="rating">${'★'.repeat(Math.round(item.rating))}</span>
                        <span class="price">${item.price} uah</span>
                    </div>
                </a>
            </li>
        `;
    }
}
fetchProducts();
