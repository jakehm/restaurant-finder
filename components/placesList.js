import React from 'react';

export default class PlacesList extends React.Component {
  render() {
    return (
      <div>
      <ul>
      {this.props.places.map((place) => {
        return (
          <li>{place.name}</li>
        )
      })}
      </ul>
      </div>
    )
  }
}
