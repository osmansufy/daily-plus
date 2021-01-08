import { useHistory } from 'react-router'
import genieImg from '../../assets/img/Genie.png'
import './GenieList.css'
const GenieList = () => {

    const history =useHistory()
   const onGenieForm=()=>{
  history.push('/genie/form')
   }
     
    return ( 
       
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="genieImg my-2">
                <img  src={genieImg} />
            </div>
            <div className="genieinfo">
             <h5>Didn’t find the product you’re looking for? Ask Genie!</h5>
             <p>Genie will deliver it to your address.</p>
             <p className="genip">You can also add out of stock product to Genie List.</p>
            </div>
            <button onClick={onGenieForm} className="btn geniebtn w-80 mx-auto d-flex  align-items-center btn-primary"><i class="fas fa-plus mr-2"></i><span>Add to Genie List</span></button>
        </div>
       
     );
}
 
export default GenieList;