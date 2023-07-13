import axios from 'axios'
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_RESET,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_RESET,
	USER_LOGOUT,
	
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	NEW_PASSWORD_REQUEST,
	NEW_PASSWORD_SUCCESS,
	NEW_PASSWORD_FAIL,
		
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	//USER_UPDATE_PROFILE_RESET,
	
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,

	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL
} from '../constants/userConstants'
import {ORDER_MY_LIST_RESET} from '../constants/orderConstants'

export const register=(userData)=>async dispatch=>{
	try{
		dispatch({type:USER_REGISTER_REQUEST})
		const config={
			headers:{'Content-Type': 'multipart/form-data'}
		}
		const {data}=await axios.post('/api/v1/users', userData, config)
		dispatch({type:USER_REGISTER_SUCCESS, payload:data})
		dispatch({type:USER_LOGIN_SUCCESS, payload:data})
		localStorage.setItem('userInfo', JSON.stringify(data))
	}catch(error){
		dispatch({
			type:USER_REGISTER_FAIL,
			payload:error.response && error.response.data.message ?
				error.response.data.message : error.message
		})
		dispatch({type:USER_REGISTER_RESET})
	}
}

export const login=(email, password)=>async dispatch=>{
	try{
		dispatch({type:USER_LOGIN_REQUEST})
		const config={
			headers:{'Content-Type': 'application/json'}
		}
		const {data}=await axios.post('/api/v1/users/login', {email, password}, config)
		dispatch({type:USER_LOGIN_SUCCESS, payload:data})
		localStorage.setItem('userInfo', JSON.stringify(data))
	}catch(error){
		dispatch({
			type:USER_LOGIN_FAIL,
			payload:error.response && error.response.data.message ?
				error.response.data.message : error.message
		})
		dispatch({type:USER_LOGIN_RESET})		
	}
}

export const logout=()=>dispatch=>{
	localStorage.removeItem('userInfo')
	localStorage.removeItem('cartItems')
	localStorage.removeItem('shippingAddress')
	localStorage.removeItem('paymentMethod')
	dispatch({type:USER_LOGOUT})
	dispatch({type:USER_DETAILS_RESET})
	dispatch({type:ORDER_MY_LIST_RESET})
	dispatch({type:USER_LIST_RESET})
	document.location.href='/login'
}


export const getUserDetails=id=>async(dispatch, getState)=>{
	try{
		dispatch({type:USER_DETAILS_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{Authorization: `Bearer ${userInfo.token}`}
		}
		const {data}=await axios.get(`/api/v1/users/${id}`, config)
		dispatch({type:USER_DETAILS_SUCCESS, payload:data}) //user
	}catch(error){
		const message=
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:USER_DETAILS_FAIL, payload:message})		
	}
}

export const updateUserProfile=userData=>async (dispatch,getState)=>{
	try{
		dispatch({type:USER_UPDATE_PROFILE_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const {data}=await axios.put('/api/v1/users/profile', userData, config)
		dispatch({type:USER_UPDATE_PROFILE_SUCCESS, payload:data})
		dispatch({type:USER_LOGIN_SUCCESS, payload:data})
		localStorage.setItem('userInfo', JSON.stringify(data))
		console.log(userInfo)
	}catch(error){
		const message=
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:USER_UPDATE_PROFILE_FAIL, payload:message})				
	}
}

////////////////////////////////////
export const forgotUserPassword=email=>async dispatch=>{
	try{
		dispatch({type:FORGOT_PASSWORD_REQUEST})
		const config={
			headers:{
				'Content-Type': 'application/json',
			}
		}
		const {data}=await axios.post('/api/v1/users/password/forgot', email, config)
		dispatch({type:FORGOT_PASSWORD_SUCCESS, payload:data.message})
	}catch(error){
		dispatch({
			type:FORGOT_PASSWORD_FAIL, 
			payload:error.response && error.response.data.message
				? error.response.data.message
				: error.message
		})		
	}
}

export const resetUserPassword=(token, passwords)=>async dispatch=>{
	try{
		dispatch({type:NEW_PASSWORD_REQUEST})
		const config={
			headers:{
				'Content-Type': 'application/json',
			}
		}
		await axios.put(`/api/v1/users/password/reset/${token}`, passwords, config)
		dispatch({type:NEW_PASSWORD_SUCCESS})		
	}catch(error){
		dispatch({
			type:NEW_PASSWORD_FAIL, 
			payload:error.response && error.response.data.message
				? error.response.data.message
				: error.message
		})		
	}
}


/////////////////////////
//Admin
export const listUsers=()=>async(dispatch, getState)=>{
	try{
		dispatch({type:USER_LIST_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{Authorization: `Bearer ${userInfo.token}`}
		}
		const {data}=await axios.get('/api/v1/users', config)
		dispatch({type:USER_LIST_SUCCESS, payload:data})
	}catch(error){
		const message=
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:USER_LIST_FAIL, payload:message})		
	}
}


export const updateUser=user=>async(dispatch, getState)=>{
	try{
		dispatch({type:USER_UPDATE_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const {data}=await axios.put(`/api/v1/users/${user._id}`, user, config)
		
		dispatch({type:USER_UPDATE_SUCCESS})
		dispatch({type:USER_DETAILS_SUCCESS, payload:data})
		dispatch({type:USER_DETAILS_RESET})
	}catch(error){
		const message=
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:USER_UPDATE_FAIL, payload:message})		
	}		
}

export const deleteUser=id=>async(dispatch, getState)=>{
	try{
		dispatch({type:USER_DELETE_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{Authorization: `Bearer ${userInfo.token}`}
		}
		await axios.delete(`/api/v1/users/${id}`, config)
		dispatch({type:USER_DELETE_SUCCESS})
	}catch(error){
		const message=
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:USER_DELETE_FAIL, payload:message})				
	}
}
/*
export const updateUserPassword=passwords=>async(dispatch, getState)=>{
	try{
		dispatch({type:UPDATE_PASSWORD_REQUEST})
		const {userAuth:{userInfo}}=getState()
		const config={
			headers:{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const {data}=await axios.put('/api/v1/users/password/update', passwords, config)
		dispatch({type:UPDATE_PASSWORD_SUCCESS})
		//dispatch({type:UPDATE_PASSWORD_RESET})
	}catch(error){
		const message=
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if(message==='Not authorized, token failed'){
			dispatch(logout())
		}
		dispatch({type:UPDATE_PASSWORD_FAIL, payload:message})		
	}
}
*/