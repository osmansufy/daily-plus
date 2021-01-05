import { useState } from 'react'
import {InputGroup,FormControl} from 'react-bootstrap'
import showIcon from '../../assets/img/eye.png'
const InputField = (props) => {

    return ( <>
<div className="text-danger">{props.error ? "Password Is inValid" :''}</div>
<InputGroup className={props.classInput}>

    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"><img src={props.imgSrc} /></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder={props.placeholder}
    
     type={props.type}
      value={props.value}
      name={props.name}
      onChange={props.change}
      className="border-0"
    />
    {props.appand ? <InputGroup.Append>
     <InputGroup.Text onClick={props.pShow} id="basic-addon2">  <img src={showIcon} /></InputGroup.Text> </InputGroup.Append>: '' }
  </InputGroup>
</>
      );
}
 
export default InputField;