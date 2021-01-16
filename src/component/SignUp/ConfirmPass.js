import lockicon from '../../assets/img/lock.png'
import locksvg from '../../assets/img/lock_24px.svg'
import eyeicon from '../../assets/img/eye.png'
import visibility from '../../assets/img/visibility_24px.svg'
import next from '../../assets/img/arrow_forward_24px.svg'
import {InputGroup,FormControl,Button,Image} from 'react-bootstrap'
import imgPass from '../../assets/img/password.png'
import passIcon from '../../assets/img/passIcon.png'
import { useState } from "react";
import axios from 'axios'
const ConfimPasswordForm = (props) => {

  const [formError,setFormError]=useState()
  const [showPss,setshowPass]=useState(false)
  console.log(props)
  const checkValidity = () => {
  
    let isValid = true;
    let errors=""
    if (!props.value1) {
  
      isValid = false;
  
      errors= "Please enter your password.";
  
    }else if (!props.value2) {
  
      isValid = false;
  
      errors = "Please enter your confirm password.";
  
    } else if (typeof props.value1!== "undefined" && typeof props.value2 !== "undefined") {
  
        
  
      if (props.value1 != props.value2) {
  
        isValid = false;
  
        errors = "Passwords don't match.";
  
      }
  
    } 
   
    setFormError(errors)
    return isValid
}
 


  const onTogglePass=()=>{
setshowPass(!showPss)
  }
  console.log(formError)
    return ( <>
  

    <div className="row justify-content-center">

<Image src={passIcon}   />

</div>


        <div className=" d-flex flex-column align-items-center mx-auto my-4 ">
        <h3>Choose a Password</h3>
        <p className="text-center">For the security & safety please <br/>choose a password</p>
        </div>
        
        <h5 className="text-danger text-center">{formError ? formError :""}</h5>
            <div className="form-label-group mb-3 input-group">
                <span className="input-group-text border-0 input-start" id="inputEmail"> <img src={locksvg} /></span>
              <input
               placeholder="password"
              
               type="password"
               value={props.value1}
     
               onChange={props.change1}
   
               className="border-0 form-control"
               id="inputEmail" />
              <label for="inputEmail">Password</label>
              <span className="input-group-text border-0 inBR"><img src={visibility} /></span>
            </div>
            

            <div className="form-label-group mb-3 input-group">
                <span className="input-group-text border-0 input-start"  id="inputEmail"> <img src={locksvg} /></span>
              <input
               
               placeholder="Confirm password"
               type={showPss ? "text" :"password" }
              value={props.value2}
     
               onChange={props.change2}
               className="border-0 form-control"
               id="inputEmail" />
              <label for="inputEmail">Confirm Password</label>
              <span className="input-group-text border-0 inBR " onClick={onTogglePass}><img src={visibility} /></span>
            </div>
          {/* <div className="text-danger">{props.formError ? formError : ''}</div> */}

  <Button type="submit" onClick={props.clicked}  className="w-100 d-flex align-items-center mt-3" variant="primary"><span className="flex-grow-1"> Finish , Good to go </span><img src={next} /></Button>
         {/* {formField} */}
    </>
     );
}
 
export default ConfimPasswordForm;