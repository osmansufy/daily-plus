import React, { useEffect, useState} from 'react';

import SinglePopuler from '../component/SinglePopuler';
import Spinner from '../container/Spinner/Spinner'
 import * as productActions from '../store/actions/actionProducts'
import {connect} from 'react-redux'
import ProductModal from '../component/ProductModal'

const PopulerProducts=props =>{
  const [modalShow, setModalShow] = useState(false);
  
 useEffect(() => {
  props.onInItProducts()
  
    }, []);

   const productHandler=(item)=>{
 
    props.onProductDetails(item)
    setModalShow(true)
   }
   const modalClosedHandler=()=>{
    setModalShow(false)
    props.onProductDetails([])
   }
return ( <><section>
            <div class="container">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-6">
                  <h2>Popular Items</h2>
                </div>
                <div class="col-md-6 col-sm-6 col-6">
                  <button class="btn btn-primary float-right">View All Products</button>
                </div>
              </div>
              <div class="row populer-items">

                
              {props.productLists && props.productLists.map((item, index) => {
               return <SinglePopuler
               clicked={()=>productHandler(item)}
               data={item} key={index}/>
              }
                
              )}
                  
               </div>
            </div>
            
          </section>
         
          <ProductModal modalClosed={modalClosedHandler}  show={modalShow}
        onHide={() => setModalShow(false)}  />

          </>
        
)
        
}
const mapStateToProps=state=>{
  return {
    productLists:state.products.products,
    
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onInItProducts:()=>dispatch(productActions.initFetchProducts()),
    onProductDetails:(details)=>dispatch(productActions.productDetails(details))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PopulerProducts)