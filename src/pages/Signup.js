import { useEffect, useRef, useState } from "react";
import {Modal,Button,InputGroup,FormControl,Row,Container,Image,Col, Form} from 'react-bootstrap'
import firebase from '../../src/firebaseConfig'
import imgPhone from '../assets/img/mobile.png'
import imgCammera from '../assets/img/cammera.png'
import imgPass from '../assets/img/password.png'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpInput from 'react-otp-input';
import account_icon from '../assets/img/account_circle_24px.png'
import lockicon from '../assets/img/lock.png'
import {Redirect} from 'react-router-dom'
import {checkValidity} from '../utility/validity'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from '../store/actions/actionAuth'
import InputField from "../component/FormField/InputField";
import InputPhone from "../component/FormField/PhoneInput";
const SignUp = () => {
 const [userInfo,setUserInfo]=useState({
   
     phone:'',
     fullName:'',
     email:'',
     password:'',
     confirmPassword:'',
     accessToken:''
   
 })
 console.log(userInfo)
 const dispatch=useDispatch()
const isAuth=useSelector(state=>state.auth.accessToken)
const isError=useSelector(state=>state.auth.error)
 const loginAction=(userdetails)=>dispatch(authAction.userLoginAction(userdetails))
 const [passShow,setPassShow]=useState(false)
 const [otp,setOtp]=useState(null)
 const [sendOtp,setSendOtp]=useState()
 const [formError,setFormError]=useState()
 const [formValid,setFormValid]=useState(true)

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
 const validity=(value)=>{
  if (value.match(/12345/)) {
    return 'Invalid value: '+value,
    setFormValid(false)
  } 
  else if (value.match(/1234/)) {
    return false;
    setFormValid(false)
  } 
  else if (value=="") {
    return false;
    setFormValid(false)
  } 
  else {
    return true;
    setFormValid(true)
  }
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

    const passToggle=()=>{
        setPassShow(!passShow)
      }

const newUserSubmit=()=>{
  axios.post('https://api.dailyplus.store/v0/user/signup/',{
    'access_token':userInfo.accessToken,
    'display_name':userInfo.fullName,
    'email':userInfo.email,
    'password':userInfo.password
  }).then(response=>{
    console.log(response)
  }).catch(error=>{
    console.log(error)
  })
}
const onPassSubmit=()=>{
  
if (validPass()) {
  console.log(userInfo)
  newUserSubmit()
}


}

 const onSignInSubmit=()=>{

axios.post('https://api.dailyplus.store/v0/user/check-number/',{
  "phone":"+"+userInfo.phone
}).then(response=>{


  if (response.status==200) {
    document.querySelector('.logPassField').style.display='flex'
    setForm('logPass')
    console.log(response)
  }else{
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
   
    console.log(confirmationResult)
    setForm('otp') 
    document.querySelector('.otpField').style.display='flex'
  }).catch(function (error) {
    // Error; SMS not sent
    // ...

    setFormError(error.message)
  });
  }
}).catch(error=>{
  console.log(error)
 
})

 
   
 }

 const onOtpInSubmit=()=>{
  

  var code = sendOtp;

// var credential = firebase.auth.PhoneAuthProvider.credential(otp.verificationId, code)

// console.log(credential)

otp.confirm(code).then(function (result) {
  // User signed in successfully.
  var user = result.user;
  console.log(user.idToken)
 
 const token=user.getIdToken().then(response=>{
   console.log(response)
   setUserInfo({
     ...userInfo,
     accessToken:response
   })
 }).catch(error=>{
   console.log(error)
 })
 console.log(token)
 
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


const otpHandleChange=(sendOtp)=>{
  setSendOtp(sendOtp)
}
 



const allhidden=()=>{
const allInputs= document.querySelectorAll('.signupInput')
allInputs.forEach(input=>{
  input.style.display='none'
})

}

const oldUserSubmit=()=>{
  
  const details={
    'phone':"+"+userInfo.phone,
    'password':userInfo.password
  }
  
  loginAction(details)

}
let formImage=<Image src={form=='phone'? imgPhone 
: form=='logPass' ? imgPass : imgCammera }   />

useEffect(()=>{
 
    allhidden()
 setForm('phone')

document.querySelector('.phoneField').style.display='flex'
},[])


const onNextSubmit=()=>{
  allhidden()
  
if (form=='phone') {
  console.log(form)
  onSignInSubmit()
}
else if (form=='otp') {
  console.log(form)
  onOtpInSubmit()
}
else if (form=='name') {
  console.log(form)
 
  setForm('email')
     document.querySelector('.emailField').style.display="flex"
    
}
else if (form=='email') {
  console.log(form)
 
  setForm('pass')
     document.querySelector('.passField').style.display="flex"
     document.querySelector('.confirmPassField').style.display="flex"
}
else if (form=='pass') {
  onPassSubmit()
}
else if (form=='logPass') {
 
  oldUserSubmit()
 if (isError!="") {
   setForm('logPass')
   document.querySelector('.logPassField').style.display='flex'
 }
   
  console.log(isError)
}else{
  document.querySelector('.phoneField').style.display='flex' 
}

}



let authRedirect=""
if (isAuth!=null) {
  authRedirect=<Redirect to="/" />
}

    return ( <div className="custom_page">
      {authRedirect}
        <Container> 
    <Modal.Dialog className="mx-auto my-0 " contentClassName="pt-5">
       
       <div className="row justify-content-center">

    {formImage}
 
    </div>
      
        <Modal.Body className="p-4 text-center">
        
        <Modal.Title>Enter your mobile number</Modal.Title>
          <p>We need to verify you. We will send you a one time verification code. </p>
          <div className="text-danger">{formError ? formError : ''}</div>
          <InputPhone containerClass="phoneField signupInput" value={userInfo.phone} change={(phone)=>setUserInfo({phone:phone})} valid={() =>validity(userInfo.phone) } />
         
<div id="recaptcha_container"></div>
<OtpInput
  value={sendOtp}
  onChange={otpHandleChange}
  numInputs={6}
  inputStyle="otpClass"
  containerStyle="justify-content-center signupInput otpField otpContainer "
  // separator={<span>-</span>}

/>
<InputField value={userInfo.email} name="fullName" placeholder="Email"
       imgSrc={account_icon} 
       type="text"
       change={handleChange} appand={false} classInput="mb-3 signupInput emailField"/>
 <InputField value={userInfo.fullName} name="fullName" placeholder="Full Name"
       imgSrc={account_icon} change={handleChange} appand={false} classInput="mb-3 signupInput nameField"/>

  <div className="text-danger">{formError ? formError :''}</div>
  <InputField value={userInfo.password} name="password" placeholder="Password"
       imgSrc={lockicon}
       type={passShow? "password":"text"}
       change={handleChange}
       pShow={passToggle}
       appand={true} classInput="mb-3 signupInput passField"/>
 
 
  <InputField value={userInfo.confirmPassword}
  type={passShow? "password":"text"}
  pShow={passToggle}
  name="password" placeholder="Confirm Password"
       imgSrc={lockicon} change={handleChange} appand={true} classInput="mb-3 signupInput confirmPassField"/>
 
 <InputField value={userInfo.password} 
 error={isError}
  type={passShow? "text":"password"}
  pShow={passToggle}
 name="password" placeholder="Password"
       imgSrc={lockicon} change={handleChange} appand={true} classInput="mb-3 signupInput logPassField"/>

  <Button type="submit" onClick={onNextSubmit} className="w-100 mt-3" variant="primary">Next</Button>
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