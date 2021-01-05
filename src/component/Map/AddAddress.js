import {Modal,Button,InputGroup,FormControl} from 'react-bootstrap'
import axios from '../../axios'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import * as addressAction from '../../store/actions/actionAddress'
const AddAddress = props => {
    const [show, setShow] = useState(false);
   
    const[addressName,setAddressName]=useState()
    const[addressArea,setAddressArea]=useState()
    const dispatch=useDispatch()

    
  const onSetAddressArea=(e)=>{
    setAddressArea(e.target.value)
  }
  const onSetAddressName=(e)=>{
    setAddressName(e.target.value)
  }
  const userdetails=useSelector(state=>state.auth.userdetails)
  const token=useSelector(state=>state.auth.accessToken)
  const editedAddress=useSelector(state=>state.address.adreessCurrent)
  const isEdit=useSelector(state=>state.address.isEdit)
  const onEditSubmit=dispatch((token,address)=>addressAction.onAddressEditSubmit(token,address))
  const onAddAddress=()=>{

      
      if(isEdit){
        const eId=editedAddress.id
        const editInfo={
         location:`{"lat":${editedAddress.location.lat},"lng":${editedAddress.location.lng}}`,
          address:addressArea,
        }
        onEditSubmit(eId,editInfo)
      }else{
        const addressDteails={
          user:userdetails.id,
          title:addressName,
          location:`{"lat":${editedAddress.location.lat},"lng":${editedAddress.location.lng}}`,
          
          address:addressArea,
          // is_office:editedAddress.is_office,
          // is_home:editedAddress.is_home
                }
      console.log(addressDteails)
      axios.post("/location/user/address/",addressDteails)
      .then(res=>{
          console.log(res)
      })
      .catch(error=>{
          console.log(error)
      })
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
    value={addressName}
    readOnly 
      // aria-label="Default"
      // aria-describedby="inputGroup-sizing-default"
      // {...editedAddress && editedAddress.is_home? "readonly" : ""}
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
      </section>
      );
}
 
export default AddAddress;