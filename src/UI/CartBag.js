import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bagWhite from '../assets/img/bag_white.png'
import {cartAction} from '../store/actions/actionCart'
import {Button,Badge} from 'react-bootstrap'
const CartBag = (props) => {

   const carts= useSelector(state=>state.carts.cartProducts)
   const price= useSelector(state=>state.carts.totalPrice)
   const dispatch=useDispatch()
//    useEffect(()=>{
//        dispatch(carts)
//    },dispatch)




    
    return ( <div onClick={props.clicked} className="floting-cart">
    <div  className="floting-cart-top">
   <div><small className="mt-1">ট</small> {price} </div>
    <a className="bg-none border-0">
<img src={bagWhite} /><Badge className="rounded-circle" variant="light">{carts.length}</Badge>
  <span className="sr-only">product cart</span>
</a>
    </div>


  </div> );
}
 
export default CartBag;