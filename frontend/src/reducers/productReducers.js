import {
	PRODUCT_LIST_REQUEST, 
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_RESET,
	
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_RESET,
	
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_RESET,
	
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL
} from '../constants/productConstants'

export const productListReducer=(state={products:[]}, action)=>{
	const {type,payload}=action
	switch(type){
		case PRODUCT_LIST_REQUEST:
			return {loading:true, products:[]}
		case PRODUCT_LIST_SUCCESS:
			//return {loading:false, products:payload}
			return {
				loading:false, 
				products:payload.products,
				pages:payload.pages,
				page:payload.page
			}
		case PRODUCT_LIST_FAIL:
			return {loading:false, error:payload}
		default:
			return state
	}
}

export const productDetailsReducer=(state={product:{}}, action)=>{
	const {type,payload}=action
	switch(type){
		case PRODUCT_DETAILS_REQUEST:
			return {...state, loading:true}
		case PRODUCT_DETAILS_SUCCESS:
			return {loading:false, product:payload}
		case PRODUCT_DETAILS_FAIL:
			return {loading:false, error:payload}
		case PRODUCT_DETAILS_RESET:
			return {product:{}}
		default:
			return state
	}	
}
//////////////////////////
export const productCreateReducer=(state={product:{}}, action)=>{
	const {type,payload}=action
	switch(type){
		case PRODUCT_CREATE_REQUEST:
			return {...state, loading:true}
		case PRODUCT_CREATE_SUCCESS:
			return {
				loading:false, 
				success:payload.success, 
				product:payload.product
			}
		case PRODUCT_CREATE_FAIL:
			return {loading:false, error:payload}
		case PRODUCT_CREATE_RESET:
			return {product:{}}
		default:
			return state
	}		
}

export const productUpdateReducer=(state={}, action)=>{
	const {type,payload}=action
	switch(type){
		case PRODUCT_UPDATE_REQUEST:
			return {...state, loading:true}
		case PRODUCT_UPDATE_SUCCESS:
			return {loading:false, isUpdated:payload.success}
		case PRODUCT_UPDATE_FAIL:
			return {loading:false, error:payload}
		case PRODUCT_UPDATE_RESET:
			return {}
		default:
			return state
	}			
}

export const productDeleteReducer=(state={}, action)=>{
	const {type,payload}=action
	switch(type){
		case PRODUCT_DELETE_REQUEST:
			return {loading:true}
		case PRODUCT_DELETE_SUCCESS:
			return {loading:false, success:true}
		case PRODUCT_DELETE_FAIL:
			return {loading:false, error:payload}
		default:
			return state
	}				
}