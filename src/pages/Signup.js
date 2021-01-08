import firebase from '../../src/firebaseConfig'
import { useReducer } from "react"
import { Container,Modal } from "react-bootstrap"
import ConfimPasswordForm from "../component/SignUp/ConfirmPass"
import NameForm from "../component/SignUp/NameForm"
import OtpForm from "../component/SignUp/OtpForm"
import PasswordForm from '../component/SignUp/passwordForm'
import PhoneForm from "../component/SignUp/PhoneForm"
import { useDispatch, useSelector } from "react-redux";
import * as authAction from '../store/actions/actionAuth'
import axios from "axios";
const Signup = () => {
    const dispatch=useDispatch()
    const isAuth=useSelector(state=>state.auth.accessToken)
    const isError=useSelector(state=>state.auth.error)
    const loginAction=(userdetails)=>dispatch(authAction.userLoginAction(userdetails))
    

    
 const formType={
    PHONE:'PHONE',
    OTP:'OTP',
    SEND_OTP:'SEND_OTP',
    PASSWORD:'PASSWORD',
    EMAIL:'EMAIL',
    NAME:'NAME',
    CONFIRM_PASSWORD:'CONFIRM_PASSWORD',
    CHANGE_INPUT:'CHANGE_INPUT',
    ACCESS_TOKEN:'ACCESS_TOKEN',
    CHANGE_OTP:'CHANGE_OTP',
  }
 
  const initialState={
   userInfo:{
     phone:'',
     fullName:'',
     email:'',
     password:'',
     confirmPassword:'',
     accessToken:''
   },
   otp:'',
   confirmOtp:"",
   form:formType.PHONE
  }
 
  const formReducer=(cuurentState,action)=>{
    switch (action.type) {
      case formType.PHONE:
        return {
          ...cuurentState,
          form:action.form
         }
      case formType.PASSWORD:
        return {
          ...cuurentState,
          form:action.form
         }
      case formType.NAME:
        return {
          ...cuurentState,
        
          form:action.form
         }
      case formType.SEND_OTP:
        return {
          ...cuurentState,
          confirmOtp:action.confirmOtp,
          form:action.form
         }
      case formType.OTP:
        return {
          ...cuurentState,
          form:action.form
         }
      case formType.ACCESS_TOKEN:
        return {
          ...cuurentState,
          accessToken:action.accessToken,
         
         }
      case formType.CHANGE_INPUT:
            return { ...cuurentState,
                userInfo:{
                    ...cuurentState.userInfo,
                    [action.field]:action.value 
                  },
                };
      case formType.CHANGE_OTP:
            return { ...cuurentState,
               otp:action.otp
                };
         default:
           throw new Error('Should not be reached!');
    }
  }
 
  const [formState,formDispatch]=useReducer(formReducer,initialState)
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

   const onSignInSubmit=()=>{
       const formData=new FormData()

       formData.append("phone",`+${formState.userInfo.phone}`)
    axios.post('https://api.dailyplus.store/v0/user/check-number/',formData).then(response=>{
    
    
      if (response.status==200) {
        formDispatch({type:formType.PHONE,form:formType.PASSWORD})
        console.log(response)
      }else{
    setupRecaptcha()
    var phoneNumber = '+'+formState.userInfo.phone;
    console.log(phoneNumber)
    
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
       
        formDispatch({type:formType.SEND_OTP,confirmOtp:confirmationResult,form:formType.OTP})
        console.log(confirmationResult)
      
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
    
        console.log(error)
      });
      }
    }).catch(error=>{
      console.log(error)
     
    })
    
     
       
     }

 
 const onOtpInSubmit=()=>{
  

  var code = formState.otp;

// var credential = firebase.auth.PhoneAuthProvider.credential(otp.verificationId, code)

// console.log(credential)

formState.confirmOtp.confirm(code).then(function (result) {
  // User signed in successfully.
  var user = result.user;
  console.log(user.idToken)
 
 const token=user.getIdToken().then(response=>{
   console.log(response)
   formDispatch({type:formType.ACCESS_TOKEN,accessToken:response})
 }).catch(error=>{
   console.log(error)
 })
 console.log(token)
 formDispatch({type:formType.OTP,form:formType.NAME})

  // ...
}).catch(function (error) {
  // User couldn't sign in (bad verification code?)
  // ...
  formDispatch({type:formType.OTP,form:formType.OTP})
 
});

}
const oldUserSubmit=()=>{
  
    const details={
      'phone':"+"+formState.userInfo.phone,
      'password':formState.userInfo.password
    }
    
    loginAction(details)
    
  
  }
  const onPhone=()=>{
    onSignInSubmit()
  }
  const onName=()=>{
      formDispatch({type:formType.NAME,form:formType.PASSWORD})
  }
  const onLogPass=()=>{
    oldUserSubmit()
  }
  const onInputChange=(field)=>(event)=>{
    formDispatch({type:formType.CHANGE_INPUT,field,value:event.target.value})
  }


  let formContent=""
  switch (formState.form) {
      case formType.PHONE:
        formContent=<PhoneForm containerClass="phoneField signupInput" value={formState.userInfo.phone}  change={(phone)=>formDispatch({type:formType.CHANGE_INPUT,field:'phone',value:phone})} clicked={onPhone}/>
        break;
      case formType.PASSWORD:
        formContent=<PasswordForm value={formState.userInfo.password} clicked={onLogPass} change={onInputChange("password")} />
        break;
      case formType.NAME:
        formContent=<NameForm  value={formState.userInfo.fullName} change={onInputChange("fullName")}  /> 
        break;
      case formType.OTP:
        formContent=<OtpForm value={formState.otp} clicked={onOtpInSubmit} change={(value)=>formDispatch({type:formType.CHANGE_OTP,otp:value})} />
        break;
      case formType.CONFIRM_PASSWORD:
        formContent=<ConfimPasswordForm  value1={formState.userInfo.password} change1={onInputChange("password") } 
        value2={formState.userInfo.confirmPassword} change2={onInputChange("confirmPassword") }
        
        />
        break;
      default:
          break;
  }
  console.log(formState)
    return ( 
        <div className="custom_page">
            <Container>
            <Modal.Dialog>
            <Modal.Body className="p-4 text-center">
            <div id="recaptcha_container"></div>
{formContent}
</Modal.Body>
</Modal.Dialog>
     
     </Container>
        </div>

     );
}
 
export default Signup;