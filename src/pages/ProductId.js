import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from '../store/actions/actionProducts'
import Spinner from '../container/Spinner/Spinner'
import axios from '../axios'
import SinglePopuler from "../component/SinglePopuler";
import Slider from "react-slick";
const ProductId = (props) => {

  
   
    const dispatch=useDispatch()
    // const onCatProduct=(id)=>dispatch(productActions.initFetchCatProducts(id))
   const [productInformation,setProductInformation]=useState()
    
  
    
    const [loading,setLoading]=useState(false)
    const [catLoading,setCatloading]=useState(false)
    const error=useSelector(state=>state.products.error)
    const productId = props.match.params.id;
    const [categoriProducts,setCategoriProducts]=useState([])

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
  
    const settings = {
      dots: false,
      infinite: true,
      className: "center",
      centerMode: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay:true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            swipeToSlide: true,
            
          }
        }
      ]
    };
 
    let content=""
    if (loading) {
        content=<Spinner />
    }else if(!loading && error==null && productInformation){
        content=<> <div className="col-md-6 col-sm-6 col-12">
        <div className="single-product-img">
          {<img className="img-fluid" src={productInformation.image_list &&productInformation.image_list[0].image_url} alt="" />}
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
          <h3 className="mt-2 mb-2">{productInformation.description}</h3>
          <div className="price">
            <h6 className="sell-price">{productInformation.inventory_list&& productInformation.inventory_list[0].unit_price_final} <span className="regular-price">{productInformation.inventory_list && productInformation.inventory_list[0].unit_price}</span></h6>
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
<a className="btn tag-btn">{productInformation.brand}</a>
            </div>
          </div>
          <div className="product-info">
           <div className="product-dt">

           
            <h5 className="mt-2">Details</h5>
            <p>{productInformation.inventory_list && productInformation.inventory_list[0].unit_price}
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
    }else if( error!=null && !loading){
        content=<h2>{error}</h2>
    }
    return (  <section className="custom_page">
  <div className="container">
          <div className="row">
       {content}
          </div>
          <Slider {...settings}> 
          { catLoading ? <Spinner /> : !catLoading && categoriProducts &&  categoriProducts.filter(el=>el.id!=productInformation.id).map((product,index)=>(
            <SinglePopuler
            
             data={product} key={index}/>
       
          )) }  
          </Slider>
        </div>
    </section>);
}
 
export default ProductId;