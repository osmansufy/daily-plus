import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import ButtonQuantity from '../../UI/Button/ButtonQtn';
import * as cartActions from '../../store/actions/actionCart'
import * as authAction from '../../store/actions/actionAuth'
import axios from '../../axios' 
import { useEffect, useState } from 'react';
const PreOrderCheckout = () => {




    
    // const history=useHistory()
    // const dispatch =useDispatch()
    // const preProducts=useSelector(state=>state.carts.cartPreOrders)
    const token=useSelector(state=>state.auth.accessToken)
    // const userInfo=useSelector(state=>state.auth.userdetails)
    // const CartChange=(token)=>dispatch(authAction.onCartChange(token))
    // const onUpdatePre=(id, unit_quantity)=>dispatch(cartActions.updatePreCartUnits(id,unit_quantity))
    // const onDeletePre=(id, unit_quantity)=>dispatch(cartActions.deletePreCartProduct(id,unit_quantity))
    // const [proceedTo,setProceedTo]=useState()
    useEffect(()=>{
    
axios.get('order/preorder/items/',{
  headers: `JWT ${token}`
})
.then(response=>{
  console.log(response)
})
.catch(error=>{
  console.log(error.message)
})
  
    })
    // const onPreDeleteHandler=(item)=>{
    //     onDeletePre({id:item.id,unit_quantity:0})
    // }
    // const onPreHandler =(item)=>{
    //     console.log(item)
    //     const num =parseInt(1)
    //     onUpdatePre({id:item.id, unit_quantity:parseInt(item.unit_quantity +1)})
    //   }

    //   const subPreHandler =(item)=>{
    //     console.log(item)
    //     const num =parseInt(1)
    
    // if(item.unit_quantity===1){
    //     onDeletePre({id:item.id,unit_quantity:0})
    // }else{
    //   onUpdatePre({id:item.id, unit_quantity: item.unit_quantity -parseInt(num)})
    // }
    //   }



    // const preOrderCreate=()=>{
     
    // }  
    // const onProceed=()=>{
    //   const orderPre=[]

    //   preProducts.map(pre=>{
    //     orderPre.push({
    //       owner:userInfo.id,
    //       product:pre.id,
    //       item_count: pre.unit_quantity,
    //       unit_price: pre.inventory_list[0].unit_price_final,
    //       item_tax: pre.inventory_list[0].tax,
    //       item_discount:pre.inventory_list[0].discount
    //     })
    //   })
    
      

    //   axios.post('order/preorder/items/',orderPre,{
    //     headers:{
    //       Authorization: `JWT ${token}`,
    //     }
    //   })
    //   .then(response=>{
    //     console.log(response)
    //   })
    //   .catch(error=>{
    //     console.log(error.message)
    //   })
    //   setProceedTo("proceed")
    // }
    //   const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return ( 
      //   <div className="row">
             
        

      //   <div className="col-md-10 col-sm-10 col-12  my-4 mx-auto">
      //   {preProducts.map((item, index)=>(
      // <div  className="cart-product col-md-12">
      //     <div  className="">
      //     <img  className="img-fluid" src={item.prod_image_list[0].thumbnail_image_url} alt="" />
      //     </div>
      //     <div  className="quantity">
      //       <p  className="cart-product-title">{item.description}</p>
      //       <p  className="sell-price">{item.prod_inventory_list[0].unit_price}</p>

          
      //       <div  className="quantity-group">
      //       <ButtonQuantity subClicked={() =>subPreHandler(item)} addClicked={() =>onPreHandler(item)} >
      //       <div  className="show-quantity">
      //           <h6>{item.unit_quantity}</h6>
      //         </div>
      //       </ButtonQuantity>
      //       </div>
      //     </div>
      //     <div  className="cart-price">
      //       <div  className="total-price">
      //         <p>{item.inventory_list[0].unit_price_final*item.unit_quantity}</p>
      //         <p  className="regular-price">{item.inventory_list[0].unit_price*item.unit_quantity}</p>
      //       </div>
      //       <div  className="delete-cart">
      //       <a  onClick={()=>onPreDeleteHandler(item)}><i  className="fa fa-trash-o" /></a>
      //       </div>
      //     </div>
      //     <div>
          
      //     </div>
          
      //   </div>
      // ))}

      // { proceedTo=="proceed" ? <>
      
      //        <div className="delivery-address mt-4">
      //           <h6>Delivery Address <span className="addresschange-link ml-4"><a href="#">Change Address</a></span></h6>
      //           <div className="address mt-3">
      //             <div className="address-icon mr-3">
      //               <i className="fa fa-map-marker" aria-hidden="true" />
      //             </div>
      //             <div className="address-right">
      //               <h6>Home</h6>
      //               <p>Dhaka Bangladesh</p>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="order-price-container">
      //           <p>Subtotal <span className="float-right">BDT {preProducts.length>0? preProducts.map(cart=>cart.inventory_list[0].unit_price_final*cart.unit_quantity).reduce(reducer):0}</span></p>
      //           <p>Delivery Charge <span className="float-right">BDT 49</span></p>
      //           <h6>Total <span className="float-right">BDT {preProducts.length>0? preProducts.map(cart=>cart.inventory_list[0].unit_price_final*cart.unit_quantity).reduce(reducer)+49:0}</span></h6>
      //         </div>
           
      //         <div className="order-note-container mt-3">
      //           <h6>Additional Note</h6>
      //           <form action className="mt-2">
      //             <div className="form-group">
      //               <textarea name className="form-control mb-5" id rows={5} placeholder="Write Your Message here" defaultValue={""} />
      //             </div>
      //             <button onClick={preOrderCreate} className="btn w-50 mx-auto d-flex justify-content-center btn-primary">Place Order (ট{preProducts.length>0? preProducts.map(cart=>cart.inventory_list[0].unit_price_final*cart.unit_quantity).reduce(reducer):0}9)</button>
      //           </form>
      //         </div>
      //         </>
      //         :<a className="btn w-50 mx-auto my-4 d-flex justify-content-center btn-primary" onClick={onProceed}>Proceed (ট{preProducts.length>0? preProducts.map(cart=>cart.inventory_list[0].unit_price_final*cart.unit_quantity).reduce(reducer):0}) </a>


      // }
            
      //       </div>
       
      //       </div>  
<h2>all Is ok</h2>
     );
}
 
export default PreOrderCheckout;