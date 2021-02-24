import Axios from '../axios';
import React, { useEffect, useState } from 'react';
import SinglePreOrder from '../component/SinglePreOrder';

function PreOrder(props) {
  const [preOrders,setPreOrders]=useState([])

  const getPreOrders=()=>{
   Axios.get('catalogue/product/public/?pre_order=1')
   .then(response=>{
      setPreOrders(response.data)
    })
    .catch(error=>
     { console.log("preerror",error)}
      )
  }
  useEffect(()=>{
getPreOrders()
  },[])
    return (
        <section>
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-12">
                <h3 className="section-title">Pre-Order Products</h3>
                </div>
              </div>
              <div className="row">
                {preOrders && preOrders.map((item,index)=>(
                  <SinglePreOrder data={item} key={index} />

                ))}
                </div>
            </div>
          </section>
    );
}

export default PreOrder;