import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from '../../axios'
import Spinner from '../../container/Spinner/Spinner';
import emptyImg from '../../assets/img/empty.png'
import cartIcon from '../../assets/img/cart.png'
import moment from 'moment'
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
const PreOngoing = () => {


    const history=useHistory()
    const usersToken=useSelector(state=>state.auth.accessToken)
    const [loading,setLoading]=useState(false)
    const [preAllOrder,setPreAllOrder]=useState([])
    useEffect(()=>{
      setLoading(true)
        axios.get('order/pre/order/',{
            headers: {
                Authorization: `JWT ${usersToken}`,
              },
         })
         .then(response=>{
             console.log(response)
             setPreAllOrder(response.data.filter(order=>order.status==1))
             setLoading(false)
         })
         .catch(error=>{
             console.log(error)
         })
    },[])

    const onPreOrderDetails=(id)=>{
      history.push({
        pathname: '/order/preorder/info',
       //  search: `?id=${id}`,
        state: { id: id}
    });
    }

    let contentPreOngoing=""
if (loading) {
  contentPreOngoing=<Spinner />
}else if(!loading && preAllOrder.length >0){
  contentPreOngoing= preAllOrder.map(order=>{
    return <a onClick={()=>onPreOrderDetails(order.id)}>    <div className="row order-info">
    <div className="info-left">
        
        <img src={cartIcon}/>
          <div className="oInfo">
              <h4>
{order.order_identifier}
              </h4>
              <h5>Pending</h5>
              <h5>{moment(order.ts_delivery).utc(true).format('MMM DD.YYYY')}</h5>
          </div>
          </div>  
          <span>ট{order.total_bill} </span></div> 
          </a>
  })
  
  
}else if (!loading && preAllOrder.length==0){
  contentPreOngoing=<div className="row ongoing justify-content-center"><img src={emptyImg} />
  <p>There is no ongoing order right now. You can order from home</p>
  </div>
}
console.log(preAllOrder)
    return ( 
        <Container>
<Row>
<div className= "col-md-8 my-5 mx-auto">
{contentPreOngoing}
</div>


</Row>
</Container>

     );
}
 
export default PreOngoing;