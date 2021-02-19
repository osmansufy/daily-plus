import lockicon from '../../assets/img/lock.png'
import {InputGroup,FormControl,Button,Image} from 'react-bootstrap'
import next from '../../assets/img/arrow_forward_24px.svg'
import imgPass from '../../assets/img/password.png'
import OtpInput from 'react-otp-input';

const OtpForm = (props) => {
    return ( 
        <>
       
    
        <div className="row justify-content-center">
    
    <Image src={imgPass}   />
    
    </div>
            <p>We have sent SMS to:
              <br/>
+{props.phone}</p>
              {/* <div className="text-danger">{props.formError ? formError : ''}</div> */}
              
<OtpInput
  value={props.value}
  onChange={props.change}
  numInputs={6}
  inputStyle="otpClass"
  // containerStyle="justify-content-center signupInput otpField otpContainer "
  // separator={<span>-</span>}
  inputStyle="w-100 mx-1"

/>
    
      <Button type="submit" onClick={props.clicked}  className="w-100 mt-3" variant="primary">Next</Button>
             {/* {formField} */}
        </>
     );
}
 
export default OtpForm;