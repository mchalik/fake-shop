import { useState } from 'react';

import {
  Box,
  Container,
  Typography
} from '@mui/material';

import { Search } from '@/features/search';
import { SearchQueryContext } from '@/entities/product';
import { ProductList } from '@/widgets/productsList/ui/ProductList';
import { SearchList } from '@/widgets/searchList/ui/SearchList';
import { AddProduct } from '@/features/addProduct';
import { InvalidateCacheButton } from '@/features/invalidateCache';

export const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div style={{
        width: '100%',
        display: 'flex',
        marginTop: '20px',
        marginBottom: '16px',
        backgroundColor: 'white'
      }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            mb: 3,
            mt: 3
          }}>
            <Typography variant="h4" component="h1" fontWeight="bold" fontSize="24px">
          Товары
            </Typography>
            <SearchQueryContext value={{
              searchQuery,
              setSearchQuery
            }}>
              <Search />
            </SearchQueryContext>
          </Box>
        </Container>
      </div>

      <div style={{
        width: '100%',
        display: 'flex',
        marginTop: '20px',
        marginBottom: '16px',
        backgroundColor: 'white'
      }}>
        <Container maxWidth="lg" sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '30px',
          mb: 4,
          backgroundColor: 'white'
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5" component="h2" fontWeight="bold" fontSize="20px">
            Все позиции {searchQuery ? `- ${ searchQuery }` : ''}
            </Typography>
            <div>
              <InvalidateCacheButton />
              <AddProduct />
            </div>
          </Box>

          {searchQuery ? (
            <SearchQueryContext value={{ searchQuery }}>
              <SearchList />
            </SearchQueryContext>
          ) : <ProductList />}
        </Container>
      </div>
    </>
  );
};