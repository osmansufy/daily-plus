import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "./ProductModal.css";
import bagIcon from "../assets/img/bag_white.png";
import tagIcon from "../assets/img/tag.png";
import * as productActions from "../store/actions/actionProducts";
import * as cartActions from "../store/actions/actionCart";
import SinglePopuler from "./SinglePopuler";
import ButtonQuantity from "../UI/Button/ButtonQtn";
import Spinner from "../container/Spinner/Spinner";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
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
    if (props.count === 1) {
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
                    {details.inventory_list &&
                      details.inventory_list[0].unit_price_final}{" "}
                    <span className="regular-price">
                      {details.inventory_list &&
                        details.inventory_list[0].unit_price}
                    </span>
                  </h6>
                </div>
                {cartButton}
                <hr />
                <div className="product-tags">
                  <div className="tag-icon">
                    <img src={tagIcon} />
                  </div>
                  <div className="tags">
                    <a className="btn tag-btn">Daily Products</a>
                    <a className="btn tag-btn">{details.brand}</a>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-dt">
                    <h5 className="mt-2">Details</h5>
                    <p>
                      {details.inventory_list &&
                        details.inventory_list[0].unit_price}
                      Et quidem faciunt, ut summum bonum sit extremum et
                      rationibus conquisitis de voluptate. Sed ut summum bonum
                      sit id,
                    </p>
                  </div>
                  <div className="product-dt">
                    <h5 className="mt-2 ">Ingredients</h5>
                    <p>
                      Et quidem faciunt, ut summum bonum sit extremum et
                      rationibus conquisitis de voluptate. Sed ut summum bonum
                      sit id,
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
