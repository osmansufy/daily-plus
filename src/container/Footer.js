import React from 'react';
import logo from '../assets/img/logo.png'
import play from '../assets/img/play.png'
import app from '../assets/img/app.png'
import bkash from '../assets/img/bkash.svg'
import visa from '../assets/img/visa-logo.svg'

function Footer(props) {
    return (
        <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-5 col-12">
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
            <div className="col-md-2 col-sm-2 col-12">
              <h3>About Daily Plus</h3>
              <ul className="mt-3 p-0">
                <li><a  >About US</a></li>
                <li><a  >FAQ</a></li>
                <li><a  >Terms of Services</a></li>
                <li><a  >Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-3 col-12">
              <h3>Contact Us</h3>
              <ul className="mt-3 p-0">
                <li><a><i className="fa fa-phone pr-3" />+0198737343</a></li>
                <li><a><i className="fa fa-envelope pr-2" />contact@dailyplus.com</a></li>
                <li><a><i className="fa fa-map-marker pr-3" />Floor 4, Wakil Tower</a></li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-2 col-12">
              <h3>App Download</h3>
              <ul className="mt-3 p-0">
                <li><a  ><img className="img-fluid" src={play } alt="" /></a></li>
                <li><a  ><img className="img-fluid" src={app} alt="" /></a></li>
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