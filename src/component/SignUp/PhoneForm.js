import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import {Button,Image} from 'react-bootstrap'
import imgPhone from '../../assets/img/mobile.png'
const PhoneForm = (props) => {
    return ( 
        <>

<div className="row justify-content-center">

<Image src={imgPhone}   />

</div>
        <p>We need to verify you. We will send you a one time verification code. </p>
          {/* <div className="text-danger">{props.formError ? formError : ''}</div> */}
          <PhoneInput
        country={'bd'}
        prefix='+'
        onlyCountries={['bd']}
        containerClass={props.containerClass}
        value={props.value}
        onChange={props.change}
      
        />
<Button type="submit" onClick={props.clicked} className="w-100 mt-3" variant="primary">Next</Button>
        </>
     );
}
 
export default PhoneForm;