import axios from 'axios'
import * as actionTypes from './actionsTypes'

export const setProducts=(products)=>{
    return{
    type:actionTypes.FETCH_PRODUCTS,
    products:products
    }
}

export const initFetchProducts=()=>{
    return dispatch=>{
        axios.get('https://api.dailyplus.store/v0/catalogue/product/public/paginated/')
        .then(response=>{
            dispatch(setProducts(response.data.results))
        }).catch(error=>{
            
            console.log(error)
                    })
    }
}
export const setCatProducts=(products)=>{
    return{
    type:actionTypes.FETCH_CAT_PRODUCTS,
    products:products,
    }
}
export const failCatProducts=()=>{
    return{
    type:actionTypes.FAIL_CAT_PRODUCTS,
 
    }
}
export const initFetchCatProducts=(id)=>{
    return dispatch=>{
      
      const  quariParam='?category='+id
       axios.get('https://api.dailyplus.store/v0/catalogue/product/public/'+quariParam)
        .then(response=>{
            
            dispatch(setCatProducts(response.data))
            console.log("catProducts",response)
        }).catch(error=>{
dispatch(failCatProducts())
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