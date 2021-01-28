import { useEffect, useState } from 'react';
import {DropdownButton,ButtonGroup,Dropdown} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import axios from '../axios'
import moment from 'moment'
import { useHistory } from 'react-router';
const Notification = (props) => {
  
  const history=useHistory()
  const [notifiacationItems,setNotificationItems]=useState([])
  const isSignUp=useSelector(state=>state.auth.accessToken)
  const getNotification=()=>{
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
  useEffect(()=>{
    if (isSignUp) {
      getNotification()
    }else{
      setNotificationItems([])
    }
    
  },[isSignUp])
  console.log(notifiacationItems)
  const notificationRead=(id)=>{
    axios.post(`notification/mark_read/${id}/`,'',{
      headers:{
        Authorization: `JWT ${isSignUp}`,
    }
    })
    .then(response=>{
      getNotification()
      console.log(response)
      props.checked(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  const onShowNotification=(notification)=>{
    let id=""
    if(notification.genie_list_order && !notification.order && !notification.pre_order ){
      console.log(notification.id);
      notificationRead(notification.id)
      id=notification.genie_list_order 
      history.push({
        pathname: '/genie/order/info',
       //  search: `?id=${id}`,
        state: { id: id}
    });
    
    }else if(!notification.genie_list_order && !notification.order && notification.pre_order){
      id=notification.pre_order  
      history.push({
        pathname: '/order/preorder/info',
       //  search: `?id=${id}`,
        state: { id: id}
    });
    notificationRead(notification.id)
    }else if(!notification.genie_list_order && notification.order && !notification.pre_order){
      id=notification.order 
      history.push({
        pathname: '/order/info',
       //  search: `?id=${id}`,
        state: { id: id}
    });
    notificationRead(notification.id)
  }else{
    notificationRead(notification.id)
  }

  }
    return ( 
  
<Dropdown.Menu show={props.show} className="super-colors p-3 notification-holder" >
<div className="notification-header pb-2">
  {/* <button className="btn" onClick={props.closed}><i className="fa fa-arrow-left pr-2" aria-hidden="true" />Notification</button>
  <button className="btn" onClick={props.closed}>X</button> */}
</div>

{notifiacationItems.map((noti,index)=>(
  <Dropdown.Item eventKey={index} onClick={()=>onShowNotification(noti)} className={`notification-list pt-2 ${!noti?.checked && "notification-checked"}`}>
    
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