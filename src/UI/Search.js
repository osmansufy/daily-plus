import { useEffect, useRef, useState } from "react";
import Axios from 'axios';
const Search = (props) => {
const [searchEnter,setSearchEnter]=useState('')
const [searchResult,setsearchResult]=useState([])
const inputRef=useRef()
  console.log(searchResult)
  console.log(searchEnter)

  const getPreOrders=()=>{
    if (searchEnter!=='') {
      
    
    const timer=  setTimeout(()=>{ 
        if (searchEnter===inputRef.current.value) {
            const query=searchEnter.length ===0?'':`?token=${searchEnter}`
           
            Axios.get('https://api.dailyplus.store/v0/catalogue/product/public/'+query)
            .then(response=>{
                setsearchResult(response.data)
            }) 
        }  
        },200)
      
        return ()=>{
            clearTimeout(timer)
        }
      }
  }
  useEffect(()=>{
getPreOrders()
  },[searchEnter,inputRef])

  let products=""
  if (searchEnter.length>0) {
      products=<div className="search-container" id="searchContainer">
 
      <div className="search-result" id="searchResult">
        <h6>Search Result </h6>
        
       
        <ul>
            {searchResult.map(product=>(
     <li>
     <div className="search-result-list">
       <div className="search-result-list-img mr-2">
         <img src={ product.image_list[0] && product.image_list[0].thumbnail_image_url} alt="" />
       </div>
       <div className="search-result-list-detail">
         <button className="btn recommended-btn mb-2">Recommended</button>
            <h6>{product && product.name}</h6>
         <p className="regular-price">800</p>
         <div className="sell-price">900</div>
       </div>
       <div className="search-result-list-btns">
       
         <div className="search-result-list-btn-cart">
           <i className="fa fa-heart-o mr-2" />
           <button className="btn btn-primary"><i className="fa fa-shopping-bag mr-2" />Add</button>
         </div>
       </div>
     </div>
     <hr />
    </li>
            ))}
         
          
        </ul>
      </div>
      {/* Search End */}
    </div>
  }
    return ( <div className={props.show? "search show" : "search"}>
    <span onClick={props.closed} className="search-close">×</span>
    <div className="input-group md-form form-sm form-2 pl-0">
      <input className="form-control my-0 py-1 red-border" 
      ref={inputRef}
      value={searchEnter}
      onChange={(event)=>setSearchEnter(event.target.value)}
      type="text" placeholder="Search Products (examples: Egg, Rice etc.)" />
      <span className="custom-serach" id="basic-text1"><i className="fa fa-search text-grey" aria-hidden="true" /></span>
      <div className="input-group-append">
      </div>
      
    </div>
    {/* Search Result */}
{products }

  </div>  );
}
 
export default Search;