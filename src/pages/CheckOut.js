import { Nav, Dropdown, Tab, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "../axios";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CheckOut.Module.css";
import { useHistory, withRouter } from "react-router-dom";
import * as authAction from "../store/actions/actionAuth";
import * as addressAction from "../store/actions/actionAddress";
import plusIcon from "../assets/img/plus-icon.png";
import offerIcon from "../assets/img/offer_24px.png";
import SuccessModal from "../UI/Modal/SuccessModal";
const CheckOut = (props) => {
  const token = useSelector((state) => state.auth.accessToken);
  const history = useHistory();
  const dispatch = useDispatch();
  // const userAddressAction=(token)=>dispatch(addressAction.onUserAddress(token))
  const userInfo = useSelector((state) => state.auth.userdetails);
  const activeCart = useSelector((state) => state.auth.activeCart);
  const userAddress = useSelector((state) => state.address.userAddress);
  const currentAddress = useSelector((state) => state.address.adreessCurrent);
  const [smShow, setSmShow] = useState(false);
  const onAddressCheckout = () => dispatch(addressAction.onAddressCheckout());
  const [information, setInformation] = useState({
    lng: "",
    lat: "",
    address: "",
    title: "",
    deliveryTime: moment().toISOString(),
    paymentMethod: 1,
    slot: 3,
  });
  const [slots, setSlots] = useState([]);
  const [dates, setDates] = useState([]);
  const onNewLocation = () => {
    onAddressCheckout();
    props.history.push("/location");
  };
  const latestAddress = userAddress.reduce((a, b) =>
    new Date(a.ts_updated) > new Date(b.ts_updated) ? a : b
  );

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
        console.log(response);
        setSlots(response.data.slots);
        setDates(response.data.dates);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setInformation({
      ...information,
      lng: latestAddress.location.lng,
      lat: latestAddress.location.lat,
      address: latestAddress.address,
      title: latestAddress.title,
    });

    getTimeSlots(latestAddress.location.lng, latestAddress.location.lat);
  }, []);

  const CartChange = (token) => dispatch(authAction.onCartChange(token));

  const onMethod = (event) => {
    setInformation({
      ...information,
      paymentMethod: event.target.value,
    });
  };
 
  const onAfterOrder=()=>{
    setSmShow(false)
    history.push('/')
  }

  const onPlaceOrder = (event) => {
    event.preventDefault();
    const orderSend = {
      owner: userInfo.id,
      cart: activeCart,
      ts_delivery: information.deliveryTime,
      time_slot: information.slot,
      recipient_phone: userInfo.phone,
      recipient_address: information.address,
      recipient_point: `{"lat":${information.lat},"lng":${information.lng}}`,
    };
    axios
      .post("order/order/customer/", orderSend, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        CartChange(token);
        if (information.paymentMethod == 2) {
          axios
            .post(
              "billing/ssl/payment/order/create/",
              {
                amount: response.data.final_bill,
                order: response.data.id,
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
              setSmShow(true)
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setSmShow(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const adressChange = (address) => {
    setInformation({
      lng: address.location.lng,
      lat: address.location.lat,
      address: address.address,
      title: address.title,
    });

    getTimeSlots(address.location.lat, address.location.lng);
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
  console.log("information", information);
  return (
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

            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey={`link-${moment().format("DD")}`}
            >
              <div className="date-container my-3">
                <Nav variant="tabs">
                  {dates &&
                    dates.map((date, index) => (
                      <Nav.Item className="mb-2" as="a">
                        <Nav.Link
                          onSelect={() => dateSelected(date.date)}
                          eventKey={`link-${moment(date.date)
                            .utc()
                            .format("DD")}`}
                        >
                          <p>{moment(date.date).utc().format("ddd")}</p>

                          <h4>{moment(date.date).utc().format("DD")}</h4>
                          <p>{moment(date.date).utc().format("MMM")}</p>
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </div>
              <Tab.Content>
                {dates &&
                  dates.map((date, index) => (
                    <Tab.Pane
                      className="w-100"
                      id={moment(date.date).utc().format("DD")}
                      eventKey={`link-${moment(date.date).utc().format("DD")}`}
                    >
                      <Nav
                        variant="pills"
                        className=""
                        defaultActiveKey="date-0"
                      >
                        {slots &&
                          slots.length > 0 &&
                          slots
                            .filter((slot) =>
                              moment(slot.start).isSame(date.date, "day")
                            )
                            .map((slot, index) => (
                              <>
                                {slot.is_available ? (
                                  <Nav.Item
                                    disabled={!slot.is_available}
                                    className="time-container mt-3"
                                  >
                                    <Nav.Link
                                      onSelect={() => slotSelect(index)}
                                      eventKey={`date-${index}`}
                                      className="times  mr-3"
                                    >
                                      <p>
                                        {moment(slot.start)
                                          .utc()
                                          .format("h:mm A")}
                                        -
                                        {moment(slot.end)
                                          .utc()
                                          .format("h:mm A")}
                                      </p>
                                    </Nav.Link>
                                  </Nav.Item>
                                ) : (
                                  ""
                                )}
                              </>
                            ))}
                      </Nav>
                    </Tab.Pane>
                  ))}
              </Tab.Content>
            </Tab.Container>

            <div className="delivery-address justify-content-around w-100 d-flex mt-4">
              <h6>Delivery Address </h6>
              <Dropdown className="addresschange-link ">
                <Dropdown.Toggle as="a" variant="success" id="dropdown-basic">
                  Change Address
                </Dropdown.Toggle>

                <Dropdown.Menu
                  as="ul"
                  className={classes.checkoutAddress}
                  style={{ width: "100px" }}
                >
                  {userAddress.map((address, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => adressChange(address)}
                      as="li"
                      href="#/action-1"
                    >
                      <a>
                        <p className="m-0 p-0">{address.title}</p>
                        <small>{address.address}</small>
                      </a>
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item as="li">
                    <a
                      onClick={onNewLocation}
                      type="button"
                      className="btn btn-primary btn-custom btn-lg btn-block"
                    >
                      <img src={plusIcon} /> <span>Add New Address </span>
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="address mt-3">
              <div className="address-icon mr-3">
                <i className="fa fa-map-marker" aria-hidden="true" />
              </div>
              <div className="address-right">
                <h6>{information.title}</h6>
                <p>{information.address}</p>
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
                Subtotal <span className="float-right">BDT 1,000</span>
              </p>
              <p>
                Delivery Charge <span className="float-right">BDT 49</span>
              </p>
              <h6>
                Total <span className="float-right">BDT 1,049</span>
              </h6>
            </div>
            <div className="promo-code-container mt-3">
              <a>
                <h6>
                  <img src={offerIcon} className="mr-2" alt="" /> Add Promo Code{" "}
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </h6>
              </a>
            </div>
            <Dropdown className="promo-code-container mt-3">
              <Dropdown.Toggle
                as="a"
                className="dropdown-custom"
                variant="success"
                id="dropdown-basic"
              >
                <h6>
                  <img src={offerIcon} className="mr-2" alt="" /> Add Promo Code{" "}
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </h6>
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-3">
                <h6 className="text-center"> Add Promo Code</h6>
                <input className="mx-auto w-100 " type="text" />
                <button className="btn w-100 mt-2 mx-auto btn-primary">
                  Add Promo Code
                </button>
              </Dropdown.Menu>
            </Dropdown>
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
                  Place Order (1,049)
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal show={smShow} hide={onAfterOrder}>
     <h4 className="bg-light p-2">Thenks For Your Order We will contact verysoon</h4>
        
      
      </SuccessModal>
    </section>
  );
};

export default withRouter(CheckOut);
