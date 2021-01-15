import { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
import axios from '../../axios'
import Spinner from '../../container/Spinner/Spinner';
import emptyImg from '../../assets/img/empty.png'
import cartIcon from '../../assets/img/cart.png'
import moment from 'moment'
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import {statusOrder} from '../../utility/orderStatus'
const PreHistory = () => {

    const usersToken=useSelector(state=>state.auth.accessToken)
    const [loading,setLoading]=useState(false)
    const [preAllOrder,setPreAllOrder]=useState([])
    const history=useHistory()
     
  const statusReducer=(currStatus,action)=>{
    switch (action.type) {
      case 6 :
        return  "cancelled"
      
      case 5 :
        return  "complete"
      
      case 4 :
        return  "on-the-way"
      
      case 3 :
        return  "processing"
      
      case 2 :
        return  "confirmed"
      case 1 :
        return  "pending"
      
    
      default:
        throw new Error('Should not get there!');
    }
  }

  const [status,statDispatch]=useReducer(statusReducer,"")

    useEffect(()=>{
      setLoading(true)
        axios.get('order/pre/order/',{
            headers: {
                Authorization: `JWT ${usersToken}`,
              },
         })
         .then(response=>{
             console.log(response)
             setPreAllOrder(response.data)
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
 

    let contentPreHistory=""
if (loading) {
  contentPreHistory=<Spinner />
}else if(!loading && preAllOrder.length >0){
  contentPreHistory= preAllOrder.filter(order=>order.status!=1).map(order=>{
    // statDispatch({type:order.status})
    return <a onClick={()=>onPreOrderDetails(order.id)}>    <div className="row order-info">
    <div className="info-left">
        
        <img src={cartIcon}/>
          <div className="oInfo">
              <h4>
{order.order_identifier}
              </h4>
              <h5>{statusOrder(order.status)}</h5>
              <h5>{moment(order.ts_created).utc().format('MMM DD.YYYY')}</h5>
          </div>
          </div>  
          <span>ট{order.total_bill} </span></div> 
          </a>
  })
  
  
}else{
  contentPreHistory=<div className="row ongoing justify-content-center"><img src={emptyImg} />
  <p>There is no ongoing order right now. You can order from home</p>
  </div>
}
    return ( 
        <Container>
<Row>
<div className= "col-md-8 my-5 mx-auto">
{contentPreHistory}
</div>


</Row>
</Container>

     );
}
 
export default PreHistory;