import * as actionTypes from '../actions/actionsTypes'

import {updateObject} from '../../utility/updateObject'
// const initialState=[]
// export const updateObject=(oldObject,updatedObject)=>{
//     return{
//         ...oldObject,
//         ...updatedObject
//     }
 
//  }

// const cartReducer=(state=initialState,action)=>{

// switch (action.type) {
//     case actionTypes.ADDTO_CART:
        
//         return ( updateObject(state,action.item))

//     default:
//         return state
// }
 
// }
 


const initialState={
  cartProducts:[],
  totalPrice:0,
  cartPreOrders:[]
}

const addPreOrderUpdate=(state,action)=>{
  const preProduct = action.item;
  const preCarts = state.cartPreOrders;

  // const existingProductIndex = findProductIndex(carts, product.id);

  // const updatedCart = existingProductIndex >= 0 
  //     ? updateProductUnits(carts, product)
  //     : [...carts, product];
const updateCurrnt={
  unit_quantity:1,
}
const updateCurrntPreProduct=updateObject(preProduct,updateCurrnt)
  return {
    ...state,
    cartPreOrders:[...preCarts, updateCurrntPreProduct]
    
  }
}
// const addCartOrderUpdate=(state,action)=>{
//   const product = action.item;
//   const carts = state.cartProducts;

//   // const existingProductIndex = findProductIndex(carts, product.id);

//   // const updatedCart = existingProductIndex >= 0 
//   //     ? updateProductUnits(carts, product)
//   //     : [...carts, product];
// const updateCurrnt={
//   unit_quantity:1,
// }
// const updateCurrntPreProduct=updateObject(product,updateCurrnt)
//   return {
//     ...state,
//     cartProducts:[...carts, updateCurrntPreProduct]
    
//   }
// }
const cartReducer=(state = initialState, action )=> {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
    switch(action.type) {
      case actionTypes.ADDTO_CART: {
        const product = action.item;
        const carts = state.cartProducts;
  
        const existingProductIndex = findProductIndex(carts, product.id);
  
        // const updatedCart = existingProductIndex >= 0 
        //     ? updateProductUnits(carts, product)
        //     : [...carts, product];
  
        return {
          ...state,
          cartProducts:[...carts, product],
          totalPrice:state.totalPrice + product.inventory_list[0].unit_price_final
        }
      }
    
    case actionTypes.UPDATE_CART_UNITS: {
        const payload = action.payload;
        const carts = state.cartProducts;
  
        const existingProductIndex = findProductIndex(carts, payload.id);
  
        if (existingProductIndex >= 0) {
          let product = carts[existingProductIndex];
          product.unit_quantity = payload.unit_quantity;
  
          carts[existingProductIndex] = product;
        }
  
        return {
          ...state,
          cartProducts:[...carts],
          totalPrice:carts.length>0? carts.map(cart=>cart.inventory_list[0].unit_price_final*cart.unit_quantity).reduce(reducer):0
        } 
  
      }
    case actionTypes.DELETE_PRODUCTS_CART: {
      const payload = action.payload;
        const carts = state.cartProducts;
  carts.map(c=>{
    if(c.id===payload.id){
      c.unit_quantity=0
    }
  })
        const existingProductIndex = findProductIndex(carts, payload.id);
  carts.splice(existingProductIndex,1)
      return {
        ...state,
        cartProducts:[...carts],
        totalPrice:carts.length>0? carts.map(cart=>cart.inventory_list[0].unit_price_final*cart.unit_quantity).reduce(reducer):0
      } 
      
      
      
  
      }

      case actionTypes.ADDTO_PRE_ORDER: 
       return {
         ...state,
         cartPreOrders:action.item
       }
      

      case actionTypes.UPDATE_PRE_ORDER_UNITS: {
        const payload = action.payload;
        const carts = state.cartPreOrders;
  
        const existingProductIndex = findProductIndex(carts, payload.id);
  
        if (existingProductIndex >= 0) {
          let product = carts[existingProductIndex];
          product.item_count = payload.qtn;
  
          carts[existingProductIndex] = product;
        }
  
        return {
          ...state,
          cartPreOrders:[...carts],
         
        } 
  
      }
      case actionTypes.DELETE_PRE_ORDER_CART: {
        const payload = action.payload;
          const carts = state.cartPreOrders;
  
          const existingProductIndex = findProductIndex(carts, payload.id);
    carts.splice(existingProductIndex,1)
        return {
          ...state,
          cartPreOrders:[...carts],
        
        } 
        
        
        
    
        }
  
    
}
return state;
  }
  
  
  const findProductIndex = (cart, productID) => {
    return cart.findIndex(p => p.id === productID);
  };
  
  const  updateProductUnits = (cart, product) => {
    const productIndex = findProductIndex(cart, product.id);
  
    const updatedCart = [...cart];
    const existingProduct = updatedCart[productIndex];
  
    const updatedUnitsProduct = {
      ...existingProduct,
      unit_quantity: existingProduct.unit_quantity + product.unit_quantity
    };
  
    updatedCart[productIndex] = updatedUnitsProduct;
  
    return updatedCart;
  };

  export default cartReducer;