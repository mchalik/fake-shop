import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { SEARCH_PAGE_SIZE } from '../constants/productConstans';
import { sortingType } from '../types/ProductTypes';
import { SearchQueryContext } from '../providers/SearchQueryContext';
import { getSearch } from '../api/get-search';

import { placeholderData } from './useProducts';

export const useSearch = ({ currentPage, sort }: { currentPage: number, sort: sortingType }) => {
  const {
    searchQuery
  } = useContext(SearchQueryContext);

  const { data, isPlaceholderData, isLoading } = useQuery({
    queryFn: () => getSearch(searchQuery || '', {
      limit: SEARCH_PAGE_SIZE,
      skip: (currentPage - 1) * SEARCH_PAGE_SIZE,
      ...sort
    }),
    queryKey: ['searchProducts', searchQuery, currentPage, sort],
    enabled: Boolean(searchQuery),
    placeholderData: (previousData) => previousData ? previousData : placeholderData
  });

  return { data, isPlaceholderData, isLoading };
};