import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../../colors';
import Rating from '../Rating/Rating'

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid #eeeeee',
    padding: '10px',
    textDecoration: 'none',
    height: '50px',
    overflow: 'hidden'
  },
  placeName: {
    flex: '2',
    ':hover': {
      color: colors.highlight
    }
  },
  rating: {
    flex: '1',
    height: '100%',
    textAlign: 'right'
  }
});

const Item = (props) => {
  // console.log(props.place.name, props.place.rating)
  return (
    <div className={css(styles.item)}>
      <h2 className={css(styles.placeName)}>{props.place.name}</h2>
      <Rating
        className={css(styles.rating)}
        percentage={(props.place.rating / 5)}
      />
    </div>
  )
}

export default Item;
