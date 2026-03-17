import {
  Box,
  Pagination as MuiPagination,
  Typography,
} from '@mui/material';

import { ProductsResponse } from '../../../entities/product/types';

import { PaginationType } from '../types/paginationTypes';


const getTotalString = (data?: ProductsResponse) => {
  if (!data) {
    return '';
  }

  if (data.total < 2) {
    return data.total;
  }
 
  if (data.total < 5) {
    return '1 - ' + data.total;
  }

  const start = data.skip + 1;
  const end = data.skip + data.limit;

  return start + ' - ' + end;
};

export const Pagination = ({
  data,
  currentPage,
  setCurrentPage,
  pagesTotal
}: PaginationType) => {
  if (!data) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Показано {getTotalString(data)} из {data?.total}
      </Typography>

      {data && data.total > 5 &&  (
        <MuiPagination
          count={pagesTotal} 
          color="primary"
          shape="rounded" 
          page={currentPage} 
          onChange={(_, page) => setCurrentPage(page)}
        />
      )}
    </Box>);
};