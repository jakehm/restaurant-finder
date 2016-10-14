import React from 'react';

export default class PlacesList extends React.Component {
  render() {
    return (
      <div>
      <ul>
      {this.props.places.map((place) => {
        return (
          <li key={place.id}>{place.name}</li>
        )
      })}
      </ul>
      </div>
    )
  }
}
