import { useEffect } from 'react'
import {Modal,Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import successImg from '../assets/img/success.png'

import * as authAction from '../store/actions/actionAuth'
const SuccessPage = () => {
    const isSignUp=useSelector(state=>state.auth.accessToken)
   

    return ( <div className="custom_page Success">
    <Container> 
<Modal.Dialog className="mx-auto my-0 " contentClassName="pt-5"> 

<img src={successImg} />

<p className="text-center"> Payment successfully paid</p>

</Modal.Dialog>
</Container>
</div>
);
}
 
export default SuccessPage;