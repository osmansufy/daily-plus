import React, { useEffect, useState ,Suspense} from 'react'




import Banner from '../container/Banner';
// import PopulerProducts from '../container/PopulerProducts';
import PreOrders from '../container/PreOrder'
import Spinner from '../container/Spinner/Spinner'


const Category = React.lazy(() => import('../container/Category'));
const PopulerProducts = React.lazy(() => import('../container/PopulerProducts'));
// const PreOrders = React.lazy(() => import('../container/PreOrder'));
function Home(props){
console.log(props)
    return(<>


          {<Banner />}
     
         {<Suspense fallback={<Spinner />}><Category/></Suspense>}
         
         {<Suspense fallback={<h5>Loading...</h5>}><PopulerProducts /></Suspense>}
         {/* {<Suspense fallback={<Spinner />}> */}
               <PreOrders />
               {/* </Suspense>} */}
         
         
      </>
        
        
      );
}

export default Home