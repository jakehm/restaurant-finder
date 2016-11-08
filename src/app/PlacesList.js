import React from 'react';
import { List, ListItem, ListDivider } from 'react-toolbox/lib/list';

export default class PlacesList extends React.Component {
  render() { 
    
    if (this.props.isLoading)
      return (<p> Loading... </p>)
    if (this.props.places.length === 0)
      return (<p> Nothing here. </p>)

    return (
        <List selectable ripple>
          {this.props.places.map((place) => {
            let link = 'https://www.google.com/maps/search/'
              + (place.name + '+' + place.vicinity).replace(/ /g,"+");
            
            let caption = place.name
            if (place.rating)
              caption += ' \xB7 ' + place.rating
            if (place.price_level)
              caption += ' \xB7 ' + Array(place.price_level+1).join('$')
            return (
              <ListItem 
                key={place.id}
                caption={caption}
                legend={place.vicinity}
                to={link}
              />
            )
          })}
        </List>
    )
  }
}
