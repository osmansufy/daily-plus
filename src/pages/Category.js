import { useEffect ,useState} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import SinglePopuler from '../component/SinglePopuler'
import * as productActions from '../store/actions/actionProducts'
import ProductModal from '../component/ProductModal'
import  Spinner from '../container/Spinner/Spinner'
import { useHistory } from "react-router";
const CategoryPage = (props) => {
    console.log(props.match.params.id)

    const dispatch=useDispatch()
    const [modShow, setModShow] = useState(false);
    const catloading=useSelector(state=>state.products.catloading)
    const catProductLists=useSelector(state=>state.products.CatProducts)
    const error=useSelector(state=>state.products.error)
    const onCatProduct=(id)=>dispatch(productActions.initFetchCatProducts(id))
    const onProductDetails=(details)=>dispatch(productActions.productDetails(details))
    const productHandler=(item)=>{
 
      props.onProductDetails(item)
      setModShow(true)
     }
     const modClosedHandler=()=>{
      setModShow(false)
      onProductDetails([])
     }
     const productId = props.match.params.id;
    useEffect(()=>{
      onCatProduct(productId)},[productId])


let catProducts=<Spinner />
if(!catloading && catProductLists && error==null){
catProducts=  catProductLists.map((item,index) =>(
    <SinglePopuler
   clicked={()=>productHandler(item)}
    data={item} key={index}/>
 ))
}
    return (
  <div className="custom_page">
    <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12">
              <h2>{props.match.params.name}</h2>
            </div>
          </div>
          <div className="row">
            {catloading && error==null ? <Spinner />: !catloading && catProductLists && error==null ? catProductLists.map((item,index) =>(
    <SinglePopuler
   clicked={()=>productHandler(item)}
    data={item} key={index}/>
 )) :  <h2>{error}</h2>}
           
         
          </div>
        </div>
      </section>
      <ProductModal onHide={modClosedHandler} show={modShow} />
      </div>
       );
}


 
 
  
export default CategoryPage;