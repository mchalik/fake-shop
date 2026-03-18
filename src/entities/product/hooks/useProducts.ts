import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/get-products";
import { PRODUCTS_PAGE_SIZE } from "../constants/productConstans";

export let placeholderData = null;

export const useProducts = ({ currentPage }: { currentPage: number }) => {
  const { 
    data,
    isPlaceholderData
  } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => getProducts({ limit: PRODUCTS_PAGE_SIZE, skip: (currentPage - 1) * PRODUCTS_PAGE_SIZE }),
    placeholderData: keepPreviousData
  });

  placeholderData = data;

  return {
    data,
    isPlaceholderData
  };
};