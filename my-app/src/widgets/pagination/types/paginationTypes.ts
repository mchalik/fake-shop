import { ProductsResponse } from '../../../entities/product';

export type PaginationType = {
  data: ProductsResponse | undefined,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  pagesTotal: number
}