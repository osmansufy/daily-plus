import axios from '../../axios'
import * as actionTypes from './actionsTypes'

export const setProducts=(products)=>{
    return{
    type:actionTypes.FETCH_PRODUCTS,
    products:products
    }
}
export const afterOrderProduct=()=>{
    return{
    type:actionTypes.AFTER_ORDER_PRODUCTS,
    
    }
}

export const initFetchProducts=()=>{
    return dispatch=>{
        axios.get('catalogue/product/public/paginated/')
        .then(response=>{
            dispatch(setProducts(response.data.results))
        }).catch(error=>{
            
            console.log(error)
                    })
    }
}
export const setCatProductsStart=()=>{
    return{
    type:actionTypes.FETCH_CAT_PRODUCTS_START,

    }
}
export const setCatProducts=(catProducts)=>{
    return{
    type:actionTypes.FETCH_CAT_PRODUCTS,
    catProducts:catProducts,
    }
}
export const failCatProducts=(error)=>{
    return{
    type:actionTypes.FAIL_CAT_PRODUCTS,
    error:error.message
    }
}
export const initFetchCatProducts=(id)=>{
    return dispatch=>{
      dispatch(setCatProductsStart())
      const  quariParam='?category='+id
       axios.get('catalogue/product/public/'+quariParam)
        .then(response=>{
            
            dispatch(setCatProducts(response.data))
            console.log("catProducts",response)
        }).catch(error=>{
dispatch(failCatProducts(error))
console.log(error)
        })
    }
}

export const productDetails=(details)=>{
    return {
        type:actionTypes.PRODUCTS_DETAILS,
        details:details
    }
}

export const singleProduct=(data)=>{
    return{
        type:actionTypes.SINGLE_PRODUCT,
        product:data
    }
}
export const singleProductStart=()=>{
    return{
        type:actionTypes.SINGLE_PRODUCT_START,
       
    }
}
export const singleProductFail=(error)=>{
    return{
        type:actionTypes.SINGLE_PRODUCT_FAIL,
        error:error.message
    }
}
export const onSingleProducFetch=(id)=>{
  return dispatch=>{
        dispatch(singleProductStart())
        axios.get('catalogue/product/public/'+id+'/')
        .then(response=>{
            console.log(response)
            dispatch(singleProduct(response.data))
            dispatch(initFetchCatProducts(response.data.category))
        }).catch(error=>{
            dispatch(singleProductFail(error))
            console.log(error)
      
                    })
    }
}