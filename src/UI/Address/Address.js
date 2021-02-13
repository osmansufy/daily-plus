import homeIcon from "../../assets/img/home.png";
import changeIcon from "../../assets/img/change.png";
import plusIcon from "../../assets/img/plus-icon.png";
import workIcon from "../../assets/img/home_fill_24px.svg";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useEffect, useCallback, useState, useRef } from "react";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionAddress from "../../store/actions/actionAddress";
import { Modal, Popover, NavDropdown, Button, Dropdown } from "react-bootstrap";
import RemoveModal from "../Modal/RemoveModal";
const Address = (props) => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address.userAddress);
  const token = useSelector((state) => state.auth.accessToken);
  const onAddress = useCallback(
    (add) => dispatch(actionAddress.onAddressSelected(add)),
    []
  );
  // const addAddress=dispatch(()=>actionAddress.onAddAddress())
  const addAddress = (edit) => dispatch(actionAddress.onAddAddress(edit));

  const deleteAddress = (token, id) =>
    dispatch(actionAddress.onAddressDelete(token, id));
  const onSelectedAddress = (address) =>
    dispatch(actionAddress.onAddressSelected(address));

  const [smShow, setSmShow] = useState(false);

  const editAddress = (add) => {
    onAddress(add);

    props.history.push("/location");
  };
  const onAddLocation = () => {
      const addInfo={
          is_home:false,
          is_office:false,
          title:""
      }
    addAddress(addInfo);
    props.history.push("/location");
  };
  const onSignIn = () => {
    props.history.push("/signup");
  };
  const onDeleted = (token, add) => {
    deleteAddress(token, add.id);
    setSmShow(false);
  };
  const onHome = (token, add) => {
    setSmShow(false);
  };
  const foundHome = (add) => {
    return add?.is_home == true;
  };
  const homeAddress = address.find(foundHome);
  const foundOffice = (add) => {
    return add?.is_office == true;
  };
  const office=address.find(foundOffice)
 const onSelectedOffice=()=>{
    const addInfo={
        is_home:false,
        is_office:true,
        title:"Work"
    } 
    addAddress(addInfo);
    props.history.push("/location");
 }
 const onSelectedHome=()=>{
    const addInfo={
        is_home:true,
        is_office:false,
        title:"Home"
    } 
    addAddress(addInfo);
    props.history.push("/location");
 }
 
  console.log('homeAddress',homeAddress)
  return (
    <Dropdown.Menu className="super-colors addressModal">
      <h3 className="mx-5 my-3">Select Delivery Address</h3>
      <NavDropdown.Divider />
      {token ? (
        <div>
          <Dropdown.Item onClick={props.onCurrent} className="d-flex address ">
            <div className="d-flex align-items-center ">
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
          <NavDropdown.Divider />
          {homeAddress ? (
            <Dropdown.Item
              className="d-flex address "
              onClick={() => onSelectedAddress(homeAddress)}
              as="div"
            >
              <img src={homeIcon} />
              <div className="address-info">
                <h4 className="name">{homeAddress.title}</h4>
                <h4 className="address-area">{homeAddress.address}</h4>
                <h5 className="address-status">
                  Currently selected as delivery address
                </h5>
              </div>
              <a
                onClick={() => editAddress(homeAddress)}
                className="changeAddress"
              >
                <img src={changeIcon} />
              </a>
              <a className="mr-2" onClick={() => setSmShow(true)}>
                <i className="fa fa-trash-o"></i>
              </a>

              <RemoveModal
                show={smShow}
                onHome={onHome}
                onDelete={() => onDeleted(token, homeAddress)}
                hide={() => setSmShow(false)}
              >
                <h5 className="w-100">Are You Sure to delete this Address</h5>
              </RemoveModal>
            </Dropdown.Item>
          ):<Dropdown.Item
          className="d-flex address "
          onClick={() => onSelectedHome()}
          as="div"
        >
          <img src={homeIcon} />
          <div className="address-info">
            <h4 className="name">Home</h4>
            <h4 className="address-area">Add Your Home Address</h4>
            
          </div>
        
         

         
        </Dropdown.Item>}
          <NavDropdown.Divider />
          {office ? (
              <Dropdown.Item
              className="d-flex address "
              onClick={() => onSelectedAddress(office)}
              as="div"
            >
              <img src={workIcon} />
              <div className="address-info">
                <h4 className="name">{office.title}</h4>
                <h4 className="address-area">{office.address}</h4>
                <h5 className="address-status">
                  Currently selected as delivery address
                </h5>
              </div>
              <a
                onClick={() => editAddress(office)}
                className="changeAddress"
              >
                <img src={changeIcon} />
              </a>
              <a className="mr-2" onClick={() => setSmShow(true)}>
                <i className="fa fa-trash-o"></i>
              </a>
    
              <RemoveModal
                show={smShow}
                onHome={onHome}
                onDelete={() => onDeleted(token, office)}
                hide={() => setSmShow(false)}
              >
                <h5 className="w-100">Are You Sure to delete this Address</h5>
              </RemoveModal>
            </Dropdown.Item>
            
          ):<Dropdown.Item
          className="d-flex address "
          onClick={() => onSelectedOffice()}
          as="div"
        >
          <img src={workIcon} />
          <div className="address-info">
            <h4 className="name">Work</h4>
            <h4 className="address-area">Add Work Address</h4>
            
          </div>
          
          

        
        </Dropdown.Item>}
        <NavDropdown.Divider />
          {address
            .filter((add) => !add.is_home && !add.is_office)
            .map((add) => (
              <>
                <Dropdown.Item
                  className="d-flex address "
                  onClick={() => onSelectedAddress(add)}
                  key={add.id}
                  as="div"
                >
                  <i className="fa fa-map-marker" aria-hidden="true"></i>

                  <div className="address-info">
                    <h4 className="name">{add.title}</h4>
                    <h4 className="address-area">{add.address}</h4>
                    <h5 className="address-status">
                      Currently selected as delivery address
                    </h5>
                  </div>
                  <a onClick={() => editAddress(add)} className="changeAddress">
                    <img src={changeIcon} />
                  </a>
                  <a className="mr-2" onClick={() => setSmShow(true)}>
                    <i className="fa fa-trash-o"></i>
                  </a>

                  <RemoveModal
                    show={smShow}
                    onHome={onHome}
                    onDelete={() => onDeleted(token, add)}
                    hide={() => setSmShow(false)}
                  >
                    <h5 className="w-100">
                      Are You Sure to delete this Address
                    </h5>
                  </RemoveModal>
                </Dropdown.Item>

                <NavDropdown.Divider />
              </>
            ))}
          <Dropdown.Item className="d-flex address " as="div">
            <a
              onClick={onAddLocation}
              type="button"
              className="btn btn-primary btn-custom btn-lg btn-block"
            >
              <img src={plusIcon} /> <span>Add New Address </span>
            </a>
          </Dropdown.Item>
        </div>
      ) : (
        <Dropdown.Item className="d-flex address " as="div">
          <a
            onClick={onSignIn}
            type="button"
            className="btn btn-primary btn-custom btn-lg btn-block"
          >
            <img src={plusIcon} /> <h6 className="text-white text-center flex-grow-1">Please SignUp First</h6>
          </a>
        </Dropdown.Item>
      )}
    </Dropdown.Menu>
  );
};

export default withRouter(Address);
