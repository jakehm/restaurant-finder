import React from 'react';
import Searchbox from './searchbox';
import PlacesList from './placesList';
import Rcslider from 'rc-slider';
require('rc-slider/assets/index.css');

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
        <Searchbox onSubmit={this.handleSubmit.bind(this)} />
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
  update() {
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
    this.update();
  }
  handleSubmit(query) {
    this.setState({ 
      location: query.location,
      isLoading: true
    });
    this.update();
  }
  convertToMiles(meters) {
    return (meters*0.000621371)
  }
  convertToMeters(miles) {
    return (miles*1609.34)
  }
}
