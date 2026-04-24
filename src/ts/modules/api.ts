// import { Product } from './types.js';

// export async function getProducts(): Promise<Product[]> {
//     const response = await fetch('../assets/data.json');
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
// }

// import { Product } from './types.js';

// export async function getProducts(): Promise<Product[]> {
//   const response = await fetch('/src/assets/data.json');

//   if (!response.ok) {
//     throw new Error('Products loading error');
//   }

//   const data = await response.json();

//   return data; // 👈 ВАЖЛИВО
// }

import { Product } from './types.js';

type ProductsResponse =
  | Product[]
  | {
      products?: Product[];
      items?: Product[];
      data?: Product[];
    };

export async function getProducts(): Promise<Product[]> {
  const response = await fetch('/src/assets/data.json');

  if (!response.ok) {
    throw new Error('Products loading error');
  }

  const data = (await response.json()) as ProductsResponse;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.products)) {
    return data.products;
  }

  if (Array.isArray(data.items)) {
    return data.items;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  console.log(data);
  throw new Error('Products array not found in data.json');
}