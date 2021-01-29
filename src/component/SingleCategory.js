import React, { lazy } from 'react';
import emptyImg from '../assets/img/emptyImg.png'
import CategoryPage from '../pages/Category';
import * as productActions from '../store/actions/actionProducts'
import { Link,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
function SingleCategory(props) {

//  const onCategoryHandler=(id)=>{
// // props.onCatProduct(name)
// this.props.history.push('/category'+id)
// }
    return (
        
             <div className="mt-2 ">
               <Link to={"/category/"+props.data.id+"/"+props.data.name} >
               <div className="card border-0 category-card">
                 <div className="category_img">
                 <img loading={lazy} width="97" height="103" data-srcset={emptyImg} data-src={emptyImg} src={props.data.image} alt="" />
                 </div>
                      
                      <h6>{props.data.name}</h6>
                    </div>
                   
               </Link >
                
                </div>
        
    );
}

const mapDispatchToProps=dispatch=>{
  return{
    
    onCatProduct:()=>dispatch(productActions.initFetchCatProducts())
  }
}

export default connect(null,mapDispatchToProps) (withRouter(SingleCategory));