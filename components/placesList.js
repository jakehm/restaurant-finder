import React from 'react';

export default class PlacesList extends React.Component {
  render() {
    if (this.props.isLoading)
      return (<p> Loading... </p>)
    if (this.props.places.length === 0)
      return (<p> Nothing here. </p>)
    return (
      <div>
      <ul>
      {this.props.places.map((place) => {
        return (
          <li key={place.id}>
            <p>{place.name}</p>
            <p>{place.vicinity}</p>
            <p>
            {place.price_level 
              ? 'price level: ' + place.price_level 
              : null}
            </p>
            <p>
            {place.rating 
              ? 'rating: ' + place.rating 
              : null}
            </p>
            <br />
          </li>
        )
      })}
      </ul>
      </div>
    )
  }
}
