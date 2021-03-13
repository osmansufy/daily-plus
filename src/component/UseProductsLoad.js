import { useEffect, useState } from 'react'
import axios from '../axios'

export default function useProductsLoad(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(false)

//   useEffect(() => {
//     setProducts([])
//   }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'catalogue/category/paginated/',
      params: { offset: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {
    //     setProducts(prevProducts => {
    //     return [...new Set([...prevProducts, ...res?.data?.results])]
    //   })
    setProducts(response.data.results)
      setHasMore(response.data.next )
      setLoading(false)
    console.log("custom",response.data.results)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
      console.log(e)
    })
    return () => cancel() 
  }, [pageNumber])

  return { loading, error, products, hasMore }
}
