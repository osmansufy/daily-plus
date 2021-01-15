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




    
    return ( <div onClick={props.clicked} className="floting-cart">
    <div  className="floting-cart-top">
      <i className="fa fa-shopping-bag pr-2" />
      <p>{carts.length}</p>
    </div>
<button className="btn">{price}</button>
  </div> );
}
 
export default CartBag;