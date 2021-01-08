import lockicon from '../../assets/img/lock.png'
import {InputGroup,FormControl,Button,Image} from 'react-bootstrap'
import imgPass from '../../assets/img/password.png'
const ConfimPasswordForm = (props) => {
    return ( <>
    <div className="text-danger">{props.error ? "Password Is inValid" :''}</div>

    <div className="row justify-content-center">

<Image src={imgPass}   />

</div>
        <p>We need to verify you. We will send you a one time verification code. </p>
          {/* <div className="text-danger">{props.formError ? formError : ''}</div> */}
<InputGroup className={props.classInput}>

    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"><img src={props.imgSrc} /></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
    //   placeholder={props.placeholder}
    
     type="password"
      value={props.value1}
     
      onChange={props.change1}
      className="border-0"
    />
    <InputGroup.Append>
     <InputGroup.Text  id="basic-addon2">  <img src={lockicon} /></InputGroup.Text> </InputGroup.Append>
  </InputGroup>
<InputGroup className={props.classInput}>

    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"><img src={props.imgSrc} /></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
    //   placeholder={props.placeholder}
    
     type="password"
      value={props.value2}
     
      onChange={props.change2}
      className="border-0"
    />
    <InputGroup.Append>
     <InputGroup.Text  id="basic-addon2">  <img src={lockicon} /></InputGroup.Text> </InputGroup.Append>
  </InputGroup>

  <Button type="submit" onClick={props.clicked}  className="w-100 mt-3" variant="primary">Next</Button>
         {/* {formField} */}
    </>
     );
}
 
export default ConfimPasswordForm;