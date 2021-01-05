import * as actionsTypes from '../actions/actionsTypes'

const initialState={
    userdetails:[],
    accessToken:null,
    activeCart:"",
    loading:false,
    error:null
}

const AuthReducer = (state=initialState,action) => {
   switch (action.type) {
       case actionsTypes.USER_LOGIN_START:
           
        return {
            ...state,
            loading:true,
            
        };
   
       case actionsTypes.USER_LOGIN_SUCCESS:
           
        return {
            ...state,
            userdetails:action.information,
            activeCart:action.information.active_cart,
            accessToken:action.tocken,
            loading:false,
            error:null
        };
       case actionsTypes.USER_LOGIN_FAIL:
           
        return {
            ...state,
            loading:false,
            error:action.error
        };
   
       case actionsTypes.USER_LOGOUT:
           
        return {
            ...state,
            userdetails:null,
            accessToken:null,
        };
       case actionsTypes.CART_CHANGE:
           
        return {
            ...state,
           activeCart:action.activeCart
            
        };
       case actionsTypes.USER_UPDATE:
           
        return {
            ...state,
            userdetails:action.userInfo
            
        };
   
       default:return state
    }
  
}
 
export default AuthReducer;