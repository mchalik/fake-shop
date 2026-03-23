export type Product = {
    id: number,
    title: string,
    brand: string,
    category: string,
    price: number,
    rating: number,
    sku: string,
    thumbnail: string
}

export type ProductsResponse = {
    products: Product[],
    limit: number,
    total: number,
    skip: number
}

export type SortingType = {
    sortBy: keyof Product,
    order: 'asc' | 'desc'
}

export type GetProductsParams = {
    skip: number,
    limit: number
} & SortingType;
