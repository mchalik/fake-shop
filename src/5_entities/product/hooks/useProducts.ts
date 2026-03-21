import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getProducts } from '../api/get-products';
import { PRODUCTS_PAGE_SIZE } from '../constants/productConstans';
import { SortingType, Product } from '../types/ProductTypes';

const emptyProduct: Product= {
  id: 0,
  title: '',
  price: 0,
  brand: '',
  rating: 5,
  sku: '',
  thumbnail: '',
  category: ''
};

export let placeholderData = {
  products: Array.from({ length: 5 }, (_, index) => ({ ...emptyProduct, id: -index })),
  total: 0,
  limit: 0,
  skip: 0
};

export const useProducts = ({ currentPage, sort }: { currentPage: number, sort: SortingType }) => {
  const queryClient = useQueryClient();
  const {
    data,
    isPlaceholderData
  } = useQuery({
    queryKey: ['products', currentPage, sort],
    queryFn: () => getProducts({
      limit: PRODUCTS_PAGE_SIZE,
      skip: (currentPage - 1) * PRODUCTS_PAGE_SIZE,
      ...sort
    }),
    placeholderData: (previousData) => previousData || placeholderData
  });

  console.log('useProducts', queryClient.getQueriesData({}));

  if (data) {
    placeholderData = data;
  }

  return {
    data,
    isPlaceholderData
  };
};