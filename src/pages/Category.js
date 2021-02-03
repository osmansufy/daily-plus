import { useEffect ,useState} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import SinglePopuler from '../component/SinglePopuler'
import * as productActions from '../store/actions/actionProducts'
import axios from '../axios'
import  Spinner from '../container/Spinner/Spinner'
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useHistory } from "react-router";
const CategoryPage = (props) => {
   


     const [onCatProducts,setOnCatProducts]=useState([])
     const [loading ,setLoading]=useState(false) 
  
     const productId = props.match.params.id;
     
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
    lazyLoad: true,
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
         
          centerMode: false,
          autoplay:true,
        }
      }
    ]
  };
    useEffect(()=>{
      setLoading(true)
      axios.get('catalogue/product/public/?category='+productId)
       .then(response=>{
        setOnCatProducts(response.data)
        setLoading(false)
       }).catch(error=>{
        setLoading(false)
       })
      }
      ,[productId])


console.log('onCatProducts',onCatProducts)
    return (
  <div className="custom_page">
    <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12">
              <h2 className="section-title">{props.match.params.name}</h2>
            </div>
          </div>
          <div className="row">
            {loading ? <Spinner /> : onCatProducts.length>0 &&  onCatProducts.map((item,index) =>(
    <SinglePopuler
  //  clicked={()=>productHandler(item)}
  containerClass="mt-4 col-md-2 col-sm-3 col-12"
    data={item} key={index}/>
 ))}
           
         
           </div>
        
        </div>
      </section>
     
      </div>
       );
}


 
 
  
export default CategoryPage;