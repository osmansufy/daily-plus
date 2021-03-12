import React, { useEffect, useState } from 'react';
import axios from '../axios'
import SingleCategory from '../component/SingleCategory';

import Spinner from '../container/Spinner/Spinner';
const AllCategories = () => {
    const [allCategories,setAllCategories]=useState([])
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
axios.get('catalogue/category/')
.then(res=>{
    console.log(res.data);
    setAllCategories(res.data)
    setLoading(false)
})
.catch((err)=>{
    console.log(err);
    setLoading(false)
})
    },[])
    return (
        <div className="container mt-5">
            <h2>All Categories</h2>
            <div className="row">
                {loading ? (
                  <Spinner />
                ) : (
                    allCategories.length > 0 &&
                  allCategories.map((item, index) => (
                    <SingleCategory
                      //  clicked={()=>productHandler(item)}
                      containerClass="mt-4 col-md-2 col-6"
                      data={item}
                      key={item.id}
                    />
                  ))
                )}
              </div>
        </div>
    );
};

export default AllCategories;