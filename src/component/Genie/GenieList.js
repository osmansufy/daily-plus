import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import genieImg from '../../assets/img/Genie.png'
import next from '../../assets/img/arrow_forward_24px.svg'
import Spinner from '../../container/Spinner/Spinner';
import axios from '../../axios'
import './GenieList.css'
import { Button ,Dropdown} from 'react-bootstrap'
import * as addressAction from "../../store/actions/actionAddress";
import GenieModal from './GenieModal'
import SuccessModal from '../../UI/Modal/SuccessModal'
const GenieList = () => {

    const history =useHistory()
    const dispatch=useDispatch()
    const [modalShow,setModalShow]=useState(false)
    const [loading,setLoading]=useState(false)
   const [genieItems,setGenieItems]=useState([])
   const usersToken=useSelector(state=>state.auth.accessToken)
   const userInfo=useSelector(state=>state.auth.userdetails)
   const userAddress=useSelector(state=>state.address.userAddress)
   const currentAddress = useSelector((state) => state.address.addreessCurrent);
   const onSelectedAddress = (address) =>
    dispatch(addressAction.onAddressSelected(address));
    const onCurrentAddressAction = (latitude, longitude, usersToken) =>
    dispatch(addressAction.getReverseGeoCode(latitude, longitude, usersToken));
    const onAddressCheckout = (path) => dispatch(addressAction.onAddressCheckout(path));
   const [show, setShow] = useState(false);
   const onHide=()=>{
    history.push('/signup')
}
   const onGenieForm=()=>{
     if (usersToken) {
      history.push('/genie/form')
     }else{
      setShow(true)
     }
    
   //  history.push('/')
  
     }
     const adressChange = (address) => {
      onSelectedAddress(address);
    };
    const onNewLocation = () => {
      onAddressCheckout('/genie');
      history.push("/location");
    };
    const currentPosition = () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0,
      };
  
      const render = (pos) => {
        const { latitude, longitude } = pos.coords;
  
        onCurrentAddressAction(latitude, longitude, usersToken);
      };
      const notFound = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(render, notFound, options);
      } else {
      }
    };
   useEffect(()=>{
         
         setLoading(true)
         axios.get('order/genielist/items/',{
             headers: {
                 Authorization: `JWT ${usersToken}`,
               },
          })
          .then(response=>{
              console.log(response)
              setGenieItems(response.data)
              setLoading(false)
          })
          .catch(error=>{
              console.log(error)
              setLoading(false)
          })
     },[])


     const onAfterOrder=()=>{
      setModalShow(false)
      history.push('/')
     }
     
     const onSendGenieOrder=(event)=>{
        event.preventDefault()
        const genieOrderSend={
             owner:userInfo.id,
             cart:genieItems[0].cart,
             // payment_method: orderInformation.paymentMethod,
             recipient_phone: userInfo.phone,
             recipient_address: userAddress[0].address,
             recipient_point: `{"lat":${userAddress[0].location.lat},"lng":${userAddress[0].location.lng}}`
           }
           axios.post('order/genielist/order/',genieOrderSend,{
            headers:{
             Authorization: `JWT ${usersToken}`,
            }
        })
        .then(response=>{
         console.log(response)
         console.log(genieOrderSend)
          setModalShow(true)
        })  
     }
     const onMoreList=()=>{
        history.push('/genie/form')
     }
    return ( 
        <>
        {loading ? <Spinner /> : genieItems.length>0 && !loading ? <div className="row">
       
        {genieItems.length>0 && genieItems.map((item, index)=>(
        <div key={index} className="d-flex geineItems mx-auto col-md-12">
            <div  className="gOimage">
            <img  className="w-100 h-100" src={item.image} alt="genie-img" />
            </div>
            <div  className="quantity ml-3">
              <p  className="m-0">{item.name}</p>
              <p  className="unit mt-2">{item.unit_name}</p>
  
            
           
            </div>
            <div>
            
            </div>
            
          </div>
        ))}
        <button onClick={onMoreList} className="btn view-all-product-btn">Add More Products</button>
        <div className="delivery-address d-flex align-items-center flex-sm-nowrap flex-wrap m-4">
          <div className=" mt-3">
            <h6>Delivery Address </h6>
            <div className="d-flex">
              <div className="address-icon mr-3">
                <i className="fa fa-map-marker" aria-hidden="true" />
              </div>
              <div className="address-right">
                <h6>{currentAddress && currentAddress.title}</h6>
                <p>{currentAddress && currentAddress.address}</p>
              </div>
            </div>
          </div>
          <Dropdown className="addresschange-link ">
            <Dropdown.Toggle as="a" variant="success" id="dropdown-basic">
              Change Address
            </Dropdown.Toggle>

            <Dropdown.Menu as="ul" className="preChangeAddress">
              <Dropdown.Item>
                <div
                  onClick={currentPosition}
                  className="d-flex align-items-center "
                >
                  <input
                    type="radio"
                    id="current"
                    name="drone"
                    checked
                    value="current"
                  />
                  <label for="current" className="my-0 mx-3">
                    Current Location
                  </label>
                </div>
              </Dropdown.Item>
              {userAddress.map((address, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => adressChange(address)}
                  as="li"
                  href="#/action-1"
                >
                  <a>
                    <h6 className="my-0 mx-2 p-0">
                      {address.title}
                      <br />
                    </h6>

                    <small>{address.address}</small>
                  </a>
                </Dropdown.Item>
              ))}
              <Dropdown.Item as="li">
                <a
                  onClick={onNewLocation}
                  type="button"
                  className="btn btn-primary btn-custom btn-lg btn-block"
                >
                  {/* <img src={plusIcon} /> */}
                  <span>Add New Address </span>
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Button type="submit" onClick={onSendGenieOrder}  className="w-100 mt-3 d-flex align-items-center" variant="primary"><span className="flex-grow-1"> Send List to Genie </span><img src={next} /></Button>
        </div> 
 :  <div className="d-flex flex-column justify-content-center align-items-center">
 <div className="genieImg my-2">
     <img  src={genieImg} />
 </div>
 <div className="genieinfo">
  <h5>Didn’t find the product you’re looking for? Ask Genie!</h5>
  <p>Genie will deliver it to your address.</p>
  <p className="genip">You can also add out of stock product to Genie List.</p>
 </div>
 <button onClick={onGenieForm} className="btn geniebtn w-80 mx-auto d-flex  align-items-center btn-primary"><i className="fas fa-plus mr-2"></i><span>Add to Genie List</span></button>
</div>}
<GenieModal
        show={modalShow}
        onHide={onAfterOrder}
      />

<SuccessModal show={show} hide={onHide} >
    <p className="text-warning">Please SignUp before Order</p>
</SuccessModal>
        </>
     );
}
 
export default GenieList;