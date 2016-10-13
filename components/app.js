import React from 'react';
import Searchbox from './searchbox';
import PlacesList from './placesList';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      places: []
    }
  }
  render(){
    return(
      <div>
        <Searchbox onSubmit={this.handleSubmit.bind(this)}/>
        <hr />
        <PlacesList places={this.state.places} />
      </div>
    )
  }
  handleSubmit(result) {
    this.setState({ places: result });
  }
}
