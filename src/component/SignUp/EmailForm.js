import imgCammera from '../../assets/img/cammera.png'
import account_icon from '../../assets/img/account_circle_24px.png'
import lockicon from '../../assets/img/lock.png'
import {InputGroup,FormControl,Button,Image} from 'react-bootstrap'
import next from '../../assets/img/arrow_forward_24px.svg'
const EmailForm = (props) => {
    return ( 
        <>

<div className="row nameForm flex-column align-items-center justify-content-center">
      
      <h3>Your Information</h3>
      <p>It looks like you don’t have account in this <br/>number. Please let us know some information for<br/> a scure service </p>
          <div className="imageCamera">
      <Image src={imgCammera}   />
      </div>
      </div>
              
                {/* <div className="text-danger">{props.formError ? formError : ''}</div> */}
                <div className="text-danger">{props.error ? props.error :''}</div>
                <div class="form-label-group input-group">
                <span className="input-group-text border-0" id="inputEmail"><img src={account_icon} /></span>
              <input
               placeholder="Full Name"
              
               type="email"
               value={props.value}
                
               onChange={props.change}
               className="border-0 inBR form-control"
               id="inputEmail" />
              <label for="inputEmail">Email Address</label>
            </div>
      
      
            <Button type="submit" onClick={props.clicked}  className="w-100 mt-3 d-flex align-items-center" variant="primary"><span className="flex-grow-1"> Next </span><img src={next} /></Button>

  </>
     );
}
 
export default EmailForm;