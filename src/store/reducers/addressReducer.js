import * as actionsTypes from '../actions/actionsTypes'

import {updateObject} from '../../utility/updateObject'

const initialState={
    userAddress:[],
    loading:false,
    error:null,
    adreessCurrent:{
        location:{
            lat:23.78113301384171, 
            lng:90.42303124459973
        },
        address:"Dingi Technologies Limited"
    },
    isEdit:false,
    redirectPath:'/'
}

const onUpdatedAddress=(state,action)=>{
    const upadteArea={ 
        location:action.location,
        address:action.address
    }

    const updatedAddress=updateObject(state.adreessCurrent,upadteArea)
    const updatesState={
        adreessCurrent:updatedAddress,
        
    }
    return updateObject(state,updatesState)
}
const onAddUpdatedAddress=(state,action)=>{
    const upadteArea={ 
        
                 is_home:false,
                 is_office:false,
                 title:""
    }

    const updatedAddress=updateObject(state.adreessCurrent,upadteArea)
    const updatesState={
        adreessCurrent:updatedAddress,
        isEdit:action.isEdit,
    }
    return updateObject(state,updatesState)
}

const AddressReducer = (state=initialState,action) => {
   switch (action.type) {
       case actionsTypes.ADDRESS_START:
           
        return {
            ...state,
            loading:true,
            
        };
   
       case actionsTypes.ADDRESS_SUCCESS:
           
        return {
            ...state,
            userAddress:action.address,
            loading:false,
            error:null
        };
       case actionsTypes.ADDRESS_FAIL:
           
        return {
            ...state,
            loading:false,
            error:action.error
        };
       case actionsTypes.ADDRESS_DELETE:

       const onAfterDelete=state.userAddress.filter(address=>address.id!=action.id)
           
        return {
            ...state,
            userAddress:onAfterDelete
        };
       case actionsTypes.ADDRESS_ID:
           
        return {
            ...state,
            adreessCurrent:action.address
        };
        case actionsTypes.ADDRESS_EDIT_START:
           
            return {
                ...state,
                isEdit:action.isEdit
            }
       case actionsTypes.ADDRESS_EDIT:
           
        return onUpdatedAddress(state,action)
       case actionsTypes.ADDRESS_EDIT_SUBMIT:
           
        return {
            ...state,
            adreessCurrent:action.editAddress
        }
       case actionsTypes.ADDRESS_ADD_SUBMIT:
           
        return {
            ...state,
            redirectPath:"/"
        }
       case actionsTypes.ADDRESS_ADD_FROM_CHECKOUT:
           
        return {
            ...state,
            redirectPath:"/checkout",
            isEdit:false
        }
       case actionsTypes.ADDRESS_ADD:
           
        return onAddUpdatedAddress(state,action)
      
   
      
   
       default:return state
    }
  
}
 
export default AddressReducer;