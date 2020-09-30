import { } from '../actions/cart'

const initialState = {
    wishList: []
}

const wishListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WishList_Add':
            const found = state.wishList.some(el => el.key === action.data.product_id);
            if (!found) {
                return {
                    ...state,
                    wishList: state.wishList.concat({ product: action.data, key: action.data.product_id })
                }
            }
            else
            {
                return {
                    ...state,
                    wishList: state.wishList
                }
            }
        case 'WishList_Remove':
            return {
                ...state,
                wishList: state.wishList.filter((Item) =>
                    Item.key !== key)
            }
        default:
            return state;
    }
}

export default wishListReducer;