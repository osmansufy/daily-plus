import firebase from "../../src/firebaseConfig";
import { useReducer, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import ConfimPasswordForm from "../component/SignUp/ConfirmPass";
import NameForm from "../component/SignUp/NameForm";
import OtpForm from "../component/SignUp/OtpForm";
import PasswordForm from "../component/SignUp/passwordForm";
import PhoneForm from "../component/SignUp/PhoneForm";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "../store/actions/actionAuth";
import Spinner from '../container/Spinner/Spinner'
import { Redirect } from "react-router-dom";
import axios from "axios";
import EmailForm from "../component/SignUp/EmailForm";
const Signup = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.accessToken);
  const isloading = useSelector((state) => state.auth.loading);
  const isError = useSelector((state) => state.auth.error);
  const [loading,setloading]=useState(false)
  const loginAction = (userdetails) =>
    dispatch(authAction.userLoginAction(userdetails));
  const SignIninAction = (userdetails) =>
    dispatch(authAction.userSignInAction(userdetails));
  const [inputerror, setInputError] = useState("");

  const formType = {
    PHONE: "PHONE",
    OTP: "OTP",
    SEND_OTP: "SEND_OTP",
    PASSWORD: "PASSWORD",
    EMAIL: "EMAIL",
    NAME: "NAME",
    CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
    CHANGE_INPUT: "CHANGE_INPUT",
    ACCESS_TOKEN: "ACCESS_TOKEN",
    CHANGE_OTP: "CHANGE_OTP",
    FORGET_PASS: "FORGET_PASS",
  };

  const initialState = {
    userInfo: {
      phone: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accessToken: "",
    },
    otp: "",
    confirmOtp: "",
    forgetPass: false,
    form: formType.PHONE,
  };

  const formReducer = (cuurentState, action) => {
    switch (action.type) {
      case formType.PHONE:
        return {
          ...cuurentState,
          form: action.form,
        };
      case formType.PASSWORD:
        return {
          ...cuurentState,
          form: action.form,
        };
      case formType.CONFIRM_PASSWORD:
        return {
          ...cuurentState,
          form: action.form,
        };
      case formType.NAME:
        return {
          ...cuurentState,

          form: action.form,
        };
      case formType.EMAIL:
        return {
          ...cuurentState,

          form: action.form,
        };
      case formType.SEND_OTP:
        return {
          ...cuurentState,
          confirmOtp: action.confirmOtp,
          form: action.form,
        };
      case formType.OTP:
        return {
          ...cuurentState,
          form: action.form,
        };
      case formType.ACCESS_TOKEN:
        return {
          ...cuurentState,
          userInfo: {
            ...cuurentState.userInfo,
            accessToken: action.accessToken,
          },
        };
      case formType.FORGET_PASS:
        return {
          ...cuurentState,
          forgetPass: true,
        };
      case formType.CHANGE_INPUT:
        return {
          ...cuurentState,
          userInfo: {
            ...cuurentState.userInfo,
            [action.field]: action.value,
          },
        };
      case formType.CHANGE_OTP:
        return { ...cuurentState, otp: action.otp };
      default:
        throw new Error("Should not be reached!");
    }
  };

  const [formState, formDispatch] = useReducer(formReducer, initialState);
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha_container",
      {
        size: "invisible",
        callback: function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log(response);
        },
      }
    );
  };

  const onSignInSubmit = () => {
    const formData = new FormData();

    formData.append("phone", `+${formState.userInfo.phone}`);
    setloading(true)
    axios.post("https://api.dailyplus.store/v0/user/check-number/", formData)
      .then((response) => {
        setloading(false)
        if (response.status == 200) {
          formDispatch({ type: formType.PHONE, form: formType.PASSWORD });
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
        
        setupRecaptcha();
        var phoneNumber = "+" + formState.userInfo.phone;
        console.log(phoneNumber);
        setloading(false)
        var appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            
            formDispatch({
              type: formType.SEND_OTP,
              confirmOtp: confirmationResult,
              form: formType.OTP,
            });
            console.log(confirmationResult);
          })
          .catch(function (error) {
            // Error; SMS not sent
            // ...
            
            console.log(error);
          });
      });
  };

  const onOtpInSubmit = () => {
    var code = formState.otp;

    // var credential = firebase.auth.PhoneAuthProvider.credential(otp.verificationId, code)

    // console.log(credential)

    formState.confirmOtp
      .confirm(code)
      .then(function (result) {
        // User signed in successfully.
        var user = result.user;
        console.log(user.idToken);

        const token = user
          .getIdToken()
          .then((response) => {
            console.log(response);
            formDispatch({
              type: formType.ACCESS_TOKEN,
              accessToken: response,
            });
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(token);
        if (formState.forgetPass) {
          formDispatch({ type: formType.OTP, form: formType.CONFIRM_PASSWORD });
        } else {
          formDispatch({ type: formType.OTP, form: formType.NAME });
        }

        // ...
      })
      .catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
        formDispatch({ type: formType.OTP, form: formType.OTP });
      });
  };
  const oldUserSubmit = () => {
    const details = {
      phone: "+" + formState.userInfo.phone,
      password: formState.userInfo.password,
    };

    loginAction(details);
    
  };

  const newUserInfo = {
    access_token: formState.userInfo.accessToken,
    display_name: formState.userInfo.fullName,
    email: formState.userInfo.email,
    password: formState.userInfo.password,
  };

  const phoneValid = (value) => {
    if (value.match(/12345/)) {
      return "Invalid value: " + value;
    } else if (value.match(/1234/)) {
      return false;
    } else if (value === "") {
      return "Please Enter Phone Number";
    } else if (value === 880) {
      return "Please Enter Your Phone Number";
    }
    return true;
  };
  const onPhone = () => {
    const valid = phoneValid(formState.userInfo.phone);
    if (valid == true) {
      onSignInSubmit();
    } else {
      console.log(phoneValid(formState.userInfo.phone));
    }
  };
  const onName = () => {
    if (formState.userInfo.fullName != "") {
      
      formDispatch({ type: formType.NAME, form: formType.EMAIL });
      setInputError("");
    } else {
      setInputError("Please Enter YourName");
    }
  };
  const onEmail = () => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (formState.userInfo.email != "" && pattern.test(formState.userInfo.email)) {
      setInputError("");
      formDispatch({ type: formType.EMAIL, form: formType.CONFIRM_PASSWORD });
    } else {
      setInputError("Please Enter  A Valid Email Address");
    }
  };
  const onLogPass = () => {
    oldUserSubmit();
  };
  const onInputChange = (field) => (event) => {
    formDispatch({
      type: formType.CHANGE_INPUT,
      field,
      value: event.target.value,
    });
  };

  const onConfirmPass = () => {
    if (formState.forgetPass) {
      let formdata = new FormData();
      formdata.append("access_token", formState.userInfo.accessToken);
      formdata.append("new_password", formState.userInfo.password);

      axios
        .post(
          "https://api.dailyplus.store/v0/user/password/change/otp/",
          formdata
        )
        .then((response) => {
          console.log(response);
          formDispatch({
            type: formType.CONFIRM_PASSWORD,
            form: formType.PASSWORD,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const newUserInfo = {
        access_token: formState.userInfo.accessToken,
        display_name: formState.userInfo.fullName,
        email: formState.userInfo.email,
        password: formState.userInfo.password,
      };
      SignIninAction(newUserInfo);
      
    }
  };

  const onForgetPass = () => {
    window.appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha_forget_container",
      {
        size: "invisible",
      }
    );
    const appVerifier = window.appVerifier;
    var phoneNumber = "+" + formState.userInfo.phone;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        console.log("Success");
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        formDispatch({
          type: formType.SEND_OTP,
          confirmOtp: confirmationResult,
          form: formType.OTP,
        });
        console.log(confirmationResult);
      })
      .catch(function (error) {
        console.log("Error:" + error.code);
      });
    formDispatch({ type: formType.FORGET_PASS });
  };

  let formContent = "";
 
  switch (formState.form) {
    case formType.PHONE:
     
      formContent = (
        <PhoneForm
          containerClass="phoneField signupInput"
          valid={(value, country) => phoneValid(value, country)}
          value={formState.userInfo.phone}
          change={(phone) =>
            formDispatch({
              type: formType.CHANGE_INPUT,
              field: "phone",
              value: phone,
            })
          }
          clicked={onPhone}
        />
      );
        
      break;
    case formType.PASSWORD:
      if (loading || isloading) {
        formContent= <><div id="recaptcha_container"></div><Spinner /></>
      }else{
      formContent = (
        <PasswordForm
          value={formState.userInfo.password}
          forGetClicked={onForgetPass}
          clicked={onLogPass}
          onError={isError}
          change={onInputChange("password")}
        />
      );
      }
      break;
    case formType.NAME:
      formContent = (
        <NameForm
          value={formState.userInfo.fullName}
          error={inputerror}
          clicked={onName}
          change={onInputChange("fullName")}
        />
      );
      break;
    case formType.EMAIL:
      
      formContent = (
        <EmailForm
          value={formState.userInfo.email}
          error={inputerror}
          clicked={onEmail}
          change={onInputChange("email")}
        />
      );
      
      break;
    case formType.OTP:
      formContent = (
        <OtpForm
          value={formState.otp}
          clicked={onOtpInSubmit}
          change={(value) =>
            formDispatch({ type: formType.CHANGE_OTP, otp: value })
          }
        />
      );
      break;
    case formType.CONFIRM_PASSWORD:
      formContent = (
        <ConfimPasswordForm
          userInfo={newUserInfo}
          isForget={formState.forgetPass}
          value1={formState.userInfo.password}
          change1={onInputChange("password")}
          value2={formState.userInfo.confirmPassword}
          clicked={onConfirmPass}
          change2={onInputChange("confirmPassword")}
        />
      );
      break;
    default:
      break;
  }

  console.log(formState);

  let authRedirect = "";
  if (isAuth != null) {
    authRedirect = <Redirect to="/" />;
  }
  return (
    <section className="custom_page signup">
{authRedirect}
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">{formContent}</div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
