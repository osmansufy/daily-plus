import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import SinglePopuler from '../component/SinglePopuler';
import Spinner from '../container/Spinner/Spinner'
function PopulerProducts(props) {
    const [productList, setProductList] = useState([]);


    

    useEffect(() => {
      axios.get('https://api.dailyplus.store/v0/catalogue/product/public/paginated/').then(response=>{
           
        setProductList(response.data.results)
         
      })
    }, []);



    // state={
    //     populerProducts:[]
    // }
    // componentDidMount(){
    //     axios.get('https://api.dailyplus.store/v0/catalogue/product/public/paginated/').then(response=>{
           
    //         this.setState({populerProducts:response.data.results})
           
    //         console.log(response.data.results);
    //     })
    // };

      
      
      // const  populers=productList.map(populer=>{
      //     return(<SinglePopuler thum={populer.image_list.thumbnail_image_url} feature={populer.image_list.image_url} title={populer.name}  desc={populer.description} sellPrice={populer.inventory_list.unit_price_final} />
            
      //       )
          
      // })
      

      // console.log("productList", productList)
      // populers=this.state.populerProducts.map(populer=>{
      //      return(<SinglePopuler thum={populer.image_list.thumbnail_image_url} feature={populer.image_list.image_url} title={populer.name}  desc={populer.description} sellPrice={populer.inventory_list.unit_price_final} />
      // })
        
        return (
            <section>
            <div class="container">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-12">
                  <h2>Popular Items</h2>
                </div>
                <div class="col-md-6 col-sm-6 col-12">
                  <button class="btn btn-primary float-right">View All Products</button>
                </div>
              </div>
              <div class="row populer-items">

                
              {productList && productList.map((item, index) => (
                <SinglePopuler data={item} key={index}/>
              ))}
                  {/* {populers} */}
               </div>
            </div>
          </section>
        )
}

export default PopulerProducts;