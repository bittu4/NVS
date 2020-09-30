import { wishList_add,WishList_Remove} from './types'

export const addWishList = (product) => (
    {
        type: wishList_add,
        data: product,
        key:product.id, 
    }
);

export const removeWishList = (key) => (
    {
        type: WishList_Remove,
        key: key
    }
);