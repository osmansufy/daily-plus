
import React, { Component } from 'react';
import axios from 'axios'
import SingleCategory from '../component/SingleCategory';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
class Category extends Component {
    state={
        categories:[]
    }
    componentDidMount(){
        axios.get('https://api.dailyplus.store/v0/catalogue/category/').then(response=>{
           
            this.setState({categories:response.data})
          
            
        })
    };
  
    render() {
      const settings = {
        dots: false,
        infinite: true,
        className: "center",
        centerMode: true,
        centerPadding: "20px",
        centerMargin: "20px",
        speed: 700,
        slidesToShow: 8,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay:true,
        lazyLoad: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 5,
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
              arrows: false,
            }
          }
        ]
      };
      
        const cats =this.state.categories.map((item,index)=>{
return <SingleCategory data={item} key={index} containerClass="mt-4"/>


        });
        return (<section className="category-section">
            <div className="container">
              <div className="row mb-4">
                <div className="col-md-6 col-sm-6 col-6">
                  <h3 className="section-title">Shop by Categories</h3>
                </div>
                <div className="col-md-6 col-sm-6 col-6">
                  <Link to="/categories">
                  <button  className="btn btn-padding section-button btn-primary float-right">View All Category</button>
                  </Link>
                  <Link to="/categories" className="mobile-link">See All</Link>
               
                </div>
              </div>
             
              <Slider {...settings}>
          {cats}
        </Slider>
              
            </div>
          </section>
            
        );
    }
}

export default Category;

