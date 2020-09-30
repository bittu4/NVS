import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import wishListReducer from './wishlistReducer'
import addressReducer from './addressReducer'
import authReducer from './authReducer'
import { reducer as formReducer } from 'redux-form';
const appReducer = combineReducers({
	cartReducer,
	wishListReducer,
	addressReducer,
	authReducer,
	formReducer
})

export default appReducer;
