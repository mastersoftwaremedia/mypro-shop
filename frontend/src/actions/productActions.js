import axios from 'axios'
import {
	PRODUCT_LIST_REQUEST, 
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	//PRODUCT_DETAILS_RESET,
	
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	//PRODUCT_CREATE_RESET,
	
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	//PRODUCT_UPDATE_RESET,
	
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL
} from '../constants/productConstants'
import {logout} from './userActions'


export const getlistProducts=(keyword='', pageNumber='')=>async dispatch=>{
	try{
		dispatch({type:PRODUCT_LIST_REQUEST})
		const {data}=await axios.get(
		`/api/v1/products?keyword=${keyword}&pageNumber=${pageNumber}`)
		dispatch({type:PRODUCT_LIST_SUCCESS, payload:data})
	}catch(error){
		dispatch({
			type:PRODUCT_LIST_FAIL,
			payload:error.response && error.response.data.message ? 	
			error.response.data.message : error.message 
		})
	}
}

export const getProduct=id=>async dispatch=>{
	try{
		dispatch({type:PRODUCT_DETAILS_REQUEST})
		const {data}=await axios.get(`/api/v1/products/${id}`)
		dispatch({
			type:PRODUCT_DETAILS_SUCCESS, 
			payload:data})
		//console.log(data)
	}catch(error){
		dispatch({
			type:PRODUCT_DETAILS_FAIL,
			payload:error.response && error.response.data.message 
				? error.response.data.message : error.message 
		})		
	}
}
/////////////////////////////
export const createProduct=productData=>async (dispatch, getState)=>{
	try{
		dispatch({type:PRODUCT_CREATE_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const {data}=await axios.post('/api/v1/products', productData, config)
		dispatch({type:PRODUCT_CREATE_SUCCESS, payload:data})
	}catch(error){
		const message=
			error.respones && error.response.data.message
				? error.response.data.message
				: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:PRODUCT_CREATE_FAIL, payload:message})		
	}
}

export const updateProduct=(id, productData)=>async (dispatch, getState)=>{
	try{
		dispatch({type:PRODUCT_UPDATE_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const {data}=await axios.put(`/api/v1/products/${id}`, productData, config)
		dispatch({type:PRODUCT_UPDATE_SUCCESS, payload:data})
		dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})
	}catch(error){
		const message=
			error.respones && error.response.data.message
				? error.response.data.message
				: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:PRODUCT_UPDATE_FAIL, payload:message})			
	}
}

export const deleteProduct=id=>async (dispatch, getState)=>{
	try{
		dispatch({type:PRODUCT_DELETE_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{Authorization: `Bearer ${userInfo.token}`}
		}
		await axios.delete(`/api/v1/products/${id}`, config)
		dispatch({type:PRODUCT_DELETE_SUCCESS})
	}catch(error){
		const message=
			error.response && error.response.data.message
			? error.response.data.message
			: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:PRODUCT_DELETE_FAIL, payload:message})		
	}
}
/*
export const getlistProducts=()=>async dispatch=>{		
`/api/v1/products`)		

export const createProduct=()=>async (dispatch, getState)=>{
	try{
		dispatch({type:PRODUCT_CREATE_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const {data}=await axios.post('/api/v1/products', {}, config)
		dispatch({type:PRODUCT_CREATE_SUCCESS, payload:data})
	}catch(error){
		const message=
			error.respones && error.response.data.message
				? error.response.data.message
				: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:PRODUCT_CREATE_FAIL, payload:message})		
	}
}
*/