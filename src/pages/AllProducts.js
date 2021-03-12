import React, { useEffect, useState } from 'react';
import axios from '../axios'
import SinglePopuler from '../component/SinglePopuler';
import Spinner from '../container/Spinner/Spinner';
const AllProducts = () => {
    const [allProducts,setAllProducts]=useState([])
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
axios.get('catalogue/product/public/')
.then(res=>{
    console.log(res.data);
    setAllProducts(res.data)
    setLoading(false)
})
.catch((err)=>{
    console.log(err);
    setLoading(false)
})
    },[])
    return (
        <div className="container mt-5">
            <h2>All Products</h2>
            <div className="row">
                {loading ? (
                  <Spinner />
                ) : (
                    allProducts.length > 0 &&
                  allProducts.map((item, index) => (
                    <SinglePopuler
                      //  clicked={()=>productHandler(item)}
                      containerClass="mt-4 col-md-3 col-6"
                      data={item}
                      key={item.id}
                    />
                  ))
                )}
              </div>
        </div>
    );
};

export default AllProducts;