import React, { useEffect, useState} from 'react';

import SinglePopuler from '../component/SinglePopuler';
import Spinner from '../container/Spinner/Spinner'
import * as productActions from '../store/actions/actionProducts'
import {connect} from 'react-redux'

import { Route, Router, useHistory } from 'react-router';
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const PopulerProducts=props =>{
  // const [modalShow, setModalShow] = useState(false);
  const history=useHistory()
 useEffect(() => {
  props.onInItProducts()
  
    }, []);



  const settings = {
    dots: false,
    infinite: true,
    className: "center",
    centerMode: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          swipeToSlide: true,
          centerMode: false,
          
        }
      }
    ]
  };
return ( <>

<section>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-6">
                  <h3>Popular Items</h3>
                </div>
                <div className="col-md-6 col-sm-6 col-6">
                  <button className="btn btn-padding btn-primary float-right">View All Products</button>
                </div>
              </div>
              <Slider {...settings}>

                
              {props.productLists && props.productLists.map((item, index) => {
               return <SinglePopuler
              //  clicked={()=>productHandler(item)}
               data={item} key={index}/>
              }
                
              )}
                  
               </Slider>
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