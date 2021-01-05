import * as actionTypes from '../actions/actionsTypes'

const initialState={
    products:null,
    productDetails:[],
    CatProducts:null,
    catName:null,
    error:false
}
const reducer=(state=initialState,action)=>{


    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS:
            return {
            ...state,
                products:action.products
            }
           
        case actionTypes.PRODUCTS_DETAILS:
            return {
            ...state,
            productDetails:action.details
            
            }
          
        case actionTypes.FETCH_CAT_PRODUCTS:
            return {
            ...state,
            CatProducts:action.products,
            // catName:action.name
            
            }
        case actionTypes.FAIL_CAT_PRODUCTS:
            return {
            ...state,
            error:true,
            // catName:action.name
            
            }
          
    
        default:
            return state
    }
}

export default reducer