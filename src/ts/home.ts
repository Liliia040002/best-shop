import { getProducts } from './modules/api.js';
import { createProductCard } from './modules/productCard.js';
import { Product } from './modules/types.js';

const randomTexts = [
  'Travel light, explore more.',
  'Your journey starts with the perfect suitcase.',
  'Smart luggage for every destination.',
  'Pack your dreams and go further.',
];

async function initHomePage(): Promise<void> {
  const products = await getProducts();

  renderSelectedProducts(products);
  renderNewProducts(products);
  initSuitcaseBackgroundSlider();
  addRandomTextToItems();
}

function renderSelectedProducts(products: Product[]): void {
  const container = document.querySelector('.products__list--selected') as HTMLElement | null;

  if (!container) return;

  const selectedProducts = products
    .filter((product) => product.blocks?.includes('Selected Products'))
    .slice(0, 4);

  container.innerHTML = '';

  selectedProducts.forEach((product) => {
    container.append(createProductCard(product));
  });
}

function renderNewProducts(products: Product[]): void {
  const container = document.querySelector('.products__list--new') as HTMLElement | null;

  if (!container) return;

  const newProducts = products
    .filter((product) => product.blocks?.includes('New Products Arrival'))
    .slice(0, 4);

  container.innerHTML = '';

  newProducts.forEach((product) => {
    container.append(createProductCard(product));
  });
}


// function initSuitcaseBackgroundSlider(): void {
//   const items = document.querySelectorAll('.item');

//   const images = [
//     '/src/img/homepage/suitcase-real-live-1.png',
//     '/src/img/homepage/suitcase-real-live-2.png',
//     '/src/img/homepage/suitcase-real-live-3.png',
//     '/src/img/homepage/suitcase-real-live.png',
//   ];

//   items.forEach((item) => {
//     let index = 0;
//     let startX = 0;

//     function setBackground(): void {
//       (item as HTMLElement).style.backgroundImage = `
//         linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
//         url(${images[index]})
//       `;
//     }

//     function changeSlide(direction = 1): void {
//       index = (index + direction + images.length) % images.length;

//       item.classList.add('item--fade');

//       setTimeout(() => {
//         setBackground();
//         item.classList.remove('item--fade');
//       }, 200);
//     }

//     setBackground();

//     const intervalId = window.setInterval(() => {
//       changeSlide(1);
//     }, 3000);

//     item.addEventListener('touchstart', (e) => {
//       const touchEvent = e as TouchEvent;
//       startX = touchEvent.touches[0].clientX;
//     });

//     item.addEventListener('touchend', (e) => {
//       const touchEvent = e as TouchEvent;

//       const endX = touchEvent.changedTouches[0].clientX;
//       const diff = startX - endX;

//       if (Math.abs(diff) < 50) return;

//       window.clearInterval(intervalId);

//       if (diff > 0) {
//         changeSlide(1);
//       } else {
//         changeSlide(-1);
//       }
//     });
//   });
// }
function initSuitcaseBackgroundSlider(): void {
  const items = document.querySelectorAll('.item');

  const images = [
    '/src/img/homepage/suitcase-real-live-1.png',
    '/src/img/homepage/suitcase-real-live-2.png',
    '/src/img/homepage/suitcase-real-live-3.png',
    '/src/img/homepage/suitcase-real-live.png',
  ];

  items.forEach((item) => {
    const element = item as HTMLElement;
    let currentIndex = 0;
    let startX = 0;

    function getBg(index: number): string {
      return `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${images[index]})`;
    }

    function setInitialBackground(): void {
      element.style.setProperty('--bg-current', getBg(currentIndex));
      element.style.setProperty('--bg-next', getBg(currentIndex));
    }

    function changeSlide(direction = 1): void {
      const nextIndex = (currentIndex + direction + images.length) % images.length;

      element.style.setProperty('--bg-next', getBg(nextIndex));
      element.classList.add('item--fade');

      window.setTimeout(() => {
        currentIndex = nextIndex;
        element.style.setProperty('--bg-current', getBg(currentIndex));
        element.classList.remove('item--fade');
      }, 800);
    }

    setInitialBackground();

    const intervalId = window.setInterval(() => {
      changeSlide(1);
    }, 3000);

    item.addEventListener('touchstart', (e) => {
      const touchEvent = e as TouchEvent;
      startX = touchEvent.touches[0].clientX;
    });

    item.addEventListener('touchend', (e) => {
      const touchEvent = e as TouchEvent;
      const endX = touchEvent.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) < 50) return;

      window.clearInterval(intervalId);
      changeSlide(diff > 0 ? 1 : -1);
    });
  });
}

function addRandomTextToItems(): void {
  const texts = [
    'Perfect for travel',
    'Best choice for you',
    'Travel in style',
    'Light and durable',
  ];

  const items = document.querySelectorAll('.item');

  items.forEach((item) => {
    const text = document.createElement('span');
    text.className = 'item__overlay-text';

    const randomIndex = Math.floor(Math.random() * texts.length);
    text.textContent = texts[randomIndex];

    item.append(text);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHomePage();
});