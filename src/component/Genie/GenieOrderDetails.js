import { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import axios from "../../axios";
import Spinner from "../../container/Spinner/Spinner";
import {Modal,Button,Container} from 'react-bootstrap'
import payImg from '../../assets/img/payment.png'
import moment from 'moment'

const GenieOrderDetails = props => {
  
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

  const token=useSelector(state=>state.auth.accessToken)
  const [orderDetails,setOrderDetails]=useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState()
  const [show, setShow] = useState(false);
  const [preOrderStatus,setPreOrderStatus]=useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const history= useHistory()
  const genieOrderId=history.location.state.id
   useEffect(()=>{
    setLoading(true)
    axios.get(`order/genielist/order/${genieOrderId}/`,{
      headers:{
        Authorization: `JWT ${token}`,
      }
    })
    .then(response=>{
      console.log(response)
     setOrderDetails(response.data)
     setLoading(false)

     statDispatch({type:response.data.status})
 
    })
    .catch(error=>{
      console.log(error)
      setLoading(false)
      setError(error.message)
    })

  },[genieOrderId])


console.log(orderDetails)
  let container=""; 
  if (loading ) {
    container=<Spinner /> 
  }else if( !loading && error) {
    container=<h2 className="text-denger">{error}</h2>
  } 
  if (!loading && orderDetails!=undefined && orderDetails!="" ){
    container= <div className="container">
    <div className="row ">
      <div className="col">
        <h3 className="mb-5">Order #{history.location.state.id}</h3>
      </div>
    </div>
    <div className="row flex-sm-nowrap">
      <div className="col-md-6 col-sm-6 col-12 order-box m-2">
        <h6 className="mb-3">Scheduled</h6>
        <div className="selected-date-container">
          <h6><i className="fa fa-calendar-check-o mr-3" /> Order Created On { orderDetails.ts_created && moment(orderDetails.ts_created).utc().format('MMMM DD . YYYY ')} <span style={{marginLeft: '10px', color: '#F37A20'}}> {orderDetails.ts_created && moment(orderDetails.ts_created).utc().local().format('hh:mm A')}</span></h6>
          <div className="boxed-border-container mt-3">
            <div className="boxed-border1" />
            <div className="boxed-border2" />
            <div className="boxed-border3" />
            <div className="boxed-border4" />
          </div>
        </div>
        <p className="mt-3 mb-3">Your Genie List is {status}</p>
        <button className="btn track-order-btn"> Track Order</button>
        <button className="btn view-all-product-btn">View All Products</button>
        {/* <button className="btn btn-primary add-more-btn">Add More Product</button> */}
        <div className="delivery-address mt-4">
          <h6>Delivery Address</h6>
          <div className="address mt-3">
            <div className="address-icon mr-3">
              <i className="fa fa-map-marker" aria-hidden="true" />
            </div>
            <div className="address-right">
              <h6>Home</h6>
              <p>{orderDetails.recipient_address}</p>
            </div>
          </div>
        </div>
        <div className="payment-method mt-4">
          <h6>Payment Method</h6>
          <div className="confirmed-payment mt-3">
            <img src={payImg} alt="" className="mr-3" />
            <h6>{orderDetails.status==1? "Payment on Delevery" :"Online Payment" } </h6>
            <br />

            
          </div>
       
        </div>
      </div>
      <div className="col-md-6 col-sm-6 col-12 order-box m-2">
        <div className="order-price-container">
          <p>Subtotal <span className="float-right">{orderDetails.total_bill}</span></p>
          <p>Delivery Charge <span className="float-right">BDT {orderDetails.delivery_charge}</span></p>
          <h6>Total <span className="float-right">BDT {orderDetails.final_bill}</span></h6>
          <hr />
          <h6>Paid <span className="float-right">BDT {orderDetails.online_paid_amount}</span></h6>
          <h6 style={{color: '#F37A20'}}>Due <span className="float-right">{orderDetails.final_bill-orderDetails.online_paid_amount}</span></h6>
        </div>
        <div className="order-note-container mt-3">
          <h6 className="mb-3">Additional Note</h6>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consectetur!</p>
          <button className="btn btn-secondary contact-support mt-4"><i className="fa fa-envelope support-btn-icon" />Contact with Support</button>

          
    
          {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

     
        </div>
      </div>
    </div>
  </div>
  }
    return (   <section className="custom_page">
          {container}
        </section>
        

     );
}
 
export default GenieOrderDetails;