import React from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';

export default class PlacesList extends React.Component {
  render() { 
    
    if (this.props.isLoading)
      return (<p> Loading... </p>)
    if (this.props.places.length === 0)
      return (<p> Nothing here. </p>)

    return (
      <div>
        <List selectable ripple>
          {this.props.places.map((place) => {
            let link = 'https://www.google.com/maps/search/'
              + (place.name + '+' + place.vicinity).replace(/ /g,"+");


            let priceLevel = place.price_level ? (
              <span>{Array(place.price_level).join('$')} &middot;</span>
            ) : (
              null
            )
            
            let priceRating = place.rating ? (
              <span>{place.rating} &middot;</span>
            ) : (
              null  
            )

            let linkElement = <a href={link}>Link</a>
            
            let placeDetails = (
              <div>
                {place.vicinity}<br />
                {priceRating}{priceLevel}{linkElement}
              </div>
            )

            return (
              <ListItem key={place.id}
                caption={place.name}
                legend={placeDetails} 
              />
            )
          })}
        </List>
      </div>
    )
  }
}
