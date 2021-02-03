import { useState } from "react";
import {Row,Col,Toast} from 'react-bootstrap'
function ErrorToast(props) {
   

  
    return (
  
  <div
  
    style={{
      position: 'fixed',
      top: "25%",
      left: 0,
    }}
  >
    <Toast className="bg-warning" show={props.showA} onClose={props.close}>
   
      <Toast.Body>{props.children} </Toast.Body>
    </Toast>
  
  </div>

    
    );
  }
  
 export default ErrorToast