import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';

import { type ProductsResponse } from '../../types/ProductTypes';

import { TableHeadCell } from './TableHeadCell';
import { Rating } from './Rating';

import * as styles from './ListingTable.module.css';

export const ListingTable = ({
  isFetching,
  data
}: {
    data: ProductsResponse | undefined,
    isFetching: boolean
}) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 0, borderRadius: 2 }}>
      <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
        <colgroup>
          <col />
          <col className={styles.sameCols} />
          <col className={styles.sameCols} />
          <col className={styles.sameCols} />
          <col className={styles.sameCols} />
        </colgroup>
        <TableHead>
          <TableRow sx={{ color: '#B2B3B9' }}>
            <TableHeadCell prop="title" textAlign="left">Наименование</TableHeadCell>
            <TableHeadCell prop="brand">Вендер</TableHeadCell>
            <TableHeadCell prop="sku">Артикул</TableHeadCell>
            <TableHeadCell prop="rating">Оценка</TableHeadCell>
            <TableHeadCell prop="price">Цена, ₽</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ opacity: isFetching ? 0.3 : 1 }}>
          {data?.products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <img src={product.thumbnail} alt={product.title} className={styles.image} />
                <div>
                  <div>{product.title}</div>
                  <div className={styles.rowCategory}>{product.category}</div>
                </div>
              </TableCell>
              <TableCell className={styles.rowBold} align="center">
                <span className={styles.rowBold}>{product.brand}</span>
              </TableCell>
              <TableCell align="center">{product.sku}</TableCell>
              <TableCell align="center">
                <Typography variant="body2"><Rating value={product.rating} /></Typography>
              </TableCell>
              <TableCell sx={{ fontFamily: 'Roboto Mono' }} align="center">
                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(product.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};