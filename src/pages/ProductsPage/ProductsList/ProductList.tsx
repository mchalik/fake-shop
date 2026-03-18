
import { useState } from 'react';

import { Pagination } from '@/widgets/pagination';
import { ListingTable, useProducts, PRODUCTS_PAGE_SIZE } from '@/entities/product';

export const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
 
  const { isPlaceholderData, data } = useProducts({
    currentPage
  });

  const isLoadingInUi = isPlaceholderData;
  const pagesTotal = data ? Math.ceil(data?.total / PRODUCTS_PAGE_SIZE) : 0;

  return (
    <>
      <ListingTable staleState={isLoadingInUi} data={data} />
      <Pagination 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        data={data} 
        pagesTotal={pagesTotal}
      />
    </>
  );
};