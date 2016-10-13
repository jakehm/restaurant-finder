import React from 'react';
import Geosuggest from 'react-geosuggest';
require("../geosuggest.css");

export default class Searchbox extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Geosuggest
        placeholder="Enter location"
        onSuggestSelect={this.onSuggestSelect} />
    );
  }

  onSuggestSelect(suggest){
    let request = {
      location: suggest.location,
      radius: '5000'
    };
    let map = new google.maps.Map(document.createElement('div'));
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    function callback(results, status){
      if(status == google.maps.places.PlacesServiceStatus.OK){
        this.props.onPlaces(results);
      }
    }
  } 
}
