import React from 'react';
import Searchbox from './searchbox';
import PlacesList from './placesList';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      radius: '5000',
      places: []
    }
  }
  render(){
    return(
      <div>
        <Searchbox onSubmit={this.handleSubmit.bind(this)} />
        <hr />
        <PlacesList places={this.state.places} />
      </div>
    )
  }
  componentWillUpdate() {
    if (this.state.location)
      this.update();
  }
  update() {
    let request = {
      location: this.state.location,
      radius: this.state.radius
    }
    let map = new google.maps.Map(document.createElement('div'));
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback.bind(this));
    function callback(results, status){
      if(status == google.maps.places.PlacesServiceStatus.OK){
        this.setState({ places: results });
      }
    }
  }
  handleSubmit(query) {
    this.setState({ location: query.location });
  }

}