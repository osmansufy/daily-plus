import homeIcon from '../../assets/img/home.png'
import changeIcon from '../../assets/img/change.png'
import plusIcon from '../../assets/img/plus-icon.png'
import { Link, Redirect,withRouter } from 'react-router-dom';
import { useEffect,useCallback, useState } from 'react';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import * as actionAddress from '../../store/actions/actionAddress'
import {DropdownButton,ButtonGroup,Dropdown} from 'react-bootstrap'
const Address = props => {
    const dispatch=useDispatch()
    const address =useSelector(state=>state.address.userAddress)
    const token =useSelector(state=>state.auth.accessToken)
    const onAddress=useCallback((id)=>dispatch(actionAddress.onAddressId(id)),[])
    // const addAddress=dispatch(()=>actionAddress.onAddAddress())
    const addAddress= (edit) => dispatch(actionAddress.onAddAddress(edit))
    const editAddressStart= (edit) => dispatch(actionAddress.onEditAddress(edit))
    const [isOffice,setIsoffice]=useState(false)

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
    return (<Dropdown.Menu className="super-colors addressModal" >

    <div className="container">
        { address.map(add=>(
        
//         <div className="row address address-active ">
//         <img src={homeIcon}/> 
//         <div className="address-info">
//             <h4 className="name">
// {add.title}
//             </h4>
//             <h4 className="address-area">
//             {add.address}
//             </h4>
//             <h5 className="address-status">
//             Currently selected as delivery address
//             </h5>
//         </div>
// <div onClick={()=>editAddress(add)} className="changeAddress">
// <img src={changeIcon} />
// </div>
//         </div>



<Dropdown.Item eventKey="1"className="row text-left address"  >

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
<div onClick={()=>editAddress(add)} className="changeAddress">
<img src={changeIcon} />
</div>

       </Dropdown.Item>
        )

        )
        
}

        <a  onClick={onAddLocation} type="button" class="btn btn-primary btn-custom btn-lg btn-block"><img src={plusIcon} /> <span>
           Add New Address </span></a>
           </div>
</Dropdown.Menu>
    
    
    );
}
 
export default withRouter(Address);


