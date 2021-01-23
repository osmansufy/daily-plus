import proIcon from '../../assets/img/profile-icon.png'
import logIcon from '../../assets/img/logout_icon.png'
import bagIcon from '../../assets/img/bag-icon.png'
import { Link, useHistory } from 'react-router-dom';
import {Dropdown} from 'react-bootstrap'
const UserModal = () => {

       const history= useHistory()
       const onOrder=()=>{
              history.push('/order')
       }
       const onPreOrder=()=>{
              history.push('/order/preorder')
       }
       const onuser=()=>{
              history.push('/user')
       }
       const onlogout=()=>{
              history.push('/logout')
       }
       const onGenie=()=>{
              history.push('/genie')
       }
    return (  
    
  //   <div className="userModal" >

  //   <div className="container">
  //     <h4>User</h4>
  //     <div className="row userInfo userProfile ">
  //      <Link to="/user"> <img src={proIcon}/><span>My Profile</span></Link>
  //       </div>
  //     <div className="row userInfo userOrder "><Link to="/order" ><img src={bagIcon}/><span>My Order</span></Link></div>
  //     <div className="row userInfo userLogout"><Link to="/logout"><img src={logIcon}/><span>Logout</span></Link></div>
  //   </div>
  // </div> 


  
<Dropdown.Menu className="userModal" >

<div>

<h4>User</h4>
<Dropdown.Item onClick={onuser} eventKey="1"className="d-flex userInfo userProfile "  >

 <img src={proIcon}/><span>My Profile</span>

       </Dropdown.Item>
<Dropdown.Item onClick={onOrder} eventKey="2"className="d-flex userInfo userOrder  "  >

<img src={bagIcon}/><span>My Order</span>

       </Dropdown.Item>
<Dropdown.Item onClick={onPreOrder} eventKey="3"className="d-flex userInfo userOrder  "  >

<img src={bagIcon}/><span>PreOrder</span>

       </Dropdown.Item>
<Dropdown.Item onClick={onGenie} eventKey="4"className="d-flex userInfo userOrder  "  >

<img src={bagIcon}/><span>Genie List</span>

       </Dropdown.Item>
<Dropdown.Item onClick={onlogout} eventKey="5"className="d-flex userInfo userLogout "  >

<img src={logIcon}/><span>Logout</span>

       </Dropdown.Item>

</div>
</Dropdown.Menu>
  

  );
}
 
export default UserModal;