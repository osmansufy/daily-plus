import * as actionsTypes from '../actions/actionsTypes'

import {updateObject} from '../../utility/updateObject'

const initialState={
    userAddress:[],
    loading:false,
    error:null,
    addressCurrent:{},
    isEdit:false,
    redirectPath:'/'
}

const onUpdatedAddress=(state,action)=>{
    const upadteArea={ 
        location:action.location,
        address:action.address
    }

    const updatedAddress=updateObject(state.addressCurrent,upadteArea)
    const updatesState={
        addressCurrent:updatedAddress,
        
    }
    return updateObject(state,updatesState)
}
const onAddUpdatedAddress=(state,action)=>{
    const upadteArea={ 
        
                 is_home:false,
                 is_office:false,
                 title:""
    }

    const updatedAddress=updateObject(state.addressCurrent,upadteArea)
    const updatesState={
        addressCurrent:updatedAddress,
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
       case actionsTypes.ADDRESS_SELECTED:
           
        return {
            ...state,
            addressCurrent:action.address,
            isEdit:true,
        };
        case actionsTypes.ADDRESS_EDIT_START:
           
            return {
                ...state,
                isEdit:action.isEdit,
                redirectPath:'/'
            }
       case actionsTypes.ADDRESS_EDIT:
           
        return onUpdatedAddress(state,action)
       case actionsTypes.ADDRESS_EDIT_SUBMIT:
           
        return {
            ...state,
            addressCurrent:action.editAddress
        }
       case actionsTypes.ADDRESS_ADD_SUBMIT:
           
        return {
            ...state,
            redirectPath:"/"
        }
       case actionsTypes.ADDRESS_ADD_FROM_CHECKOUT:
           
        return {
            ...state,
            redirectPath:action.path,
            isEdit:false,
            addressCurrent:{
                ...state.addressCurrent,
                title:""
            }
        }
       case actionsTypes.ADDRESS_ADD:
           
        return {
            ...state,
            addressCurrent:action.address,
            isEdit:false,
            redirectPath:"/"
        }
       case actionsTypes.ADDRESS_CURRENT:
           
        return {
            ...state,
            addressCurrent:{
                location:{
                    lat:action.latitude ,
                    lng:action.longitude
                },
                address:action.address
            },
        }
      
   
      
   
       default:return state
    }
  
}
 
export default AddressReducer;