import React, { useEffect } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux'
import './ProductModal.css'
import bagIcon from '../assets/img/bag_white.png'
import tagIcon from '../assets/img/tag.png'
import * as productActions from '../store/actions/actionProducts'
import * as cartActions from '../store/actions/actionCart'
import SinglePopuler from './SinglePopuler'
import ButtonQuantity from '../UI/Button/ButtonQtn'
import {Modal} from 'react-bootstrap'
const Product=props=>{

  // const {details}=props

 const catProductLists=useSelector(state=>state.products.CatProducts)
 const error=useSelector(state=>state.products.error)
 const details=useSelector(state=>state.products.productDetails)
 console.log(details.unit_quantity)
 const catid=details.category
 const dispatch=useDispatch()
 const onCatProduct=(id)=>dispatch(productActions.initFetchCatProducts(id))
 const onCartAdd=(item)=>dispatch(cartActions.cartAction(item))
 const onCartUpdate=(id, units)=>dispatch(cartActions.updateCartUnits(id, units))
 const onCartDel=(id, unit_quantity)=>dispatch(cartActions.deleteCartProduct(id, unit_quantity))
 useEffect(()=>{
  if(catid){
    onCatProduct(catid)
  }
  
},[catid])
 const onCartHandler=(item)=>{
  item.unit_quantity=1
  onCartAdd(item)
  props.onHide()
}
const onAddCartHandler =(item)=>{
  console.log(item)
  
  onCartUpdate({id:item.id, unit_quantity:parseInt(item.unit_quantity +1)})
  props.onHide()
}
const OnSubHandler =(item)=>{
  console.log(item)

  if(item.unit_quantity===1){
    onCartDel({id:item.id,unit_quantity:0})
  }else{
    onCartUpdate({id:item.id, unit_quantity: item.unit_quantity -1})
  }
  props.onHide()
}
  

  
 let cartButton=<a id="bag" onClick={()=>onCartHandler(details)} class="btn add-to-bag-btn">

<img src={bagIcon} />
 Add to Bag</a>

 if (details.unit_quantity>=1) {
   cartButton=<ButtonQuantity id="cart" subClicked={() =>OnSubHandler(details)} addClicked={() =>onAddCartHandler(details) } >
   <div  className="show-quantity">
<h6>{details.unit_quantity}</h6>
</div>
     </ButtonQuantity>
 }

  console.log(error)
 
 
 
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="product-modal"
  
  >
  
  {/* <div className={attachClasses.join(' ')} > */}
 
   
      <Modal.Header>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span onClick={props.onHide}>×</span>
        </button>
     </Modal.Header>
     <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12">
              <div className="single-product-img">
                {<img className="img-fluid" src={details.image_list &&details.image_list[0].image_url} alt="" />}
              </div>
              <div className="gallery-img mt-4">
                <div className="gallery-img-container">
                  <img className="img-fluid" src="dist/img/Rectangle2.svg" alt="" />
                </div>
                <div className="gallery-img-container">
                  <img src="dist/img/image 3.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-12">
              <div className="single-product-details">
                <h6 className="mt-2 mb-2">{details.description}</h6>
                <div className="price">
                  <h6 className="sell-price">{details.inventory_list&& details.inventory_list[0].unit_price_final} <span className="regular-price">{details.inventory_list && details.inventory_list[0].unit_price}</span></h6>
                </div>
               {
               cartButton}
                <hr />
                <div className="product-tags">
                  <div className="tag-icon">
                    <img src={tagIcon} />
                  </div>
                  <div className="tags">
                    <a className="btn tag-btn" href="category.html">Daily Products</a>
<a className="btn tag-btn" href="category.html">{details.brand}</a>
                  </div>
                </div>
                <div className="product-info">
                 <div className="product-dt">

                 
                  <h5 className="mt-2">Details</h5>
                  <p>{details.inventory_list && details.inventory_list[0].unit_price}
                  Et quidem faciunt, ut summum bonum sit extremum et rationibus conquisitis de voluptate. Sed ut summum bonum sit id,
                  </p>
                  </div>
                 <div className="product-dt">

                 
                  <h5 className="mt-2 ">Ingredients</h5>
                  <p>
                  Et quidem faciunt, ut summum bonum sit extremum et rationibus conquisitis de voluptate. Sed ut summum bonum sit id,
                  </p>
                  </div>
                 <div className="product-dt">

                 
                  <h5 className="mt-2">More Information</h5>
                  <p>
                  Et quidem faciunt, ut summum bonum sit extremum et rationibus conquisitis de voluptate. Sed ut summum bonum sit id,
                  </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        </Modal.Body> 
     <Modal.Footer  className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-12">
              <h4 className="modal-title">Related Items</h4>
            </div>
          </div>
          <div className="row"> 
          {catProductLists && catProductLists.filter(el=>el.id!=details.id).map((product,index)=>(
            <SinglePopuler
            
             data={product} key={index}/>
       
          ))}  
          </div>
        </div>
        </Modal.Footer>

  
{/* </div> */}
{/* <div class={overlayClasses.join(' ')}onClick={props.modalClosed} >
  </div> */}

</Modal>
  )
}




 

export default Product ;