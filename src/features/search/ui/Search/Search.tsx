import {
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

import { SearchQueryContext } from '../../providers/SearchQueryContext';

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
      placeholder="Поиск..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
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

