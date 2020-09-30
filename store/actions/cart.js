import { Add_Product, Delete_Product } from './types'

export const addProduct = (product,quantity) => (
    {
        type: Add_Product,
        data: product,
        key:product.product_id,
        quantity:quantity,  
    }
);

export const deleteProduct = (key) => (
    {
        type: deleteProduct,
        key: key
    }
);