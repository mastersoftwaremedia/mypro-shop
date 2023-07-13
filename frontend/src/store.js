import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {
	productListReducer,
	productDetailsReducer,
	productCreateReducer,
	productUpdateReducer,
	productDeleteReducer
} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {
	userAuthReducer,
	userDetailsReducer,
	userUpdateProfileReducer, 
	userPassReducer,
	userListReducer,
	userUpdateReducer, 
	userDeleteReducer
} from './reducers/userReducers'
import {
	orderMyListReducer,
	orderDetailsReducer,
	orderCreateReducer,
	orderPayReducer,
	orderListReducer,
	orderDeliverReducer
} from './reducers/orderReducers'

const reducer=combineReducers({
	productList:productListReducer,
	productDetails:productDetailsReducer,
	productCreate:productCreateReducer,
	productUpdate:productUpdateReducer,
	productDelete:productDeleteReducer,

	cart:cartReducer,

	userAuth:userAuthReducer,
	userDetails:userDetailsReducer,
	userUpdateProfile:userUpdateProfileReducer, 
	userPass:userPassReducer,
	userList:userListReducer,
	userUpdate:userUpdateReducer, 
	userDelete:userDeleteReducer,	
	
	orderMyList:orderMyListReducer,
	orderDetails:orderDetailsReducer,
	orderCreate:orderCreateReducer,
	orderPay:orderPayReducer,
	orderList:orderListReducer,
	orderDeliver:orderDeliverReducer	
})

const cartItemsFromStorage=localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []
	
const userInfoFromStorage=localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null
	
const shippingAddressFromStorage=localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}
	
const initialState={
	cart:{
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage
	},
	userAuth:{
		userInfo: userInfoFromStorage
	}
}

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store=createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk))
)

export default store