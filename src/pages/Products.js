import axios from '../axios';
import React, { useState, useRef, useCallback, useEffect } from 'react'
import SinglePopuler from '../component/SinglePopuler'
import { Spinner } from 'react-bootstrap';


export default function Products() {

  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [allproducts, setAllProducts] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    axios.get(`catalogue/product/public/paginated/?offset=${pageNumber}&limit=12`).then(response => {
      setAllProducts([...allproducts,...response?.data?.results])
      setHasMore(response.data.next)
      setLoading(false)
    console.log("custom",response.data)
    }).catch(e => {
      setError(true)
      console.log(e)
      setLoading(false)
    })

  }, [pageNumber])

  console.log('products',allproducts)
  const observer = useRef()
  const lastProductElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries?.[0].isIntersecting) {
        setPageNumber(pageNumber + 12)
        console.log("pageNumber",node)

      }
    })
    if (node) observer.current.observe(node)
    console.log("node",node)

  }, [loading, hasMore])

console.log('products',pageNumber)

  return (
    <div className="container mt-5">
     <h3 className="section-title">All Products</h3>
<div className="row">
      { allproducts && allproducts.map((product, index) => {
        if (allproducts.length === index + 1) {
            // return <div ref={lastProductElementRef} key={product.id}>{product.name}</div>
            return   <div 
            className="col-md-3 col-6"  
             ref={lastProductElementRef}
            key={product.id}
            >

              <SinglePopuler
                containerClass="mx-1 mt-4"
         
                   data={product} 
                   ></SinglePopuler>
          </div>  
        } else {
            // return <div  key={product.id}>{product.name}</div>
            return <div    
            key={product.id}
            className="col-md-3 col-6" 
            >

              <SinglePopuler
                containerClass="mx-1 mt-4"
            
           
                   data={product} 
                   ></SinglePopuler>
          </div>  
        }
      })}
     </div>
      <div>{loading && 
      <div className="d-flex my-4 justify-content-between"> 
     <Spinner animation="grow" variant="primary" />
  <Spinner animation="grow" variant="secondary" />
  <Spinner animation="grow" variant="success" />
  <Spinner animation="grow" variant="danger" />
  <Spinner animation="grow" variant="warning" />
      </div>
     
      
      }</div>
      <div>{error && 'Error'}</div>
      </div>
  )
}

