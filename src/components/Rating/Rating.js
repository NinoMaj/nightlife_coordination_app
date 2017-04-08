import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../../colors';

const styles = StyleSheet.create({
  sprite: {
    unicodeBidi: 'bidi-override',
    color: colors.dark,
    fontSize: '25px',
    height: '100%',
    position: 'relative',
    padding: '0',
    textShadow: `0px 1px 0 ${colors.lightGray}`,
  },
  top: {
    color: colors.highlight,
    padding: '0',
    position: 'absolute',
    zIndex: '1',
    overflow: 'hidden',
    left: '0'
  },
  bottom: {
    padding: '0',
    display: 'block',
    zIndex: '0',
    color: colors.lightGray
  }
});

const RatingIcon = () => (<span>★</span>)

const Rating = (props) => {
  const width = { width: `${(props.percentage || 0) * 100}%`}
  return (
    <div className={css(styles.sprite)} >
      <div className={css(styles.top)} style={width} >
        <RatingIcon />
        <RatingIcon />
        <RatingIcon />
        <RatingIcon />
        <RatingIcon />
      </div>
      <div className={css(styles.bottom)} >
        <RatingIcon />
        <RatingIcon />
        <RatingIcon />
        <RatingIcon />
        <RatingIcon />
      </div>
    </div>
  )
}

export default Rating;
