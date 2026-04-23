
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

// let allProducts: Product[] = [];
// let filteredProducts: Product[] = [];

// let currentPage = 1;
// const itemsPerPage = 12;

// async function fetchProducts(): Promise<void> {
//     try {
//         const response = await fetch('../assets/data.json');

//         if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//         }

//         const data = await response.json();
//         allProducts = data.data;
//         filteredProducts = [...allProducts];

//         initControls();
//         applyFiltersAndSort();
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }
// }

// function initControls(): void {
//     const sizeSelect = document.querySelector('#filter-size') as HTMLSelectElement | null;
//     const colorSelect = document.querySelector('#filter-color') as HTMLSelectElement | null;
//     const categorySelect = document.querySelector('#filter-category') as HTMLSelectElement | null;
//     const salesCheckbox = document.querySelector('#filter-sales') as HTMLInputElement | null;
//     const sortSelect = document.querySelector('#sort-by') as HTMLSelectElement | null;
//     const searchInput = document.querySelector('#search-input') as HTMLInputElement | null;
//     const clearButton = document.querySelector('#clear-filters') as HTMLButtonElement | null;
//     const hideButton = document.querySelector('#hide-filters') as HTMLButtonElement | null;
//     const filtersBlock = document.querySelector('.filters') as HTMLElement | null;

//     sizeSelect?.addEventListener('change', handleControlChange);
//     colorSelect?.addEventListener('change', handleControlChange);
//     categorySelect?.addEventListener('change', handleControlChange);
//     salesCheckbox?.addEventListener('change', handleControlChange);
//     sortSelect?.addEventListener('change', handleControlChange);

//     searchInput?.addEventListener('input', () => {
//         currentPage = 1;
//         applyFiltersAndSort();
//     });

//     clearButton?.addEventListener('click', (event) => {
//         event.preventDefault();

//         if (sizeSelect) sizeSelect.value = '';
//         if (colorSelect) colorSelect.value = '';
//         if (categorySelect) categorySelect.value = '';
//         if (salesCheckbox) salesCheckbox.checked = false;
//         if (sortSelect) sortSelect.value = 'default';
//         if (searchInput) searchInput.value = '';

//         currentPage = 1;
//         applyFiltersAndSort();
//     });

//    const hideBtn = document.getElementById('hide-filters') as HTMLButtonElement;
// const filtersBox = document.querySelector('.filters__box') as HTMLElement;

// hideBtn?.addEventListener('click', (e) => {
//     e.preventDefault();

//     filtersBox.classList.toggle('filters__box--hidden');

//     hideBtn.textContent = filtersBox.classList.contains('filters__box--hidden')
//         ? 'Show Filters'
//         : 'Hide Filters';
// });
// }

// function handleControlChange(): void {
//     currentPage = 1;
//     applyFiltersAndSort();
// }

// function applyFiltersAndSort(): void {
//     const sizeValue = (document.querySelector('#filter-size') as HTMLSelectElement | null)?.value || '';
//     const colorValue = (document.querySelector('#filter-color') as HTMLSelectElement | null)?.value || '';
//     const categoryValue = (document.querySelector('#filter-category') as HTMLSelectElement | null)?.value || '';
//     const salesValue = (document.querySelector('#filter-sales') as HTMLInputElement | null)?.checked || false;
//     const sortValue = (document.querySelector('#sort-by') as HTMLSelectElement | null)?.value || 'default';
//     const searchValue = ((document.querySelector('#search-input') as HTMLInputElement | null)?.value || '').trim().toLowerCase();

//     filteredProducts = allProducts.filter((product) => {
//         const matchesSize = !sizeValue || product.size === sizeValue;
//         const matchesColor = !colorValue || product.color === colorValue;
//         const matchesCategory = !categoryValue || product.category === categoryValue;
//         const matchesSales = !salesValue || product.salesStatus === true;
//         const matchesSearch = !searchValue || product.name.toLowerCase().includes(searchValue);

//         return matchesSize && matchesColor && matchesCategory && matchesSales && matchesSearch;
//     });

//     sortProducts(sortValue);

//     if (currentPage > getTotalPages()) {
//         currentPage = 1;
//     }

//     renderProducts();
//     updatePagination();
//     updateShowingText();
// }

// function sortProducts(sortValue: string): void {
//     switch (sortValue) {
//         case 'price-low':
//             filteredProducts.sort((a, b) => a.price - b.price);
//             break;
//         case 'price-high':
//             filteredProducts.sort((a, b) => b.price - a.price);
//             break;
//         case 'popularity':
//             filteredProducts.sort((a, b) => b.popularity - a.popularity);
//             break;
//         case 'rating':
//             filteredProducts.sort((a, b) => b.rating - a.rating);
//             break;
//         default:
//             filteredProducts = [...filteredProducts];
//     }
// }

// function renderProducts(): void {
//     const container = document.querySelector('.products__list') as HTMLElement | null;
//     if (!container) return;

//     container.innerHTML = '';

//     if (filteredProducts.length === 0) {
//         container.innerHTML = `<p class="products__empty">No products found.</p>`;
//         return;
//     }

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const productsToShow = filteredProducts.slice(startIndex, endIndex);

//     for (const product of productsToShow) {
//         container.innerHTML += `
//             <div class="product" data-id="${product.id}">
//                 <img src="${product.imageUrl}" alt="${product.name}">
//                 <h3 class="product__title">${product.name}</h3>
//                 <span class="product__price">${product.price} uah</span>
//                 <button class="product__button" data-id="${product.id}">Add to Cart</button>
//             </div>
//         `;
//     }

//     addProductClickEvents();
// }

// function addProductClickEvents(): void {
//     const cards = document.querySelectorAll('.product');

//     cards.forEach((card) => {
//         card.addEventListener('click', (event) => {
//             const target = event.target as HTMLElement;

//             if (target.classList.contains('product__button')) {
//                 return;
//             }

//             const productId = (card as HTMLElement).dataset.id;
//             if (!productId) return;

//             window.location.href = `../html/product-details.html?id=${productId}`;
//         });
//     });
// }

// function updatePagination(): void {
//     const pagination = document.querySelector('.pagination') as HTMLElement | null;
//     if (!pagination) return;

//     pagination.innerHTML = '';

//     const totalPages = getTotalPages();

//     if (totalPages <= 1) return;

//     if (currentPage > 1) {
//         pagination.innerHTML += `<button class="pagination__prev">Previous</button>`;
//     }

//     for (let i = 1; i <= totalPages; i++) {
//         pagination.innerHTML += `
//             <button
//                 class="pagination__item ${i === currentPage ? 'pagination__item--active' : ''}"
//                 data-page="${i}"
//             >
//                 ${i}
//             </button>
//         `;
//     }

//     if (currentPage < totalPages) {
//         pagination.innerHTML += `<button class="pagination__next">Next</button>`;
//     }

//     addPaginationEvents();
// }

// function addPaginationEvents(): void {
//     const pageButtons = document.querySelectorAll('[data-page]');
//     const prevButton = document.querySelector('.pagination__prev');
//     const nextButton = document.querySelector('.pagination__next');

//     pageButtons.forEach((button) => {
//         button.addEventListener('click', (event) => {
//             const page = Number((event.currentTarget as HTMLElement).dataset.page);
//             currentPage = page;
//             renderProducts();
//             updatePagination();
//             updateShowingText();
//         });
//     });

//     prevButton?.addEventListener('click', () => {
//         currentPage--;
//         renderProducts();
//         updatePagination();
//         updateShowingText();
//     });

//     nextButton?.addEventListener('click', () => {
//         currentPage++;
//         renderProducts();
//         updatePagination();
//         updateShowingText();
//     });
// }

// function updateShowingText(): void {
//     const message = document.querySelector('.pagination-message') as HTMLElement | null;
//     if (!message) return;

//     if (filteredProducts.length === 0) {
//         message.textContent = 'Showing 0 of 0 results';
//         return;
//     }

//     const start = (currentPage - 1) * itemsPerPage + 1;
//     const end = Math.min(currentPage * itemsPerPage, filteredProducts.length);

//     message.textContent = `Showing ${start}–${end} of ${filteredProducts.length} results`;
// }

// function getTotalPages(): number {
//     return Math.ceil(filteredProducts.length / itemsPerPage);
// }

// fetchProducts();

// function renderRandomSets(): void {
//     const sidebar = document.querySelector('.sidebar__list') as HTMLElement;

//     if (!sidebar) return;

//     // 1. фільтр тільки luggage sets
//     const sets = allProducts.filter(product => product.category === 'luggage sets');

//     // 2. перемішування
//     const shuffled = [...sets].sort(() => 0.5 - Math.random());

//     // 3. беремо 4
//     const randomSets = shuffled.slice(0, 4);

//     sidebar.innerHTML = '';

//     for (const item of randomSets) {
//         sidebar.innerHTML += `
//             <li class="sidebar__item">
//                 <a href="../html/product-details.html?id=${item.id}" class="sidebar__link">
//                     <img class="sidebar__image" src="${item.imageUrl}" alt="${item.name}">
//                     <div class="sidebar__content">
//                         <p class="category-description">${item.name}</p>
//                         <span class="rating">${'★'.repeat(Math.round(item.rating))}</span>
//                         <span class="price">${item.price} uah</span>
//                     </div>
//                 </a>
//             </li>
//         `;
//     }
// }

// // renderRandomSets();

type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    color: string;
    size: string;
    salesStatus: boolean;
    rating: number;
    popularity: number;
};

type ProductsResponse = {
    data: Product[];
};

let allProducts: Product[] = [];
let filteredProducts: Product[] = [];

let currentPage = 1;
const itemsPerPage = 12;

async function fetchProducts(): Promise<void> {
    try {
        const response = await fetch('../assets/data.json');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data: ProductsResponse = await response.json();

        allProducts = data.data;
        filteredProducts = [...allProducts];

        initControls();
        applyFiltersAndSort();
        renderRandomSets();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function initControls(): void {
    const sizeSelect = document.querySelector<HTMLSelectElement>('#filter-size');
    const colorSelect = document.querySelector<HTMLSelectElement>('#filter-color');
    const categorySelect = document.querySelector<HTMLSelectElement>('#filter-category');
    const salesCheckbox = document.querySelector<HTMLInputElement>('#filter-sales');
    const sortSelect = document.querySelector<HTMLSelectElement>('#sort-by');
    const searchInput = document.querySelector<HTMLInputElement>('#search-input');
    const clearButton = document.querySelector<HTMLButtonElement>('#clear-filters');
    const hideButton = document.querySelector<HTMLButtonElement>('#hide-filters');
    const filtersBox = document.querySelector<HTMLElement>('.filters__box');

    sizeSelect?.addEventListener('change', handleControlChange);
    colorSelect?.addEventListener('change', handleControlChange);
    categorySelect?.addEventListener('change', handleControlChange);
    salesCheckbox?.addEventListener('change', handleControlChange);
    sortSelect?.addEventListener('change', handleControlChange);

    searchInput?.addEventListener('input', () => {
        currentPage = 1;
        applyFiltersAndSort();
    });

    clearButton?.addEventListener('click', (event) => {
        event.preventDefault();

        if (sizeSelect) sizeSelect.value = '';
        if (colorSelect) colorSelect.value = '';
        if (categorySelect) categorySelect.value = '';
        if (salesCheckbox) salesCheckbox.checked = false;
        if (sortSelect) sortSelect.value = 'default';
        if (searchInput) searchInput.value = '';

        currentPage = 1;
        applyFiltersAndSort();
    });

    hideButton?.addEventListener('click', (event) => {
        event.preventDefault();

        if (!filtersBox) return;

        filtersBox.classList.toggle('filters__box--hidden');

        hideButton.textContent = filtersBox.classList.contains('filters__box--hidden')
            ? 'Show Filters'
            : 'Hide Filters';
    });
}

function handleControlChange(): void {
    currentPage = 1;
    applyFiltersAndSort();
}

function applyFiltersAndSort(): void {
    const sizeValue = document.querySelector<HTMLSelectElement>('#filter-size')?.value ?? '';
    const colorValue = document.querySelector<HTMLSelectElement>('#filter-color')?.value ?? '';
    const categoryValue = document.querySelector<HTMLSelectElement>('#filter-category')?.value ?? '';
    const salesValue = document.querySelector<HTMLInputElement>('#filter-sales')?.checked ?? false;
    const sortValue = document.querySelector<HTMLSelectElement>('#sort-by')?.value ?? 'default';
    const searchValue = document.querySelector<HTMLInputElement>('#search-input')?.value ?? ''
        .trim()
        .toLowerCase();

    filteredProducts = allProducts.filter((product) => {
        const matchesSize =
            !sizeValue || product.size.toLowerCase().includes(sizeValue.toLowerCase());

        const matchesColor =
            !colorValue || product.color.toLowerCase() === colorValue.toLowerCase();

        const matchesCategory =
            !categoryValue || product.category.toLowerCase() === categoryValue.toLowerCase();

        const matchesSales =
            !salesValue || product.salesStatus === true;

        const matchesSearch =
            !searchValue || product.name.toLowerCase().includes(searchValue);

        return (
            matchesSize &&
            matchesColor &&
            matchesCategory &&
            matchesSales &&
            matchesSearch
        );
    });

    sortProducts(sortValue);

    if (currentPage > getTotalPages()) {
        currentPage = 1;
    }

    renderProducts();
    updatePagination();
    updateShowingText();
}

function sortProducts(sortValue: string): void {
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

function renderProducts(): void {
    const container = document.querySelector<HTMLElement>('.products__list');
    if (!container) return;

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

function addProductClickEvents(): void {
    const cards = document.querySelectorAll('.product');

    cards.forEach((card) => {
        card.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains('product__button')) {
                return;
            }

            const productId = (card as HTMLElement).dataset.id;
            if (!productId) return;

            window.location.href = `../html/product-details.html?id=${productId}`;
        });
    });
}

function updatePagination(): void {
    const pagination = document.querySelector<HTMLElement>('.pagination');
    if (!pagination) return;

    pagination.innerHTML = '';

    const totalPages = getTotalPages();

    if (totalPages <= 1) return;

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

function addPaginationEvents(): void {
    const pageButtons = document.querySelectorAll('.pagination__item');
    const prevButton = document.querySelector('.pagination__prev');
    const nextButton = document.querySelector('.pagination__next');

    pageButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const page = Number((event.currentTarget as HTMLElement).dataset.page);
            currentPage = page;

            renderProducts();
            updatePagination();
            updateShowingText();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    prevButton?.addEventListener('click', (event) => {
        event.preventDefault();

        currentPage--;

        renderProducts();
        updatePagination();
        updateShowingText();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    nextButton?.addEventListener('click', (event) => {
        event.preventDefault();

        currentPage++;

        renderProducts();
        updatePagination();
        updateShowingText();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function updateShowingText(): void {
    const message = document.querySelector<HTMLElement>('.pagination-message');
    if (!message) return;

    if (filteredProducts.length === 0) {
        message.textContent = 'Showing 0 of 0 results';
        return;
    }

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, filteredProducts.length);

    message.textContent = `Showing ${start}–${end} of ${filteredProducts.length} results`;
}

function getTotalPages(): number {
    return Math.ceil(filteredProducts.length / itemsPerPage);
}

function renderRandomSets(): void {
    const sidebar = document.querySelector<HTMLElement>('.sidebar__list');
    if (!sidebar) return;

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