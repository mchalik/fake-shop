import { useContext } from 'react';

import {
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { SearchQueryContext } from '@/entities/product';

export const Search = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);

  return (
    <TextField
      value={searchQuery}
      onChange={(event) => {
        setSearchQuery?.(event.target.value);
      }}
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Найти"
      sx={{
        pl: 4
      }}
      InputProps={{

        sx: {
          maxWIdth: 1024,
          fontSize: '0.8rem',
          backgroundColor: '#F3F3F3'
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: !!searchQuery && (
          <InputAdornment position="end" >
            <IconButton
              onClick={() => setSearchQuery?.('')}
              edge="end"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};
