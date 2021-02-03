import axios from '../../axios'

import * as actionsTypes from './actionsTypes'

const apiFetchStart=()=>{
    return{
        type:actionsTypes.API_FETCH_START
    }
}
const apiFechFail=(error)=>{
    return{
        type:actionsTypes.API_FETCH_FAIL,
        error:error
    }
}
export const loginUserInit=(info)=>{
    return{
type:actionsTypes.USER_LOGIN_SUCCESS,
tocken:info.jwt_token,
information:info.user_details
    }
}

export const userLogout=()=>{
    return{
        type:actionsTypes.USER_LOGOUT
    }
}
export const cartChange=(cart)=>{
    return{
        type:actionsTypes.CART_CHANGE,
        activeCart:cart.active_cart_id
       
    }
   
}
export const userLoginAction=(userdetails)=>{
    return dispatch=>{
        dispatch(apiFetchStart())
    axios.post('user/login/password/',userdetails)
    .then(response=>{
      dispatch (loginUserInit(response.data))
      console.log(response.data)
    }).catch(error=>{
        console.log(error)
        dispatch(apiFechFail(error.message))
    })
}
}
export const userSignInAction=(userdetails)=>{
    return dispatch=>{
        dispatch(apiFetchStart())
    axios.post('user/signup/',userdetails)
    .then(response=>{
      dispatch (loginUserInit(response.data))
      console.log(response.data)
    }).catch(error=>{
        console.log(error)
        dispatch(apiFechFail(error.message))
    })
}
}

export const onCartChange=(isAuth)=>{
    return dispatch=>{
        axios.get('order/active_cart/',{
            headers:{
                Authorization: `JWT ${isAuth}`,
            }
        })
        .then(response=>{
            dispatch(cartChange(response.data))
            console.log(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const userUpdate=(data)=>{
    return{
        type:actionsTypes.USER_UPDATE,
        userInfo:data
    }
}
export const onUserUpdate=(isAuth,id)=>{
    return dispatch=>{
        axios.get('user/profile/'+id+'/',{
            headers:{
                Authorization: `JWT ${isAuth}`,
            }
        })
        .then(response=>{
            dispatch(userUpdate(response.data))
            console.log(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

const setNotificationCount=(data)=>{
    return{
        type:actionsTypes.USER_NOTIFICATION_COUNT,
        count:data
    }
}
export const onNotificationsCount=(isSignUp)=>{
    return dispatch=>{   axios
    .get("notification/count/", {
      headers: {
        Authorization: `JWT ${isSignUp}`,
      },
    })
    .then((response) => {
        dispatch (setNotificationCount(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
}
const setNotifications=(notifications)=>{
   return {
    type:actionsTypes.USER_NOTIFICATIONS,
    notifications:notifications
   }
}

export const onGetNotifications=(isSignUp)=>{
    
        

    return dispatch=>{  
        dispatch(apiFetchStart())
        axios
        .get("notification/notification/", {
          headers: {
            Authorization: `JWT ${isSignUp}`,
          },
        })
        .then((response) => {
            dispatch (setNotifications(response.data));
        })
        .catch((error) => {
          console.log(error);
          dispatch(apiFechFail(error.message))
        });
    }
}