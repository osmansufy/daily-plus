import { Nav, Dropdown, Tab, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "../axios";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CheckOut.Module.css";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import * as authAction from "../store/actions/actionAuth";
import * as addressAction from "../store/actions/actionAddress";
import * as actionsCart from "../store/actions/actionCart";
import offerIcon from "../assets/img/offer_24px.png";
import SuccessModal from "../UI/Modal/SuccessModal";
import Spinner from '../container/Spinner/Spinner'
import ErrorToast from "../UI/Toasts/Toast";
import TimeSlots from "../component/OrderCheckout/TimeSlots";
import UserAddress from "../component/OrderCheckout/UserAddress";

const CheckOut = (props) => {
  const token = useSelector((state) => state.auth.accessToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userdetails);
  const activeCart = useSelector((state) => state.auth.activeCart);
  const [loading,setloading]=useState(false)
  const [isError,setIsError]=useState('')
  const [showError, setShowError] = useState(false);
  const currentAddress = useSelector((state) => state.address.addressCurrent);
  const totalPrice = useSelector((state) => state.carts.totalPrice);
  const afterOrderAction = () => dispatch(actionsCart.afterOrder());
  const userAddress = useSelector((state) => state.address.userAddress);
  const [smShow, setSmShow] = useState(false);

  const notificationsCount = (token) => dispatch(authAction.onNotificationsCount(token));

    const onNotificationsAction = (token) =>
  dispatch(authAction.onGetNotifications(token));
  const [information, setInformation] = useState({
    lng: "",
    lat: "",
    address: "",
    title: "",
    deliveryTime: moment().toISOString(),
    paymentMethod: 1,
    slot: 3,
    promoId:''
  });
  const [slots, setSlots] = useState([]);
  const [dates, setDates] = useState([]);
  const [promo,setPromo]=useState('')
  const [discount,setDiscount]=useState(0)
 

  const getTimeSlots = (lat, lng) => {
    const user = userInfo.id;
    const query = `?lat=${lat}&lng=${lng}&user=${user}`;
    axios
      .get("/order/delivery/slots/" + query, {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("slots",response);
        setSlots(response.data.slots);
        setDates(response.data.dates);
      })
      .catch((error) => {
        console.log(error);
      });
  };
const onGetDeleveryLocation=()=>{
  if (currentAddress?.address) {
    return currentAddress
  }
   return userAddress[0]
  
}
  useEffect(() => {
    if (token == null) {
      history.push("/");
    } else {
      setInformation({
        ...information,
        lng: onGetDeleveryLocation()?.location?.lng,
        lat: onGetDeleveryLocation()?.location?.lat,
        address: onGetDeleveryLocation()?.address,
        title: onGetDeleveryLocation()?.title,
      });

      getTimeSlots(onGetDeleveryLocation()?.location?.lng, onGetDeleveryLocation()?.location?.lat);
    }
  }, []);

  const CartChange = (token) => dispatch(authAction.onCartChange(token));
const onDeletePromo=()=>{
  setPromo('')
  setDiscount(0)
  setInformation({
    ...information,
    promoId:""
  })
}
  const onMethod = (event) => {
    setInformation({
      ...information,
      paymentMethod: parseInt(event.target.value) 
    });
    console.log(event.target.value)
  };

  const onAfterOrder = () => {
    setSmShow(false);
    history.push("/");
    afterOrderAction();
    onNotificationsAction(token)
  };

  const onlinePayment=(amount,order)=>{
    axios
    .post(
      "billing/ssl/payment/order/create/",
      {
        amount: amount,
        order: order,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
      window.location.replace(res.data.GatewayPageURL);
      setloading(false)
    })
    .catch((err) => {
      console.log(err);
      setloading(false)
    });
  }

  const onPlaceOrder = (event) => {
    event.preventDefault();
    const orderSend = {
      owner: userInfo.id,
      cart: activeCart,
      promo:information.promoId,
      ts_delivery: information.deliveryTime,
      time_slot: information.slot,
      recipient_phone: userInfo.phone,
      recipient_address: information.address,
      recipient_point: `{"lat":${information.lat},"lng":${information.lng}}`,
    };
    setSmShow(true);
    setloading(true)
    axios
      .post("order/order/customer/", orderSend, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log('orderSend',orderSend);
        CartChange(token);
       
        setIsError("")
        notificationsCount(token)
        if (information.paymentMethod == 2) {
          afterOrderAction();
          onlinePayment(response.data.final_bill,response.data.id)
        } else {
          setloading(false)
        }
      })
      .catch((error) => {
        setloading(false)
        console.log(error);
        CartChange(token);
        setIsError(error.message)
        console.log(orderSend)
      });
  };

  const dateSelected = (date) => {
    setInformation({
      ...information,
      deliveryTime: moment(date).toISOString(),
    });
  };
  const slotSelect = (i) => {
    setInformation({
      ...information,
      slot: i + 1,
    });
  };
const sendError=()=>{
  setShowError(true)
  setTimeout(()=>{
    setShowError(false)
    setIsError('')
  },4000)
  setPromo('')
}
  const onPromoSubmit=()=>{
    const code=promo;
    axios.get(`catalogue/promo/?code=${code}&payment_way=1`,{
      headers: {
        Authorization: `JWT ${token}`,
      }
    })
    .then(response=>{
      setDiscount(response.data.amount)
      setInformation({
        ...information,
        promoId:response.data.id
      })
      setIsError('')
      console.log(response.data)
    }).catch(error=>{
      console.log(error)
      sendError()
      setIsError('Promo code not found')
    })
  }
  console.log("information", information);
  console.log("error", isError);
  return (
    <>
    <section className="custom_page">
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="mb-5">Order Confirmation</h3>
          </div>
        </div>
        <div className="row flex-sm-nowrap">
          <div className="col-md-6 col-sm-6 col-12 order-box mr-2">
            <h6 className="mb-3">Expected Date &amp; Time</h6>

            <TimeSlots onDate={dates} onSlot={slots} selectedSlot={slotSelect} selectedDate={dateSelected} />

            <div className="delivery-address justify-content-around w-100 d-flex mt-4">
              <h6>Delivery Address </h6>
              <UserAddress onGetTimeSlots={getTimeSlots} />
            </div>
            <div className="address mt-3">
              <div className="address-icon mr-3">
                <i className="fa fa-map-marker" aria-hidden="true" />
              </div>
              <div className="address-right">
                <h6>{ onGetDeleveryLocation()?.title}</h6>
                <p>{onGetDeleveryLocation()?.address}</p>
              </div>
            </div>

            <div className="payment-method mt-4">
              <h6>Payment Method</h6>
              <div className="payment-radio-btn mt-3">
                <div className="online-payment">
                  <div className="radio-btn">
                    <input
                      type="radio"
                      id="onlinePayment"
                      onChange={onMethod}
                      value="2"
                      name="payment"
                      checked={information.paymentMethod === 2}
                    />
                  </div>
                  <div className="radio-btn-label">
                    <label htmlFor="onlinePayment">
                      Online Payment
                      <br />{" "}
                      <span style={{ fontSize: "10px", color: "#a3a3a3" }}>
                        Pay with Credit/Debit (Mastercard, Visa etc), Mobile
                        Banking (Bkash, Rocket etc)
                      </span>
                    </label>
                  </div>
                </div>
                <div className="cash-delivery">
                  <div className="radio-btn">
                    <input
                      type="radio"
                      onChange={onMethod}
                      id="cashOnDelivery"
                      value="1"
                      name="payment"
                      checked={information.paymentMethod === 1}
                    />
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
              <p>
                Subtotal{" "}
                <span className="float-right">BDT {totalPrice && totalPrice}</span>
              </p>
              <p>
                Delivery Charge <span className="float-right">BDT 49</span>
              </p>
              {discount? <p className="text-warning">
                Discount <span className="float-right">-BDT {discount}</span>
              </p>:''}
              <h6 className={discount? "close-text":""}>
                Total <span className={discount? "close-text float-right":"float-right"} >BDT {totalPrice + 49}</span>
              </h6>
              {discount? <h6>
                Total <span className="float-right">BDT{(totalPrice + 49 -discount).toFixed(2)}</span>
              </h6>:""}
            </div>

           {!discount? <Dropdown className="promo-code-container mt-3">
              <Dropdown.Toggle
                as="a"
                className="dropdown-custom"
                variant="success"
                id="dropdown-basic"
              >
                <h6>
                  <img src={offerIcon} className="mr-2" alt="true" /> Add Promo Code{" "}
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </h6>
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-3">

                <h6 className="text-center"> Add Promo Code</h6>
                <input className="mx-auto w-100 " value={promo} onChange={(e)=>setPromo(e.target.value)} type="text" />
                <Dropdown.Item >
               
                <button disabled={!promo} onClick={onPromoSubmit} className="btn w-100 mt-2 mx-auto btn-primary">
                  Add Promo Code
                </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>:""}
           {discount? <div className="d-flex justify-content-between align-items-center"> 
            <img src={offerIcon} /> <span ><b className="text-success">{promo}</b> <b>Promo Added</b></span> 
            <a onClick={onDeletePromo}>
                    <i className="fa text-danger fa-trash-o" />
                  </a>
            </div>:""}

            <div className="order-note-container mt-3">
              <h6>Additional Note</h6>
              <form action className="mt-2">
                <div className="form-group">
                  <textarea
                    name
                    className="form-control mb-5"
                    id
                    rows={5}
                    placeholder="Write Your Message here"
                    defaultValue={""}
                  />
                </div>
                <button className="btn btn-primary" onClick={onPlaceOrder}>
                  Place Order BDT({discount? (totalPrice + 49 -discount).toFixed(2):(totalPrice + 49).toFixed(2)})
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal show={smShow} hide={onAfterOrder}>
      <p className="bg-light p-2">
        {loading && !isError ? <Spinner />: !loading && isError  ?  
          isError  : 'Your Order has been successfully placed .We will update you shortly'
        }
        </p> 
      </SuccessModal>
    </section>
    <ErrorToast showA={showError}> <p>{isError}</p></ErrorToast>
    </>
  );
};

export default withRouter(CheckOut);
