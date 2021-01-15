import { useState } from 'react'
import {InputGroup,FormControl} from 'react-bootstrap'
import showIcon from '../../assets/img/eye.png'
import visibility from '../../assets/img/visibility_24px.svg'
const InputField = (props) => {
  const [showPss,setshowPass]=useState(false)
  const onTogglePass=()=>{
    setshowPass(!showPss)
      }
    return ( <>
<div className="text-danger">{props.error ? "Password Is inValid" :''}</div>
{/* <InputGroup className={props.classInput}>

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
  </InputGroup> */}
  <div className="form-label-group mb-3 input-group">
                <span className="input-group-text border-0 input-start" > <img src={props.imgSrc} /></span>
              <input
               
               placeholder={props.placeholder}
    
               type={props.type}
              value={props.value}
      name={props.name}
      onChange={props.change}
      className="border-0 form-control"
             />
              <label >{props.placeholder}</label>
              {props.appand ? <span className="input-group-text inBR " onClick={onTogglePass}><img src={visibility} /></span>: ''}
            </div>
</>
      );
}
 
export default InputField;