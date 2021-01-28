import { useState } from "react";
import { Modal,Button,Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import locksvg from '../../assets/img/lock_24px.svg'
import visibility from '../../assets/img/visibility_24px.svg'
import * as authActions from '../../store/actions/actionAuth'
import axios from '../../axios'
import { useHistory } from "react-router";
const ChangePass = () => {
    const dispatch=useDispatch()
    const history=useHistory()
    const usersToken=useSelector(state=>state.auth.accessToken)
    const usersInformation=useSelector(state=>state.auth.userdetails)
    const [showNewPss,setshowNewPass]=useState(false)
    const [oldPass,setOldPass]=useState('')
    const [newPass,setNewPass]=useState('')
    const [error,setError]=useState('')
    const [success,setSuccess]=useState('')
    const onUserChange=(usersToken,id)=>dispatch(authActions.onUserUpdate(usersToken,id))
    const onShownewPass=()=>{
        setshowNewPass(!showNewPss)
        }
    const [showOldPss,setshowOldPass]=useState(false)
    const onShowOldPass=()=>{
        setshowOldPass(!showOldPss)
        }
        const afterChangePassword=()=>{
            onUserChange(usersToken,usersInformation.id)
            setError('')
            setSuccess('Password Changed Successfully')
        }
        const onChangePassword=()=>{
            console.log("oldpass",oldPass);
            console.log('newPass',newPass)
            let formdata = new FormData();
            formdata.append("old_password", oldPass);
            formdata.append("new_password", newPass);
            axios.post('user/password/change/',formdata,{
                headers: {
                    Authorization: `JWT ${usersToken}`,
                    'Content-Type': 'multipart/form-data'
                  },
             }).then(response=>{
                 console.log(response)
                 afterChangePassword()
             }).catch(error=>{
                 console.log(error.response);
                 setError(error.response.data.detail)
             })
        }
    return ( <section className="custom_page user">
    <Container> 

    <Modal.Dialog className="mx-auto my-4 " contentClassName="pt-5 px-4">
        <h3 className="mt-3">Change Password</h3>
        <p className="my-3">Please set a secured password for your own protection</p>
        {error?<p className="text-danger my-3">{error}</p> : success ? <p className="text-success my-3">{success}</p>  : "" }
        
        
    <div className="form-label-group mb-4 input-group">
                <span className="input-group-text border-0 input-start" id="inputEmail"> <img src={locksvg} /></span>
              <input
               placeholder="old password"
              
               type={showOldPss?"text":"password"}
               value={oldPass}
     
              onChange={(e)=>setOldPass(e.target.value)}
   
               className="border-0 form-control"
               id="inputEmail" />
              <label for="inputEmail">Old Password</label>
              <span className="input-group-text border-0 inBR" onClick={onShowOldPass} ><img src={visibility} /></span>
            </div>
    <div className="form-label-group mb-4 input-group">
                <span className="input-group-text border-0 input-start" id="inputEmail"> <img src={locksvg} /></span>
              <input
               placeholder="new password"
              
               type={showNewPss?"text":"password"}
               value={newPass}
     
              onChange={(e)=>setNewPass(e.target.value)}
   
               className="border-0 form-control"
               id="inputEmail" />
              <label for="inputEmail">New Password</label>
              <span className="input-group-text border-0 inBR" onClick={onShownewPass} ><img src={visibility} /></span>
            </div>
<Modal.Footer className="flex-column">
  
  <Button variant="primary" onClick={onChangePassword} className="btn pl-4 mt-3 w-100 d-flex align-items-center  btn-custom btn-lg btn-block">
    
    <span className="flex-grow-1">Save changes</span>
    </Button>
</Modal.Footer>
</Modal.Dialog>
</Container>
  </section> );
}
 
export default ChangePass;