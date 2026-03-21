import { FC, PropsWithChildren, useContext } from 'react';
import { match } from 'ts-pattern';
import { TableCell, IconButton } from '@mui/material';
import { Sort, SwapVert } from '@mui/icons-material';

import { Product } from '../../types/ProductTypes';
import { SortContext } from '../../providers/SortContext';

export const TableHeadCell: FC<{prop: keyof Product} & PropsWithChildren> = ({ prop, children }) => {
  const { sort, onSort } = useContext(SortContext);
  const icon = match(sort)
    .with({ sortBy: prop, order: 'asc'}, () => <Sort fontSize='inherit' />)
    .with({ sortBy: prop, order: 'desc'}, () => <Sort fontSize='inherit' sx={{ transform: 'scaleY(-1)'}} />)
    .otherwise(() => (<SwapVert fontSize='inherit' />));

  return (
    <TableCell sx={{ color: 'inherit', whiteSpace: 'nowrap'}} onClick={() => onSort(prop)}>
      {children} <IconButton size='small'>{icon}</IconButton>
    </TableCell>
  );
};