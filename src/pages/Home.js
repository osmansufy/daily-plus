import React, { useEffect, useState } from 'react'


import Category from '../container/Category'
import Banner from '../container/Banner';
import PopulerProducts from '../container/PopulerProducts';
import PreOrders from '../container/PreOrder'

function Home(){

    return(
    <div class="wrapper">
        {/* Main Sidebar Container */}
        
        
        {/* Content Wrapper. Contains page content */}
        <div class="content-wrapper">
          {/* Content Header (Page header) */}
          {/* Main content */}
          {/* Header Section */}
          
          <div class="floting-cart">
            <div class="floting-cart-top">
              <i class="fa fa-shopping-bag pr-2" />
              <p>4 items</p>
            </div>
            <button class="btn">4900</button>
          </div>
          {/*  Banner Section  */}
          {<Banner />}
          {/* Cart View */}
          <div class="cart-holder" id="cart-holder">
            <div class="cart-header">
              <h6>4 Items</h6>
              <button class="btn btn-secondary" id="cartCloseBtn">x Close</button>
            </div>
            <div class="cart-product">
              <div class="cart-img">
                <img class="img-fluid" src="assets/dist/img/image 3.jpg" alt="" />
              </div>
              <div class="quantity">
                <p class="cart-product-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, alias!</p>
                <p class="sell-price">8989</p>
                <div class="quantity-group">
                  <button class="btn btn-minus"><i class="fa fa-minus" /></button>
                  <div class="show-quantity">
                    <h6>10</h6>
                  </div>
                  <button class="btn btn-plus"><i class="fa fa-plus" /></button>
                </div>
              </div>
              <div class="cart-price">
                <div class="total-price">
                  <p>474</p>
                  <p class="regular-price">7474</p>
                </div>
                <div class="delete-cart">
                  <a href="#"><i class="fa fa-trash-o" /></a>
                </div>
              </div>
            </div>
            <div class="cart-product">
              <div class="cart-img">
                <img class="img-fluid" src="dist/assets/dist/img/image 3.jpg" alt="" />
              </div>
              <div class="quantity">
                <p class="cart-product-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, alias!</p>
                <p class="sell-price">8989</p>
                <div class="quantity-group">
                  <button class="btn btn-minus"><i class="fa fa-minus" /></button>
                  <div class="show-quantity">
                    <h6>10</h6>
                  </div>
                  <button class="btn btn-plus"><i class="fa fa-plus" /></button>
                </div>
              </div>
              <div class="cart-price">
                <div class="total-price">
                  <p>474</p>
                  <p class="regular-price">7474</p>
                </div>
                <div class="delete-cart">
                  <a href="#"><i class="fa fa-trash-o" /></a>
                </div>
              </div>
            </div>
          </div>
          {/* Shop by category section */}
         {<Category/>}
         {<PopulerProducts />}
         {<PreOrders />}
          {/* Footer Section */}
         
        </div>
        {/* /.content-wrapper */}
        
      </div>);
}

export default Home