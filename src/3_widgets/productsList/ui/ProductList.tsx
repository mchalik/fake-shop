import { useState } from 'react';

import { Pagination } from '@/widgets/pagination';
import {
  ListingTable,
  useProducts,
  PRODUCTS_PAGE_SIZE,
  useSort,
  SortContext
} from '@/entities/product';
import { ProgressBar } from '@/shared/components/ProgressBar';

export const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { sort, onSort } = useSort();

  const { isPlaceholderData, data } = useProducts({
    currentPage,
    sort
  });

  const isLoadingInUi = isPlaceholderData;
  const pagesTotal = data ? Math.ceil(data?.total / PRODUCTS_PAGE_SIZE) : 0;

  return (
    <>
      <ProgressBar isLoading={isLoadingInUi} />
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