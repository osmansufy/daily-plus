import * as actionTypes from './actionsTypes'
import axios from '../../axios'

export const cartAction=(item)=>{
    return {
        type:actionTypes.ADDTO_CART,
        item:item,
        
    }
    // localStorage.setItem('cartItems',JSON.stringify(item)) 
}

export function updateCartUnits({id, unit_quantity}) {
    return {
      type: actionTypes.UPDATE_CART_UNITS,
      payload: {id, unit_quantity}
    }
  }
export function deleteCartProduct({id, unit_quantity}) {
    return {
      type: actionTypes.DELETE_PRODUCTS_CART,
      payload: {id, unit_quantity}
    }
  }

export const addPreCart=(item)=>{
  return {
    type:actionTypes.ADDTO_PRE_ORDER,
    item:item,
    
}

}

export const itemsAddtoCart=(token)=>{
 return dispatch =>{ axios.get('order/preorder/items/',{
    headers:{
        Authorization:`JWT ${token}`
    }
})
.then(response=>{
  console.log(response)
  dispatch(addPreCart(response.data))
}).catch(error=>{
    
    console.log(error)
            })
}
}

export const onUpderePre=({id, qtn})=>{
  return {
    type: actionTypes.UPDATE_PRE_ORDER_UNITS,
    payload: {id, qtn}
  }
}

export const updatePreCartUnits=(id,qtn,token) =>{
 
return dispatch=>{axios.patch('order/preorder/items/'+id+'/',{
  item_count:qtn
 },  {
  headers: {
    Authorization: `JWT ${token}`,
  }})
  .then(response=>{
    dispatch(onUpderePre({id,qtn}))
    console.log(response.data)
  })
  .catch(error=>{
    console.log(error)
  })
  }
}

export const onDeletePreItem=({id})=>{
  return {
    type: actionTypes.DELETE_PRE_ORDER_CART,
    payload: {id}
  }
}
export function deletePreCartProduct(id,token) {

  return dispatch=>{axios.delete('order/preorder/items/'+id+'/',{
    headers: {
      Authorization: `JWT ${token}`,
    }})
    .then(response=>{
      dispatch(onDeletePreItem({id}))
      console.log(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
    }
   
  }