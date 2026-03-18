import { Product, ProductsResponse, getProductsParams } from "../types/ProductTypes";

const selectedProps: Array<keyof Product> = [
  'id',
  'title',
  'price',
  'brand',
  'rating',
  'sku',
  'thumbnail',
  'category'
];

export const getProducts = async ({ skip, limit }: getProductsParams) => {
  try {
    const url = new URL('https://dummyjson.com/products');

    url.searchParams.set('select', selectedProps.join(','));
    url.searchParams.set('skip', String(skip));
    url.searchParams.set('limit', String(limit));

    const response = await fetch(url);

    if (!response.ok) {
      throw Error('Ошибка запроса при получении списка продуктов: ' + response.status);
    }

    const data: ProductsResponse = await response.json();

    return data;
  } catch (error) {
    console.log('Ошибка при получении списка продуктов', error);

    throw error;
  }
};
