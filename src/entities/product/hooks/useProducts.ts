import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/get-products";
import { PRODUCTS_PAGE_SIZE } from "../constants/productConstans";
import { sortingType } from "../types/ProductTypes";

export let placeholderData = null;

export const useProducts = ({ currentPage, sort }: { currentPage: number, sort: sortingType }) => {
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
    placeholderData: keepPreviousData
  });

  placeholderData = data;

  return {
    data,
    isPlaceholderData
  };
};