import { useEffect, useRef, useState } from "react";
import {Modal,Button,InputGroup,FormControl,Row,Container,Image,Col, Form} from 'react-bootstrap'
import firebase from '../../src/firebaseConfig'
import imgPhone from '../assets/img/mobile.jpg'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpInput from 'react-otp-input';
import account_icon from '../assets/img/account_circle_24px.png'
import lockicon from '../assets/img/lock.png'
import axios from "axios";
const SignUp = () => {
 const [userInfo,setUserInfo]=useState({
   
     phone:'',
     fullName:'',
     password:'',
     confirmPassword:''
  
   
 })
 console.log(userInfo)
 const [otp,setOtp]=useState(null)
 const [sendOtp,setSendOtp]=useState()
 const [formError,setFormError]=useState()
 const [form,setForm]=useState('')
const setupRecaptcha=()=>{
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha_container', {
    'size': 'invisible',
    'callback': function(response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
      console.log(response)
    }
  });
  
 }
 
const validPass=()=>{

  let isValid = true;
  let errors=""
  if (!userInfo.password) {

    isValid = false;

    errors= "Please enter your password.";

  }



  if (!userInfo.confirmPassword) {

    isValid = false;

    errors = "Please enter your confirm password.";

  }



  if (typeof userInfo.password !== "undefined" && typeof userInfo.confirmPassword !== "undefined") {

      

    if (userInfo.password != userInfo.confirmPassword) {

      isValid = false;

      errors = "Passwords don't match.";

    }

  } 
  setFormError(errors)
  return isValid
}


const onPassSubmit=()=>{
  
if (validPass()) {
  console.log(userInfo)
}

}
let cofirmOtp={}
 const onSignInSubmit=()=>{
axios.post('https://api.dailyplus.store/v0/user/check-number/',{
  "phone":"+"+userInfo.phone
}).then(response=>{
  document.querySelector('.passField').style.display='block'
  setForm('pass')
  console.log(response)
}).catch(error=>{
  console.log(error)
 
setupRecaptcha()
var phoneNumber = '+'+userInfo.phone;
console.log(phoneNumber)

var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
  .then(function (confirmationResult) {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    setOtp(confirmationResult) 
    cofirmOtp=confirmationResult
    console.log(cofirmOtp)
    console.log(confirmationResult)
    setForm('otp') 
    document.querySelector('.otpField').style.display='flex'
  }).catch(function (error) {
    // Error; SMS not sent
    // ...
    console.log(error)
  });
})

 
   
 }

 const onOtpInSubmit=()=>{
  

  var code = sendOtp;
console.log(otp)
// var credential = firebase.auth.PhoneAuthProvider.credential(otp.verificationId, code)

// console.log(credential)
console.log(cofirmOtp)
cofirmOtp.confirm(code).then(function (result) {
  // User signed in successfully.
  var user = result.user;
  console.log(cofirmOtp)
  setForm('name') 
  document.querySelector('.nameField').style.display='flex'

  // ...
}).catch(function (error) {
  // User couldn't sign in (bad verification code?)
  // ...
  console.log(error.response)
  document.querySelector('.otpField').style.display='flex'
});

}
const handleChange=(event)=> {
setUserInfo({
  ...userInfo,
    [event.target.name] :event.target.value


  });

}
const onNameInSubmit=()=>{
  setForm('password') 
}
 let formField= <>
 <div id="recaptcha_container"></div>
 <PhoneInput
country={'bd'}
value={userInfo.phone}
onChange={(phone)=>setUserInfo({phone:phone})}
isValid={(value, country) => {
  if (value.match(/12345/)) {
    return 'Invalid value: '+value+', '+country.name;
  } else if (value.match(/1234/)) {
    return false;
  } else {
    return true;
  }
}}
inputProps={{
  name: 'phone',
  required: true,
  autoFocus: true,

}}
/>


<Button type="submit" onClick={onSignInSubmit} className="w-100 mt-3" variant="primary">Next</Button>
</>
const otpHandleChange=(sendOtp)=>{
  setSendOtp(sendOtp)
}
 
if (form=='otp') {
 
 formField= <>
 
 <OtpInput
  value={sendOtp}
  onChange={otpHandleChange}
  numInputs={6}
  inputStyle="otpClass"
  containerStyle="justify-content-center otpContainer "
  // separator={<span>-</span>}

/>


<Button type="submit" onClick={onOtpInSubmit} className="w-100 mt-3" variant="primary">Next</Button>

 </>
}
if (form=='name') {
 
 formField= <>
 
 
 <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"><img src={account_icon} /></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
      value={userInfo.fullName}
      name="fullName"
      onChange={handleChange}
    />
  </InputGroup>

  <Button type="submit" onClick={onNameInSubmit} className="w-100 mt-3" variant="primary">Next</Button>
 </>
}
const userInSubmit=()=>{
  console.log(userInfo)
}


const allhidden=()=>{
const allInputs= document.querySelectorAll('.signupInput')
allInputs.forEach(input=>{
  input.style.display='none'
})

}


useEffect(()=>{
  if (form=="") {
    allhidden()
    setForm('phone')
    document.querySelector('.phoneField').style.display='block'
  }
 
},[])

const onNextSubmit=(currentState)=>{
  allhidden()
switch (currentState) {
  case 'phone':
    onSignInSubmit()
  case 'otp':
    onOtpInSubmit()
  case 'name':
    handleChange()
    document.querySelector('.passField').style.display="flex"
    document.querySelector('.confirmPassField').style.display="flex"
setForm('pass')

  case 'pass':
  onPassSubmit()
  default:
    break;
}
}
    return ( <div className="custom_page">
        <Container> 
    <Modal.Dialog className="mx-auto my-0">
       
       <div className="row justify-content-center">

    <Image src={imgPhone} thumbnail  />
 
    </div>
      
        <Modal.Body className="p-4 text-center">
        
        <Modal.Title>Enter your mobile number</Modal.Title>
          <p>We need to verify you. We will send you a one time verification code. </p>
          <PhoneInput
country={'bd'}
containerClass="phoneField signupInput"
value={userInfo.phone}
onChange={(phone)=>setUserInfo({phone:phone})}
isValid={(value, country) => {
  if (value.match(/12345/)) {
    return 'Invalid value: '+value+', '+country.name;
  } else if (value.match(/1234/)) {
    return false;
  } else {
    return true;
  }
}}
inputProps={{
  name: 'phone',
  required: true,
  autoFocus: true,

}}
/>
<div id="recaptcha_container"></div>
<OtpInput
  value={sendOtp}
  onChange={otpHandleChange}
  numInputs={6}
  inputStyle="otpClass"
  containerStyle="justify-content-center signupInput otpField otpContainer "
  // separator={<span>-</span>}

/>

 
<InputGroup className="mb-3 signupInput nameField">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"><img src={account_icon} /></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
      value={userInfo.fullName}
      name="fullName"
      onChange={handleChange}
    />
  </InputGroup>
  <div className="text-danger">{formError && formError}</div>
 
 <InputGroup  className="mb-3 signupInput passField">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"><img src={lockicon} /></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Password"
      aria-label="Password"
      aria-describedby="basic-addon1"
      type="password"
      value={userInfo.password}
      onChange={handleChange}
      name="password"
    />
  </InputGroup>
 <InputGroup className="mb-3 signupInput confirmPassField">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"><img src={lockicon} /></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Confirm Password"
      aria-label="Password"
      aria-describedby="basic-addon1"
      type="password"
      value={userInfo.confirmPassword}
      onChange={handleChange}
      name="confirmPassword"
    />
  </InputGroup>

  <Button type="submit" onClick={()=>onNextSubmit(form)} className="w-100 mt-3" variant="primary">Next</Button>
         {/* {formField} */}
        </Modal.Body>
        
        <Modal.Footer className="p-4">
        <Row className="justify-content-md-center w-100">
          
          </Row>
        </Modal.Footer>
       
      </Modal.Dialog>
     
      </Container>
      </div> );
}
 
export default SignUp;