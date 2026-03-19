
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CachedIcon from '@mui/icons-material/Cached';

import { Search, SearchQueryContext } from '@/features/search';

import { ProductList } from './ProductsList/ProductList';
import { SearchList } from './SearchList/SearchList';

import * as styles from './ProductsPage.module.css';

export const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Заголовок и Поиск */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Товары
        </Typography>
        <SearchQueryContext value={{ searchQuery, setSearchQuery }}>
          <Search />
        </SearchQueryContext>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Все позиции{searchQuery ? ' - ' + searchQuery : ''}
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

      {searchQuery ? (
        <SearchQueryContext value={{ searchQuery }}>
          <SearchList />
        </SearchQueryContext>
      ) : <ProductList />}
    </Container>
  );
};