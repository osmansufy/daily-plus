import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from '../store/actions/actionProducts'
import * as cartActions from "../store/actions/actionCart";
import Spinner from '../container/Spinner/Spinner'
import axios from '../axios'
import SinglePopuler from "../component/SinglePopuler";
import bagIcon from "../assets/img/bag_white.png";
import tagIcon from "../assets/img/tag.png";
import Slider from "react-slick";
import ButtonQuantity from "../UI/Button/ButtonQtn";
const ProductId = (props) => {

  
   
    const dispatch=useDispatch()
    // const onCatProduct=(id)=>dispatch(productActions.initFetchCatProducts(id))
   const [productInformation,setProductInformation]=useState()
    
  
    
    const [loading,setLoading]=useState(false)
    const [catLoading,setCatloading]=useState(false)
    const error=useSelector(state=>state.products.error)
    const productId = props.match.params.id;
    const [categoriProducts,setCategoriProducts]=useState([])
    const bagLists = useSelector((state) => state.carts.cartProducts);
    const onCartAdd = (item) => dispatch(cartActions.cartAction(item));
  const onCartUpdate = (id, units) =>
    dispatch(cartActions.updateCartUnits(id, units));
  const onCartDel = (id, unit_quantity) =>
    dispatch(cartActions.deleteCartProduct(id, unit_quantity));
    const getCatProducts=(id)=>{
      setCatloading(true)
      axios.get('catalogue/product/public/?category='+id)
       .then(response=>{
        setCategoriProducts(response.data)
        setCatloading(false)
           console.log("catProducts",response)
       }).catch(error=>{
        setCatloading(false)
console.log(error)
       })
    }
    useEffect(()=>{
      setLoading(true)
      axios.get('catalogue/product/public/'+productId+'/')
      .then(response=>{
          console.log(response)
          setLoading(false)
          setProductInformation(response.data)
          getCatProducts(response.data.category)
      }).catch(error=>{
        setLoading(false)
          console.log(error)
      })

    },[productId])
    const isCart = (product) => {
      return product.id === productInformation.id;
    };
    const bagItem = bagLists.find(isCart);
    console.log(productInformation);
    const onCartHandler = (productInformation) => {
      onCartAdd(productInformation);
    };
    const onAddCartHandler = (item) => {
      console.log(item);
  
      onCartUpdate({ id: item.id, count: bagItem.count + 1 });
    };
    const OnSubHandler = (item) => {
      console.log(item);
      if (bagItem.count === 1) {
        onCartDel({ id: item.id, count: 0 });
      } else {
        onCartUpdate({ id: item.id, count: bagItem.count - 1 });
      }
    };
    let cartButton = (
      <a
        id="bag"
        onClick={() => onCartHandler(productInformation)}
        className="btn mb-2 w-50 mx-auto add-to-bag-btn"
      >
        <img src={bagIcon} />
        Add to Bag
      </a>
    );
  
    if (bagItem && bagItem.count >= 1) {
      cartButton = (
        <ButtonQuantity
          id="cart"
          subClicked={() => OnSubHandler(productInformation)}
          addClicked={() => onAddCartHandler(productInformation)}
        >
          <div className="show-quantity">
            <h6 className="m-0">{bagItem && bagItem.count}</h6>
          </div>
        </ButtonQuantity>
      );
    }
    let price=productInformation && productInformation.inventory_list && productInformation.inventory_list[0] && productInformation.inventory_list[0]?.unit_price_final;
    let discount=productInformation && productInformation.inventory_list && productInformation.inventory_list[0] && productInformation?.inventory_list[0]?.discount
    let content=""
    if (loading) {
        content=<Spinner />
    }else if(!loading && error==null && productInformation){
        content=<> <div className="col-md-6 col-sm-6 col-12">
        <div className="single-product-img">
          {<img  src={productInformation.image_list &&productInformation.image_list[0].image_url} alt="true" />}
        </div>
        {/* <div className="gallery-img mt-4">
          <div className="gallery-img-container">
            <img className="img-fluid" src="dist/img/Rectangle2.svg" alt="true" />
          </div>
          <div className="gallery-img-container">
            <img src="dist/img/image 3.jpg" alt="true" />
          </div>
        </div> */}
      </div>
      <div className="col-md-6 col-sm-6 col-12">
        <div className="single-product-product">
          <h3 className="mt-2 mb-2 section-title">{productInformation.name}</h3>
          <div className="price">
          <h6 className="">
                  ৳{price} 
                    <span className="mx-md-3 regular-price">
                       {discount ?`৳${price+discount }`:""  }
                    </span>
                  </h6>
          </div>
         {
         cartButton}
          <hr />
          
          <div className="product-tags my-2">
                  <div className="tag-icon">
                    <img src={tagIcon} />
                  </div>
                  <div className="tags">
                    
                    <a className="btn tag-btn">{productInformation.brand}</a>
                   
                  </div>
                  
                </div>
        
                <div className="product-info">
                  <div className="product-dt">
                    <h5 className="mt-2">Product Details</h5>
                    <p>
                     {productInformation?.description}
                    </p>
                  </div>
                  <div className="product-dt">
                    <h5 className="mt-2 ">Brand</h5>
                    <p>
                     {productInformation?.brand}
                    </p>
                  </div>
                  <div className="product-dt">
                  
                  </div>
                </div>
        </div>
      </div>
</>
    }else if( error!=null && !loading){
        content=<h2>{error}</h2>
    }
    return (  <section className="custom_page">
  <div className="container">
    
          <div className="row">
       {content}
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-12">
              <h4 className="modal-title">Related Items</h4>
            </div>
          </div>
          <div className="row">
          { catLoading ? <Spinner /> : !catLoading && categoriProducts &&  categoriProducts.filter(el=>el.id!=productInformation.id).map((product,index)=>(
             <SinglePopuler
           
             containerClass="mt-4 col-md-3 col-6"
             data={product}
             key={product.id}
           />
       
          )) }  
         </div>
        </div>
    </section>);
}
 
export default ProductId;