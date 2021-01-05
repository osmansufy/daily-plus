import React, { useEffect, useState } from 'react'


import Category from '../container/Category'
import Banner from '../container/Banner';
import PopulerProducts from '../container/PopulerProducts';
import PreOrders from '../container/PreOrder'
import MyBag from '../UI/MyBag'


function Home(props){
console.log(props)
    return(<>

          
          {<Banner />}
          {/* Cart View */}
        {/* {<MyBag />} */}
          {/* Shop by category section */}
         {<Category/>}
         
         {<PopulerProducts />}
         {<PreOrders />}
         
         
      </>
        
        
      );
}

export default Home