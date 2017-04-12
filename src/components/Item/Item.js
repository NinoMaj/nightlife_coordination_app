import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../../colors';
import Rating from '../Rating/Rating'

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eeeeee',
    textDecoration: 'none',
    overflow: 'hidden',
    paddingTop: '10px',
    paddingRight: '10px',
    paddingBottom: '10px'
  },
  placeName: {
    fontSize: '1.2em',
    marginRight: '10px',
    cursor: 'pointer',
    ':hover': {
      color: colors.highlight
    }
  },
  rating: {
    height: '100%'
  }
});

const Item = (props) => {
  const handleClick = () => {
    const newLocation = `/detail/${props.place.place_id}`;
    props.history.push(newLocation);
  }
  return (
    <div className={css(styles.item)}>
      <h2 className={css(styles.placeName)} onClick={handleClick}>{props.place.name}</h2>
      <div className={css(styles.rating)}>
        <Rating percentage={(props.place.rating / 5)} />
      </div>
    </div>
  )
}

export default Item;
