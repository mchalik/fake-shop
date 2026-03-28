import { useState } from 'react';

import { Pagination } from '@/widgets/pagination';
import {
  ListingTable,
  useProducts,
  useSort,
  SortContext,
  PRODUCTS_PAGE_SIZE
} from '@/entities/product';
import { ProgressBar } from '@/shared/components/ProgressBar';

export const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { sort, onSort } = useSort();

  const { isLoading, data } = useProducts({
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
        pageSize={PRODUCTS_PAGE_SIZE}
        setCurrentPage={setCurrentPage}
        itemsMeta={data!}
      />
    </>
  );
};