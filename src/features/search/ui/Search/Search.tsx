import {
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { createContext, type Dispatch, type SetStateAction } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

export const SearchQueryContext = createContext<Partial<{
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
    }>>({});

export const Search = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);

  return (
    <TextField
      value={searchQuery}
      onChange={(event) => {
        console.log(event.target.value);
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

