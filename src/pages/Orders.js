import { useEffect, useState } from 'react';
import {Tab,Row,Col,Nav,Modal,Container} from 'react-bootstrap'
import emptyImg from '../assets/img/empty.png'
import cartIcon from '../assets/img/cart.png'
import moment from 'moment'
import axios from '../axios'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router';
import Spinner from '../container/Spinner/Spinner';
const Orders = () => {
    const usersToken=useSelector(state=>state.auth.accessToken)
    const [loading,setLoading]=useState(false)
    const [allOrder,setAllOrder]=useState([])
    useEffect(()=>{
      setLoading(true)
        axios.get('order/order/customer/',{
            headers: {
                Authorization: `JWT ${usersToken}`,
              },
         })
         .then(response=>{
             console.log(response)
             setAllOrder(response.data)
             setLoading(false)
         })
         .catch(error=>{
          setLoading(false)
             console.log(error)
         })
    },[])
    // useEffect(()=>{
    //   const userModal=document.querySelector('.userModal')
    //  userModal.style.display='none'
    // },[])

    let history = useHistory();
let contentOngoing=""
if (loading) {
  contentOngoing=<Spinner />
}else if(!loading && allOrder.length >0){
  contentOngoing= allOrder.filter(order=>order.status==1).map(order=>{
    return <a onClick={()=>onOrdeInfo(order.id)}>    <div className="row order-info">
    <div className="info-left">
        
        <img src={cartIcon}/>
          <div className="oInfo">
              <h4>
{order.order_identifier}
              </h4>
              <h5>Pending</h5>
              <h5>{moment(order.ts_delivery).utc().format('MMM DD.YYYY')}</h5>
          </div>
          </div>  
          <span>ট{order.final_bill} </span></div> 
          </a>
  })
  
  
}else{
  contentOngoing=(<div className="row ongoing justify-content-center"><img src={emptyImg} />
  <p>There is no ongoing order right now. You can order from home</p>
  </div>)
}
let containerCencel=""

if (loading) {
  containerCencel=<Spinner />
}else if(!loading){
containerCencel= allOrder.length >0 ? allOrder.filter(order=>order.status!=1).map(order=>{
  return     <a onClick={()=>onOrdeInfo(order.id)}>  
               <div className="row order-info">
           
                <div className="info-left">
  
                    <img src={cartIcon}/>
                    <div className="oInfo">
                      <h4>
                          {order.order_identifier}
                      </h4>
                    <h5 className="text-danger" >Cancelled</h5>
                    <h5 className="text-muted">{moment(order.ts_delivery).utc().format('MMM DD.YYYY')}</h5>
                    </div>
                </div>  
              <span>ট{order.final_bill} </span>
            
            </div>
          </a>
  
}):   <div className="row ongoing justify-content-center"><img src={emptyImg} />
<p>There is no ongoing order right now. You can order from home</p>

</div>
}
    const onOrdeInfo = (id) => {
       history.push({
           pathname: '/order/info',
          //  search: `?id=${id}`,
           state: { id: id}
       });
    };
    return (<section className="custom_page order">
         <Container> 
    <Modal.Dialog className="mx-auto my-0 " contentClassName="pt-5">
    
    <Modal.Body >
     <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={12}>
      <Nav  className="">
        <Nav.Item>
          <Nav.Link eventKey="first">Ongoing</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">History</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={12}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
       
        {contentOngoing}
        </Tab.Pane>
        <Tab.Pane eventKey="second">

        {containerCencel}
      
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
</Modal.Body>
</Modal.Dialog>
</Container>
    </section> );
}
 
export default Orders;