import React from 'react';

function Footer(props) {
    return (
        <footer>
        <div class="container">
          <div class="row">
            <div class="col-md-5 col-sm-5 col-12">
              <div class="logo">
                <img src="assets/dist/img/logo.png" alt="" class="img-fluid" />
              </div>
              <div class="social mt-4">
                <div class="box">
                  <i class="fa fa-facebook" />
                </div>
                <div class="box">
                  <i class="fa fa-twitter" />
                </div>
                <div class="box">
                  <i class="fa fa-instagram" />
                </div>
              </div>
            </div>
            <div class="col-md-2 col-sm-2 col-12">
              <h3>About Daily Plus</h3>
              <ul class="mt-3 p-0">
                <li><a href="#">About US</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Terms of Services</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div class="col-md-3 col-sm-3 col-12">
              <h3>Contact Us</h3>
              <ul class="mt-3 p-0">
                <li><a href="#"><i class="fa fa-phone pr-3" />+0198737343</a></li>
                <li><a href="#"><i class="fa fa-envelope pr-2" />contact@dailyplus.com</a></li>
                <li><a href="#"><i class="fa fa-map-marker pr-3" />Floor 4, Wakil Tower</a></li>
              </ul>
            </div>
            <div class="col-md-2 col-sm-2 col-12">
              <h3>App Download</h3>
              <ul class="mt-3 p-0">
                <li><a href="#"><img class="img-fluid" src="assets/dist/img/play.png" alt="" /></a></li>
                <li><a href="#"><img class="img-fluid" src="assets/dist/img/app.png" alt="" /></a></li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-6 col-12">
              <p>Copyright 2020 © Daily Plus</p>
            </div>
            <div class="col-md-6 col-sm-6 col-12">
              <div class="payment-info">
                <ul>
                  <li style={{background: 'transparent'}}><span>Payment Methods</span></li>
                  <li><a href><img src="assets/dist/img/Cash%20on%20delivery.png" alt="" /></a></li>
                  <li><a href><img src="assets/dist/img/BKash-bKash-Logo%202.svg" alt="" /></a></li>
                  <li><a href><img src="assets/dist/img/visa-logo-CF29426B98-seeklogo.svg" alt="" /></a></li>
                  <li><a href><img src="assets/dist/img/mastercard-logo-38C4789CCA-seeklogo.svg" alt="" /></a></li>    
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;