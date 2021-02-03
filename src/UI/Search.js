import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import "./search.css";
import bagIcon from "../assets/img/bag_white.png";
import genieImg from "../assets/img/Genie.png";
import genielamp from "../assets/img/genie-lamp.png";
import GenieSmall from "../assets/img/GenieSmall.png";
import info from "../assets/img/info_24px.png";
import Spinner from "../container/Spinner/Spinner";
import { useHistory } from "react-router";
const Search = (props) => {
  const [searchEnter, setSearchEnter] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef();
  const history = useHistory();
  console.log(searchResult);
  console.log(searchEnter);

  const getPreOrders = () => {
    if (searchEnter !== "") {
      const timer = setTimeout(() => {
        setShowResult(false);
        if (searchEnter === inputRef.current.value) {
          const query = searchEnter.length === 0 ? "" : `?token=${searchEnter}`;

          Axios.get(
            "https://api.dailyplus.store/v0/catalogue/product/public/" + query
          ).then((response) => {
            setsearchResult(response.data);
            setShowResult(true);
          });
        }
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }
  };
  const onGenieForm = () => {
    history.push("/genie/form");
    // setShowResult(false)
    setSearchEnter("");
  };
  useEffect(() => {
    getPreOrders();
  }, [searchEnter, inputRef]);

  const onSearchClose = () => {
    setSearchEnter("");
    props.closed();
  };
  const onProductSelect = (id) => {
    setSearchEnter("");
    history.push("/product/" + id);
  };

  let products = "";
  if (showResult && searchEnter.length > 0) {
    products = (
      <div className="search-container" id="searchContainer">
        <div className="search-result" id="searchResult">
          <h6 className="mb-4">Search Result </h6>
          {searchResult.length > 0 ? (
            <ul>
              {searchResult.map((product) => (
                <>
                  <li >
                    <a className="my-2" onClick={() => onProductSelect(product.id)}>
                      <div className="search-result-list w-100">
                        <div className="search-result-list-img mr-2">
                          <img
                            src={
                              product.image_list[0] &&
                              product.image_list[0].thumbnail_image_url
                            }
                            alt="true"
                          />
                        </div>
                        <div className="search-result-list-detail my-md-3">
                          {/* <button className="btn recommended-btn mb-2">Recommended</button> */}
                          <h6>
                            {product && product.name}--
                            {product && product.unit_name}
                          </h6>
                          <p className="regular-price m-0 mt-md-2"></p>
                          <div className="sell-price m-0 mt-md-2">
                            ট{" "}
                            {product.inventory_list[0] &&
                              product.inventory_list[0].unit_price_final}
                          </div>
                        </div>
                        <div className="search-result-list-btns">
                          <div className="search-result-list-btn-cart d-flex">
                            <i className="fa fa-heart-o mr-2" />
                            <button className="btn search-btn btn-primary mb-1">
                              <img className="mr-md-3" src={bagIcon} />{" "}
                              <span className="flex-grow-1">Add</span>{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                    <hr />
                  </li>
                  {(product.inventory_list[0] &&
                    product.inventory_list[0].status == 3) ||
                  (product.inventory_list[0] &&
                    product.inventory_list[0].status == 4) ? (
                    <li className="my-2">
                      <a
                        onClick={onGenieForm}
                        className="d-flex justify-content-between"
                      >
                        <img src={GenieSmall} className="mr-3" />
                        <div className="newGenieInfo">
                          <h4>
                            Didn’t find the product you’re looking for? Ask
                            Genie!
                          </h4>
                          <p>Genie will deliver it to your address.</p>
                          <div className="d-flex justify-content-around">
                            <button
                              type="button"
                              className="btn btn-genie w-75 btn-warning"
                            >
                              <img src={genielamp} />
                              <span className="flex-grow-1">
                                Ask Genie
                              </span>{" "}
                            </button>
                            <img src={info} />
                          </div>
                        </div>
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </ul>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="genieImg my-2">
                <img src={genieImg} />
              </div>
              <div className="genieinfo">
                <h5>Didn’t find the product you’re looking for? Ask Genie!</h5>
                <p>Genie will deliver it to your address.</p>
                <p className="genip">
                  You can also add out of stock product to Genie List.
                </p>
              </div>
              <button
                onClick={onGenieForm}
                className="btn geniebtn w-80 mx-auto d-flex  align-items-center btn-primary"
              >
                <i className="fas fa-plus mr-2"></i>
                <span>Add to Genie List</span>
              </button>
            </div>
          )}
        </div>
        {/* Search End */}
      </div>
    );
  }
  return (
    <div className={props.className}>
      {/* <span onClick={onSearchClose} className="search-close">
        ×
      </span> */}
      <div className="input-group search-custom md-form form-sm form-2 border-0 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text border-0 bg-none" id="basic-addon1">
            <i className="fa fa-search text-grey" aria-hidden="true" />
          </span>
        </div>
        <input
          className=" form-control my-0 py-md-1 border-0  bg-search"
          ref={inputRef}
          value={searchEnter}
          onChange={(event) => setSearchEnter(event.target.value)}
          type="search"
          placeholder="Search Products"
        />
        {/* <span className="custom-serach" id="basic-text1"><i className="fa fa-search text-grey" aria-hidden="true" /></span>
      <div className="input-group-append">
      </div> */}
      </div>
      {/* Search Result */}
      {products}
    </div>
  );
};

export default Search;
