
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CachedIcon from '@mui/icons-material/Cached';

import { Pagination } from '../../widgets/pagination/ui/Pagination';

import { ListingTable, getProducts } from '../../entities/product';

import * as styles from './ProductsPage.module.css';

const PAGE_SIZE = 5;

export const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { 
    data, isPlaceholderData
  } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => getProducts({ limit: PAGE_SIZE, skip: (currentPage - 1) * PAGE_SIZE }),
    placeholderData: keepPreviousData
  });

  const pagesTotal = data ? Math.ceil(data?.total / PAGE_SIZE) : 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Заголовок и Поиск */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Товары
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Поиск..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Все позиции
        </Typography>
        <div>
          <IconButton color='inherit' className={styles.reload}>
            <CachedIcon />
          </IconButton>
          <Button variant="contained" startIcon={<ControlPointIcon />}>
            Добавить
          </Button>
        </div>
      </Box>

      <ListingTable isPlaceholderData={isPlaceholderData} data={data} />
      <Pagination 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        data={data} 
        pagesTotal={pagesTotal}
      />
    </Container>
  );
};