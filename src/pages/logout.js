import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import * as actionAuth from '../store/actions/actionAuth'
import { useEffect } from "react";
const Logout = () => {
    const dispatch=useDispatch()

  const onLogout=()=>dispatch(actionAuth.userLogout())

  useEffect(()=>{
      onLogout()
  },[])
    return (  
<Redirect to="/" />

    );
}
 
export default Logout;