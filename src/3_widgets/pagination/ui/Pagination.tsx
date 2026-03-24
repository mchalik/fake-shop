import {
  Box,
  Pagination as MuiPagination,
  Typography
} from '@mui/material';

import { type ProductsResponse } from '@/entities/product';

import { getCurrentItemIndexes } from '../helpers/getCurrentItemIndexes';

export const Pagination = ({
  itemsMeta: {
    total,
    skip,
    limit
  },
  currentPage,
  setCurrentPage,
  isFetching
}: {
  itemsMeta: ProductsResponse,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  isFetching: boolean
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ opacity: isFetching ? 0.3 : 1 }} >
        Показано {getCurrentItemIndexes({ total, skip, limit })} из {total}
      </Typography>

      {total > limit && (
        <MuiPagination
          color="primary"
          shape="rounded"
          page={currentPage}
          count={Math.ceil(total / limit)}
          onChange={(_, page) => setCurrentPage(page)}
        />
      )}
    </Box>);
};