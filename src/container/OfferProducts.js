import React, { useEffect, useState } from 'react';
import axios from '../axios'
import SinglePopuler from '../component/SinglePopuler';
import Slider from "react-slick";
const OfferProducts = () => {
    const [offersProducts,setOfferProducts]=useState([])
    useEffect(()=>{
       axios.get('catalogue/product/public/paginated/?is_offer=true')
       .then(response=>{
           console.log("offer",response?.data?.results);
           setOfferProducts(response?.data?.results)
       })
       .catch(error=>
        {
            console.log(error);
        })
    },[])
    
  const settings = {
    dots: false,
    infinite: true,
    className: "center",
    centerMode: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay:true,
    lazyLoad: true,
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
          lazyLoad: true,
          arrows: false,
        }
      }
    ]
  };
    return (
      
<section>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-6">
                  <h3 className="section-title">Daily Offers</h3>
                </div>
                {/* <div className="col-md-6 col-sm-6 col-6">
                  <button className="btn btn-padding btn-primary section-button float-right">View All Products</button>
                  <a className="mobile-link">See All</a>
                </div> */}
              </div>
              <Slider {...settings}>

                
              {offersProducts && offersProducts.map((item) => (
       

              
            <SinglePopuler
            containerClass="mx-1 mt-4"
              //  clicked={()=>productHandler(item)}
               data={item} key={item.id}/>
      
              )
              )}
                  
               </Slider>
            </div>
            
          </section>
    );
};

export default OfferProducts;