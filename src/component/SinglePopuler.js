import React,{useCallback, useEffect, useState} from 'react';

import { connect, useDispatch } from 'react-redux';
import * as cartActions from '../store/actions/actionCart'
import * as productActions from '../store/actions/actionProducts'
import ButtonQuantity from '../UI/Button/ButtonQtn';
import ProductModal from '../component/ProductModal'
import emptyImg from '../assets/img/emptyImg.png'
const SinglePopuler=props=>{

  
 
  
  const dispatch=useDispatch()
  const onCatProduct=((id)=>dispatch(productActions.initFetchCatProducts(id)))

  const cartHandler=(item)=>{
    props.onCartAction(item)
    
  }
  const addCartHandler =(item)=>{
    console.log(item)
  
props.onUpdateCartUnits({id:item.id, count:bagItem.count+1})
  }
  const [modalShow, setModalShow] = useState(false);
  const productHandler=(item)=>{
    setModalShow(true)
    props.onProductDetails(item)
    
    onCatProduct(item.category)
    
    
  
   }
   const modalClosedHandler=()=>{
    setModalShow(false)
   
   }
  const isCart=(product) =>{
    return product.id === props.data.id;
  }
 const bagItem=props.bagLists.find(isCart)
  // console.log(findProductIndex(props))
  console.log(props.data)
  console.log(props.bagLists.find(isCart))
  const subHandler =(item)=>{
    console.log(item)
    
    if(bagItem.count===1){
   
      props.onDeleteCartProduct({id:item.id,count:0})
      
    }else{
      props.onUpdateCartUnits({id:item.id, count: bagItem.count-1})
      
    }
  }

 let cartButton=<a onClick={()=>cartHandler(props.data)} className="btn w-100 mt-sm-3 d-flex align-items-center add-to-bag-btn">
 {/* <i className="fa fa-shopping-bag"></i> */}
 <svg width={20} height={21} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
   <rect width={20} height={20} transform="translate(0 0.25)" fill="none" />
   <path fillRule="evenodd" clipRule="evenodd" d="M15.42 5.06663L16.664 16.9135C16.6784 17.0507 16.6339 17.1877 16.5414 17.2904C16.4491 17.3929 16.3175 17.4515 16.1794 17.4515H2.98717C2.84918 17.4515 2.71756 17.3929 2.62515 17.2904C2.53287 17.1877 2.48828 17.0507 2.50264 16.9135L3.74669 5.06663C3.77279 4.81862 3.98183 4.6303 4.23122 4.6303H6.56945V4.0972C6.56945 2.43544 7.92151 1.08337 9.58339 1.08337C11.2452 1.08337 12.5972 2.43544 12.5972 4.0972V4.6303H14.9354C15.1848 4.6303 15.3939 4.81862 15.42 5.06663ZM7.83542 4.0972C7.83542 3.13376 8.61981 2.34934 9.58339 2.34934C10.5468 2.34934 11.3312 3.13375 11.3312 4.0972V4.33864H7.83542V4.0972ZM15.3146 16.1855H3.85205L4.93256 5.89627H6.27778V6.67819C6.27778 7.10826 6.62653 7.45701 7.0566 7.45701C7.48667 7.45701 7.83542 7.10826 7.83542 6.67819V5.89627H11.3312V6.67819C11.3312 7.10826 11.68 7.45701 12.1101 7.45701C12.5401 7.45701 12.8889 7.10826 12.8889 6.67819V5.89627H14.2341L15.3146 16.1855Z" fill="#5EC401" />
 </svg>
 <span className="flex-grow-1"> Add to Bag </span></a>

 if (bagItem && bagItem.count>0) {
   cartButton=<ButtonQuantity  subClicked={() =>subHandler(props.data)} addClicked={() =>addCartHandler(props.data) } >
   <div  className="show-quantity">
<h6 className="m-0">{bagItem && bagItem.count}</h6>
</div>
     </ButtonQuantity>
 }
  return (
    <>
        <div className="mx-1 mt-4">
        <div className="product-card">
          <div className="custom-card">
          <a  onClick={()=>productHandler(props.data)}>
          <img src={props.data.image_list[0].thumbnail_image_url ? props.data.image_list[0].thumbnail_image_url : emptyImg} alt="" />
      </a>
      
      
          </div>
    <h6 className=" pro-title">{props.data.name}</h6>
          <div className="price">
            <h6 className="sell-price">{props.data.inventory_list[0].unit_price_final} <span className="regular-price">{props.data?.inventory_list[0]?.discount? props.data?.inventory_list[0]?.unit_price_final+props.data?.inventory_list[0]?.discount:""}</span></h6>
            <div className="sell-icon">
              {props?.data?.is_offer ?  <svg width={24} height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.53759 9.28747C6.55568 10.2695 6.00282 11.6006 6.00001 12.9893C5.9972 14.3781 6.54467 15.7114 7.52259 16.6974C8.62508 14.1474 10.5901 12.0175 13.0425 10.75C10.9257 12.5411 9.49681 15.0119 9.00007 17.7399C10.9501 18.6624 13.35 18.3249 14.9625 16.7124C17.5725 14.1024 18 6.25 18 6.25C18 6.25 10.1476 6.6775 7.53759 9.28747Z" fill="#37474F" fillOpacity="0.54" />
              </svg>:""}
            
             {props.data?.is_fast ?<svg width={24} height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.9916 6.70691C17.1858 6.74626 17.3777 6.79544 17.5646 6.85692C17.5006 6.11179 17.0358 2.31728 14.1684 1.25C13.9865 1.973 13.8881 2.71567 13.8733 3.46326C14.7611 4.32889 15.4521 5.37404 15.8997 6.52985C16.2686 6.55198 16.635 6.611 16.9916 6.70691Z" fill="#37474F" fillOpacity="0.54" />
                <path d="M4.41033 21.7448C4.46443 21.7595 4.50132 21.8087 4.49886 21.8628C4.49886 22.3915 4.91938 22.7998 5.27104 23.0457C5.36941 23.1194 5.47515 23.1834 5.58336 23.2399H12.9732C12.892 22.2833 11.9379 22.1727 11.9084 22.1727H9.6951C9.62624 22.1776 9.56722 22.1284 9.5623 22.0595C9.55738 21.9907 9.60657 21.9317 9.67297 21.9267C10.4574 21.7743 11.5739 21.2431 12.4445 19.5856C12.6043 19.2881 12.7371 18.9757 12.8355 18.6511C13.0937 17.9281 13.015 17.1264 12.6215 16.4649C11.7436 15.0804 9.55001 14.7164 9.53033 14.7164C9.46394 14.7066 9.41721 14.6427 9.42705 14.5763C9.43934 14.5099 9.50082 14.4632 9.56722 14.473C9.66313 14.4877 11.8936 14.8566 12.8281 16.3321C13.256 17.0453 13.347 17.9109 13.074 18.6979C13.1724 19.8217 13.3962 21.13 13.5658 22.035C13.6937 22.7457 14.3183 23.2621 15.0413 23.2498H17.6407C17.3161 22.121 15.8529 22.3325 15.7889 22.3325C15.7299 22.3423 15.6734 22.3055 15.6537 22.2489C15.5873 22.062 14.0675 17.4215 15.6291 16.4059C17.0382 15.4886 16.4406 12.8868 16.4406 12.8622C16.4283 12.8155 16.4455 12.7639 16.4849 12.7344C16.5242 12.7073 16.5783 12.7073 16.6177 12.7344C17.4563 13.1991 19.9351 12.9827 20.9975 11.9376C21.5311 11.4138 21.6024 10.7867 21.2139 10.0489C19.8343 7.4668 16.9792 6.94545 16.9374 6.94545C16.6275 6.8643 16.3127 6.81266 15.9955 6.78807C16.0816 7.02415 16.1529 7.26515 16.207 7.51106C16.2193 7.57746 16.175 7.6414 16.1086 7.6537H16.1062C16.0398 7.66599 15.9783 7.62173 15.966 7.55779C15.9537 7.49877 14.793 1.81562 8.24664 1.3828C9.16146 4.28217 11.3673 6.59379 14.22 7.64386C14.2888 7.65616 14.3331 7.72009 14.3233 7.78649C14.3134 7.85289 14.247 7.90207 14.1782 7.88978C14.1634 7.89224 14.1487 7.89224 14.1339 7.88978C13.8609 7.78649 13.5954 7.67337 13.3494 7.55533C12.7838 8.10373 12.469 8.93247 12.4125 10.0145C12.4149 10.0243 12.5207 11.1138 10.9542 11.3154C10.8485 11.3277 10.6935 11.3425 10.5017 11.3572C8.81471 11.4949 3.72668 11.9179 2.32003 15.8206H2.30036C2.30282 15.8378 2.30282 15.8575 2.30036 15.8747C2.18969 16.2879 2.10608 16.7108 2.05444 17.1363C1.5872 20.8964 4.27753 21.7276 4.41033 21.7448ZM17.3653 8.93493C17.3653 8.5267 17.6948 8.19717 18.103 8.19717C18.5112 8.19717 18.8408 8.5267 18.8408 8.93493C18.8408 9.34315 18.5112 9.67268 18.103 9.67268C17.6948 9.67268 17.3653 9.34315 17.3653 8.93493Z" fill="#37474F" fillOpacity="0.54" />
                <path d="M18.1028 9.42676C18.3785 9.42676 18.602 9.20325 18.602 8.92755C18.602 8.65184 18.3785 8.42833 18.1028 8.42833C17.8271 8.42833 17.6036 8.65184 17.6036 8.92755C17.6036 9.20325 17.8271 9.42676 18.1028 9.42676Z" fill="#37474F" fillOpacity="0.54" />
              </svg> :"" } 
            </div>
          </div>
          
         {cartButton}

        </div>
      </div>
       <ProductModal  modalClosed={modalClosedHandler}  show={modalShow}
       onHide={() => setModalShow(false)}  />
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
    onCartAction:(item)=>dispatch(cartActions.cartAction(item)),
    onUpdateCartUnits:(id, units)=>dispatch(cartActions.updateCartUnits(id, units)),
    onDeleteCartProduct:(id, unit_quantity)=>dispatch(cartActions.deleteCartProduct(id, unit_quantity)),
    onProductDetails:(details)=>dispatch(productActions.productDetails(details))
     }
}
export default connect(mapStateToProps,mapDispatchToProps) (SinglePopuler)