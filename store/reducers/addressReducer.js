import { Add_Product, Delete_Product } from '../actions/cart'

const initialState = {
    addressList: [],
    countryList: [],
}

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Add_Address':
            debugger
            const found = state.addressList.some(el => el.address.addressId === action.data.addressId);
            if (found) {
                let objIndex = state.addressList.findIndex((obj => obj.address.addressId === action.data.addressId));
                state.addressList[objIndex] = action.data;
                return {
                    ...state,
                    addressList:state.addressList
                }
            }
            else {
                return {
                    ...state,
                    addressList: state.addressList.concat({ address: action.data, key: action.data.product_id })
                }
            }
        case 'Country_List':
            return {
                ...state,
                countryList: action.data
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

export default addressReducer;