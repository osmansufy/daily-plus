import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import SinglePreOrder from '../component/SinglePreOrder';

function PreOrder(props) {
  const [preOrders,setPreOrders]=useState([])

  const getPreOrders=async()=>{
    Axios.get('https://api.dailyplus.store/v0/catalogue/product/public/?pre_order=1').then(response=>{
      setPreOrders(response.data)
    })
  }
  useEffect(()=>{
getPreOrders()
  },[])
    return (
        <section>
            <div class="container">
              <div class="row">
                <div class="col-md-12 col-sm-12 col-12">
                  <h2>Pre-Order Products</h2>
                </div>
              </div>
              <div class="row">
                {preOrders && preOrders.map((item,index)=>(
                  <SinglePreOrder data={item} key={index} />

                ))}
                </div>
            </div>
          </section>
    );
}

export default PreOrder;