import { useState } from 'react';

import { Pagination } from '@/widgets/pagination';
import { ListingTable, useSort, SortContext, useSearch } from '@/entities/product';
import { ProgressBar } from '@/shared/components/ProgressBar';

export const SearchList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { sort, onSort } = useSort();

  const {
    isFetching,
    data
  } = useSearch({ currentPage, sort });

  return (
    <>
      <ProgressBar isLoading={isFetching} key={currentPage + sort.sortBy + sort.order} />
      <SortContext value={{ sort, onSort }}>
        <ListingTable isFetching={isFetching} data={data} />
      </SortContext>
      <Pagination
        isFetching={isFetching}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsMeta={data!}
      />
    </>
  );
};