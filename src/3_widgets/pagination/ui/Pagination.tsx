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
  pageSize,
  setCurrentPage,
  isLoading
}: {
  itemsMeta: ProductsResponse,
  currentPage: number,
  pageSize: number,
  setCurrentPage: (page: number) => void,
  isLoading: boolean
}) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: 2,
      flexWrap: 'wrap',
      gap: 2
    }}>
      <Typography variant="body2" color="#969B9F" sx={{
        opacity: isLoading ? 0.3 : 1,
        fontSize: '18px'
      }} >
        Показано{' '}<span style={{ color: '#333333' }}>{getCurrentItemIndexes({
          total,
          skip,
          limit
        })}</span>{' '}из{' '}<span style={{ color: '#333333' }}>{total}</span>
      </Typography>

      {total > limit && (
        <MuiPagination
          color="primary"
          shape="rounded"
          sx={{ ml: 'auto' }}
          page={currentPage}
          count={Math.ceil(total / pageSize)}
          onChange={(_, page) => setCurrentPage(page)}
        />
      )}
    </Box>);
};