import { useState } from 'react';

import {
  Box,
  Container,
  Typography,
  IconButton
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

import { Search, SearchQueryContext } from '@/features/search';
import { ProductList } from '@/widgets/productsList/ui/ProductList';
import { SearchList } from '@/widgets/searchList/ui/SearchList';
import { AddProduct } from '@/features/addProduct';

import * as styles from './CatalogPage.module.css';

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
          Все позиции {searchQuery ? `- ${ searchQuery }` : ''}
        </Typography>
        <div>
          <IconButton color='inherit' className={styles.reload}>
            <CachedIcon />
          </IconButton>
          <AddProduct />
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