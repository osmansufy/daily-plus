import React, { useState } from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../store/actions/actionCart'
import { useHistory } from 'react-router';
import axios from '../axios'
import SuccessModal from '../UI/Modal/SuccessModal';
function SinglePreOrder(props) {
   const [modalShow,setModalShow]=useState(false)
  const dispatch=useDispatch()
  const history=useHistory()
  const userInfo=useSelector(state=>state.auth.userdetails)
  const token=useSelector(state=>state.auth.accessToken)

  // const onPreOrder=(item,token)=>dispatch(cartActions.cartPreAction(item,token))
    let freeDel= null 
    let discount='৳'+props.data.inventory_list[0].unit_price
    if (props.data.pre_order_details.is_free_delivery) {
        freeDel=(<h6 className="sell-price">Free Delivery</h6>)
    }
    if (props.data.inventory_list[0].unit_price_final==props.data.inventory_list[0].unit_price) {
        discount=null
    }
    const date=props.data.pre_order_details.delivery_date
    const onSignin =()=>{
      setModalShow(false)
      history.push('/signup')
    }
    const addPreOrder=(item)=>{

      if (token) {
        
     
      const preItem={   
        owner:userInfo.id,
        product:item.id,
        item_count: 1,
        unit_price: item.inventory_list[0].unit_price_final,
        item_tax: item.inventory_list[0].tax,
        item_discount:item.inventory_list[0].discount}
      
      axios.post('order/preorder/items/',preItem,{
        headers:{
          Authorization: `JWT ${token}`,
        }
      })
      .then(response=>{
        history.push('/order/preorder')
        console.log(response.data)
      })
      .catch(error=>
        console.log(error)
        )
      }else{
        setModalShow(true)
      }
    }
    return (<>
        <div className="col-lg-2 col-sm-3 col-6 mt-4">
                  <div className="product-card">
                    <div className="no-card">
                      <a type="button" data-toggle="modal" data-target="#exampleModal"><img className="product-img img-fluid" src={props.data.image_list[0].image_url} alt="" /></a>
                    </div>
    <h6 className= "pro-title mt-2">{props.data.name}</h6>
                    <div className="delivery-price">
                      <div className="price">
                        <h6 className="sell-price">৳{props.data.inventory_list[0].unit_price_final} <span className="regular-price">{discount}</span></h6>
                      </div>
                      {freeDel}
                      
                    </div>
                    <div className="available">
                      <p>Available {moment(date).utc().format('MMM DDD.YYYY')}</p>
                    </div>
                    <a onClick={()=>addPreOrder(props.data,token)} className="btn w-100 mt-sm-3 d-flex align-items-center add-to-bag-btn"><svg width={20} height={21} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
   <rect width={20} height={20} transform="translate(0 0.25)" fill="none" />
   <path fillRule="evenodd" clipRule="evenodd" d="M15.42 5.06663L16.664 16.9135C16.6784 17.0507 16.6339 17.1877 16.5414 17.2904C16.4491 17.3929 16.3175 17.4515 16.1794 17.4515H2.98717C2.84918 17.4515 2.71756 17.3929 2.62515 17.2904C2.53287 17.1877 2.48828 17.0507 2.50264 16.9135L3.74669 5.06663C3.77279 4.81862 3.98183 4.6303 4.23122 4.6303H6.56945V4.0972C6.56945 2.43544 7.92151 1.08337 9.58339 1.08337C11.2452 1.08337 12.5972 2.43544 12.5972 4.0972V4.6303H14.9354C15.1848 4.6303 15.3939 4.81862 15.42 5.06663ZM7.83542 4.0972C7.83542 3.13376 8.61981 2.34934 9.58339 2.34934C10.5468 2.34934 11.3312 3.13375 11.3312 4.0972V4.33864H7.83542V4.0972ZM15.3146 16.1855H3.85205L4.93256 5.89627H6.27778V6.67819C6.27778 7.10826 6.62653 7.45701 7.0566 7.45701C7.48667 7.45701 7.83542 7.10826 7.83542 6.67819V5.89627H11.3312V6.67819C11.3312 7.10826 11.68 7.45701 12.1101 7.45701C12.5401 7.45701 12.8889 7.10826 12.8889 6.67819V5.89627H14.2341L15.3146 16.1855Z" fill="#5EC401" />
 </svg><span className="flex-grow-1">Pre-Order  </span></a>
                  </div>
                </div>
                <SuccessModal show={modalShow} hide={onSignin}>
                 <div className="bg-warning p-2">
                 <p>You are not logged in</p>
                  <p>Please login to Proceed</p>
                 </div>
                </SuccessModal>
                </>
    );
}

export default SinglePreOrder;