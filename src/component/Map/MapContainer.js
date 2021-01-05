import React, { Component } from 'react'
import { setupMap } from '../../service/mapService'
import axios  from "axios";
import { connect } from 'react-redux';
import { Spinner } from "react-bootstrap"
import '../../assets/css/location.css'
import ReactMapGL from 'react-map-gl';
const config = require('../../config.json')

const baseURL = `${config['BASE_URL']}/v0`
class MapContainer extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            mapConfig: {
                lng: 89.3967 ,
                lat: 22.6738,
                zoom: 12
            },
            load_change: false,
          
         
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
          }
        }

        

  handleLocationSearchOnMap = async e => {
    e.preventDefault()
    const { query } = this.state
    try {
      this.setState({ loader: true })

      const res = await axios.get(`${baseURL}/location/search/all?token=${query}`, {
        headers: {
          Authorization: `JWT ${this.props.token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(res)

      if (res.status === 200) {
        this.setState({
          regions: res.data.result,
          show_regions: true
        })
      }

      this.setState({ loader: false })
    } catch (error) {
      console.log(error.response)
    }

    this.setState({ loader: false })
  }
  flyToLocation = selected_location => {
    console.log(selected_location.address)
    console.log(this.state.mapConfig)
    const location = this.state.regions.find(location => location.id === selected_location.id)
    this.setState({
      mapConfig:{
      lag:location.location[1],
      lat:location.location[0],
      zoom: 13
      }
    })
    this.map.flyTo({
      center: [location.location[1], location.location[0]],
      zoom: 13
    })

    this.setState({
      show_regions: false,
      query: selected_location.address
    })
  }
    onInputChange = async e => {
        console.log("search input")
        this.setState({ query: e.target.value })
        const { query } = this.state
        try {
          this.setState({ loader: true })
    
          const res = await axios.get(`${baseURL}/location/search/all?token=${query}`, {
            headers: {
              Authorization: `JWT ${this.props.token}`,
              "Content-Type": "application/json"
            }
          })
          console.log(res)
          if (res.status === 200) {
            this.setState({
              regions: res.data.result,
              show_regions: true
            })
          }
    
          this.setState({ loader: false })
        } catch (error) {
          console.log(error.response)
        }
    
        this.setState({ loader: false })
      }
    
    async componentDidMount() {
      
        let lng = null
        let lat = null
     


        setupMap(this)

    
          
        
    }
    render() {
        console.log(this.props.token)
        return (
            <>
            
             <form
                      className="region-search-form"
                      onSubmit={this.handleLocationSearchOnMap}
                    >
                      <input
                        type="text"
                        // name="query"
                        defaultValue={this.state.query}
                        onChange={this.onInputChange}
                        className="form-control"
                        placeholder="Searh on map "
                      />
                    </form>
                    {this.state.loader ?
                      <div className="loader-panel">
                        <Spinner type="TailSpin" color="#25C27A" height="100" width="100" />
                      </div>
                      :
                      <>
                        {this.state.regions.length > 0 && this.state.show_regions && (
                          <ul
                            className="map-locations-list"
                            style={{ maxWidth: "100%" }}
                          >
                            {this.state.regions.map(location => (
                              <li
                                key={location.id}
                                value={location.id}
                                onClick={this.flyToLocation.bind(this, location)}
                              >
                                {location.name}
                              </li>
                            ))}
                          </ul>

                        )}
                      </>
                    }
            <div
                style={{ width: this.props.width, height: this.props.height }}
                ref={el => (this.mapContainer = el)}
                className="canvas-resize absolute top right left bottom"
            >
                
            </div>
     
    </>
        )
    }
}
const mapStateToProps=state=>{
    return {
      token:state.auth.accessToken,
      
    }
  }
  
  export default connect(mapStateToProps)(MapContainer)