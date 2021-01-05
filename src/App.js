
import './assets/css/adminlte.min.css'

import './assets/css/animate.css'
import './App.css';
import './assets/css/style.css'
import './assets/css/custom.css'
import './assets/css/responsive.css'
import Home from './pages/Home'
import Sidebar from './container/Sidebar'
import Header from './container/Header'
import Footer from './container/Footer';
import React ,{useEffect, useState,Suspense} from 'react';
import { createBrowserHistory } from "history";

import { Route,Switch } from 'react-router-dom';
import CategoryPage from './pages/Category';

import OffersPage from './pages/Offers';
import CheckOut from './pages/CheckOut';
import Success from './pages/CheckOutSuccess';
import SignUp from './pages/Signup';
import User from './pages/User';
import Orders from './pages/Orders';
import OrderInfo from './pages/order/OrderInfo';
import Logout from './pages/logout';
import Location from './pages/Location';
import AddAddress from './component/Map/AddAddress';
import PreOrderInfo from './pages/order/PreOrderInfo';

const App=(props)=> {

const  [showSidebar,setShowSidebar]=useState(false)
const history = createBrowserHistory();
  useEffect(()=>props
  ,[props,history])

  const btnClickHandler=()=>{
    setShowSidebar(true)
   
    
  }
  const shideberClosed=()=>{
    setShowSidebar(false)
  }
  

  let routes=(
<Switch>
    <Route path='/' exact component={Home} />
   
    <Route path='/category/:id/:name' exact  component={CategoryPage}  />
    
  <Route path='/offers' exact component={OffersPage} />
  <Route path='/order/info' exact component={OrderInfo} />
  <Route path='/checkout' exact component={CheckOut} />
  <Route path='/checkout/success' exact component={Success} />
  <Route path='/signup' exact component={SignUp} />
  <Route path='/user' exact component={User} />
  <Route path='/order' exact component={Orders} />
  <Route path='/order/preorder' exact component={PreOrderInfo} />
  
  <Route path='/logout' exact component={Logout} />
  <Route path='/location' exact component={Location} />
  <Route path='/location/save' exact component={AddAddress} />
    </Switch>
  );
  return  (<div class="wrapper">
    <Sidebar show={showSidebar} closed={shideberClosed} />
    <div class="content-wrapper">
    <Header btnClicked={btnClickHandler} />
    
   {/* <Router path="/" component={} /> */}
  
    {routes}
 
 <Footer />
 </div>
 </div>
  );
}

export default App;