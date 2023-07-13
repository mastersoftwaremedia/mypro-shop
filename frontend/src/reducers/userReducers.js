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
	USER_UPDATE_PROFILE_RESET,
	
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL
} from '../constants/userConstants'

export const userAuthReducer=(state={}, action)=>{
	//state={user:{}} ({success:true, token, user})
	const {type,payload}=action
	switch(type){
		case USER_REGISTER_REQUEST:
		case USER_LOGIN_REQUEST:
			return {loading:true}
		case USER_REGISTER_SUCCESS:
		case USER_LOGIN_SUCCESS:
			return {loading:false, userInfo:payload, success:true}
		case USER_REGISTER_FAIL:
		case USER_LOGIN_FAIL:
			return {loading:false, error:payload, success:false}
		case USER_REGISTER_RESET:
		case USER_LOGIN_RESET:
			return {}
		case USER_LOGOUT:
			return {}
		default:
			return state
	}
}

////////////////////////
export const userDetailsReducer=(state={user:{}}, action)=>{
	const {type,payload}=action
	switch(type){
		case USER_DETAILS_REQUEST:
			return {...state, loading:true}
		case USER_DETAILS_SUCCESS:
			return {loading:false, user:payload}
		case USER_DETAILS_FAIL:
			return {loading:false, error:payload}
		case USER_DETAILS_RESET:
			return {user:{}}
		default:
			return state
	}
}
//https://res.cloudinary.com/ddsx4msqm/image/upload/v1629182203/avatars/tpn1cb4rrlsaksffudls.jpg
export const userUpdateProfileReducer=(state={}, action)=>{
	const {type,payload}=action
	switch(type){
		case USER_UPDATE_PROFILE_REQUEST:
			return {loading:true}
		case USER_UPDATE_PROFILE_SUCCESS:
			return {loading:false, success:true, userInfo:payload}
		case USER_UPDATE_PROFILE_FAIL:
			return {loading:false, error:payload}
		case USER_UPDATE_PROFILE_RESET:
			return {}
		default:
			return state
	}
}
////////////////////////////////
//FORGOT_PASSWORD, NEW_PASSWORD
export const userPassReducer=(state={}, action)=>{
	const {type,payload}=action
	switch(type){
		case FORGOT_PASSWORD_REQUEST:
		case NEW_PASSWORD_REQUEST:
			return {...state, loading:true}
		case FORGOT_PASSWORD_SUCCESS:
			return {...state, loading:false, message:payload}
		case NEW_PASSWORD_SUCCESS:
			return {success:true}
		case FORGOT_PASSWORD_FAIL:
		case NEW_PASSWORD_FAIL:
			return {...state, loading:false, error:payload}
		default:
			return state
	}
}


/////////////////////////
export const userListReducer=(state={users:[]}, action)=>{
	const {type,payload}=action
	switch(type){
		case USER_LIST_REQUEST:
			return {loading:true}
		case USER_LIST_SUCCESS:
			return {
				loading:false, 
				users:payload.users, 
				count:payload.count
			}
		case USER_LIST_FAIL:
			return {loading:false, error:payload}
		case USER_LIST_RESET:
			return {users:[]}
		default:
			return state
	}
}

export const userUpdateReducer=(state={user:{}}, action)=>{
	const {type,payload}=action
	switch(type){
		case USER_UPDATE_REQUEST:
			return {loading:true}
		case USER_UPDATE_SUCCESS:
			return {loading:false, success:true}
		case USER_UPDATE_FAIL:
			return {loading:false, error:payload}
		case USER_UPDATE_RESET:
			return {user:{}}
		default:
			return state
	}	
} 

export const userDeleteReducer=(state={}, action)=>{
	const {type,payload}=action
	switch(type){
		case USER_DELETE_REQUEST:
			return {loading:true}
		case USER_DELETE_SUCCESS:
			return {loading:false, success:true}
		case USER_DELETE_FAIL:
			return {loading:false, error:payload}
		default:
			return state
	}	
}
///////////////////////////////
/*
//update password
export const userUpdatePassReducer=(state={}, action)=>{
	const {type,payload}=action
	switch(type){
		case UPDATE_PASSWORD_REQUEST:
			return {loading:true}
		case UPDATE_PASSWORD_SUCCESS:
			return {loading:false, success:true} //true
		case UPDATE_PASSWORD_FAIL:
			return {loading:false, error:payload}
		case UPDATE_PASSWORD_RESET:
			return {success:false}
		default:
			return state
	}	
}

*/