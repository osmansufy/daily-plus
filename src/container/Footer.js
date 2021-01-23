import React from 'react';
import logo from '../assets/img/logo.png'
import play from '../assets/img/play.png'
import app from '../assets/img/app.png'
import bkash from '../assets/img/bkash.svg'
import visa from '../assets/img/visa-logo.svg'
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3 mt-4 col-sm-6 ">
              <div className="logo">
                <img src={logo} alt="" className="img-fluid" />
              </div>
              <div className="social mt-4">
                <div className="box">
                  <i className="fa fa-facebook" />
                </div>
                <div className="box">
                  <i className="fa fa-twitter" />
                </div>
                <div className="box">
                  <i className="fa fa-instagram" />
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-4 col-sm-6 ">
              <h3>About Daily Plus</h3>
              <ul className="mt-3 p-0">
                <li><Link to="/about"> About US</Link></li>
                <li><a  >FAQ</a></li>
                <li><a href="http://dailyplus.store/terms_of_service.html" target="_blank"  >Terms of Services</a></li>
                <li><a href="http://dailyplus.store/privacy_policy.html" target="_blank"  >Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-3 mt-4 col-sm-6 ">
              <h3>Contact Us</h3>
              <ul className="mt-3 p-0">
                <li><a  href="tel:+8809638111444" ><i className="fa fa-phone pr-3" />+8809638111444</a></li>
                <li><a href="mailto:customers@dailyplus.store" ><i className="fa fa-envelope pr-2" />customers@dailyplus.store</a></li>
                <li><i class="fab fa-facebook-messenger pr-2"></i>Messenger</li>
                <li><a><i className="fa fa-map-marker pr-3" />Floor 4, Wakil Tower</a></li>
              </ul>
            </div>
            <div className="col-md-3 mt-4 col-sm-6 ">
              <h3>App Download</h3>
              <ul className="mt-3 p-0">
                <li><a href="https://play.google.com/store/apps/details?id=com.dingi.dailyplus" target="_blank" ><img className="img-fluid" src={play } alt="" /></a></li>
                <li><a href="https://apps.apple.com/us/app/id1520548400" target="_blank" ><img className="img-fluid" src={app} alt="" /></a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12">
              <p>Copyright 2020 © Daily Plus</p>
            </div>
            <div className="col-md-6 col-sm-6 col-12">
              <div className="payment-info">
                <ul>
                  <li style={{background: 'transparent'}}><span>Payment Methods</span></li>
                  <li><a><img src="assets/dist/img/Cash%20on%20delivery.png" alt="" /></a></li>
                  <li><a><img src={bkash} alt="" /></a></li>
                  <li><a><img src={visa} alt="" /></a></li>
                  <li><a><img src="assets/dist/img/mastercard-logo-38C4789CCA-seeklogo.svg" alt="" /></a></li>    
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;