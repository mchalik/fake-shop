import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { SEARCH_PAGE_SIZE, SEARCH_QUERY_KEY } from '../constants/productConstans';
import { SearchQueryContext } from '../providers/SearchQueryContext';
import { getSearch } from '../api/get-search';
import { type SortingType } from '../types/ProductTypes';

import { placeholderData } from './useProducts';

export const useSearch = ({ currentPage, sort }: { currentPage: number,
sort: SortingType }) => {
  const {
    searchQuery
  } = useContext(SearchQueryContext);

  const {
    data, isPlaceholderData, isFetching
  } = useQuery({
    queryFn: () => getSearch(searchQuery || '', {
      limit: SEARCH_PAGE_SIZE,
      skip: (currentPage - 1) * SEARCH_PAGE_SIZE,
      ...sort
    }),
    queryKey: [SEARCH_QUERY_KEY, searchQuery, currentPage, sort],
    enabled: Boolean(searchQuery),
    placeholderData: (previousData) => previousData ? previousData : placeholderData
  });

  return {
    data,
    isLoading: isPlaceholderData || isFetching
  };
};