import axios from '../../axios'
import * as actionsTypes from './actionsTypes'

export const onAddressStart=()=>{
   return{ type:actionsTypes.ADDRESS_START}
}
export const onAddressSuccess=(data)=>{
   return{ 
       type:actionsTypes.ADDRESS_SUCCESS,
       address:data
    
    }
}
export const onAddressFail=(error)=>{
   return{ 
       type:actionsTypes.ADDRESS_FAIL,
       error:error
    }
}

export const onUserAddress=(token)=>{
    return dispatch=>{
        dispatch(onAddressStart())
    axios.get('/location/user/address/',{
        headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json"
          }
    }).then(response=>{
        dispatch (onAddressSuccess(response.data))
        console.log(response)
    }).catch(error=>{
        dispatch(onAddressFail(error))
        console.log(error)
    })
}
}

const addressDelete=(id)=>{
return{
    type:actionsTypes.ADDRESS_DELETE,
    id:id
}
}
export const onAddressDelete=(token,id)=>{
    return dispatch=>{
    axios.delete(`location/user/address/${id}/`,{
        headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json"
          }
    }).then(response=>{
        dispatch (addressDelete(id))
        console.log(response)
    }).catch(error=>{
        console.log(error)
    })
}
}

export const onAddressSelected=(address)=>{
    
    return{ 
        type:actionsTypes.ADDRESS_SELECTED,
        address:address
     
     } 

}
export const onAddressEdit=(location,address)=>{
    return {
        type:actionsTypes.ADDRESS_EDIT,
        address:address,
        location:location
    }

}

export const onEditSuccess=(data)=>{
    return{
        type:actionsTypes.ADDRESS_EDIT_SUBMIT,
        editAddress:data,
    }
}
export const onAddAddress=(address)=>{
    return{
        type:actionsTypes.ADDRESS_ADD,
        address:address,
        
    }
}

export const onAddressCheckout=(path)=>{
    return{
        type:actionsTypes.ADDRESS_ADD_FROM_CHECKOUT,
        path:path
        
    }
}
export const onAddressEditSubmit=(eId,address)=>{
 
    return dispatch=> {
        axios.patch('location/user/address/'+eId+'/',address)
        .then(response=>{
            dispatch(onEditSuccess(response.data))
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

}
export const onAddSubmit=()=>{
    return{
        type:actionsTypes.ADDRESS_ADD_SUBMIT,
        
    }
}
export const onNewAddressSubmit=(addressDteails,token)=>{
 
    return dispatch=> {
        axios.post("/location/user/address/",addressDteails)
        .then(response=>{
            console.log(response)
            dispatch(onUserAddress(token))
            dispatch(onAddSubmit())
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

}


const onCurrentAddress=(latitude,longitude,address)=>{
    return{
        type:actionsTypes.ADDRESS_CURRENT,
        latitude:latitude,
        longitude:longitude,
        address:address
    }
}

export const getReverseGeoCode=(latitude,longitude,isSignUp)=>{
 
 return dispatch=>{   axios
    .get(
      `location/geocode/reverse/?lat=${latitude}&lng=${longitude}&lang=en`,
      {
        headers: {
          Authorization: `JWT ${isSignUp}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      dispatch(onCurrentAddress(latitude,longitude,response.data.result.address))
    })
    .catch((error) => {
      console.log(error);
    });
}
}