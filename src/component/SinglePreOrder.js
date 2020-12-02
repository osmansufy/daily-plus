import React from 'react';

function SinglePreOrder(props) {
    console.log(props.data)
    let freeDel= null 
    let discount='৳'+props.data.inventory_list[0].unit_price
    if (props.data.pre_order_details.is_free_delivery) {
        freeDel=(<h6 class="sell-price">Free Delivery</h6>)
    }
    if (props.data.inventory_list[0].unit_price_final==props.data.inventory_list[0].unit_price) {
        discount=null
    }
    return (
        <div class="col-md-3 col-sm-2 col-12 mt-4">
                  <div class="product-card">
                    <div class="no-card">
                      <a type="button" data-toggle="modal" data-target="#exampleModal"><img class="product-img img-fluid" src={props.data.image_list[0].thumbnail_image_url} alt="" /></a>
                    </div>
    <h6 class="mt-2 mb-2">{props.data.description}</h6>
                    <div class="delivery-price mb-2">
                      <div class="price">
                        <h6 class="sell-price">৳{props.data.inventory_list[0].unit_price_final} <span class="regular-price">{discount}</span></h6>
                      </div>
                      {freeDel}
                      
                    </div>
                    <div class="available">
                      <p>{props.data.pre_order_details.delivery_date}</p>
                    </div>
                    <button class="btn add-to-bag-btn pre-order-btn"><i class="fa fa-shopping-bag" />Pre-Order</button>
                  </div>
                </div>
    );
}

export default SinglePreOrder;