import homeIcon from '../../assets/img/home.png'
import changeIcon from '../../assets/img/change.png'
import plusIcon from '../../assets/img/plus-icon.png'
import { Link, Redirect,withRouter } from 'react-router-dom';
import { useEffect,useCallback, useState, useRef } from 'react';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import * as actionAddress from '../../store/actions/actionAddress'
import {Modal,Popover,Tooltip,Button,Dropdown} from 'react-bootstrap'
import RemoveModal from '../Modal/RemoveModal';
const Address = props => {
    const dispatch=useDispatch()
    const address =useSelector(state=>state.address.userAddress)
    const token =useSelector(state=>state.auth.accessToken)
    const onAddress=useCallback((id)=>dispatch(actionAddress.onAddressId(id)),[])
    // const addAddress=dispatch(()=>actionAddress.onAddAddress())
    const addAddress= (edit) => dispatch(actionAddress.onAddAddress(edit))
    const editAddressStart= (edit) => dispatch(actionAddress.onEditAddress(edit))
    const deleteAddress= (token,id) => dispatch(actionAddress.onAddressDelete(token,id))
    const [isOffice,setIsoffice]=useState(false)
    const [smShow, setSmShow] = useState(false);
    const [adShow, setAdSmShow] = useState(false);
    const target = useRef(null);
   const editAddress =(add)=>{

onAddress(add.id)
editAddressStart(true)
// document.querySelector('.addressModal').style.display='none'
props.history.push('/location');
   }
const onAddLocation=()=>{
    addAddress(false)
    props.history.push('/location');
}
const onDeleted=(token,add)=>{
    deleteAddress(token,add.id) 
    setSmShow(false)
}
const onHome=(token,add)=>{
   
    setSmShow(false)
}
    return (<Dropdown.Menu  className="super-colors addressModal" >

    <div className="container">
        { address.map(add=>(
        
        <Dropdown.Item className="row address " as="div">
        
        <img src={homeIcon}/> 
        <div className="address-info">
            <h4 className="name">
{add.title}
            </h4>
            <h4 className="address-area">
            {add.address}
            </h4>
            <h5 className="address-status">
            Currently selected as delivery address
            </h5>
        </div>
        <a onClick={()=>editAddress(add)}  className="changeAddress">
<img src={changeIcon} />
</a>
        <a className="mr-2" onClick={() => setSmShow(true)}><i class="fa fa-trash-o"></i></a>

     <RemoveModal show={smShow} onHome={onHome} onDelete={()=>onDeleted(token,add)} hide={() => setSmShow(false)} >

     <h5 className="w-100">Are You Sure to delete this Address</h5>
     </RemoveModal>

        </Dropdown.Item>


        )

        )
        
}

        <a  onClick={onAddLocation} type="button" className="btn btn-primary btn-custom btn-lg btn-block"><img src={plusIcon} /> <span>
           Add New Address </span></a>
           </div>
</Dropdown.Menu>
    
    
    );
}
 
export default withRouter(Address);


