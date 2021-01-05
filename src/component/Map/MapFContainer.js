import React,{ useState,useRef ,useEffect,useCallback} from "react";
import ReactMapGL,{Marker,NavigationControl,GeolocateControl} from 'react-map-gl';
import { Spinner } from "react-bootstrap"
import axios  from "axios";
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl'
import Pin from '../../pin.js';
import { setupMap } from '../../service/mapService'
import {Component} from 'react';
import ControlPanel from './ControlPanel'
const config = require('../../config.json')

const baseURL = `${config['BASE_URL']}/v0`

const MapFContainer = props => {
    
  const [events,setEvents]=useState({})
    const [viewport, setViewport] = useState({
        latitude: 22.6738,
        longitude: 89.3967,
        zoom: 8
      });
     const [marker,setMarker]=useState({
      
      latitude: 22.6738,
      longitude: 89.3967,
      
     })
     const navStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '10px'
    };
    const geolocateStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      margin: 10
    };
      const [mapinfo,setMapinfo]=useState({
        id: null,
        address: "",
        name: "",
        lat: "",
        lon: "",
        query: "",
        regions: [],
        loader: false,
        show: false,
        show_regions: false,
        other_address: '',
        count: true
      })
      const token =useSelector(state=>state.auth.accessToken)
   const   _updateViewport = viewport => {
        setViewport({viewport});
      };
    
    const  _logDragEvent=(name, event)=> {
        setEvents({
          events: {
            ...events,
            [name]: event.lngLat
          }
        });
      }
    
    const _onMarkerDragStart = event => {
        _logDragEvent('onDragStart', event);
    
      };
    
    const _onMarkerDrag = event => {
        _logDragEvent('onDrag', event);
     
      };
    
    const _onMarkerDragEnd = async event => {
        _logDragEvent('onDragEnd', event);
        setMarker( {
            longitude: event.lngLat[0],
            latitude: event.lngLat[1],
            
          }
          
        );
       
        setViewport({
          longitude: event.lngLat[0],
          latitude: event.lngLat[1],
          zoom:15
        })
        const lat=event.lngLat[0]
        const lng=event.lngLat[1]
console.log('lat',event)
console.log('lng',lng)


       axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + lat + "," + lng + ".json?access_token=" + config.MAPBOX_ACCESS_TOKEN,{
        types:['country', 'region', 'postcode', 'district', 'place', 'locality', 'neighborhood', 'address']
       }).then(response=>{
console.log(response)
console.log(response.data.features[0].place_name)
setMapinfo({
  ...mapinfo, 
query:response.data.features[0].place_name})
document.getElementById('searchMap').value=response.data.features[0].place_name
       })
       .catch((error)=>
       {console.log(error)})
       
    
      };
      
   
 

  
    const onInputChange =  e => {
   
        console.log("search input")
     
       
      
          setMapinfo({
            ...mapinfo, 
            loader: true })
            setMapinfo({
                ...mapinfo, 
              query: e.target.value })
            const query = mapinfo.query
            console.log(query)
            if (e.target.value !="") {
              
            
           axios.get(`${baseURL}/location/search/all?token=${query}`, {
            headers: {
              Authorization: `JWT ${token}`,
              "Content-Type": "application/json"
            }
          }).then((res)=>{
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
          console.log(error.response)
          setMapinfo({...mapinfo, loader: false })
        })
      }
    
        
      }
      
     const handleLocationSearchOnMap = async e => {
        e.preventDefault()
        const query  = mapinfo.query
        try {
            setMapinfo({ 
                ...mapinfo,
                loader: true })
    
          const res = await axios.get(`${baseURL}/location/search/all?token=${query}`, {
            headers: {
              Authorization: `JWT ${token}`,
              "Content-Type": "application/json"
            }
          }).then(response=>{
            setMapinfo({
                ...mapinfo,
                regions: response.data.result,
                show_regions: true
              })
          })
          console.log(res)
    
          if (res.status === 200) {
            setMapinfo({
                ...mapinfo,
              regions: res.data.result,
              show_regions: true
            })
          }
    
          setMapinfo({...mapinfo, loader: false })
        } catch (error) {
          console.log(error.response)
        }
    
        setMapinfo({ ...mapinfo,
            loader: false })
      }
    const flyToLocation =(selected_location, field) => {
        console.log(selected_location.address)
        console.log(viewport)
        console.log(field)
        const location = mapinfo.regions.find(location => location.id === selected_location.id)
        console.log(selected_location)
        setViewport({
           
        latitude: location.location[0],
        longitude: location.location[1],
        zoom: 13
        
        })
        // selected_location.map.flyTo({
        //   center: [location.location[1], location.location[0]],
        //   zoom: 13
        // })
    
        // Set options
        setMarker({
          latitude: location.location[0],
          longitude: location.location[1],
        })
        setMapinfo({
            ...mapinfo,
          show_regions: false,
          query: selected_location.address
        })
        console.log(mapinfo.query)
        document.getElementById('searchMap').value=selected_location.address
      }
     const updateCurrentLocation=()=>{
       
     }
    return ( 
        
        <>
        {console.log(mapinfo)}
          <form
                      className="region-search-form"
                      onSubmit={handleLocationSearchOnMap}
                    >
                      
                      <input
                        type="text"
                        id="searchMap"
                        // name="query"
                        defaultValue={mapinfo.query}
                        onChange={(value)=>onInputChange(value)}
                        className="form-control"
                        placeholder="Searh on map "
                        // value={mapinfo.query}
                      />
                    </form>
                    {mapinfo.loader ?
                      <div className="loader-panel">
                        <Spinner type="TailSpin" color="#25C27A" height="100" width="100" />
                      </div>
                      :
                      <>
                      {mapinfo.regions.length > 0 && mapinfo.show_regions && (
                        <ul
                          className="map-locations-list"
                          style={{ maxWidth: "100%" }}
                        >
                          {mapinfo.regions.map(location => (
                            <li
                              key={location.id}
                              value={location.id}
                            
                            onClick={
                               
                                flyToLocation.bind(this,location)}
                            >
                              {location.name}
                              {/* {console.log(location)} */}
                            </li>
                          ))}
                        </ul>

                      )}
                    </>
                        
                      
                    }
                     
        <ReactMapGL
        {...viewport}
        width="100%"
        height="200px"
        onViewportChange={_updateViewport}
        mapboxApiAccessToken={config.MAPBOX_ACCESS_TOKEN}
  
      >
  <Marker
  offsetTop={-20}
  offsetLeft={-10}
  draggable
  onDragStart={_onMarkerDragStart}
  onDrag={_onMarkerDrag}
  onDragEnd={_onMarkerDragEnd}
          longitude={marker.longitude}
          latitude={marker.latitude}
        
        >
 <Pin size={20} />

        </Marker>
       
        {/* <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={_updateViewport} />
        </div>

        <ControlPanel
         
          events={events}
        /> */}
         <GeolocateControl
         style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          onViewportChange ={updateCurrentLocation}
          fitBoundsOptions ={{maxZoom: 15}}
        />

      </ReactMapGL>
</>
     );
}
 
export default MapFContainer;