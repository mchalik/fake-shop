import { useState } from 'react';
import { match } from 'ts-pattern';

import { sortingType } from '../types/ProductTypes';

const DEFAULT_SORT: sortingType = {
  sortBy: 'id',
  order: 'asc'
};

export const useSort = () => {
  const [sort, setSort] = useState<sortingType>(DEFAULT_SORT);

  const onSort = (value: sortingType['sortBy']) => {
    const result = match(sort)
      .with({ sortBy: value, order: 'asc'}, () => ({
        sortBy: value, order: 'desc'
      } as sortingType))
      .with({ sortBy: value, order: 'desc'}, () => ({
        ...DEFAULT_SORT
      }))
      .otherwise(() => ({
        sortBy: value, order: 'asc'
      } as sortingType));

    setSort(result);
  };

  return {
    sort, onSort
  };
};