
// import './assets/css/adminlte.min.css'

// import './assets/css/animate.css'

import 'bootstrap/dist/css/bootstrap.min.css';
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

import { BrowserRouter, Route,Switch } from 'react-router-dom';
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
import PreOrderDetails from './component/PreOrder/PreOrderDetails';
import ProductId from './pages/ProductId';
import Genie from './pages/Genie/Genie';
import GenieForm from './component/Genie/GenieForm';
import GenieOrderDetails from './component/Genie/GenieOrderDetails';
import AboutUs from './pages/About';
import ChangePass from './component/SignUp/ChangePass';


const App=(props)=> {


const history = createBrowserHistory();
  useEffect(()=>props
  ,[props,history])

 

  

  let routes=(
   
<Switch>
    <Route path='/' exact component={Home} />
   
    <Route path='/category/:id/:name' exact  component={CategoryPage}  />
    <Route path='/product/:id' exact  component={ProductId}  />

  <Route path='/offers' exact component={OffersPage} />
  
  <Route path='/checkout' exact component={CheckOut} />
  <Route path='/checkout/success' exact component={Success} />
  <Route path='/signup' exact component={SignUp} />
  <Route path='/user' exact component={User} />
  <Route path='/user/changepassword' exact component={ChangePass} />
  <Route path='/order' exact component={Orders} />
  <Route path='/order/info' exact component={OrderInfo} />
  <Route path='/order/preorder' exact component={PreOrderInfo} />
  <Route path='/genie' exact component={Genie} />
  <Route path='/genie/form' exact component={GenieForm} />
  <Route path='/order/preorder/info' exact component={PreOrderDetails} />
  <Route path='/genie/order/info' exact component={GenieOrderDetails} />
  
  <Route path='/logout' exact component={Logout} />
  <Route path='/location' exact component={Location} />
  <Route path='/location/save' exact component={AddAddress} />
  <Route path='/about' exact  component={AboutUs}/>
    </Switch>
  );
  return  (
   
  <div className="wrapper">
    
    <div className="content-wrapper">
    

    <Header  />
    
   
  
    {routes}
 
 <Footer />
 </div>
 </div>

  );
}

export default App;