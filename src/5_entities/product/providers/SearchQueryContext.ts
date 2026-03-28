import {
  createContext, type Dispatch, type SetStateAction
} from 'react';

export const SearchQueryContext = createContext<Partial<{
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
    }>>({});