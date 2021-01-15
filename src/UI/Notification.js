import { useEffect, useState } from 'react';
import {DropdownButton,ButtonGroup,Dropdown} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import axios from '../axios'
import moment from 'moment'
const Notification = (props) => {

  const [notifiacationItems,setNotificationItems]=useState([])
  const isSignUp=useSelector(state=>state.auth.accessToken)
  useEffect(()=>{
    if (isSignUp) {
      axios.get('notification/notification/',{
        headers:{
          Authorization: `JWT ${isSignUp}`,
      }
      })
      .then(response=>{
        setNotificationItems(response.data)
        console.log("Allnotifiacation",response)
        
      })
      .catch(error=>{
        console.log(error)
      })
    }
    
  },[isSignUp])
  console.log(notifiacationItems)
    return ( 
  
<Dropdown.Menu show={props.show} className="super-colors p-3 notification-holder" >
<div className="notification-header pb-2">
  {/* <button className="btn" onClick={props.closed}><i className="fa fa-arrow-left pr-2" aria-hidden="true" />Notification</button>
  <button className="btn" onClick={props.closed}>X</button> */}
</div>

{notifiacationItems.map((noti,index)=>(
  <Dropdown.Item eventKey="1" className="notification-list pt-2">
    
    <h6>{noti.title}<span className="float-right">{moment(noti.ts_created).utc().format('MMM DD.YYYY')}</span></h6>
     <div className="noti-message">
       <p>{noti.text}</p>
      <div className="noti-message-icon">
        <i className="fa fa-star" />
      </div>
</div>

</Dropdown.Item>
))}
  
  {/* <Dropdown.Item eventKey="3" active>
    Active Item
    
  </Dropdown.Item> */}
   
  <Dropdown.Divider />
  {/* <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}

</Dropdown.Menu>

  );
}
 
export default Notification;