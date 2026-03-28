import {
  type GetProductsParams, type ProductsResponse, type Product
} from '@/entities/product';
import { addUrlParams } from '@/shared/utils/addUrlParams';

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

export const getSearch = async (searchQuery: string, {
  limit, skip, sortBy, order
}: GetProductsParams) => {
  try {
    const url = new URL('https://dummyjson.com/products/search');

    addUrlParams(url.searchParams, {
      select: selectedProps.join(','),
      q: searchQuery,
      skip,
      limit,
      sortBy,
      order
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw Error(`Ошибка запроса при запросе поиска продуктов: ${ response.status }`);
    }

    const data: ProductsResponse = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Ошибка при получении списка продуктов', error);

    throw error;
  }
};
