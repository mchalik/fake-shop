
import { useState } from 'react';

import { Pagination } from '@/widgets/pagination';
import { useSearch } from '@/features/search';
import { ListingTable, useSort, SortContext } from '@/entities/product';

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