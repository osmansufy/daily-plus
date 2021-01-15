import React, { useEffect, useState} from 'react';

import SinglePopuler from '../component/SinglePopuler';
import Spinner from '../container/Spinner/Spinner'
import * as productActions from '../store/actions/actionProducts'
import {connect} from 'react-redux'
import ProductModal from '../component/ProductModal'
import { Route, Router, useHistory } from 'react-router';

const PopulerProducts=props =>{
  // const [modalShow, setModalShow] = useState(false);
  const history=useHistory()
 useEffect(() => {
  props.onInItProducts()
  
    }, []);

  //  const productHandler=(item)=>{
 
  //   props.onProductDetails(item)
  //   setModalShow(true)
  
  //  }
  //  const modalClosedHandler=()=>{
  //   setModalShow(false)
  //   props.onProductDetails([])
  //  }
return ( <>

<section>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-6">
                  <h2>Popular Items</h2>
                </div>
                <div className="col-md-6 col-sm-6 col-6">
                  <button className="btn btn-padding btn-primary float-right">View All Products</button>
                </div>
              </div>
              <div className="row populer-items">

                
              {props.productLists && props.productLists.map((item, index) => {
               return <SinglePopuler
              //  clicked={()=>productHandler(item)}
               data={item} key={index}/>
              }
                
              )}
                  
               </div>
            </div>
            
          </section>
        
    
        
         

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