import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios' 
import { useEffect, useState } from 'react';
import ButtonQuantity from '../../UI/Button/ButtonQtn';
import * as cartActions from '../../store/actions/actionCart'
import * as authAction from '../../store/actions/actionAuth'
import moment from 'moment'
const PreOrderCheckout = () => {

    const [activePreProducts,setActivePreProducts]=useState([])

    const dispatch =useDispatch()
    const onUpdatePre=(id, qtn,token)=>dispatch(cartActions.updatePreCartUnits(id, qtn,token))
    const allPreProducts=(token)=>dispatch(cartActions.itemsAddtoCart(token))
    const onDeletePre=(id, token)=>dispatch(cartActions.deletePreCartProduct(id,token))
    const token=useSelector(state=>state.auth.accessToken)
    const preProducts=useSelector(state=>state.carts.cartPreOrders)
    const userInfo=useSelector(state=>state.auth.userdetails)
    const userAddress=useSelector(state=>state.address.userAddress)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const onPreDeleteHandler=(item)=>{
        const id=item.id
        onDeletePre(id,token)
    }
    const onPreHandler =(item)=>{
        console.log(item)
       
        const upQtn=parseInt(item.item_count +1)
        const id=item.id
        onUpdatePre(id,upQtn,token)
      }

    const subPreHandler =(item)=>{
        console.log(item)
        const upQtn=parseInt(item.item_count -1)
        const id=item.id
          const num =parseInt(1)
        onUpdatePre(id,upQtn,token)
      if(item.item_count===1){
        onDeletePre(id,token)
      }else{
        onUpdatePre(id,upQtn,token)
      }
      }

   
    useEffect(()=>{
    
        allPreProducts(token)
  
    },[])

    const placePreOrder=(event)=>{
        event.preventDefault()
       const preOrderSend={
            owner:userInfo.id,
          
            ts_delivery:moment().toISOString(),
            time_slot:0,
            // payment_method: orderInformation.paymentMethod,
            recipient_phone: userInfo.phone,
          recipient_address: userAddress[0].address,
          recipient_point: `{"lat":${userAddress[0].location.lat},"lng":${userAddress[0].location.lng}}`
          }

       axios.post('order/pre/order/',preOrderSend,{
           headers:{
            Authorization: `JWT ${token}`,
           }
       })
       .then(response=>{
        axios.post('billing/ssl/payment/order/create/',
            {
                amount: response.data.final_bill,
                preorder: response.data.id,
                  }, {
                    headers:{
                      Authorization: `JWT ${token}`,
                    }
                  }
        )
        .then(res=>{
            window.location.replace(res.data.GatewayPageURL)
        })
        .catch(err=>{
            console.log(err)
        })
       })   
    }
    
    return ( <div className="row">
             
        

     <div className="col-md-10 col-sm-10 col-12  my-4 mx-auto">
    {preProducts.length>0 && preProducts.map((item, index)=>(
            <div  className="cart-product mx-auto col-md-10">
                <div  className="">
                <img  className="img-fluid" src={item.prod_image_list[0].thumbnail_image_url} alt="" />
                </div>
                <div  className="quantity">
                  <p  className="cart-product-title">{item.description}</p>
                  <p  className="sell-price">{item.prod_inventory_list[0].unit_price}</p>
      
                
                  <div  className="quantity-group">
                  <ButtonQuantity addClicked={()=>onPreHandler(item)} subClicked={()=>subPreHandler(item)} >
                  <div  className="show-quantity">
                      <h6>{item.item_count}</h6>
                    </div>
                  </ButtonQuantity>
                  </div>
                </div>
                <div  className="cart-price">
                  <div  className="total-price">
                    <p>{item.prod_inventory_list[0].unit_price_final*item.item_count}</p>
                    <p  className="regular-price">{item.prod_inventory_list[0].unit_price*item.item_count}</p>
                  </div>
                  <div  className="delete-cart">
                  <a onClick={()=>onPreDeleteHandler(item)}><i  className="fa fa-trash-o" /></a>
                  </div>
                </div>
                <div>
                
                </div>
                
              </div>
            ))}

     <div className="delivery-address mt-4">
                  <h6>Delivery Address <span className="addresschange-link ml-4"><a href="#">Change Address</a></span></h6>
                  <div className="address mt-3">
                    <div className="address-icon mr-3">
                      <i className="fa fa-map-marker" aria-hidden="true" />
                    </div>
                    <div className="address-right">
                      <h6>Home</h6>
                      <p>Dhaka Bangladesh</p>
                    </div>
                  </div>
                </div>
                <div className="order-price-container">
                  <p>Subtotal <span className="float-right">BDT {preProducts.length>0? preProducts.map(cart=>cart.prod_inventory_list[0].unit_price_final*cart.item_count).reduce(reducer):0}</span></p>
                  <p>Delivery Charge <span className="float-right">BDT 49</span></p>
                  <h6>Total <span className="float-right">BDT {preProducts.length>0? preProducts.map(cart=>cart.prod_inventory_list[0].unit_price_final*cart.item_count).reduce(reducer)+49:0}</span></h6>
                </div>
           
                <div className="order-note-container mt-3">
                  <h6>Additional Note</h6>
                  <form action className="mt-2">
                    <div className="form-group">
                      <textarea name className="form-control mb-5" id rows={5} placeholder="Write Your Message here" defaultValue={""} />
                    </div>
                    <button onClick={placePreOrder}  className="btn w-50 mx-auto d-flex justify-content-center btn-primary">Place Order (ট{preProducts.length>0? preProducts.map(cart=>cart.prod_inventory_list[0].unit_price_final*cart.item_count).reduce(reducer):0})</button>
                  </form>
                </div>
    </div>
    </div>
     );
}
 
export default PreOrderCheckout;