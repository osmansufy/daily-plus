import { Modal,Button } from "react-bootstrap";
import profilePic from '../assets/img/profile.png'
import account_icon from '../assets/img/account_circle_24px.png'
import {Image,Container} from  'react-bootstrap'
import InputField from "../component/FormField/InputField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from '../axios'
import * as actionAuth from '../store/actions/actionAuth'
const User = () => {

    const usersInformation=useSelector(state=>state.auth.userdetails)
    const usersToken=useSelector(state=>state.auth.accessToken)
    const dispatch=useDispatch()

    const onUserChange=()=>dispatch(actionAuth.onUserUpdate(usersToken,usersInformation.id))
    
    const [userDetails,setUserDetails]=useState({
        
        email:usersInformation.email,
        phone:usersInformation.phone,
        name:usersInformation.name
    })
    // useEffect(()=>{
     
    //   setUserDetails({
    //     email:usersInformation.email,
    //     phone:usersInformation.phone,
    //     name:usersInformation.name
    //   })
    // },[onUserChange])
    const handleChange=(event)=> {
        setUserDetails({
          ...userDetails,
            [event.target.name] :event.target.value
        
        
          });
        
        }
     const profileUpdate=()=>{
         const id=usersInformation.id
         const updateInfo={
             ...userDetails,
         }
         axios.patch('user/profile/'+id+'/',updateInfo,{
            headers: {
                Authorization: `JWT ${usersToken}`,
              },
         })
         .then(response=>{
          onUserChange(usersToken,usersInformation.id)
             console.log(response)
         })
         .catch(error=>{
             console.log(error)
         })
     }   
    return ( <div className="custom_page user">
      <Container> 
    <Modal.Dialog className="mx-auto my-0 " contentClassName="pt-5">

  <div className="row justify-content-center">
  <Image src={profilePic}  />
  </div>


  <Modal.Body>
    
  <InputField value={userDetails.email} name="email" placeholder="Email"
       imgSrc={account_icon} 
       type="email"
       change={handleChange} appand={false} classInput="mb-3 signupInput emailField"/>
  <InputField value={userDetails.name} name="name" placeholder="FullName"
       imgSrc={account_icon} 
       type="text"
       change={handleChange} appand={false} classInput="mb-3 signupInput emailField"/>
  <InputField value={userDetails.phone} name="phone" placeholder="Phone Number"
       imgSrc={account_icon} 
       type="button"
       change={handleChange} appand={false} classInput="mb-3 signupInput emailField"/>
  </Modal.Body>

  <Modal.Footer className="flex-column">
    <Button variant="secondary" className="btn btn-secondary m-0  btn-custom btn-lg btn-block">Change Password</Button>
    <Button variant="primary" className="btn btn-primary btn-custom btn-lg btn-block" onClick={profileUpdate}>Save changes</Button>
  </Modal.Footer>
</Modal.Dialog>
</Container>
    </div> );
}
 
export default User;