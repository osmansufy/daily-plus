import { useEffect ,useState} from "react";
import { connect } from "react-redux";
import SinglePopuler from '../component/SinglePopuler'
import * as productActions from '../store/actions/actionProducts'
import ProductModal from '../component/ProductModal'
import  Spinner from '../container/Spinner/Spinner'
const CategoryPage = (props) => {
    console.log(props.match.params.id)
    const [modShow, setModShow] = useState(false);

    const productHandler=(item)=>{
 
      props.onProductDetails(item)
      setModShow(true)
     }
     const modClosedHandler=()=>{
      setModShow(false)
      props.onProductDetails([])
     }
     const productId = props.match.params.id;
    useEffect(()=>{
      props.onCatProduct(productId)},[productId])
let catProducts=<Spinner />
if(props.catProductLists ){
catProducts=  props.catProductLists.map((item,index) =>(
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
            { catProducts}
           
         
          </div>
        </div>
      </section>
      <ProductModal onHide={modClosedHandler} show={modShow} />
      </div>
       );
}

const mapStateToProps=state=>{
    return{
      
        catProductLists:state.products.CatProducts,
        // catName:state.products.catName,
    }
  }

 
  
  const mapDispatchToProps=dispatch=>{
    return{
      onCatProduct:(id)=>dispatch(productActions.initFetchCatProducts(id)),
      onProductDetails:(details)=>dispatch(productActions.productDetails(details))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps) (CategoryPage);