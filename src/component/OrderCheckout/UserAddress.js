
import { Nav, Dropdown, Tab, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import * as addressAction from "../../store/actions/actionAddress";
import plusIcon from "../../assets/img/plus-icon.png";
import { useHistory, useLocation } from "react-router";
const UserAddress = (props) => {
    const dispatch=useDispatch()
    const history=useHistory()
    const token = useSelector((state) => state.auth.accessToken);
    const onCurrentAddressAction = (latitude, longitude, token) =>
    dispatch(addressAction.getReverseGeoCode(latitude, longitude, token));
    const onAddressCheckout = (path) => dispatch(addressAction.onAddressCheckout(path));

    let location = useLocation();
    const onNewLocation = () => {
        onAddressCheckout(location.pathname);
        history.push("/location");
      };
      const onSelectedAddress = (address) =>
    dispatch(addressAction.onAddressSelected(address));
      const currentPosition = () => {
        const options = {
          enableHighAccuracy: true,
          timeout: 50000,
          maximumAge: 0,
        };
    
        const render = (pos) => {
          const { latitude, longitude } = pos.coords;
    
          onCurrentAddressAction(latitude, longitude, token);
        };
        const notFound = (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        };
    
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(render, notFound, options);
        } else {
       
        }
      };
    const userAddress = useSelector((state) => state.address.userAddress);

    const adressChange = (address) => {
        onSelectedAddress(address);
    if (props.onGetTimeSlots) {
      props.onGetTimeSlots(address.location.lat, address.location.lng);
    }
     
      };
    return ( 

        <Dropdown className="addresschange-link ">
                <Dropdown.Toggle as="a" variant="success" id="dropdown-basic">
                  Change Address
                </Dropdown.Toggle>

                <Dropdown.Menu
                  as="ul"
                 className="checkoutAddress"
             
                >
                  <Dropdown.Item  as="li">
                    <a
                      onClick={currentPosition}
                      className="d-flex ml-2 align-items-center "
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
                    </a>
                  </Dropdown.Item>
                  {userAddress.map((address, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => adressChange(address)}
                      as="li"
                    >
                      <a>
                        <h6 className="my-0 mx-2 p-0">{address.title}<br/></h6>
                        
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
                      <img src={plusIcon} /> <span>Add New Address </span>
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
     );
}
 
export default UserAddress;