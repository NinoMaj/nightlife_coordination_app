import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Item from '../Item/Item'

const styles = StyleSheet.create({
  "container": {
    height: '100%',
    overflow: 'auto',
    paddingBottom: '60px',
    margin: 0,
    fontSize: '0.7em'
  }
});

const Listing = (props) => {
  return (
    <div className={css(styles.container)}>
      {props.places.map(place => {
        return (
          <Item
            place={place}
            onClick={props.onClick}
            key={place.id} />
        )
      })}
    </div>
  )
}

export default Listing