import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "../../axios";
import { useEffect, useState } from "react";
import ButtonQuantity from "../../UI/Button/ButtonQtn";
import * as cartActions from "../../store/actions/actionCart";
import { Nav, Dropdown, Tab, Row, Col } from "react-bootstrap";
import * as addressAction from "../../store/actions/actionAddress";
import * as authAction from "../../store/actions/actionAuth";
import { useHistory } from "react-router";
import ErrorToast from '../../UI/Toasts/Toast'
import UserAddress from "../OrderCheckout/UserAddress";

const PreOrderCheckout = () => {
  const [activePreProducts, setActivePreProducts] = useState([]);
  const currentAddress = useSelector((state) => state.address.addressCurrent);
  const dispatch = useDispatch();
  const history = useHistory();
  const onUpdatePre = (id, qtn, token) =>
    dispatch(cartActions.updatePreCartUnits(id, qtn, token));
  const allPreProducts = (token) => dispatch(cartActions.itemsAddtoCart(token));
  const onDeletePre = (id, token) =>
    dispatch(cartActions.deletePreCartProduct(id, token));
  const token = useSelector((state) => state.auth.accessToken);
  const preProducts = useSelector((state) => state.carts.cartPreOrders);
  const userInfo = useSelector((state) => state.auth.userdetails);
  const userAddress = useSelector((state) => state.address.userAddress);
  const [isError, setIsError] = useState("");
  const onSelectedAddress = (address) =>
    dispatch(addressAction.onAddressSelected(address));
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const onAddressCheckout = (path) => dispatch(addressAction.onAddressCheckout(path));
  const onCurrentAddressAction = (latitude, longitude, token) =>
    dispatch(addressAction.getReverseGeoCode(latitude, longitude, token));
    const onNotificationsAction = (token) =>
    dispatch(authAction.onGetNotifications(token));
    const notificationsCount = (token) => dispatch(authAction.onNotificationsCount(token));
  const onPreDeleteHandler = (item) => {
    const id = item.id;
    onDeletePre(id, token);
  };
  const onPreHandler = (item) => {
    console.log(item);

    const upQtn = parseInt(item.item_count + 1);
    const id = item.id;
    onUpdatePre(id, upQtn, token);
  };
  const [showA, setShowA] = useState(false);
  
  
  
  const subPreHandler = (item) => {
    console.log(item);
    const upQtn = parseInt(item.item_count - 1);
    const id = item.id;
    const num = parseInt(1);
    onUpdatePre(id, upQtn, token);
    if (item.item_count === 1) {
      onDeletePre(id, token);
    } else {
      onUpdatePre(id, upQtn, token);
    }
  };
  const adressChange = (address) => {
    onSelectedAddress(address);
  };
  const onNewLocation = () => {
    onAddressCheckout('/order/preorder');
    history.push("/location");
  };
  const currentPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0,
    };

    const render = (pos) => {
      const { latitude, longitude } = pos.coords;

      onCurrentAddressAction(latitude, longitude, token);
    };
    const notFound = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(render, notFound, options);
    } else {
    }
  };
  useEffect(() => {
    allPreProducts(token);
  }, []);
 const showError=()=>{
  setShowA(true)
  setTimeout(()=>{
    setShowA(false)
    setIsError('')
  }
 
  ,4000)
 }
  const placePreOrder = (event) => {
    event.preventDefault();

    const preOrderSend = {
      owner: userInfo.id,

      ts_delivery: moment().toISOString(),
      time_slot: 0,
      // payment_method: orderInformation.paymentMethod,
      recipient_phone: userInfo.phone,
      recipient_address: userAddress[0].address,
      recipient_point: `{"lat":${userAddress[0].location.lat},"lng":${userAddress[0].location.lng}}`,
    };
    if (preProducts.length > 0 && token) {
      axios
        .post("order/pre/order/", preOrderSend, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then((response) => {
          setIsError("");
          onNotificationsAction(token)
          notificationsCount(token)
          axios
            .post(
              "billing/ssl/payment/order/create/",
              {
                amount: response.data.final_bill,
                preorder: response.data.id,
              },
              {
                headers: {
                  Authorization: `JWT ${token}`,
                },
              }
            )
            .then((res) => {
              window.location.replace(res.data.GatewayPageURL);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else if (preProducts.length == 0) {
      setIsError("Add item to order");
      showError()
    }
  };

  return (
    <>
    <div className="row">
      <div className="col-md-10 col-sm-10 col-12  my-4 mx-auto">
        <h5 className="text-danger">{isError ? isError : ""}</h5>
        {preProducts.length > 0 &&
          preProducts.map((item, index) => (
            <div className="cart-product mx-auto col-md-10">
              <div className="gOimage">
                <img
                  className="img-fluid"
                  src={item.prod_image_list[0].thumbnail_image_url}
                  alt="product-img"
                />
              </div>
              <div className="quantity">
                <h5 className="preOrderDate my-2">
                  Pre-order (
                  {moment(item?.pre_order_details?.delivery_date)
                    .utc()
                    .format("MMM DD.YYYY")}
                  )
                </h5>
                <p className="prePoduct-name my-2">{item.prod_name}</p>
                <p className="prePoduct-unit my-2">{item.prod_unit_name}</p>

                <div className="quantity-group">
                  <ButtonQuantity
                    addClicked={() => onPreHandler(item)}
                    subClicked={() => subPreHandler(item)}
                  >
                    <div className="show-quantity">
                      <h6>{item.item_count}</h6>
                    </div>
                  </ButtonQuantity>
                </div>
              </div>
              <div className="cart-price">
                <div className="total-price">
                  <p className="sell-price">
                    <small>ট</small>{" "}
                    {item.prod_inventory_list[0].unit_price_final}
                  </p>
                  {/* <p  className="regular-price">{item.prod_inventory_list[0].unit_price_final*item.item_count}</p> */}
                </div>
                <div className="delete-cart">
                  <a onClick={() => onPreDeleteHandler(item)}>
                    <i className="fa fa-trash-o" />
                  </a>
                </div>
              </div>
              <div></div>
            </div>
          ))}

        <div className="delivery-address justify-content-around w-100 d-flex mt-4">
        <h6>Delivery Address </h6>
              <UserAddress  />
        </div>
        <div className="address mt-3">
              <div className="address-icon mr-3">
                <i className="fa fa-map-marker" aria-hidden="true" />
              </div>
              <div className="address-right mb-4">
                <h6>{currentAddress && currentAddress.title}</h6>
                <p>{currentAddress && currentAddress.address}</p>
              </div>
            </div>
        <div className="order-price-container">
          <p>
            Subtotal{" "}
            <span className="float-right">
              BDT{" "}
              {preProducts.length > 0
                ? preProducts
                    .map(
                      (cart) =>
                        cart.prod_inventory_list[0].unit_price_final *
                        cart.item_count
                    )
                    .reduce(reducer)
                : 0}
            </span>
          </p>
          <p>
            Delivery Charge <span className="float-right">BDT 0</span>
          </p>
          <h6>
            Total{" "}
            <span className="float-right">
              BDT{" "}
              {preProducts.length > 0
                ? preProducts
                    .map(
                      (cart) =>
                        cart.prod_inventory_list[0].unit_price_final *
                        cart.item_count
                    )
                    .reduce(reducer)
                : 0}
            </span>
          </h6>
        </div>

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
            <button
              onClick={placePreOrder}
              className="btn w-50 mx-auto d-flex justify-content-center btn-primary"
            >
              Place Order (ট
              {preProducts.length > 0
                ? preProducts
                    .map(
                      (cart) =>
                        cart.prod_inventory_list[0].unit_price_final *
                        cart.item_count
                    )
                    .reduce(reducer)
                : 0}
              )
            </button>
          </form>
        </div>
      </div>
    </div>
    <ErrorToast showA={showA} >
      <h5 className="text-danger">{isError ? isError : ""}</h5></ErrorToast>
    </>
  );
};

export default PreOrderCheckout;
