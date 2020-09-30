import { } from '../actions/cart'
import { AsyncStorage } from 'react-native';

const initialState = {
    userDetails: [],
    token: '',
    isLoggedin: false,
    authText:'Sign In'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'login':
            try {
                 AsyncStorage.setItem('nvsToken', action.token);
                 AsyncStorage.setItem('customerId', action.userDetails.customer_id);
                 
            } catch (error) {
                // Error saving data
            }
            return {
                ...state,
                userDetails: action.userDetails,
                token: action.token,
                isLoggedin: action.isLoggedIn,
                authText:'Sign Out'
            }
        case 'logout':
            try {
                 AsyncStorage.setItem('nvsToken', '');
                 AsyncStorage.setItem('customerId', '');
                 AsyncStorage.setItem('cartId', '');
                 
            } catch (error) {
                // Error saving data
            }
            return {
                ...state,
                userDetails: [],
                token: '',
                isLoggedin: action.isLoggedIn,
                authText:'Sign In'
            }
        default:
            return state;
    }
}

export default authReducer;