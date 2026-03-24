import { type FC, type PropsWithChildren, useContext } from 'react';

import { TableCell, IconButton } from '@mui/material';
import { Sort, SwapVert } from '@mui/icons-material';

import { match } from 'ts-pattern';

import { SortContext } from '../../providers/SortContext';
import { type Product } from '../../types/ProductTypes';

export const TableHeadCell: FC<{
  prop: keyof Product,
  textAlign?: 'left' | 'center' }
  & PropsWithChildren
> = ({
  prop,
  children,
  textAlign
}) => {
  const { sort, onSort } = useContext(SortContext);
  const icon = match(sort)
    .with({ sortBy: prop, order: 'asc' }, () => <Sort fontSize='inherit' />)
    .with({ sortBy: prop, order: 'desc' }, () => <Sort fontSize='inherit' sx={{ transform: 'scaleY(-1)' }} />)
    .otherwise(() => (<SwapVert fontSize='inherit' />));

  return (
    <TableCell
      sx={{
        color: 'inherit',
        whiteSpace: 'nowrap',
        textAlign: textAlign || 'center' }
      }
      onClick={() => onSort?.(prop)}
    >
      {children} <IconButton size='small'>{icon}</IconButton>
    </TableCell>
  );
};