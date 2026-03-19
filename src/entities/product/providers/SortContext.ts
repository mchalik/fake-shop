import { createContext } from "react";

import { sortingType } from '../types/ProductTypes';

export const SortContext = createContext<Partial<{
    sort: sortingType,
    onSort: (value: string) => void
      }>>({});