import { Add_Product, Delete_Product } from '../actions/cart'

const initialState = {
    cartList: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Add_Product':
            const found = state.cartList.some(el => el.key === action.data.product_id);
            if (found) {
                let objIndex = state.cartList.findIndex((obj => obj.key === action.data.product_id));
                state.cartList[objIndex].quantity = state.cartList[objIndex].quantity + action.quantity;
                return {
                    ...state,
                    cartList: state.cartList
                }
            }
            else {
                return {
                    ...state,
                    cartList: state.cartList.concat({ product: action.data, key: action.data.product_id, quantity: action.quantity })
                }
            }
        case 'Delete_Product':
            return {
                ...state,
                cartList: state.cartList.filter((Item) =>
                    Item.key !== key)
            }
        default:
            return state;
    }
}

export default cartReducer;