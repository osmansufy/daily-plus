import React, { useRef, useEffect, useState } from 'react';
import {Modal,Container,Spinner} from 'react-bootstrap'
import mapboxgl from 'mapbox-gl';
import axios  from "axios";
import { useDispatch, useSelector } from 'react-redux';
import './Map.css';
import AddAddress from './AddAddress';
import * as actionAddress from '../../store/actions/actionAddress'
import { Redirect, useHistory } from 'react-router';


const config = require('../../config.json')

mapboxgl.accessToken =config.MAPBOX_ACCESS_TOKEN;
const baseURL = `${config['BASE_URL']}/v0`

const Map = props => {
  const currentAddress =useSelector(state=>state.address.adreessCurrent)
  const [searchEnter,setSearchEnter]=useState('')
  const [query,setQuery]=useState("")
  const mapContainerRef = useRef(null);
  const userToken =useSelector(state=>state.auth.accessToken)
  const [lng, setLng] = useState(90.42303124459973);
  const [lat, setLat] = useState(23.78113301384171); 
  const [zoom, setZoom] = useState(8);
const history=useHistory()
  const dispatch=useDispatch()

  const onEddressInit=(address,location)=>dispatch(actionAddress.onAddressEdit(address,location))
  const inputRef=useRef()
  const [mapinfo,setMapinfo]=useState({
    id: null,
  
    regions: [],
    loader: false,
    show: false,
    show_regions: false,
   
    
  })
  
  const[map,setMap]=useState(null)
  const[marker,setMarker]=useState(null)
  // Initialize map when component mounts

  function onDragEnd(marker) {
    var lngLat = marker.getLngLat();
    setLng(lngLat.lng );
    setLat(lngLat.lat);
    console.log(marker)
    console.log(this)
    }
    function markerChange(marker,map){
        marker.setLngLat([lng, lat])
        .addTo(map);   
    }
 
  useEffect(() => {


 
// marker.setLngLat([lng, lat])
// .addTo(map);
console.log(this)
const map = new mapboxgl.Map({
  container: mapContainerRef.current,
  style: 'http://tilesv3.dingi.live/styles/Combined-Bangla/style.json',
  center: [lng, lat],
  zoom: zoom
});
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right'); 
    const marker = (new mapboxgl.Marker({color: "red",
    draggable: true,
    }))
  
    // setLng(currentAddress.location.lng.toFixed(4));
    // setLat(currentAddress.location.lat.toFixed(4));
  
 
      map.on('move', () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });
// Set options


  var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    });
    // Add the control to the map.
    map.addControl(geolocate);
    // Set an event listener that fires
    // when a trackuserlocationend event occurs.
    geolocate.on('trackuserlocationstart', function() {
    console.log('A trackuserlocationend event has occurred.')
    marker.setLngLat([lng, lat])
    });
  




   


 

 
  
console.log(map)
markerChange(marker,map)
marker.on('dragend', ()=>onDragEnd(marker));
setMarker(marker)
setMap(map)
    // Clean up on unmount
    return () => map.remove();
    
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
 

useEffect(()=>{
  if(currentAddress.location.lat){
    setLat(currentAddress.location.lat)
  }
  if(currentAddress.location.lat){
    setLng(currentAddress.location.lng)
  }
  
 
setSearchEnter(currentAddress.address)

},[currentAddress])
// const {regions}=mapinfo
// useEffect(()=>{
//   if (searchEnter!='') {
    
  
//     const timer=  setTimeout(()=>{ 
//         if (searchEnter===inputRef.current.value) {
//             const query=searchEnter.length ===0?'':searchEnter
//             console.log(token)
//             setMapinfo({
//               ...mapinfo,
          
//             show_regions: false,
//             loader:true
          
//           })
//             axios.get(`${baseURL}/location/search/all/?token=${query}`, {
//               headers: {
//                 Authorization: `JWT ${token}`,
//                 "Content-Type": "application/json"
//               }
//             }).then((res)=>{
//               console.log(res)
//               if (res.status === 200) {
//                 setMapinfo({
//                     ...mapinfo,
//                   regions: res.data.result,
//                   show_regions: true,
//                   loader:false
//                 })
//                 console.log(mapinfo)
//               }
        
             
//             } 
//             ).catch ((error)=>{
//             console.log(error.response)
//             setMapinfo({...mapinfo, loader: false })
//           })
//         }  
//         },200)
    
//         return ()=>{
//             clearTimeout(timer)
//             setMapinfo({
//               ...mapinfo,
          
//             show_regions: false,
//             loader:true
          
//           })
//         }
//       }
// },[searchEnter])



  const onInputChange =  (e)=> {
   
      // e.preventDefault()
      
       const value=e.target.value 
      //  setQuery(value)
        if (value.length >0) {
       axios.get(`${baseURL}/location/search/all/?token=${value}`,{
       headers:{
        Authorization: `JWT ${userToken}`,
      }}).then((res)=>{
        console.log(res)
        if (res.status === 200) {
          setMapinfo({
            ...mapinfo,
          regions: res.data.result,
          show_regions: true,
          loader:false
        })
          console.log(mapinfo)
        }
  
       
      } 
      ).catch ((error)=>{
      setMapinfo({...mapinfo, loader: false })
    })
  }

    
  }
  const flyToLocation =(selected_location) => {
    console.log(selected_location)
    // console.log(viewport)
    
    const location = mapinfo.regions.find(location => location.id === selected_location.id)
    console.log(location)
  
   
 
marker.on('dragend', ()=>onDragEnd(marker));    
 
    map.flyTo({
      center: [location.location[1], location.location[0]],
      zoom: 13
    })
    marker.setLngLat([location.location[1], location.location[0]]).addTo(map)
    // map.addControl(new mapboxgl.NavigationControl(), 'top-right'); 
   
  

  
    
    map.on('move', () => {
      setLng(location.location[1]);
      setLat(location.location[0]);
      setZoom(map.getZoom().toFixed(2));
    });
    // Set options
    setLng(location.location[1]);
    setLat(location.location[0]);
    setZoom(15);
    console.log(lat)
    setMapinfo({
        ...mapinfo,
      show_regions: false,
      // query: location.address,
      // address: selected_location.address,
    })
    setSearchEnter(location.address)
    console.log(mapinfo.query)
    document.getElementById('searchMap').value=selected_location.address
  }
  const handleLocationSearchOnMap = e => {
    e.preventDefault()
    const query  = searchEnter
  
        setMapinfo({ 
            ...mapinfo,
            loader: true })

       axios.get(`${baseURL}/location/search/all?token=${query}`, {
        headers: {
          Authorization: `JWT ${userToken}`,
          "Content-Type": "application/json"
        }
      }).then(response=>{
       
          console.log(response)
          if (response.status === 200) {
            setMapinfo({
                ...mapinfo,
              regions: response.data.result,
              show_regions: true
            })
          }
          setMapinfo({...mapinfo, loader: false })
      }).catch (error=> {
      console.log(error)
    })

    // setMapinfo({ ...mapinfo,
    //     loader: false })
  }
 
  const searchHandle =()=>{
   
  }
  const onEditEddress=()=>{
   const location={
     lat:lat,
     lng:lng
   }
   const address=searchEnter

    onEddressInit(location,address)
    history.push('/location/save')
     }
  let MapContainer=(<div className="mapModal">
    <form
  className="region-search-form"
  onSubmit={handleLocationSearchOnMap}
  autocomplete="off"
>
  
  <input
    type="search"
    id="searchMap"
    // name="query"
    defaultValue={searchEnter}
    // ref={inputRef}
    // value={query}
    // onChange={(event)=>setSearchEnter(event.target.value)}
    onChange={onInputChange}
    className="form-control"
    placeholder="Searh on map "
    autocomplete="off"
    // value={mapinfo.query}
  />
</form>
{mapinfo.loader ?
  <div className="loader-panel">
    <Spinner type="TailSpin" color="#25C27A" height="100" width="100" />
  </div>
  :
  <>
  {searchEnter.length >0 && mapinfo.regions.length > 0 && mapinfo.show_regions &&  (
    <ul
      className="map-locations-list"
      style={{ maxWidth: "100%" }}
    >
      {mapinfo.regions.map(location => (
        <li
          key={location.id}
          value={location.id}
        
        onClick={()=>flyToLocation(location)}

        >
          {location.name}
          {/* {console.log(location)} */}
        </li>
      ))}
    </ul>

  )}
</>
    
  
}
<Modal.Dialog className=" mx-auto my-0 " contentClassName="pt-5">

<div>

<div className='sidebarStyle'>
<div>

Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
</div>
<div className='map-container' ref={mapContainerRef} />
</div>
</Modal.Dialog>
<Modal.Footer>

<a type="button" onClick={onEditEddress} className="btn btn-primary editAddress btn-custom btn-lg btn-block"> <span>
Edit New Address </span></a>
</Modal.Footer>
</div>
  )
 
  
  return (<div className="custom_page map-location">
       
<Container> 
{MapContainer}



        </Container>
        </div>
  );
}


export default Map;
