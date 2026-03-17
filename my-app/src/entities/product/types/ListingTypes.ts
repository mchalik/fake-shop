export type Product = {
    id: number,
    title: string,
    price: number,
    brand: string,
    rating: number,
    sku: string,
    thumbnail: string,
    category: string
}

export type ProductsResponse = {
    products: Product[],
    limit: number,
    total: number,
    skip: number
}

export type ListingType = { 
    isPlaceholderData: boolean,
    data: ProductsResponse | undefined
}

export type ProductsListType = {
    data: ProductsResponse | undefined,
    isPlaceholderData: boolean
}

export type getProductsParams = {
    skip: number,
    limit: number
}