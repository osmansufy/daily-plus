import {Modal,Button,InputGroup,FormControl} from 'react-bootstrap'
import axios from '../../axios'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

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
  const editedAddress=useSelector(state=>state.address.addreessCurrent)
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
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
        <InputGroup className="mb-3">
    <InputGroup.Prepend>
      
    </InputGroup.Prepend>
    <FormControl
   onChange={onSetAddressName}
    defaultValue={addressName}
    readOnly={editedAddress?.is_home ||editedAddress?.is_office }
    
    />
  </InputGroup>
        <InputGroup className="mb-3">
    <InputGroup.Prepend>
     
    </InputGroup.Prepend>
    <FormControl
    className="addressSend"
    // defaultValue={props.addInfo.query}
    onChange={onSetAddressArea}
    value={addressArea}
      // aria-label="Default"
      // aria-describedby="inputGroup-sizing-default"
    />
  </InputGroup>
    
        
           
        </Modal.Body>
      
        <Modal.Footer>
          
          <a variant="primary" className="btn btn-primary editAddress btn-custom btn-lg btn-block" onClick={onAddAddress}>Save changes</a>
        </Modal.Footer>
      </Modal.Dialog> 
      </div>
      <SuccessModal show={smShow} hide={() => setSmShow(false)} >Your Address is Added SuccessFully
      <Button onClick={onHome}  className="w-100 mt-3 d-flex align-items-center" variant="primary"><i class="fas fa-arrow-left"></i><span className="flex-grow-1"> Go Back </span></Button>
      
      </SuccessModal>
      </section>
      );
}
 
export default AddAddress;