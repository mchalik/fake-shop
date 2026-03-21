import { createContext } from 'react';

import { Product, SortingType } from '../types/ProductTypes';

export const SortContext = createContext<Partial<{
    sort: SortingType,
    onSort: (value: keyof Product) => void
      }>>({});