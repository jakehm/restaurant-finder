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
        let link = 'https://www.google.com/maps/search/'
          + (place.name + '+' + place.vicinity).replace(/ /g,"+");
        console.log(link);  
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
            <p>
            <a href={link}>Link</a>
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
