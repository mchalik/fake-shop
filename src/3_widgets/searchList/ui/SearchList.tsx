import { useState } from 'react';

import { Pagination } from '@/widgets/pagination';
import { ListingTable, useSort, SortContext, useSearch } from '@/entities/product';
import { ProgressBar } from '@/shared/components/ProgressBar';

const PAGE_SIZE = 5;

export const SearchList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { sort, onSort } = useSort();

  const {
    isPlaceholderData,
    data,
    isLoading
  } = useSearch({ currentPage, sort });

  const pagesTotal = data ? Math.ceil(data?.total / PAGE_SIZE) : 0;
  const isLoadingInUi = isLoading || isPlaceholderData;

  return (
    <>
      <ProgressBar isLoading={isLoadingInUi} key={currentPage + sort.sortBy + sort.order} />
      <SortContext value={{ sort, onSort }}>
        <ListingTable staleState={isLoadingInUi} data={data} />
      </SortContext>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        pagesTotal={pagesTotal}
      />
    </>
  );
};