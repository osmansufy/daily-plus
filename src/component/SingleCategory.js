import React from 'react';

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
        
             <div class="col-md-3 col-sm-6 col-12 mt-2">
               <Link to={"/category/"+props.data.id+"/"+props.data.name} >
               <div class="card category-card">
                 <div className="category_img">
                 <img src={props.data.image} alt="" />
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