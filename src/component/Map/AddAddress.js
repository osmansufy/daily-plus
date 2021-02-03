import {Modal,Button,InputGroup,FormControl} from 'react-bootstrap'
import axios from '../../axios'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import locationIcon from '../../assets/img/label_24px.png'
import mapPinned from '../../assets/img/map_pinned.png'
import saveIcon from '../../assets/img/save_24px.png'
import * as addressAction from '../../store/actions/actionAddress'
import SuccessModal from '../../UI/Modal/SuccessModal';
import { useHistory } from 'react-router';
const AddAddress = props => {
    
    const [smShow, setSmShow] = useState(false);
    const[addressName,setAddressName]=useState()
    const[addressArea,setAddressArea]=useState()
    const dispatch=useDispatch()
    
    const history=useHistory()
    
    const onSetAddressArea=(e)=>{
    setAddressArea(e.target.value)
  }
    const onSetAddressName=(e)=>{
    setAddressName(e.target.value)
  }
  const userdetails=useSelector(state=>state.auth.userdetails)
  const token=useSelector(state=>state.auth.accessToken)
  const editedAddress=useSelector(state=>state.address.addressCurrent)
  const isEdit=useSelector(state=>state.address.isEdit)
  const redirectPath=useSelector(state=>state.address.redirectPath)
  const onEditSubmit=(token,address)=>dispatch(addressAction.onAddressEditSubmit(token,address))
  const userNewAddress=(addressDteails,token)=>dispatch(addressAction.onNewAddressSubmit(addressDteails,token))

  

  const onHome=()=>{
    history.push(redirectPath)
  }

  const onAddAddress=()=>{
      if(isEdit){
        const eId=editedAddress.id
        const editInfo={
         location:`{"lat":${editedAddress.location.lat},"lng":${editedAddress.location.lng}}`,
          address:addressArea,
        }
        onEditSubmit(eId,editInfo)
        setSmShow(true)
      }else{
        const addressDteails={
          user:userdetails.id,
          title:addressName,
          is_home:editedAddress.is_home,
          is_office:editedAddress.is_office,
          location:`{"lat":${editedAddress.location.lat},"lng":${editedAddress.location.lng}}`,
          
          address:addressArea,
          // is_office:editedAddress.is_office,
          // is_home:editedAddress.is_home
                }
      console.log(addressDteails)
      userNewAddress(addressDteails,token)
      setSmShow(true)
    }
  }
  useEffect(()=>{
    setAddressArea(editedAddress.address)
    setAddressName(editedAddress.title)
  },[])
        return (
          <section className="custom_page" >
        <div className="addressSave">
        <Modal.Dialog >
        <Modal.Header >
          <Modal.Title className="text-center w-100">Location / Edit Access</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
        <div className="form-label-group input-group">
                <span className="input-group-text input-start border-0" id="inputArea"><img src={locationIcon} /></span>
              <input
               placeholder="Full Name"
              
               type="text"
               onChange={onSetAddressName}
               defaultValue={addressName}
               readOnly={editedAddress?.is_home ||editedAddress?.is_office }
               className="border-0  inBR form-control"
               id="inputArea" />
              <label for="inputArea">Address Name</label>

              </div>
    
<div className="form-label-group input-group">
                <span className="input-group-text input-start border-0" id="inputArea"><img src={mapPinned} /></span>
              <input
               placeholder="Full Name"
              
               type="text"
               value={addressArea}
                
               onChange={onSetAddressArea}
               className="border-0 addressSend inBR form-control"
               id="inputArea" />
              <label for="inputArea">Address area</label>

              </div>
              <h6>You can write the correct address here</h6>
  {/* </InputGroup>
        <InputGroup className="mb-3">
    <InputGroup.Prepend>
     <img src={mapPinned} />
    </InputGroup.Prepend>
    <FormControl
    className="addressSend"
    // defaultValue={props.addInfo.query}
    onChange={onSetAddressArea}
    value={addressArea}
      // aria-label="Default"
      // aria-describedby="inputGroup-sizing-default"
    />
  </InputGroup> */}
    
        
           
        </Modal.Body>
      
        <Modal.Footer>
          
          <Button variant="primary" className="w-100 mt-3  d-flex align-items-center" onClick={onAddAddress}> <img src={saveIcon} /> <span className="flex-grow-1"> Save Address </span></Button>
        </Modal.Footer>
      </Modal.Dialog> 
      </div>
      <SuccessModal show={smShow} hide={() => setSmShow(false)} >Your Address is Added SuccessFully
      <Button onClick={onHome}  className="w-100 mt-3 d-flex align-items-center" variant="primary"><i className="fas fa-arrow-left"></i><span className="flex-grow-1"> Go Back </span></Button>
      
      </SuccessModal>
      </section>
      );
}
 
export default AddAddress;