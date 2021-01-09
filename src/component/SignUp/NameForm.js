import imgCammera from '../../assets/img/cammera.png'
import next from '../../assets/img/arrow_forward_24px.svg'
import account_icon from '../../assets/img/account_circle_24px.png'
import {InputGroup,FormControl,Button,Image} from 'react-bootstrap'
const NameForm = (props) => {
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
          <div className="text-danger">{props.error ? props.error:''}</div>
          <div class="form-label-group input-group">
          <span className="input-group-text border-0" id="floatingInput"><img src={account_icon} /></span>
        <input
         placeholder="Full Name"
         id="floatingInput"
         type="text"
         value={props.value}
          
         onChange={props.change}
         className="border-0 inBR form-control"
         />
        <label for="floatingInput">FULL NAME</label>
      </div>


  <Button type="submit" onClick={props.clicked}  className="w-100 mt-3 d-flex align-items-center" variant="primary"><span className="flex-grow-1"> Next </span><img src={next} /></Button>
  </>
     );
}
 
export default NameForm;