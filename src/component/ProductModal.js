import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "./ProductModal.css";
import bagIcon from "../assets/img/bag_white.png";
import tagIcon from "../assets/img/tag.png";
import * as productActions from "../store/actions/actionProducts";
import * as cartActions from "../store/actions/actionCart";
import SinglePopuler from "./SinglePopuler";
import ButtonQuantity from "../UI/Button/ButtonQtn";
import Spinner from "../container/Spinner/Spinner";
import { Modal } from "react-bootstrap"

const Product = (props) => {
  // const {details}=props
  const [itemCount, setItemCount] = useState(0);
  const catProductLists = useSelector((state) => state.products.CatProducts);
  const error = useSelector((state) => state.products.error);
  const details = useSelector((state) => state.products.productDetails);
  const catLoading = useSelector((state) => state.products.catloading);
  const bagLists = useSelector((state) => state.carts.cartProducts);
  console.log(details.unit_quantity);
  const dispatch = useDispatch();

  const onCartAdd = (item) => dispatch(cartActions.cartAction(item));
  const onCartUpdate = (id, units) =>
    dispatch(cartActions.updateCartUnits(id, units));
  const onCartDel = (id, unit_quantity) =>
    dispatch(cartActions.deleteCartProduct(id, unit_quantity));
  const isCart = (product) => {
    return product.id === details.id;
  };
  const bagItem = bagLists.find(isCart);
  console.log(details);
  const onCartHandler = (item) => {
    onCartAdd(item);
  };
  const onAddCartHandler = (item) => {
    console.log(item);

    onCartUpdate({ id: item.id, count: bagItem.count + 1 });
  };
  const OnSubHandler = (item) => {
    console.log(item);
    if (bagItem.count === 1) {
      onCartDel({ id: item.id, count: 0 });
    } else {
      onCartUpdate({ id: item.id, count: bagItem.count - 1 });
    }
  };

  let cartButton = (
    <a
      id="bag"
      onClick={() => onCartHandler(details)}
      className="btn add-to-bag-btn"
    >
      <img src={bagIcon} />
      Add to Bag
    </a>
  );

  if (bagItem && bagItem.count >= 1) {
    cartButton = (
      <ButtonQuantity
        id="cart"
        subClicked={() => OnSubHandler(details)}
        addClicked={() => onAddCartHandler(details)}
      >
        <div className="show-quantity">
          <h6 className="m-0">{bagItem && bagItem.count}</h6>
        </div>
      </ButtonQuantity>
    );
  }

  console.log(error);

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          swipeToSlide: true,
          centerMode: false,
        },
      },
    ],
  };
let price=details && details.inventory_list && details.inventory_list[0] && details.inventory_list[0]?.unit_price_final;
let discount=details && details.inventory_list && details.inventory_list[0] && details?.inventory_list[0]?.discount
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="product-modal"
    >
      {/* <div className={attachClasses.join(' ')} > */}

      <Modal.Header>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span onClick={props.onHide}>×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12">
              <div className="single-product-img">
                {
                  <img
                    className="img-fluid"
                    src={details.image_list && details.image_list[0].image_url}
                    alt=""
                  />
                }
              </div>
              <div className="gallery-img mt-4">
                <div className="gallery-img-container">
                  <img
                    className="img-fluid"
                    src="dist/img/Rectangle2.svg"
                    alt=""
                  />
                </div>
                <div className="gallery-img-container">
                  <img src="dist/img/image 3.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-12">
              <div className="single-product-details">
                <h6 className="mt-2 mb-2">{details.description}</h6>
                <div className="price">
                  <h6 className="sell-price">
                    {price}
                    <span className="regular-price">
                      {discount ? price+discount :""  }
                    </span>
                  </h6>
                </div>
                {cartButton}
                <hr />
                {details?.is_fast ?(<div className="mt-3 d-flex"><svg width={24} height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.9916 6.70691C17.1858 6.74626 17.3777 6.79544 17.5646 6.85692C17.5006 6.11179 17.0358 2.31728 14.1684 1.25C13.9865 1.973 13.8881 2.71567 13.8733 3.46326C14.7611 4.32889 15.4521 5.37404 15.8997 6.52985C16.2686 6.55198 16.635 6.611 16.9916 6.70691Z" fill="#37474F" fillOpacity="0.54" />
                <path d="M4.41033 21.7448C4.46443 21.7595 4.50132 21.8087 4.49886 21.8628C4.49886 22.3915 4.91938 22.7998 5.27104 23.0457C5.36941 23.1194 5.47515 23.1834 5.58336 23.2399H12.9732C12.892 22.2833 11.9379 22.1727 11.9084 22.1727H9.6951C9.62624 22.1776 9.56722 22.1284 9.5623 22.0595C9.55738 21.9907 9.60657 21.9317 9.67297 21.9267C10.4574 21.7743 11.5739 21.2431 12.4445 19.5856C12.6043 19.2881 12.7371 18.9757 12.8355 18.6511C13.0937 17.9281 13.015 17.1264 12.6215 16.4649C11.7436 15.0804 9.55001 14.7164 9.53033 14.7164C9.46394 14.7066 9.41721 14.6427 9.42705 14.5763C9.43934 14.5099 9.50082 14.4632 9.56722 14.473C9.66313 14.4877 11.8936 14.8566 12.8281 16.3321C13.256 17.0453 13.347 17.9109 13.074 18.6979C13.1724 19.8217 13.3962 21.13 13.5658 22.035C13.6937 22.7457 14.3183 23.2621 15.0413 23.2498H17.6407C17.3161 22.121 15.8529 22.3325 15.7889 22.3325C15.7299 22.3423 15.6734 22.3055 15.6537 22.2489C15.5873 22.062 14.0675 17.4215 15.6291 16.4059C17.0382 15.4886 16.4406 12.8868 16.4406 12.8622C16.4283 12.8155 16.4455 12.7639 16.4849 12.7344C16.5242 12.7073 16.5783 12.7073 16.6177 12.7344C17.4563 13.1991 19.9351 12.9827 20.9975 11.9376C21.5311 11.4138 21.6024 10.7867 21.2139 10.0489C19.8343 7.4668 16.9792 6.94545 16.9374 6.94545C16.6275 6.8643 16.3127 6.81266 15.9955 6.78807C16.0816 7.02415 16.1529 7.26515 16.207 7.51106C16.2193 7.57746 16.175 7.6414 16.1086 7.6537H16.1062C16.0398 7.66599 15.9783 7.62173 15.966 7.55779C15.9537 7.49877 14.793 1.81562 8.24664 1.3828C9.16146 4.28217 11.3673 6.59379 14.22 7.64386C14.2888 7.65616 14.3331 7.72009 14.3233 7.78649C14.3134 7.85289 14.247 7.90207 14.1782 7.88978C14.1634 7.89224 14.1487 7.89224 14.1339 7.88978C13.8609 7.78649 13.5954 7.67337 13.3494 7.55533C12.7838 8.10373 12.469 8.93247 12.4125 10.0145C12.4149 10.0243 12.5207 11.1138 10.9542 11.3154C10.8485 11.3277 10.6935 11.3425 10.5017 11.3572C8.81471 11.4949 3.72668 11.9179 2.32003 15.8206H2.30036C2.30282 15.8378 2.30282 15.8575 2.30036 15.8747C2.18969 16.2879 2.10608 16.7108 2.05444 17.1363C1.5872 20.8964 4.27753 21.7276 4.41033 21.7448ZM17.3653 8.93493C17.3653 8.5267 17.6948 8.19717 18.103 8.19717C18.5112 8.19717 18.8408 8.5267 18.8408 8.93493C18.8408 9.34315 18.5112 9.67268 18.103 9.67268C17.6948 9.67268 17.3653 9.34315 17.3653 8.93493Z" fill="#37474F" fillOpacity="0.54" />
                <path d="M18.1028 9.42676C18.3785 9.42676 18.602 9.20325 18.602 8.92755C18.602 8.65184 18.3785 8.42833 18.1028 8.42833C17.8271 8.42833 17.6036 8.65184 17.6036 8.92755C17.6036 9.20325 17.8271 9.42676 18.1028 9.42676Z" fill="#37474F" fillOpacity="0.54" />
              </svg> <h5 className="ml-2">Fast Delivery</h5> </div>) :"" } 
                <div className="product-tags">
                  <div className="tag-icon">
                    <img src={tagIcon} />
                  </div>
                  <div className="tags">
                    
                    <a className="btn tag-btn">{details.brand}</a>
                   
                  </div>
                  
                </div>
                
                <div className="product-info">
                  <div className="product-dt">
                    <h5 className="mt-2">Product Details</h5>
                    <p>
                     {details?.description}
                    </p>
                  </div>
                  <div className="product-dt">
                    <h5 className="mt-2 ">Brand</h5>
                    <p>
                     {details?.brand}
                    </p>
                  </div>
                  <div className="product-dt">
                    <h5 className="mt-2">More Information</h5>
                    <p>
                      Et quidem faciunt, ut summum bonum sit extremum et
                      rationibus conquisitis de voluptate. Sed ut summum bonum
                      sit id,
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-12">
              <h4 className="modal-title">Related Items</h4>
            </div>
          </div>
          <Slider {...settings}>
            {catProductLists && !catLoading && error == null ? (
              catProductLists
                .filter((el) => el.id != details.id)
                .map((product, index) => (
                  <SinglePopuler data={product} key={index} />
                ))
            ) : catLoading && error == null ? (
              <Spinner />
            ) : (
              <h2>{error}</h2>
            )}
          </Slider>
        </div>
      </Modal.Footer>

      {/* </div> */}
      {/* <div className={overlayClasses.join(' ')}onClick={props.modalClosed} >
  </div> */}
    </Modal>
  );
};

export default Product;
