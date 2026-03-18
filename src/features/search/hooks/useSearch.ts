import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { placeholderData } from "@/entities/product";

import { SearchQueryContext } from "../ui/Search/Search";
import { getSearch } from "../api/search-api";
import { SEARCH_PAGE_SIZE } from "../constants/constants";

export const useSearch = ({ currentPage }: { currentPage: number }) => {
  const {
    searchQuery
  } = useContext(SearchQueryContext);

  const { data, isPlaceholderData, isLoading } = useQuery({
    queryFn: () => getSearch(searchQuery || '', { limit: SEARCH_PAGE_SIZE, skip: (currentPage - 1) * SEARCH_PAGE_SIZE }),
    queryKey: ['searchProducts', searchQuery, currentPage],
    enabled: Boolean(searchQuery),
    placeholderData: (previousData) => previousData ? previousData : placeholderData
  });

  return { data, isPlaceholderData, isLoading };
};