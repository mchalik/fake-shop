
import { useState } from 'react';

import { Pagination } from '@/widgets/pagination';
import { useSearch } from '@/features/search';
import { ListingTable } from '@/entities/product';

const PAGE_SIZE = 5;

export const SearchList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    isPlaceholderData,
    data,
    isLoading
  } = useSearch({ currentPage });

  const pagesTotal = data ? Math.ceil(data?.total / PAGE_SIZE) : 0;
  const isLoadingInUi = isLoading || isPlaceholderData;

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