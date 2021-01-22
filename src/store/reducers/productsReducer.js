import * as actionTypes from '../actions/actionsTypes'

const initialState={
    products:null,
    singleProduct:null,
    productDetails:[],
    CatProducts:null,
    catName:null,
    loading:false,
    catloading:false,
    error:null
}
const reducer=(state=initialState,action)=>{


    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS:
            return {
            ...state,
                products:action.products
            }
        case actionTypes.AFTER_ORDER_PRODUCTS:
            return {
            ...state,
                products:[]
            }
           
        case actionTypes.PRODUCTS_DETAILS:
            return {
            ...state,
            productDetails:action.details
            
            }
          
        case actionTypes.FETCH_CAT_PRODUCTS_START:
            return {
            ...state,
            CatProducts:[],
            catloading:true
            
            }
        case actionTypes.FETCH_CAT_PRODUCTS:
            return {
            ...state,
            CatProducts:action.catProducts,
            catloading:false
            }
        case actionTypes.FAIL_CAT_PRODUCTS:
            return {
            ...state,
            error:action.error,
            catloading:false
            
            }
        case actionTypes.SINGLE_PRODUCT_START:
            return {
            ...state,
            loading:true,
            error:null
            
            }
        case actionTypes.SINGLE_PRODUCT:
            return {
            ...state,
            singleProduct:action.product,
            error:null,
            loading:false
            
            }
        case actionTypes.SINGLE_PRODUCT_FAIL:
            return {
            ...state,
            loading:false,
            error:action.error
            
            }
          
    
        default:
            return state
    }
}

export default reducer