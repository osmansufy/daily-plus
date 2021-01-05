import {Nav} from 'react-bootstrap'
import React, { useState,useEffect } from 'react';
import axios from '../axios' 
import moment from 'moment'
import { useSelector ,useDispatch} from 'react-redux';
import { withRouter} from 'react-router-dom'
import * as authAction from '../store/actions/actionAuth'
const CheckOut = props=> {

  const userInfo=useSelector(state=>state.auth.userdetails)
  const token=useSelector(state=>state.auth.accessToken)
  const activeCart=useSelector(state=>state.auth.activeCart)
  const userAddress=useSelector(state=>state.address.userAddress)
  const [orderInformation,setOrderInformation]=useState(
    {
    
      user:userInfo.id,
     lng:userAddress[0].location.lng,
     lat:userAddress[0].location.lat, 
     address:userAddress[0].address,
    deliveryTime:moment().toISOString(),
    paymentMethod:1,
  }
  )
  const dispatch=useDispatch()

  const CartChange=(token)=>dispatch(authAction.onCartChange(token))
//   const [slots,setSlots]=useState([])
//  const getTimeSlots =()=>{
//    const {user,lng,lat}=orderInformation
// const query= `?lat=${lat}&lng=${lng}&user=${user}`
// axios.get("/order/delivery/slots/"+query,{
//   headers: {
//     Authorization: `JWT ${token}`,
//     "Content-Type": "application/json"
//   }
// }).then(response=>{
//   console.log(response)
//   setSlots(response.data.slots)
// })
// .catch(error=>{
//   console.log(error)
// })
//  }

//   useEffect(()=>{
//     getTimeSlots()
//   },[]
// )

  const [onDate,setOnDate]=useState()
  const [onTime,setOnTime]=useState()
  const time1="9:00"
  const time2="12:00"
  const time3="15:00"
  console.log(orderInformation)
  const date=moment()
  let tomorrow  = moment().add(1,'days');
  let tomorrow2  = moment().add(2,'days');
  let tomorrow3  = moment().add(3,'days');
  let tomorrow4  = moment().add(4,'days');
  let tomorrow5  = moment().add(5,'days');
  let tomorrow6  = moment().add(6,'days');
  const dateHandler=(date)=>{
  const newDate=date.toISOString()
  setOnDate(newDate)
  console.log(newDate)
  setOrderInformation({
    ...orderInformation,
    deliveryTime:newDate
  })
    // setTimeout(()=>{console.log(orderInformation)},2000)
  }

  // useEffect(dateHandler(),[orderInformation])
  const timeHandler=(time)=>{
  
setOnTime(time)
  }
const onMethod=(event)=>{
  setOrderInformation({
    ...orderInformation,
    paymentMethod:event.target.value
  })
  console.log(orderInformation)
}
  const onPlaceOrder=(event)=>{

    event.preventDefault()
const orderSend={
  owner:orderInformation.user,
  cart:activeCart,
  ts_delivery:orderInformation.deliveryTime,
  time_slot:3,
  // payment_method: orderInformation.paymentMethod,
  recipient_phone: userInfo.phone,
recipient_address: orderInformation.address,
recipient_point: `{"lat":${orderInformation.lat},"lng":${orderInformation.lng}}`
}
axios.post('order/order/customer/',orderSend,{
  headers:{
    Authorization: `JWT ${token}`,
  }
}).then(response=>{
  console.log(response)
  CartChange(token)
if (orderInformation.paymentMethod==2) {
  

    axios.post('billing/ssl/payment/order/create/',
    {
  amount: response.data.final_bill,
  order: response.data.id,
    },
    {
      headers:{
        Authorization: `JWT ${token}`,
      }
    }
    ).then(res=>{
      console.log(res)
      window.location.replace(res.data.GatewayPageURL)
     
    }).catch(err=>{
      console.log(err)
    })

  }else{
    
  }
 
}).catch(error=>{
  console.log(error)
})
  }
    return ( <section className="custom_page">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="mb-5">Order Confirmation</h3>
             
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12 order-box mr-2">
              <h6 className="mb-3">Expected Date &amp; Time</h6>
              <div className="date-container">
              <Nav variant="pills" defaultActiveKey="link-1">
  <Nav.Item onClick={()=>dateHandler(date)} >
    <Nav.Link eventKey="link-1" ><p>{date.format('ddd')}</p>

<h4>{date.format('DD')}</h4>
<p>{date.format('MMM')}</p>
</Nav.Link>
  </Nav.Item>
  <Nav.Item onClick={()=>dateHandler(tomorrow)} >
    <Nav.Link eventKey="link-2">
<p>{tomorrow.format('ddd')}</p>

<h4>{tomorrow.format('DD')}</h4>
<p>{tomorrow.format('MMM')}</p>
</Nav.Link>
  </Nav.Item>
 
  <Nav.Item onClick={()=>dateHandler(tomorrow2)}>
    <Nav.Link eventKey="link-3" >
    <p>{tomorrow2.format('ddd')}</p>

<h4>{tomorrow2.format('DD')}</h4>
<p>{tomorrow2.format('MMM')}</p>
</Nav.Link>
  </Nav.Item>
  
  <Nav.Item onClick={()=>dateHandler(tomorrow3)}>
    <Nav.Link eventKey="link-4" >
    <p>{tomorrow3.format('ddd')}</p>

<h4>{tomorrow3.format('DD')}</h4>
<p>{tomorrow3.format('MMM')}</p>

    </Nav.Link>
  </Nav.Item>
  <Nav.Item onClick={()=>dateHandler(tomorrow4)}>
    <Nav.Link eventKey="link-5" >
    <p>{tomorrow4.format('ddd')}</p>

<h4>{tomorrow4.format('DD')}</h4>
<p>{tomorrow4.format('MMM')}</p>

    </Nav.Link>
  </Nav.Item>
  <Nav.Item onClick={()=>dateHandler(tomorrow5)}>
    <Nav.Link eventKey="link-6" >
    <p>{tomorrow5.format('ddd')}</p>

<h4>{tomorrow5.format('DD')}</h4>
<p>{tomorrow5.format('MMM')}</p>

    </Nav.Link>
  </Nav.Item>
  <Nav.Item onClick={()=>dateHandler(tomorrow6)}>
    <Nav.Link eventKey="link-7">
    <p>{tomorrow6.format('ddd')}</p>

<h4>{tomorrow6.format('DD')}</h4>
<p>{tomorrow6.format('MMM')}</p>
</Nav.Link>
  </Nav.Item>
</Nav>
                </div>
                <Nav variant="pills" className="flex-lg-nowrap" defaultActiveKey="date-1">
                <Nav.Item className="time-container mt-3" onClick={()=>timeHandler(time1)} >
    <Nav.Link  className="times  mr-3" eventKey="date-1">
    <p>9AM - 12PM</p>
</Nav.Link>
  </Nav.Item>
                <Nav.Item className="time-container mt-3" onClick={()=>timeHandler(time2)} >
    <Nav.Link className="times  mr-3"  eventKey="date-2">
    <p>3 pm - 6PM</p>
</Nav.Link>
  </Nav.Item>
                <Nav.Item className="time-container mt-3" onClick={()=>timeHandler(time3)} >
    <Nav.Link className="times  mr-3" eventKey="date-3">
    <p>3 pm - 6PM</p>
</Nav.Link>
  </Nav.Item>

                </Nav>
            
              <div className="delivery-address mt-4">
                <h6>Delivery Address <span className="addresschange-link ml-4"><a href="#">Change Address</a></span></h6>
                <div className="address mt-3">
                  <div className="address-icon mr-3">
                    <i className="fa fa-map-marker" aria-hidden="true" />
                  </div>
                  <div className="address-right">
                    <h6>{userAddress[0].title}</h6>
                    <p>{userAddress[0].address}</p>
                  </div>
                </div>
              </div>
              <div className="payment-method mt-4">
                <h6>Payment Method</h6>
                <div className="payment-radio-btn mt-3">
                  <div className="online-payment">
                    <div className="radio-btn">
                      <input type="radio" id="onlinePayment" onChange={onMethod} value='2' name="payment" />
                    </div>
                    <div className="radio-btn-label">
                      <label htmlFor="onlinePayment">Online Payment<br /> <span style={{fontSize: '10px', color: '#a3a3a3'}}>Pay with Credit/Debit (Mastercard, Visa etc), Mobile Banking (Bkash, Rocket etc)</span></label>
                    </div>
                  </div>
                  <div className="cash-delivery">
                    <div className="radio-btn">
                      <input type="radio" onChange={onMethod} id="cashOnDelivery" value='1' name="payment" />
                    </div>
                    <div className="radio-btn-label">
                      <label htmlFor="cashOnDelivery">Payment On Delivery</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-12 order-box ml-2">
              <div className="order-price-container">
                <p>Subtotal <span className="float-right">BDT 1,000</span></p>
                <p>Delivery Charge <span className="float-right">BDT 49</span></p>
                <h6>Total <span className="float-right">BDT 1,049</span></h6>
              </div>
              <div className="promo-code-container mt-3">
                <a href><h6><img src="dist/img/default-150x150.png" className="mr-2" alt="" /> Add Promo Code <span className="float-right"><i className="fa fa-angle-right" /></span></h6></a>
                <a href><h6><img src="dist/img/default-150x150.png" className="mr-2" alt="" /><span style={{color: '#5EC401'}}>New100</span> Promo Added <span className="float-right"><i className="fa fa-trash-o" /></span></h6></a>
              </div>
              <div className="order-note-container mt-3">
                <h6>Additional Note</h6>
                <form action className="mt-2">
                  <div className="form-group">
                    <textarea name className="form-control mb-5" id rows={5} placeholder="Write Your Message here" defaultValue={""} />
                  </div>
                  <button className="btn btn-primary" onClick={onPlaceOrder}>Place Order (1,049)</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
       );
}
 
export default withRouter(CheckOut);