import { useState } from 'react';

import { Pagination } from '@/widgets/pagination';
import {
  ListingTable,
  useProducts,
  useSort,
  SortContext
} from '@/entities/product';
import { ProgressBar } from '@/shared/components/ProgressBar';

export const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { sort, onSort } = useSort();

  const { isFetching, data } = useProducts({
    currentPage,
    sort
  });

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