import React, { Component,useState } from "react"
import { connect } from "react-redux"
import { Modal } from "react-bootstrap"
// import SuccessModal from "../snippets/SuccessModal"
import dingigl from "dingi-gl"
import axios from 'axios'
import { setupMap } from "../../service/mapService"

import isEmpty from "../../utility/isEmty"
// import Loader from "react-loader-spinner"
import icon from '../../assets/map_pinned.png'
// import Spinner from '../layouts/Spinner'

import '../../assets/css/location.css'
import { Spinner } from "react-bootstrap"

const config = require('../../config.json')

const baseURL = `${config['BASE_URL']}/v0`

class LocationAction extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapConfig: {
        lng: 90.4065,
        lat: 23.8001,
        zoom: 13
      },
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

  componentDidMount = async () => {
  }

  async componentWillReceiveProps(next) {
    if (this.state.count) {
      await this.setState({ show: next.show });

      if (next.show === true) {
        await setupMap(this);
        this.map.on("click", this.clickOnMap);

        if (next.edit) {
          if (isEmpty(next.error)) {
            const { name, address, id } = next.location;
            const { lat, lon } = next.location.point;
            await this.setState({
              id,
              address,
              name,
              lat,
              lon
            });

            let coords = [lon, lat];
            console.log(coords)

            // create a HTML element for each feature
            var el = document.createElement("div");
            el.className = "marker";

            new dingigl.Marker(el).setLngLat(coords).addTo(this.map);

            this.map.fitBounds([coords, coords], {
              maxZoom: 13,
              padding: {
                bottom: 0,
                left: 0,
                right: 0,
                top: 100
              }
            });
          }
        } else {
          if (isEmpty(next.error)) {
            await this.setState({
              address: "",
              name: "",
              lat: "",
              lon: "",
              query: "",
              show_regions: false
            });
          }
        }
      }
    }
  }

  onInputChange = async e => {
    console.log("search input")
    this.setState({ query: e.target.value })
    const { query } = this.state
    try {
      this.setState({ loader: true })

      const res = await axios.get(`${baseURL}/location/search/all?token=${query}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`,
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

  toggleLocationAction = () => {
    this.setState({ show: !this.state.show })
  }

  removeMarkerFromMap = () => {
    var elem = document.getElementsByClassName("dingigl-marker")[0]
    if (elem) {
      elem.parentNode.removeChild(elem)
    }
  }

  clickOnMap = async e => {
    this.setState({ count: false })
    this.removeMarkerFromMap()
    const { lng, lat } = e.lngLat
    console.log(e.lngLat)

    let coords = [lng, lat]
    await this.setState({
      mapConfig: {
        lng: lng,
        lat: lat,
        zoom: 13
      },
      lon: lng,
      lat: lat
    })

    // create a HTML element for each feature
    var el = document.createElement("div")
    el.className = "marker"
    new dingigl.Marker(el).setLngLat(coords).addTo(this.map)
    this.map.fitBounds([coords, coords], {
      maxZoom: 13,
      padding: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 100
      }
    });
    const res = await axios.get(`${baseURL}/location/geocode/reverse?lat=${lat}&lng=${lng}&lang=en`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json"
      }
    })


    this.setState({
      count: true,
      other_address: res.data.result.address
    })

    // this.props.setUserAddress({ address: res.data.result.address, coords })
    console.log(this.state.query)

  }

  handleLocationSearchOnMap = async e => {
    e.preventDefault()
    const { query } = this.state
    try {
      this.setState({ loader: true })

      const res = await axios.get(`${baseURL}/location/search/all?token=${query}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`,
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
    const location = this.state.regions.find(location => location.id === selected_location.id)
    this.map.flyTo({
      center: [location.location[1], location.location[0]],
      zoom: 13
    })

    this.setState({
      show_regions: false,
      query: selected_location.address
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const { id, name, address, lat, lon } = this.state

    const data = {
      name,
      address,
      point: {
        lat,
        lon
      }
    }

    if (this.props.edit) {
      this.props.update(id, data)
    } else {
      this.props.add(data)
    }
  }

  mapMovementHandler = () => {
    const { lng, lat } = this.map.getCenter()

    this.setState({
      mapConfig: {
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      }
    })
  }
  saveData = (e) => {
    e.preventDefault()
    this.props.Address(this.state.other_address, this.state.lat, this.state.lon)
  }


  render() {
    const {
      name,
      address,
      lat,
      lon,
      show,
      regions,
      query,
      show_regions,
      loader
    } = this.state

    return (
      <>
        <Modal
          isOpen={show}
          toggle={() => { }}
          className="location-action-modal"
        >
          <Modal.Header toggle={() => this.props.close()}>
            Set Address on Map
          </Modal.Header>
          <Modal.Body>
            <div style={{ height: '57px' }}>
              Selected Address: {this.state.other_address}

            </div>
            <div className="row">
              <div className="col-12">


                <div className="location-map-view">
                  <div className="region-search">
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
                    {loader ?
                      <div className="loader-panel">
                        <Spinner type="TailSpin" color="#25C27A" height="100" width="100" />
                      </div>
                      :
                      <>
                        {regions.length > 0 && show_regions && (
                          <ul
                            className="map-locations-list"
                            style={{ maxWidth: "100%" }}
                          >
                            {regions.map(location => (
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
                  </div>
                  <div
                    style={{
                      width: '45vw', height: '60vh',
                      paddingBottom: '0', paddingLeft: '0', paddingRight: '0', paddingTop: '100'
                    }}
                    // style={{ width: '500px', height: '500px' }}
                    ref={el => (this.mapContainer = el)}
                    className="absolute  top right left bottom"
                  />
                </div>
                <hr></hr>
                <div style={{ textAlign: 'center' }}>
                  <button style={{
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                    onClick={this.saveData}
                    className='btn btn-primary'>Submit</button>
                </div>

              </div>
            </div>
          </Modal.Body>
        </Modal>


      </>
    )
  }
}



export default connect(null, {})(LocationAction)
