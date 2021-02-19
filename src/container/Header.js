import React, { useCallback, useEffect, useState } from "react";
import ButtonLink from "../UI/Button/ButtonLink";
// import Button from '../UI/Button/Button';
import MyBag from "../UI/MyBag";
import CartBtn from "../UI/Button/CartBtn";
import { Link } from "react-router-dom";
// import Notification from "../UI/Notification";
import CartBag from "../UI/CartBag";
import logo from "../assets/img/logo.png";
import pro from "../assets/img/pro.png";
import callIcon from "../assets/img/call.png";
import offerIcon from "../assets/img/offer_24px.png";
import offerBlack from "../assets/img/offer_black.png";
import phoneApp from "../assets/img/banner-phone.png";
import accountPic from "../assets/img/account.png";
import Search from "../UI/Search";
import { useDispatch, useSelector } from "react-redux";
import UserModal from "../UI/Account/UserModal";
import Address from "../UI/Address/Address";
import deliveryIcon from "../assets/img/delivery-icon.png";
import whiteDown from "../assets/img/white-down.png";
import lampIcon from "../assets/img/lamp-icon.svg";
import * as actionAddress from "../store/actions/actionAddress";
import * as actionAuths from "../store/actions/actionAuth";
import {
  Button,
  Navbar,
  NavDropdown,
  Nav,
  ButtonGroup,
  Dropdown,
  Badge,
} from "react-bootstrap";
import axios from "../axios";
// import Sidebar from "./Sidebar";
import { Suspense } from "react";

const Sidebar =React.lazy(()=>import ('./Sidebar'))
const Notification =React.lazy(()=>import ('../UI/Notification'))
const Header = (props) => {
  const [categories,setCategories]=useState([])
  const [smShow, setSmShow] = useState(false);
  const [loading,setLoading]=useState(false)
  const isSignUp = useSelector((state) => state.auth.accessToken);
  const [cartShow, setCartShow] = useState(false);
  const [notishow, setNotiShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [appHide, setAppHide] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);
  const address = useSelector((state) => state.address.userAddress);
  const dispatch = useDispatch();
  const onAddress = (isSignUp) =>
    dispatch(actionAddress.onUserAddress(isSignUp));
  const notGetingCuurentLocation = (address) =>
    dispatch(actionAddress.onAddressSelected(address));
  const onNotifications = (isSignUp) =>
    dispatch(actionAuths.onNotificationsCount(isSignUp));
  const onCurrentAddressAction = (latitude, longitude, isSignUp) =>
    dispatch(actionAddress.getReverseGeoCode(latitude, longitude, isSignUp));
  const deleverYaddress = useSelector((state) => state.address.addressCurrent);
  const notificationCount = useSelector((state) => state.auth.notifiacationCount);


 
  const getCategories=()=>{
    if (categories.length==0) {
      setLoading(true)
      axios.get('catalogue/category/')
      .then(response=>{
             
        setCategories(response.data)
        setLoading(false)
        
    }).
    catch(error=>{
      console.log(error)
      setLoading(false)
    })
    }
   
  }
  const shideberClosed = () => {
    setShowSidebar(false);
  };
  const btnClickHandler = () => {
    setShowSidebar(true);
    getCategories()
  };

  const currentPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0,
    };

    const render = (pos) => {
      const { latitude, longitude } = pos.coords;

      onCurrentAddressAction(latitude, longitude, isSignUp);
    };
    const notFound = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(render, notFound, options);
    } else {
      console.log("notLocation");
    }
  };


  useEffect(() => {
    if (isSignUp) {
      currentPosition();
      onAddress(isSignUp);
      onNotifications(isSignUp)
    } 
  }, [isSignUp]);
  const cartClickHandler = () => {
    setCartShow(true);
  };
  const serachToggole = () => {
    setSearchShow(true);
  };
  const cartClosed = () => {
    setCartShow(false);
  };
  const notificationHandler = () => {
   
    setNotiShow(true);
  };
  const searchClose = () => {
    setSearchShow(false);
  };
  const notClosed = () => {
    setNotiShow(false);
  };
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return (
        navigator.userAgent.match(/IEMobile/i) ||
        navigator.userAgent.match(/WPDesktop/i)
      );
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  const onDeleveryAddress=()=>{
    if (deleverYaddress?.address) {
      return deleverYaddress
    }else{
     return address[0]
    }
  }
  let appClasses = ["appShow"];
  if (appHide) {
    appClasses = ["appShow", "close"];
  }
  let appLink =
    "https://play.google.com/store/apps/details?id=com.dingi.dailyplus";
  if (isMobile.iOS()) {
    appLink = "https://apps.apple.com/us/app/id1520548400";
  }
  return (
    <>
     <div className={appClasses.join(" ")}>
          <div className="d-flex justify-content-center">
            <span onClick={() => setAppHide(true)} className="appClose">
              X
            </span>
            <a href={appLink} target="_blank">
              {" "}
              <img src={phoneApp} />
            </a>
          </div>
        </div>
      <header className="sticky-top">
        <div className="pc-nav">
        <div className="container">
          <div className="row mobile-hide align-items-center header-top">
            <div className="col-md-2 col-sm-3  col-12">
              <div className="logo-holder ">
                <Link to="/">
                  <img src={logo} alt="logo" className="logo" />
                </Link>
              </div>
              <div onClick={serachToggole} className="search_toggler">
                <i className="fa fa-search mobile_search" />
              </div>
            </div>
            <div className="col-md-10 col-sm-9 col-12">
              <div className="top-right">
                <Search
                  show={searchShow}
                  className=" search"
                  closed={searchClose}
                />
                <div className="notification-btn">
                  <Dropdown onClick={notificationHandler}  as={ButtonGroup} title="Dropdown ">
                    <Dropdown.Toggle
                      id="dropdown-custom-1"
                      className="custom-dropdown"
                    >
                      <span className="badge badge-light">
                        {notificationCount?.unchecked}
                      </span>
                      <span className="sr-only">unread messages</span>

                      <svg
                        width={22}
                        height={28}
                        viewBox="0 0 22 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.9694 20.8923L19.2053 19.1282V12.2906C19.2053 8.09231 16.9626 4.57778 13.0514 3.64786V2.71795C13.0514 1.5829 12.1352 0.666664 11.0002 0.666664C9.86512 0.666664 8.94888 1.5829 8.94888 2.71795V3.64786C5.02409 4.57778 2.79503 8.07863 2.79503 12.2906V19.1282L1.03093 20.8923C0.169389 21.7538 0.771098 23.2308 1.98819 23.2308H19.9984C21.2292 23.2308 21.8309 21.7538 20.9694 20.8923ZM5.53007 20.4957V12.2906C5.53007 8.89914 7.59503 6.13675 11.0002 6.13675C14.4053 6.13675 16.4702 8.89914 16.4702 12.2906V20.4957H5.53007ZM13.7352 24.5983C13.7352 26.1026 12.5044 27.3333 11.0002 27.3333C9.48221 27.3333 8.26511 26.1026 8.26511 24.5983H13.7352Z"
                          fill="#37474F"
                        />
                      </svg>
                    </Dropdown.Toggle>
                    <Suspense fallback={<h4>Loading...</h4>}>

                    
                    <Notification
                    
                      show={notishow}
                      closed={notClosed}
                      isLoading={loading}
                
                    />
                    </Suspense>
                  </Dropdown>
                  {/* <Notification show={notishow} closed={notClosed} /> */}
                </div>
                <div className="lamp-btn">
                  <Link to="/genie" className="bg-none">
                    <img src={lampIcon} />
                  </Link>
                </div>
                <div className="wishlist-btn">
                  <a>
                    {/* <i className="fa fa-heart-o icon" aria-hidden="true"></i> */}
                    <svg
                      width={25}
                      height={22}
                      viewBox="0 0 25 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.5452 2.32386C21.2831 0.955081 19.5484 0.199997 17.6681 0.199997C16.2558 0.199997 14.9573 0.64826 13.8212 1.5269C13.51 1.76755 13.2152 2.03729 12.938 2.33461L12.6667 2.64107C12.3132 2.22054 11.9274 1.84793 11.5124 1.52693C10.3763 0.64826 9.07774 0.199997 7.66548 0.199997C5.78503 0.199997 4.05047 0.955036 2.78843 2.32384C1.54746 3.66994 0.866699 5.50167 0.866699 7.47867C0.866699 9.5117 1.62275 11.3689 3.22218 13.2989L3.61926 13.7643C4.30151 14.5402 5.0667 15.2882 6.2794 16.3659L7.27853 17.2415L11.2968 20.6919L11.4833 20.8548C11.8105 21.1414 12.2309 21.2994 12.6667 21.2994C13.1022 21.2994 13.5227 21.1415 13.8501 20.855L16.1408 18.8825L17.7606 17.4961C19.8345 15.7068 20.8763 14.7293 21.792 13.6753L22.1114 13.2987C23.7107 11.369 24.4667 9.51183 24.4667 7.47867C24.4667 5.50157 23.7861 3.66987 22.5452 2.32386ZM15.2043 3.31538C15.9398 2.74666 16.7646 2.46111 17.6681 2.46111C18.9135 2.46111 20.0525 2.95594 20.8827 3.85644C21.7337 4.7795 22.2058 6.0647 22.2058 7.47867C22.2058 8.97327 21.6489 10.3135 20.3705 11.8561L20.1308 12.1396L19.973 12.32C19.3868 12.9807 18.7111 13.6413 17.6685 14.5721L17.0617 15.1083L12.6654 18.8856L11.6787 18.0332L9.08387 15.8136L8.11546 14.9712C6.74049 13.762 5.94505 12.9922 5.25412 12.1989L4.96302 11.8561C3.68458 10.3136 3.12764 8.97331 3.12764 7.47867C3.12764 6.0647 3.59969 4.7795 4.45067 3.85643C5.28106 2.95588 6.41996 2.46111 7.66548 2.46111C8.56879 2.46111 9.39357 2.74667 10.1291 3.31544C10.6998 3.75677 11.1739 4.33449 11.546 4.95825C11.7831 5.35551 12.2044 5.59483 12.6667 5.59483C13.129 5.59483 13.5503 5.35551 13.7873 4.95836C14.1598 4.33426 14.6338 3.75671 15.2043 3.31538Z"
                        fill="#37474F"
                      />
                    </svg>
                  </a>
                </div>
                <div className="cart-btn">
                  <CartBtn clicked={cartClickHandler}>
                    {" "}
                    <svg
                      width={23}
                      height={27}
                      viewBox="0 0 23 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.672 6.70655L22.6624 25.6615C22.6854 25.8811 22.6143 26.1003 22.4662 26.2645C22.3186 26.4286 22.108 26.5223 21.887 26.5223H0.779479C0.558693 26.5223 0.348098 26.4286 0.200241 26.2645C0.0525849 26.1003 -0.0187458 25.8811 0.00423188 25.6615L1.9947 6.70655C2.03646 6.30973 2.37093 6.00842 2.76995 6.00842H6.51111V5.15545C6.51111 2.49663 8.67441 0.333336 11.3334 0.333336C13.9922 0.333336 16.1555 2.49663 16.1555 5.15545V6.00842H19.8967C20.2957 6.00842 20.6302 6.30973 20.672 6.70655ZM8.53666 5.15545C8.53666 3.61395 9.79169 2.35889 11.3334 2.35889C12.8749 2.35889 14.13 3.61393 14.13 5.15545V5.54176H8.53666V5.15545ZM20.5034 24.4967H2.16328L3.89209 8.03398H6.04445V9.28504C6.04445 9.97316 6.60244 10.5311 7.29056 10.5311C7.97867 10.5311 8.53666 9.97316 8.53666 9.28504V8.03398H14.13V9.28504C14.13 9.97316 14.688 10.5311 15.3761 10.5311C16.0642 10.5311 16.6222 9.97316 16.6222 9.28504V8.03398H18.7746L20.5034 24.4967Z"
                        fill="#37474F"
                      />
                    </svg>
                  </CartBtn>
                  {/* {<MenuButton clicked={props.btnClicked} />} */}
                </div>

                <div className="login-btn">
                  {isSignUp != null ? (
                    <Dropdown as={ButtonGroup} title="Dropdown ">
                      <Dropdown.Toggle
                        id="dropdown-custom-2"
                        className="custom-dropdown"
                      >
                        {/* <i className="fas fa-user"></i> */}
                        <img src={accountPic} />
                      </Dropdown.Toggle>

                      <UserModal />
                    </Dropdown>
                  ) : (
                    <Link
                      to="/signup"
                      className="btn btn-secondary py-md-2 px-md-4"
                    >
                      Log In
                    </Link>
                  )}
                  {/* {isSignUp!=null ? <UserModal/>:""} */}
                </div>
              </div>
            </div>
          </div>
          </div>
          
          <hr />
          <div className="container">
          <div className="row mobile-hide header-bottom">
            <div className="col-md-4 col-sm-4 col-4">
              <div className="bottom-right">
                <ButtonLink clicked={btnClickHandler}>
                  <i
                    className="fas fa-bars"
                    style={{ padding: "5px", color: "#5EC401" }}
                  />
                  <span className="ctb">Category</span>
                </ButtonLink>
              </div>
            </div>
            <div className="col-md-8 col-sm-8 col-8">
              <div className="bottom-right">
                <div className="offer">
                  <Link to="/offers" className="header-bottom-btn">
                    <img className="mr-2" src={offerIcon} />
                    {/* <i className="fa fa-percent"></i> */}
                    <span>Offers</span>{" "}
                  </Link>
                </div>
                <div className="contact-btn">
                  <a href="tel:+8809638111444"  className="header-bottom-btn">
                    <img className="mr-2" src={callIcon} />

                    <span>+8809638111444</span>
                  </a>
                </div>

                <Dropdown as={ButtonGroup} title="Dropdown ">
                  <Dropdown.Toggle
                    id="dropdown-custom-1"
                    className="address-button custom-dropdown"
                  >
                    {" "}
                    <div className="delivery mt-2">
                      {" "}
                      <h6>Delivery to</h6>
                      <p
                        id="contentcshow"
                        style={{ cursor: "pointer", margin: 0 }}
                      >
                        {onDeleveryAddress()?.address?.substring(0, 20)}...
                      </p>
                    </div>
                    <img className="mt-md-4 ml-2" src={deliveryIcon} />
                  </Dropdown.Toggle>
                  <Address onCurrent={currentPosition} />
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="mobile-nav ">
        <div className="mobile-show">
          {isSignUp == null && (
            <div className="d-flex  bg-custom-warning py-1 pl-2 pr-3 align-items-center justify-content-between">
              <span className="text-white" >You are not logged in</span>{" "}
              <Link to="/signup">
                <b className="text-white">Login</b>
              </Link>
            </div>
          )}
             <div className="container"> 
                  </div>
        </div>
        <div className="container">
          <div className="mobile-show ">
            <Navbar collapseOnSelect expand="lg" className="px-0"  variant="light">
              <Navbar.Brand className="flex-grow-1 d-flex justify-content-between m-0">
                <div className="mobile-logo">
                  <Link to="/">
                    <img src={logo} />
                  </Link>
                </div>

                <div className="mobile-icon">
                  <Dropdown onClick={notificationHandler} as={ButtonGroup} title="Dropdown ">
                    <Dropdown.Toggle id="dropdown-custom-1">
                      {/* <span className="badge badge-light">
                        {notificationCount?.unchecked}
                      </span>
                      <span className="sr-only">unread messages</span> */}

                      <svg
                        width={22}
                        height={28}
                        viewBox="0 0 22 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.9694 20.8923L19.2053 19.1282V12.2906C19.2053 8.09231 16.9626 4.57778 13.0514 3.64786V2.71795C13.0514 1.5829 12.1352 0.666664 11.0002 0.666664C9.86512 0.666664 8.94888 1.5829 8.94888 2.71795V3.64786C5.02409 4.57778 2.79503 8.07863 2.79503 12.2906V19.1282L1.03093 20.8923C0.169389 21.7538 0.771098 23.2308 1.98819 23.2308H19.9984C21.2292 23.2308 21.8309 21.7538 20.9694 20.8923ZM5.53007 20.4957V12.2906C5.53007 8.89914 7.59503 6.13675 11.0002 6.13675C14.4053 6.13675 16.4702 8.89914 16.4702 12.2906V20.4957H5.53007ZM13.7352 24.5983C13.7352 26.1026 12.5044 27.3333 11.0002 27.3333C9.48221 27.3333 8.26511 26.1026 8.26511 24.5983H13.7352Z"
                          fill="#37474F"
                        />
                      </svg>
                    </Dropdown.Toggle>
                  
                    <Suspense fallback={<h4>Loading...</h4>}>
                      <Notification
                     
                      show={notishow}
                      closed={notClosed}
                      isLoading={loading}
                    />
                    </Suspense>
                    {isSignUp != null && (
                      <Dropdown as={ButtonGroup} title="Dropdown ">
                        <Dropdown.Toggle id="dropdown-custom-1">
                          {/* <i className="fas fa-user"></i> */}
                          <img src={pro} />
                        </Dropdown.Toggle>

                        <UserModal />
                      </Dropdown>
                    )}
                  </Dropdown>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle
                className="nav-sizings"
                aria-controls="responsive-navbar-nav"
              />
              <Navbar.Collapse
                className="bg-light bg-gradient"
                id="responsive-navbar-nav"
                className="mt-4"
              >
                <Nav className="mr-auto mobile-nav">
                  <Nav.Link href="#features">
                    {" "}
                    <Link to="/offers" className="header-bottom-btn">
                      <img
                        className="mr-4"
                        style={{ width: "30px" }}
                        src={offerBlack}
                      />
                      {/* <i className="fa fa-percent"></i> */}
                      <span className="text-success">Offers</span>{" "}
                    </Link>
                  </Nav.Link>
                  <Nav.Link className="text-dark" href="#pricing">
                    {" "}
                    <svg
                      width={25}
                      height={22}
                      viewBox="0 0 25 22"
                      className="mr-4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.5452 2.32386C21.2831 0.955081 19.5484 0.199997 17.6681 0.199997C16.2558 0.199997 14.9573 0.64826 13.8212 1.5269C13.51 1.76755 13.2152 2.03729 12.938 2.33461L12.6667 2.64107C12.3132 2.22054 11.9274 1.84793 11.5124 1.52693C10.3763 0.64826 9.07774 0.199997 7.66548 0.199997C5.78503 0.199997 4.05047 0.955036 2.78843 2.32384C1.54746 3.66994 0.866699 5.50167 0.866699 7.47867C0.866699 9.5117 1.62275 11.3689 3.22218 13.2989L3.61926 13.7643C4.30151 14.5402 5.0667 15.2882 6.2794 16.3659L7.27853 17.2415L11.2968 20.6919L11.4833 20.8548C11.8105 21.1414 12.2309 21.2994 12.6667 21.2994C13.1022 21.2994 13.5227 21.1415 13.8501 20.855L16.1408 18.8825L17.7606 17.4961C19.8345 15.7068 20.8763 14.7293 21.792 13.6753L22.1114 13.2987C23.7107 11.369 24.4667 9.51183 24.4667 7.47867C24.4667 5.50157 23.7861 3.66987 22.5452 2.32386ZM15.2043 3.31538C15.9398 2.74666 16.7646 2.46111 17.6681 2.46111C18.9135 2.46111 20.0525 2.95594 20.8827 3.85644C21.7337 4.7795 22.2058 6.0647 22.2058 7.47867C22.2058 8.97327 21.6489 10.3135 20.3705 11.8561L20.1308 12.1396L19.973 12.32C19.3868 12.9807 18.7111 13.6413 17.6685 14.5721L17.0617 15.1083L12.6654 18.8856L11.6787 18.0332L9.08387 15.8136L8.11546 14.9712C6.74049 13.762 5.94505 12.9922 5.25412 12.1989L4.96302 11.8561C3.68458 10.3136 3.12764 8.97331 3.12764 7.47867C3.12764 6.0647 3.59969 4.7795 4.45067 3.85643C5.28106 2.95588 6.41996 2.46111 7.66548 2.46111C8.56879 2.46111 9.39357 2.74667 10.1291 3.31544C10.6998 3.75677 11.1739 4.33449 11.546 4.95825C11.7831 5.35551 12.2044 5.59483 12.6667 5.59483C13.129 5.59483 13.5503 5.35551 13.7873 4.95836C14.1598 4.33426 14.6338 3.75671 15.2043 3.31538Z"
                        fill="#37474F"
                      />
                    </svg>{" "}
                    <span className="text-success">Wishlist</span>
                  </Nav.Link>

                  <Nav.Link className="text-dark">
                    <img className="mr-4" src={lampIcon} />
                    <span className="text-success">GeniList</span>
                  </Nav.Link>
                  <Nav.Link href="tel:+8809638111444" className="text-dark">
                    <i className="fa nav-phone fa-phone mr-4" />
                    <span className="text-success">+8809638111444</span>
                  </Nav.Link>

              
                </Nav>
              </Navbar.Collapse>
            </Navbar>
           
          </div>
        </div>
       
        
        <div className="container shadow  pb-2">
          <div className="mobile-show ">
            <div className="d-flex  mt-2 pr-2 justify-content-space-between">
            <a onClick={btnClickHandler}  id="nav-link " className="nav-link sidebar-toggle pl-0"  role="button"> 
             <i
                  className="fas fa-bars"
                  style={{ paddingRight: "5px", color: "#5EC401" }}
                /></a>
            
              <Search
                show={searchShow}
                className="flex-grow-1 mr-3 search-mobile search"
                closed={searchClose}
              />
              <CartBtn className="" clicked={cartClickHandler}>
                {" "}
                <svg
                  width={23}
                  height={27}
                  viewBox="0 0 23 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.672 6.70655L22.6624 25.6615C22.6854 25.8811 22.6143 26.1003 22.4662 26.2645C22.3186 26.4286 22.108 26.5223 21.887 26.5223H0.779479C0.558693 26.5223 0.348098 26.4286 0.200241 26.2645C0.0525849 26.1003 -0.0187458 25.8811 0.00423188 25.6615L1.9947 6.70655C2.03646 6.30973 2.37093 6.00842 2.76995 6.00842H6.51111V5.15545C6.51111 2.49663 8.67441 0.333336 11.3334 0.333336C13.9922 0.333336 16.1555 2.49663 16.1555 5.15545V6.00842H19.8967C20.2957 6.00842 20.6302 6.30973 20.672 6.70655ZM8.53666 5.15545C8.53666 3.61395 9.79169 2.35889 11.3334 2.35889C12.8749 2.35889 14.13 3.61393 14.13 5.15545V5.54176H8.53666V5.15545ZM20.5034 24.4967H2.16328L3.89209 8.03398H6.04445V9.28504C6.04445 9.97316 6.60244 10.5311 7.29056 10.5311C7.97867 10.5311 8.53666 9.97316 8.53666 9.28504V8.03398H14.13V9.28504C14.13 9.97316 14.688 10.5311 15.3761 10.5311C16.0642 10.5311 16.6222 9.97316 16.6222 9.28504V8.03398H18.7746L20.5034 24.4967Z"
                    fill="#37474F"
                  />
                </svg>
              </CartBtn>
            </div>
          </div>
         {isSignUp? <Dropdown className="mobile-show " title="Dropdown ">
                    <Dropdown.Toggle
                    id="dropdown-custom-1"
                    className="address-button custom-dropdown w-100 pl-1 mt-2"
                  >
                    <div className="d-flex py-2 px-2 w-100  justify-content-between align-items-center phoneAdelevery">
                          {" "}
                          <h6 className="ml-2 text-white">Delivery to</h6>
                          <p className="text-white">
                            {onDeleveryAddress()?.address?.substring(0, 40)}...
                            </p>
                          <img className="" src={whiteDown} />
                        </div>
                  </Dropdown.Toggle>
                    <Address  onCurrent={currentPosition} />
                  </Dropdown>:""}
        </div>
        </div>
      </header>

      <CartBag clicked={cartClickHandler} />
      <MyBag cartShow={cartShow} closed={cartClosed} />
      <Suspense fallback={<h3>Loading...</h3>}>
      <Sidebar isLoading={loading} categories={categories} show={showSidebar} closed={shideberClosed} />
      </Suspense>
     
    </>
  );
};

export default Header;
