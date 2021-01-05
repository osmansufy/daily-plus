import axios from '../../axios'

import * as actionsTypes from './actionsTypes'

export const loginUserStart=()=>{
    return{
        type:actionsTypes.USER_LOGIN_START
    }
}
export const loginUserFail=(error)=>{
    return{
        type:actionsTypes.USER_LOGIN_FAIL,
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
        dispatch(loginUserStart())
    axios.post('user/login/password/',userdetails)
    .then(response=>{
      dispatch (loginUserInit(response.data))
      console.log(response.data)
    }).catch(error=>{
        console.log(error)
        dispatch(loginUserFail(error.message))
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