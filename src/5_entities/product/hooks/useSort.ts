import { useState } from 'react';
import { match } from 'ts-pattern';

import { SortingType } from '../types/ProductTypes';

const DEFAULT_SORT: SortingType = {
  sortBy: 'id',
  order: 'asc'
};

export const useSort = () => {
  const [sort, setSort] = useState<SortingType>(DEFAULT_SORT);

  const onSort = (value: SortingType['sortBy']) => {
    const result = match(sort)
      .with({ sortBy: value, order: 'asc' }, () => ({
        sortBy: value, order: 'desc'
      } as SortingType))
      .with({ sortBy: value, order: 'desc' }, () => ({
        ...DEFAULT_SORT
      }))
      .otherwise(() => ({
        sortBy: value, order: 'asc'
      } as SortingType));

    setSort(result);
  };

  return {
    sort, onSort
  };
};