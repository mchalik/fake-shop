import { addUrlParams } from '@/shared/utils/addUrlParams';

import { Product, ProductsResponse, getProductsParams } from '../types/ProductTypes';

const selectedProps: Array<keyof Product> = [
  'id',
  'title',
  'price',
  'brand',
  'rating',
  'sku',
  'thumbnail',
  'category'
] as const;

export const getProducts = async ({ skip, limit, sortBy, order }: getProductsParams) => {
  try {
    const url = new URL('https://dummyjson.com/products');

    addUrlParams(url.searchParams, {
      select: selectedProps.join(','),
      skip,
      limit,
      sortBy,
      order
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw Error(`Ошибка запроса при получении списка продуктов: ${ response.status }`);
    }

    const data: ProductsResponse = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при получении списка продуктов', error);

    throw error;
  }
};
