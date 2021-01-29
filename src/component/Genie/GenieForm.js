import { useEffect, useRef, useState } from 'react'
import {Modal,Button} from 'react-bootstrap'
import {updateObject} from '../../utility/updateObject'    
import {validity} from '../../utility/validity'  
import Input from '../../UI/Input/Input'  
import geneInput from '../../assets/img/genieImg.png'
import cammera from '../../assets/img/cammera.png'
import { useSelector } from 'react-redux'
import axios from '../../axios'
import { useHistory } from 'react-router'
import SuccessModal from '../../UI/Modal/SuccessModal'
const GenieForm = () => {

    const history=useHistory()
    const userInfo=useSelector(state=>state.auth.userdetails)
    const token=useSelector(state=>state.auth.accessToken)
    
    const [orderForm,setOrderForm]= useState( {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Product Name'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched:false
        },
        weight: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Weight or Quantity'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched:false
        },
        note: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: 'Note'
            },
            value: '',
        
            valid: false,
            touched:false
        },
        
    }
    )
    const [formIsvalid, setFormisValid] =useState(false)
    const [selectedImg,setSelectedImg]  =useState('')
    const inputRef=useRef()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedImg) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedImg)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedImg])

   const fileChangedHandler = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedImg('')
        return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedImg(e.target.files[0])
        console.log(e.target.files[0])
      }
    const orderHandler = ( event ) => {
         event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
       //  let formSubmit = new FormData();
       //  formSubmit.append(formData)
       let formdata = new FormData();
       formdata.append("name", formData.name);
       formdata.append("owner", userInfo.id);
       formdata.append("description", formData.note);
       formdata.append("unit_name", formData.weight);
       formdata.append("image", selectedImg);

    
      console.log(formdata)

      axios.post('order/genielist/items/',formdata,{
       headers: {
           Authorization: `JWT ${token}`,
         },

      })
      .then(res=>{
       history.push('/genie')
          console.log(res)
      })
      .catch(err=>{
          console.log(err)
      })
      
        
     
     }
   
     const onCloseImg=()=>{
        setSelectedImg(null)
     }

   const inputChangedHandler = (event,inputIdentifier) => {
         
 
       
         const updatedFormElement=updateObject(orderForm[inputIdentifier],{
             value:event.target.value,
             valid:validity(event.target.value,orderForm[inputIdentifier].validation),
             touched:true
         })      
     
         const updatedOrderForm=updateObject(orderForm,{
             [inputIdentifier]:updatedFormElement
         })
     
      let formIsvalid = true 
 
      for( let formInputValid in updatedOrderForm){
          formIsvalid = updatedOrderForm[formInputValid].valid && formIsvalid
      }
 setFormisValid(formIsvalid)
 setOrderForm(updatedOrderForm)
      
         }
     
        let imgUp= <div className="imgbtn" onClick={()=>inputRef.current.click()} ><img src={cammera} />
        <h5 className="text-center">Upload Images here</h5>
        </div>
        
        if(preview){
            imgUp=<div className="imgbtn noc"><span onClick={onCloseImg}>X</span> <img src={preview} /></div>
        }
         const formElementsArray = [];
         for (let key in orderForm) {
             formElementsArray.push({
                 id: key,
                 config: orderForm[key]
             });
         }
         let form = (
             <form onSubmit={orderHandler} enctype="multipart/form-data">
            {formElementsArray.map(formElement=>(
                <Input 
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}  
                value={formElement.config.value}
                inValid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>inputChangedHandler(event,formElement.id)}
                />
            ))}
             <input 
             type="file" 
             ref={inputRef}
             onChange={fileChangedHandler}
             style={{display:'none'}}
             />
            {imgUp}
            
               <Modal.Footer>
                   
               <button type="submit"  className="btn geniebtn w-100 mx-auto d-flex  align-items-center btn-primary"><i className="fas fa-plus mr-2"></i><span>Add to Genie List</span></button>
                   {/* <Button disabled={!formIsvalid} btnType="Success">ORDER</Button> */}
                   
                   </Modal.Footer>
             </form>
         );
        console.log(selectedImg)
    return (
       
        <section className="custom_page genieForm">
         <h2 className="text-center">Genie / Add Product</h2>   
        <Modal.Dialog className="genieFormModal ">
  
  <Modal.Body className="my-4">
    {form}
  
  </Modal.Body>

 
    
  
</Modal.Dialog>

</section>
     );
}
 
export default GenieForm;