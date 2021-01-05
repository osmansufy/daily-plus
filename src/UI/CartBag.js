import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {cartAction} from '../store/actions/actionCart'
const CartBag = (props) => {

   const carts= useSelector(state=>state.carts.cartProducts)
   const price= useSelector(state=>state.carts.totalPrice)
   const dispatch=useDispatch()
//    useEffect(()=>{
//        dispatch(carts)
//    },dispatch)




    
    return ( <div onClick={props.clicked} class="floting-cart">
    <div  class="floting-cart-top">
      <i class="fa fa-shopping-bag pr-2" />
      <p>{carts.length}</p>
    </div>
<button class="btn">{price}</button>
  </div> );
}
 
export default CartBag;