import { useState } from 'react';

import { Pagination } from '@/widgets/pagination';
import {
  ListingTable, useSort, SortContext, useSearch, SEARCH_PAGE_SIZE
} from '@/entities/product';
import { ProgressBar } from '@/shared/components/ProgressBar';

export const SearchList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { sort, onSort } = useSort();

  const {
    isLoading,
    data
  } = useSearch({
    currentPage,
    sort
  });

  return (
    <>
      <ProgressBar isLoading={isLoading} key={currentPage + sort.sortBy + sort.order} />
      <SortContext value={{
        sort,
        onSort
      }}>
        <ListingTable isFetching={isLoading} data={data!} />
      </SortContext>
      <Pagination
        isLoading={isLoading}
        currentPage={currentPage}
        pageSize={SEARCH_PAGE_SIZE}
        setCurrentPage={setCurrentPage}
        itemsMeta={data!}
      />
    </>
  );
};