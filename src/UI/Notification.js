import {DropdownButton,ButtonGroup,Dropdown} from 'react-bootstrap'

const Notification = (props) => {
    return ( 
    
//     <div className= {props.show? "notification-holder show" :"notification-holder close"} id="notificationHolder">
//     <div className="notification-header pb-2">
//       <button className="btn" onClick={props.closed}><i className="fa fa-arrow-left pr-2" aria-hidden="true" />Notification</button>
//       <button className="btn" onClick={props.closed}>X</button>
//     </div>
//     <div className="notification-list noti-unread">
//       <h6>Order #378 <span className="float-right">3.30pm</span></h6>
//       <div className="noti-message">
//         <p>Your order is confirmed. Please check if everything is okay.</p>
//         <div className="noti-message-icon">
//           {/* <i className="fa fa-star" /> */}
//           <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M4.13216 5.19499C3.74258 5.19499 3.42383 4.87624 3.42383 4.48665C3.42383 4.09707 3.74258 3.77832 4.13216 3.77832H14.0488C14.4384 3.77832 14.7572 4.09707 14.7572 4.48665C14.7572 4.87624 14.4384 5.19499 14.0488 5.19499H4.13216ZM4.13216 6.61165H14.0488C14.4384 6.61165 14.7572 6.9304 14.7572 7.31999C14.7572 7.70957 14.4384 8.02832 14.0488 8.02832H4.13216C3.74258 8.02832 3.42383 7.70957 3.42383 7.31999C3.42383 6.9304 3.74258 6.61165 4.13216 6.61165ZM4.13216 12.2783H9.79883C10.1884 12.2783 10.5072 12.5971 10.5072 12.9867C10.5072 13.3762 10.1884 13.695 9.79883 13.695H4.13216C3.74258 13.695 3.42383 13.3762 3.42383 12.9867C3.42383 12.5971 3.74258 12.2783 4.13216 12.2783ZM4.13216 10.8617H14.0488C14.4384 10.8617 14.7572 10.5429 14.7572 10.1533C14.7572 9.76374 14.4384 9.44499 14.0488 9.44499H4.13216C3.74258 9.44499 3.42383 9.76374 3.42383 10.1533C3.42383 10.5429 3.74258 10.8617 4.13216 10.8617Z" fill="white"/>
// </svg>

//         </div>
//       </div>
//     </div>
//     <div className="notification-list pt-2">
//       <h6>Order #378 <span className="float-right">3.30pm</span></h6>
//       <div className="noti-message">
//         <p>Lorem ipsum dolor sit amet, consectetur</p>
//         <div className="noti-message-icon">
//           <i className="fa fa-star" />
//         </div>
//       </div>
//     </div>
//     <div className="notification-list pt-2">
//       <h6>Order #378 <span className="float-right">3.30pm</span></h6>
//       <div className="noti-message">
//         <p>Lorem ipsum dolor sit amet, consectetur</p>
//         <div className="noti-message-icon">
//           <i className="fa fa-star" />
//         </div>
//       </div>
//     </div>
//   </div>
  
<Dropdown.Menu show={props.show} className="super-colors p-3 notification-holder" >
<div className="notification-header pb-2">
  {/* <button className="btn" onClick={props.closed}><i className="fa fa-arrow-left pr-2" aria-hidden="true" />Notification</button>
  <button className="btn" onClick={props.closed}>X</button> */}
</div>
  <Dropdown.Item eventKey="1" className="notification-list pt-2">
    
      <h6>Order #378 <span className="float-right">3.30pm</span></h6>
       <div className="noti-message">
         <p>Lorem ipsum dolor sit amet, consectetur</p>
        <div className="noti-message-icon">
          <i className="fa fa-star" />
        </div>
  </div>

</Dropdown.Item>
  <Dropdown.Item className="notification-list noti-unread" eventKey="2">
  <h6>Order #378 <span className="float-right">3.30pm</span></h6>
  <div className="noti-message">
    <p>Your order is confirmed. Please check if everything is okay.</p>
    <div className="noti-message-icon">
      {/* <i className="fa fa-star" /> */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.13216 5.19499C3.74258 5.19499 3.42383 4.87624 3.42383 4.48665C3.42383 4.09707 3.74258 3.77832 4.13216 3.77832H14.0488C14.4384 3.77832 14.7572 4.09707 14.7572 4.48665C14.7572 4.87624 14.4384 5.19499 14.0488 5.19499H4.13216ZM4.13216 6.61165H14.0488C14.4384 6.61165 14.7572 6.9304 14.7572 7.31999C14.7572 7.70957 14.4384 8.02832 14.0488 8.02832H4.13216C3.74258 8.02832 3.42383 7.70957 3.42383 7.31999C3.42383 6.9304 3.74258 6.61165 4.13216 6.61165ZM4.13216 12.2783H9.79883C10.1884 12.2783 10.5072 12.5971 10.5072 12.9867C10.5072 13.3762 10.1884 13.695 9.79883 13.695H4.13216C3.74258 13.695 3.42383 13.3762 3.42383 12.9867C3.42383 12.5971 3.74258 12.2783 4.13216 12.2783ZM4.13216 10.8617H14.0488C14.4384 10.8617 14.7572 10.5429 14.7572 10.1533C14.7572 9.76374 14.4384 9.44499 14.0488 9.44499H4.13216C3.74258 9.44499 3.42383 9.76374 3.42383 10.1533C3.42383 10.5429 3.74258 10.8617 4.13216 10.8617Z" fill="white"/>
</svg>

    </div>
  
</div></Dropdown.Item>
  {/* <Dropdown.Item eventKey="3" active>
    Active Item
    
  </Dropdown.Item> */}
   
  <Dropdown.Divider />
  {/* <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}

</Dropdown.Menu>

  );
}
 
export default Notification;