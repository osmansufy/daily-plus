import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from '../store/actions/actionProducts'
import Spinner from '../container/Spinner/Spinner'
import axios from '../axios'
import SinglePopuler from "../component/SinglePopuler";

const ProductId = (props) => {

    const[product,setProduct]=useState()
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    // const onCatProduct=(id)=>dispatch(productActions.initFetchCatProducts(id))
    const onProduct=(id)=>dispatch(productActions.onSingleProducFetch(id))
    const productIn=useSelector(state=>state.products.singleProduct)
    const catProductLists=useSelector(state=>state.products.CatProducts)
    const productId = props.match.params.id;
    // let catid=productIn.category
    useEffect(()=>{
        onProduct(productId)
      

    },[productId])

 
    let content=<Spinner />
    if(productIn){
        content=<> <div className="col-md-6 col-sm-6 col-12">
        <div className="single-product-img">
          {<img className="img-fluid" src={productIn.image_list &&productIn.image_list[0].image_url} alt="" />}
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
        <div className="single-product-product">
          <h3 className="mt-2 mb-2">{productIn.description}</h3>
          <div className="price">
            <h6 className="sell-price">{productIn.inventory_list&& productIn.inventory_list[0].unit_price_final} <span className="regular-price">{productIn.inventory_list && productIn.inventory_list[0].unit_price}</span></h6>
          </div>
         {/* {
         cartButton} */}
          <hr />
          <div className="product-tags">
            <div className="tag-icon">
              {/* <img src={tagIcon} /> */}
            </div>
            <div className="tags">
              <a className="btn tag-btn" >Daily Products</a>
<a className="btn tag-btn">{productIn.brand}</a>
            </div>
          </div>
          <div className="product-info">
           <div className="product-dt">

           
            <h5 className="mt-2">Details</h5>
            <p>{productIn.inventory_list && productIn.inventory_list[0].unit_price}
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
</>
    }
    return (  <section className="custom_page">
  <div className="container">
          <div className="row">
       {content}
          </div>
          <div className="row"> 
          {catProductLists && catProductLists.filter(el=>el.id!=productIn.id).map((product,index)=>(
            <SinglePopuler
            
             data={product} key={index}/>
       
          ))}  
          </div>
        </div>
    </section>);
}
 
export default ProductId;