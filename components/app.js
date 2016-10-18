import React from 'react';
import PlacesList from './placesList';
import Rcslider from 'rc-slider';
import Geosuggest from 'react-geosuggest';
require("./styles/geosuggest.css");
require('./styles/rcslider.css');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      //radius in miles
      radius: 5,
      places: [],
      isLoading: false
    }
  }
  render(){

    return(
      <div>
        <img 
          src={require('./assets/current-location.png')} 
          onClick={this.handleGeolocation.bind(this)}
          style={{  
            width: 50,
            height: 50,
            position: 'relative',
            float: 'left',
            cursor: 'pointer'
          }}
        />
        <Geosuggest
          placeholder="Enter location"
          autoActivateFirstSuggest={false}
          onSuggestSelect={this.handleSubmit.bind(this)}
          ref="geosuggest" />
        <hr />
        <p> Distance: {this.state.radius} miles</p>
        <Rcslider
          min={0} max={this.convertToMiles(50000)}
          defaultValue={this.state.radius}
          onAfterChange={this.handleSlider.bind(this)}
          step={0.5}
        />
        <hr />
        <PlacesList 
          places={this.state.places}
          isLoading={this.state.isLoading}
        />
      </div>
    )
  }
  getPlaces() {
    let request = {
      location: this.state.location,
      radius: this.convertToMeters(this.state.radius),
      types: ['restaurant']
    }
    let map = new google.maps.Map(document.createElement('div'));
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback.bind(this));
    function callback(results, status){
      if(status == google.maps.places.PlacesServiceStatus.OK){
        this.setState({ 
          places: results,
          isLoading: false
        });
      } else {
        this.setState({ isLoading: false })
      }  
    }
  }
  handleSlider(value) {
    this.setState({
      radius: value,
      isLoading: true
    });
    this.getPlaces();
  }
  handleSubmit(query) {
    this.setState({ 
      location: query.location,
      isLoading: true,
      geolocated: false
    });
    this.getPlaces();
  }
  handleGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          isLoading: true,
          geolocated: true
        })
        this.getPlaces();
        this.refs.geosuggest.update(this.reverseGeocode(this.state.location));
      })
    }
  }
  reverseGeocode(latlng) {
    let geocoder=new google.maps.Geocoder;
    geocoder.geocode({location: latlng}, (results, status) => {
      if (status === 'OK') {
        console.log(results)
        return results[0].formatted_address
      }
    })
  }
  convertToMiles(meters) {
    return (meters*0.000621371)
  }
  convertToMeters(miles) {
    return (miles*1609.34)
  }
}
