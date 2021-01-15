import { Modal,Button } from "react-bootstrap";
import profilePic from '../assets/img/profile.png'
import account_icon from '../assets/img/account_circle_24px.svg'
import lockicon from '../assets/img/lock_white.svg'
import mailIcon from '../assets/img/mail_24px.svg'
import callIcon from '../assets/img/call_24px.svg'
import saveIcon from '../assets/img/save_24px.svg'
import {Image,Container} from  'react-bootstrap'
import InputField from "../component/FormField/InputField";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cammera from '../assets/img/cammera.png'
import axios from '../axios'
import * as actionAuth from '../store/actions/actionAuth'
const User = () => {

    const usersInformation=useSelector(state=>state.auth.userdetails)
    const usersToken=useSelector(state=>state.auth.accessToken)
    const dispatch=useDispatch()
    const inputRef=useRef()
    const [preview, setPreview] = useState()
    const [selectedImg,setSelectedImg]  =useState()
    const onUserChange=()=>dispatch(actionAuth.onUserUpdate(usersToken,usersInformation.id))
    
    const [userDetails,setUserDetails]=useState({
        
        email:usersInformation.email,
        phone:usersInformation.phone,
        name:usersInformation.name
    })
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
    // useEffect(()=>{
     
    //   setUserDetails({
    //     email:usersInformation.email,
    //     phone:usersInformation.phone,
    //     name:usersInformation.name
    //   })
    // },[usersInformation])
    const handleChange=(event)=> {
        setUserDetails({
          ...userDetails,
            [event.target.name] :event.target.value
        
        
          });
        
        }
        const onCloseImg=()=>{
          setSelectedImg(null)
       }
        const fileChangedHandler = e => {
          if (!e.target.files || e.target.files.length === 0) {
              setSelectedImg(undefined)
              return
          }
      
          // I've kept this example simple by using the first image instead of multiple
          setSelectedImg(e.target.files[0])
              console.log(e.target.files[0])
            }
     const profileUpdate=(event)=>{
      event.preventDefault();
         const id=usersInformation.id

         let formdata = new FormData();
         formdata.append("email", userDetails.email);
         formdata.append("phone", userDetails.phone);
         formdata.append("name", userDetails.name);
         formdata.append("image", selectedImg);
         axios.patch('user/profile/'+id+'/',formdata,{
            headers: {
                Authorization: `JWT ${usersToken}`,
              },
         })
         .then(response=>{
          // onUserChange(usersToken,usersInformation.id)
             console.log(response)
             console.log(formdata)
         })
         .catch(error=>{
             console.log(error)
             console.log(formdata)
         })
     } 
     
     let imgUp= <div className="userProfilePic" onClick={()=>inputRef.current.click()} ><img src={profilePic}  />
     </div>
     
     if(preview){
         imgUp=<div className="userProfilePic"><img  src={preview} /></div>
     }
    return ( <div className="custom_page user">
      <Container> 
    <Modal.Dialog className="mx-auto my-4 " contentClassName="pt-5">

  <div className="row justify-content-center">
  <input 
             type="file" 
             ref={inputRef}
             onChange={fileChangedHandler}
             style={{display:'none'}}
             />
  
  {imgUp}
  </div>


  <Modal.Body>
    
  <InputField value={userDetails.name} name="name" placeholder="Full Name"
       imgSrc={account_icon} 
       type="text"
       change={handleChange} appand={false} classInput="mb-3 signupInput emailField"/>
 
  
  <InputField value={userDetails.phone} name="phone" placeholder="Phone Number"
       imgSrc={callIcon} 
       type="button"
       change={handleChange} appand={false} classInput="mb-3 signupInput emailField"/>
        <InputField value={userDetails.email} name="email" placeholder="Email"
       imgSrc={mailIcon} 
       type="email"
       change={handleChange} appand={false} classInput="mb-3 signupInput emailField"/>
  </Modal.Body>

  <Modal.Footer className="flex-column">
    <Button variant="secondary" className="btn btn-secondary m-0 w-100 d-flex align-items-center  btn-custom btn-lg btn-block"> 
    <img src={lockicon} />
    <span className="flex-grow-1">Change Password </span>
     </Button>
    <Button variant="primary" className="btn btn-primary btn-custom btn-lg btn-block" onClick={profileUpdate}>
      <img src={saveIcon} />
      <span className="flex-grow-1">Save changes</span>
      </Button>
  </Modal.Footer>
</Modal.Dialog>
</Container>
    </div> );
}
 
export default User;