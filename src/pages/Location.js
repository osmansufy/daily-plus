import {Modal,Container, InputGroup,FormControl} from 'react-bootstrap'
import searchIcon from '../assets/img/search_24px.png'
import '../assets/css/location.css'
import MapContainer from '../component/Map/MapContainer'
import {useState} from 'react'
import ReactMapGL from 'react-map-gl';
import MapFContainer from '../component/Map/MapFContainer'
import Map from '../component/Map/MapBox'

const config = require("../config.json");
const Location = () => {
  const [show, setShow] = useState(true)

    return (

    
<Map />
 

  


      
     


      );
}
 
export default Location;