import { ProductsResponse } from "../../../entities/product/types";
import { getSearchParams } from "../../../pages/ProductsList/types/types";

export const getSearch = async ({ searchQuery }: getSearchParams) => {
  try {
    const url = new URL('https://dummyjson.com/products/search');

    url.searchParams.set('q', searchQuery);

    const response = await fetch(url);

    if (!response.ok) {
      throw Error('Ошибка запроса при запросе поиска продуктов: ' + response.status);
    }

    const data: ProductsResponse = await response.json();

    return data;
  } catch (error) {
    console.log('Ошибка при получении списка продуктов', error);

    throw error;
  }
};
