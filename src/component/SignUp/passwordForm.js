import locksvg from '../../assets/img/lock_24px.svg'
import visibility from '../../assets/img/visibility_24px.svg'
import {InputGroup,FormControl,Button,Image} from 'react-bootstrap'
import imgPass from '../../assets/img/password.png'
import next from '../../assets/img/arrow_forward_24px.svg'
import { useState } from 'react'
const PasswordForm = (props) => {


  const [showPss,setshowPass]=useState(false)
  const onTogglePass=()=>{
    setshowPass(!showPss)
      }
    return ( <>
   

    <div className="row justify-content-center">

<Image src={imgPass}   />

</div> 

<div id="recaptcha_forget_container"></div>
        <h4 className="text-center mt-4">Enter the password</h4>
        <p className="text-center w-75 mx-auto">It looks like you already have an account in this  number. Please enter the password to proceed </p>
          <div className="text-danger">{props.onError ? "Password is invalid" : ''}</div>
          <div className="form-label-group mb-4 input-group">
                <span className="input-group-text border-0 input-start" id="inputEmail"> <img src={locksvg} /></span>
              <input
               placeholder="password"
              
               type={showPss?"text":"password"}
               value={props.value}
     
              onChange={props.change}
   
               className="border-0 form-control"
               id="inputEmail" />
              <label for="inputEmail">Password</label>
              <span className="input-group-text border-0 inBR" onClick={onTogglePass}>
                {/* <img src={visibility} /> */}
                {
                  showPss?
                  <i class="fas fa-eye"></i>
                  : <i class="fas fa-eye-slash"></i>
                }
               
                
                </span>
            </div>
            <small onClick={props.forGetClicked} style={{cursor:"pointer"}} className="text-danger">Forgot  Password?</small>
            <Button type="submit" onClick={props.clicked}  className="w-100 d-flex align-items-center mt-4" variant="primary"><span className="flex-grow-1"> Submit </span><img src={next} /></Button>
         {/* {formField} */}
    </>
     );
}
 
export default PasswordForm;