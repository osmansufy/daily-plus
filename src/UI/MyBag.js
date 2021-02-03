import React, { useEffect,useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from '../axios'
import * as cartActions from '../store/actions/actionCart'
import ButtonQuantity from './Button/ButtonQtn';
import CommonBtn from './Button/CommonBtn';
import { useHistory, withRouter} from 'react-router-dom'
import  classes from './MyBag.Module.css'
import SuccessModal from './Modal/SuccessModal';
import {Button} from 'react-bootstrap'
import * as actionsCart from "../store/actions/actionCart";
import * as actionsProducts from "../store/actions/actionProducts";
const MyBag=(props)=> {
console.log(props)

  const dispatch=useDispatch()
  const history=useHistory()
  const [smShow, setSmShow] = useState(false);
  const [isError,setIsError]=useState('')
  const onAfterOrderProduct=()=>dispatch(actionsProducts.afterOrderProduct())
  const isSignUp=useSelector(state=>state.auth.accessToken)
  const totalPrice = useSelector((state) => state.carts.totalPrice);
  const userdetails=useSelector(state=>state.auth.userdetails)
  const activeCart=useSelector(state=>state.auth.activeCart)
  const userAddress=useSelector(state=>state.address.userAddress)

  // useEffect(()=>{ 
  //   if (isSignUp) {
  //   axios.get('/order/active_cart/',{
  //    headers: {
  //      Authorization: `JWT ${isSignUp}`,
  //    },
  //  }).then(response=>{
  //    setActiveCart(response.active_cart_id)
  //    console.log(response)
  //  })
  //  .catch(error=>{
  //    console.log(error)
  //  })
  //   }
  //  },[])
  const onAddress=()=>{
    setSmShow(false)
    history.push('/location')
    
   }
 const orderCheckoutHandler =()=>{
const carts=[]
   props.bagLists.map((item,index)=>{
carts.push({
  cart_id:activeCart,
  product_id:item.id,
  item_count: item.count,
  item_discount:item.inventory_list[0].discount,
  unit_price: item.inventory_list[0].unit_price_final,
  total_price: item.inventory_list[0].unit_price *item.count
})
   })
   console.log(carts)
   
 
   if (isSignUp && props.bagLists.length>0) {
    
   if (userAddress.length==0) {
     console.log(userAddress)
     setSmShow(true)
     setIsError('')
   }else{
    axios.post("/order/active_cart/",carts,{
      headers: {
        Authorization: `JWT ${isSignUp}`,
      },
    })
    .then(response=>{
      console.log(response)
      onAfterOrderProduct()
      props.closed()
      setIsError('')
    })
    .catch(error=>{
      console.log(error)
      setIsError('')
    })
    props.history.push('/checkout')
   }
  
   }else if(isSignUp && props.bagLists.length==0){
    setIsError("Please Add Product in Your Bag")
   }else{
    setIsError("Please SignUp before Order")
     props.history.push('/signup')
   }
   
 }

  console.log(props.bagLists)
  let attachClasses=[classes.cart_holder,classes.close]
  if(props.cartShow){
    attachClasses=[classes.cart_holder,classes.show]
  }
  let overlayClasses=[classes.header_overlay,classes.close]
  if(props.cartShow){
    overlayClasses=[classes.header_overlay,classes.active]
  }
  const onCartHandler =(item)=>{
    console.log(item)
    const num =parseInt(1)
props.onUpdateCartUnits({id:item.id, count:item.count +1})
  }
  const subCartHandler =(item)=>{
    console.log(item)
    const num =parseInt(1)

if(item.count===1){
  props.onDeleteCartProduct({id:item.id,count:0})
}else{
  props.onUpdateCartUnits({id:item.id, count: item.count -1})
}
  }
  const onDeleteHandler = (item)=>{
    console.log(item.id)
    props.onDeleteCartProduct({id:item.id,count:0})
  }
  const onClose=()=>{
    props.closed()
    setIsError('')
  }
    return (<><div id="cart-holder" className="cart-holder"  className={attachClasses.join(' ')}>
        <div  className="cart-header">
          <h6>{props.bagLists.length} Items</h6>
          <button  className="btn btn-secondary" onClick={onClose} id="cartCloseBtn">x Close</button>
        </div>
      {props.bagLists.map((item, index)=>(<div  className="cart-product">
          <div  className="cart-img">
            <img  className="img-fluid" src={item.image_list[0].thumbnail_image_url} alt="true" />
          </div>
          <div  className="quantity">
            <p  className="cart-product-title">{item.description}</p>
            <p  className="sell-price"><small>ট </small> {item.inventory_list[0].unit_price_final}</p>

          
            <div  className="quantity-group">
            <ButtonQuantity subClicked={() =>subCartHandler(item)} addClicked={() =>onCartHandler(item)} >
            <div  className="show-quantity">
                <h6>{item.count}</h6>
              </div>
            </ButtonQuantity>
            </div>
          </div>
          <div  className="cart-price">
            
            <div  className="delete-cart">
              <a  onClick={()=>onDeleteHandler(item)}><i  className="fa fa-trash-o" /></a>
            </div>
          </div>
          <div>
          
          </div>
          
        </div>
      ))}
       <div className="cart_total_price">
             <div className="cart_subtotal">
               <p>
               Subtotal
               </p>
               <span>
               BDT {totalPrice}
               </span>
               </div>
             <div className="delevery_fee">
               <p>
               Delivery Fee
               </p>
               <span>
               49
               </span>
               </div>
             <div className="cart_total">
               <p>
               Total
               </p>
               <span>
               BDT {totalPrice+49}
               </span>
               </div>
               <p className="text-danger">{isError? isError:""}</p>
               <CommonBtn clicked={orderCheckoutHandler} >Proceed  ( <small>ট </small>{totalPrice && totalPrice+49})</CommonBtn>
             </div>
             
        </div>
       
      <div className={overlayClasses.join(' ')} onClick={onClose} >
        </div>
        <SuccessModal show={smShow} hide={() => setSmShow(false)} >You hove to set a Address to  procees Order
      <Button onClick={onAddress}  className="w-100 mt-3 d-flex align-items-center" variant="primary"><i className="fas fa-arrow-left"></i><span className="flex-grow-1"> Add Address </span></Button>
      
      </SuccessModal>
        </>
    );
}
const mapStateToProps=state=>{
  return {
    bagLists:state.carts.cartProducts,
    
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onUpdateCartUnits:(id, unit_quantity)=>dispatch(cartActions.updateCartUnits(id, unit_quantity)),
    onDeleteCartProduct:(id, unit_quantity)=>dispatch(cartActions.deleteCartProduct(id, unit_quantity)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)( withRouter(MyBag));


