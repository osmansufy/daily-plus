import paymentImg from '../assets/img/allPayment.png'
const AboutUs = () => {
    return ( 
<section className="custom_page">
<>
  {/* Hello world */}
  <section className="about-section py-3 bg-success">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <article className="about-banner-info">
            <h2>Get groceries delivered easily with DailyPlus App</h2>
            <p className="mt-md-5">
              Dailyplus Limited is an e-commerce business that delivers on
              promises everyday. We want to bring convenience in our customers
              life with quality products, on-time delivery, hygiene, healthy
              living and green business.
            </p>
            <div className="about-btn-wrapper d-flex mt-md-5">
              <a href="https://play.google.com/store/apps/details?id=com.dingi.dailyplus" target="_blank" className="primary"><img src="assets/images/white_play_button.png" alt /></a>
              <a className="primary mx-3" href="https://apps.apple.com/us/app/id1520548400" target="_blank"><img src="assets/images/white_appstore_button.png" alt /></a>
            </div>
          </article>
        </div>
        <div className="offset-md-2 pt-5 col-md-4">
          <div className="about-banne-img pt-md-5">
            <img src="assets/images/phone.png" alt />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="container my-5 about-features">
    <h2 className="text-center my-4">Features</h2>
    <div className="row">
      <div className="features-wrapper  offset-md-3 mr-3 col-md-3">
        <img src="assets/images/safe_image.png" alt />
        <article>
          <h3 className="my-3">Safe Packaging &amp; Deliver</h3>
          <p className="text-center">
            We ensure full safety while packaging and deliverty the product.
          </p>
        </article>
      </div>
      <div className="features-wrapper col-md-3">
        <img src="assets/images/variety.png" alt />
        <h3 className="my-3">Fresh and quality products only</h3>
        <p className="text-center">
          Find your necessary products from our 1,000’s products.
        </p>
      </div>
      <div className="features-wrapper mt-5 offset-md-3 mr-3 col-md-3">
        <img src="assets/images/calender.png" alt />
        <article>
          <h3 className="my-3">Delivery - Always on-time</h3>
          <p className="text-center">
            Get the delivery on your preferred time by scheduling at any time.
          </p>
        </article>
      </div>
      <div className="features-wrapper mt-5 col-md-3">
        <img src="assets/images/easy_order.png" alt />
        <h3 className="my-3">Easy to Order</h3>
        <p className="text-center">
          All it takes is a few taps to order, and we’ll be at your door.
        </p>
      </div>
      <div className="features-wrapper mt-5 offset-md-3 mr-3 col-md-3">
        <img src="assets/images/wishlist.png" alt />
        <article>
          <h3 className="my-3">Genie List</h3>
          <p className="text-center">
            Add unavailable product to Genie List. Genie will deliver it to your address.
          </p>
        </article>
      </div>
      <div className="features-wrapper mt-5 col-md-3">
        <img src="assets/images/return.png" alt />
        <h3 className="my-3">We listen to you</h3>
        <p className="text-center">
          Out fast and smart customer support team is alyaws ready to help you.
        </p>
      </div>
    </div>
  </section>
  <section className="container px-md-5 about-us">
    <h2 className="text-center my-4">About Us</h2>
    <p className="text-center px-md-5 ">DailyPlus is the trusted online grocery store for your family, friends and colleagues. We take the hassle out of your grocery shopping so that you have more time to focus on your health, education and work. Join us for a life together.</p>
  </section>
  <section className="container text-center contact-us">
    <h2 className=" my-5">Contact us</h2>
    <button className="btn btn-success btn-lg mb-5 mx-auto">Send Messege</button>
    <div className="row">
      <div className="offset-md-1 col-md-3">
        <i className="fa fa-phone" />
        <p>+8809638111444</p>
      </div>
      <div className="col-md-3">
        <i className="fa fa-envelope" />
        <p className="m-0">Customer: customers@dailyplus.store</p>
        <p className="m-0">Suppliers: supplier@dailyplus.store</p>
        <p className="m-0">Career: career@dailyplus.store</p>
      </div>
      <div className="col-md-3">
        <i className="fa fa-map-marker" />
        <p>Floor 4, Wakil Tower, Ta 131, Gulshan Badda Link Road, Dhaka - 1212</p>
      </div>
    </div>
  </section>
  <section className="container">
  <img src={paymentImg} />
  </section>
</>

</section>
     );
}
 
export default AboutUs;