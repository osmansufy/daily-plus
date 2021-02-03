import * as actionsTypes from '../actions/actionsTypes'

const initialState={
    userdetails:[],
    accessToken:null,
    activeCart:"",
    loading:false,
    error:null,
    notifiacationCount:'',
    notifications:[]
}

const AuthReducer = (state=initialState,action) => {
   switch (action.type) {
       case actionsTypes.API_FETCH_START:
           
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
       case actionsTypes.API_FETCH_FAIL:
           
        return {
            ...state,
            loading:false,
            error:action.error
        };
   
       case actionsTypes.USER_LOGOUT:
           
        return {
            ...state,
            userdetails:[],
            accessToken:null,
            activeCart:"",
            loading:false,
            error:null,
            notifiacationCount:'',
            notifications:[]
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
       case actionsTypes.USER_NOTIFICATION_COUNT:
           
        return {
            ...state,
            notifiacationCount:action.count
            
        };
       case actionsTypes.USER_NOTIFICATIONS:
           
        return {
            ...state,
            notifications:action.notifications,
            loading:false,
            error:null,
            
        };
   
       default:return state
    }
  
}
 
export default AuthReducer;