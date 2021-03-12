import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import SinglePopuler from "../component/SinglePopuler";
import * as productActions from "../store/actions/actionProducts";
import axios from "../axios";
import Spinner from "../container/Spinner/Spinner";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useHistory } from "react-router";
import SingleCategory from "../component/SingleCategory";
import { Dropdown, Nav, SplitButton ,Tab} from "react-bootstrap";
import LoadingImage from "../UI/LoadingImage";
import emptyImg from "../assets/img/emptyImg.png";
import deliveryIcon from "../assets/img/delivery-icon.png";
const CategoryPage = (props) => {
  const [onCatProducts, setOnCatProducts] = useState([]);
  const [onSubCatProducts, setOnSubCatProducts] = useState([]);
  const [onBrands, setOnBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subName, setSubName] = useState("All");

  const productId = props.match.params.id;

  const settings = {
    infinite: true,
    className: "center",
    centerMode: true,
    centerPadding: "20px",
    centerMargin: "20px",
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
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

          centerMode: false,
          autoplay: true,
        },
      },
    ],
  };

  const onGetCategories = (id) => {
    setLoading(true);
    axios
      .get("catalogue/product/public/?category=" + id)
      .then((response) => {
        setOnCatProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const onGetSubCategories = async (productId) => {
    try {
      let response = await axios.get(`catalogue/category/?parent=${productId}`);
      console.log(response.data);
      return response;
    } catch (e) {
      console.log(e);
    }
    //  await axios.get(`catalogue/category/?parent=${productId}`)
    //    .then(response=>{
    // console.log(response);
    // setOnSubCatProducts(response.data)
    //    }).catch(error=>{
    //  console.log(error);
    //    })
  };
  const onGetBrands = (id) => {
    axios
      .get(`catalogue/brand/?category=${id}`)
      .then((response) => {
        console.log(response);
        setOnBrands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    onGetCategories(productId);

    onGetBrands(productId);
    let subData = onGetSubCategories(productId);
    subData.then((response) => {
      setOnSubCatProducts(response.data);
      console.log("response", response.data);
    });
  }, [productId]);

  // useEffect(()=>{

  // let subData= onGetSubCategories(productId)
  // subData.then(response=>{
  //  setOnSubCatProducts(response.data)
  //  console.log('response',response.data);
  // })
  //  }
  //   ,[])
  const onGetSubProducts = (item) => {
    onGetCategories(item.id);
    onGetBrands(item.id);
    setSubName(item.name);
  };
  const onGetAllProducts = () => {
    onGetCategories(productId);
    onGetBrands(productId);
    setSubName("All");
  };
  const cats = onSubCatProducts.map((item, index) => {
    return (
      <a onClick={() => onGetSubProducts(item)}>
        <div className="card border-0 category-card">
          <div className="category_img">
            {/* <img
              loading="lazy"
              width="97"
              height="103"
              src={
                props.data.thumbnail_image_url
                  ? props.data.thumbnail_image_url
                  : props.data.image
                  ? props.data.image
                  : emptyImg
              }
              alt="category-img"
            /> */}
            <LoadingImage
              emptyImg={emptyImg}
              imageClass=""
              width="97"
              height="103"
              realImage={
                item?.thumbnail_image_url
                  ? item.thumbnail_image_url
                  : item.image
                  ? item.image
                  : emptyImg
              }
            />
          </div>

          <h6>{item.name}</h6>
        </div>
        {/* <SingleCategory data={item} key={index} /> */}
      </a>
    );
  });
  const onFilterBrand = (brand) => {
    setLoading(true);
    axios
      .get(`catalogue/product/public/?brand=${brand}`)
      .then((response) => {
        setOnCatProducts(response.data);
        console.log("brandProduct", response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
    console.log(brand);
  };
  console.log("onCatProducts", onCatProducts);
  console.log("onSubCatProducts", onSubCatProducts);
  console.log("onBrands", onBrands);
  return (
    <div className="custom_page">
      <section>
        <div className="container">
          <div className="offset-sm-3">
            <h2 className="section-title ">{props.match.params.name}</h2></div>
        
       <div className="d-block d-sm-none my-2 phone-category"> 
       <Nav variant="pills" defaultActiveKey="all" className="flex-nowrap">

                  <Nav.Item  className="p-0" >
                  <Nav.Link
                          className="linkBrand text-center m-2 p-0 "
                          eventKey="all"
                          onClick={() => onGetAllProducts()}
                       
                        >  All
                        </Nav.Link>
                </Nav.Item>
                    {onSubCatProducts.map((subCat) => (
                      <Nav.Item className="p-0">
                        <Nav.Link
                          className="linkBrand text-center m-2 p-0"
                          key={subCat.id}
                          onClick={() => onGetSubProducts(subCat)}
                          eventKey={subCat.id}
                        >
                            {subCat.name}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                    
                  </Nav>
                  <hr/>
                  </div>
                  <div className="d-block d-sm-none phone-brand"> 
                  <Nav variant="pills" className="flex-nowrap">
                  {onBrands.map((brand) => (
                      <Nav.Item className=" px-1">
                        <Nav.Link
                          className="px-0"
                          key={brand.id}
                          onClick={() => onFilterBrand(brand.id)}
                          eventKey={brand.id}
                        >
                          {brand.title}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
      </Nav>
      </div>
          <div className="row">
            <div className="col-md-3 d-none d-sm-block col-4">
              <div className="border p-3">
              <h5 className="m-3 ">Filter By Brand</h5>
                <div className="brandFilterWrapper">
                  

                  <Nav variant="pills" className="flex-column">
                    {onBrands.map((brand) => (
                      <Nav.Item>
                        <Nav.Link
                          className="linkBrand"
                          key={brand.id}
                          onClick={() => onFilterBrand(brand.id)}
                          eventKey={brand.id}
                        >
                          {brand.title}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </div>
                <hr/>
                <h5 className="m-3 ">Sub Category</h5>
                <div className="mt-4 brandFilterWrapper">
                 
                  

                  <Nav variant="pills" className="flex-column">
                  <Nav.Item  >
                  <Nav.Link
                          className="linkBrand"
                        
                          onClick={() => onGetAllProducts()}
                       
                        >  All
                        </Nav.Link>
                </Nav.Item>
                    {onSubCatProducts.map((subCat) => (
                      <Nav.Item>
                        <Nav.Link
                          className="linkBrand"
                          key={subCat.id}
                          onClick={() => onGetSubProducts(subCat)}
                          eventKey={subCat.id}
                        >
                            {subCat.name}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </div>
              </div>
            </div>
            <div className="col-md-9 col-12">
            
              <div className="row">
                {loading ? (
                  <Spinner />
                ) : (
                  onCatProducts.length > 0 &&
                  onCatProducts.map((item, index) => (
                    <SinglePopuler
                      //  clicked={()=>productHandler(item)}
                      containerClass="mt-4 col-md-3 col-6"
                      data={item}
                      key={item.id}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
