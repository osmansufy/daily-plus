import imgCammera from '../../assets/img/cammera.png'
import lockicon from '../../assets/img/lock.png'
import {InputGroup,FormControl,Button,Image} from 'react-bootstrap'
const NameForm = (props) => {
    return ( 
        <>
        <div className="text-danger">{props.error ? "Password Is inValid" :''}</div>

    <div className="row justify-content-center">

<Image src={imgCammera}   />

</div>
        <p>We need to verify you. We will send you a one time verification code. </p>
          {/* <div className="text-danger">{props.formError ? formError : ''}</div> */}
<InputGroup className={props.classInput}>

    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"><img src={props.imgSrc} /></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
    //   placeholder={props.placeholder}
    
     type="text"
      value={props.value}
     
      onChange={props.change}
      className="border-0"
    />
    <InputGroup.Append>
     <InputGroup.Text  id="basic-addon2">  <img src={lockicon} /></InputGroup.Text> </InputGroup.Append>
  </InputGroup>

  <Button type="submit"  className="w-100 mt-3" variant="primary">Next</Button>
  </>
     );
}
 
export default NameForm;