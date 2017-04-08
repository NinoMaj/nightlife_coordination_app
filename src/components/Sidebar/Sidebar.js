import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../../colors';
import Listing from '../Listing/Listing';

const styles = StyleSheet.create({
  sidebar: {
    height: "100%",
    overflow: "hidden"
  },
  heading: {
    background: colors.white,
    borderBottom: "1px solid #eee",
    padding: "0 10px"
  },
  h2: {
    fontSize: "2em",
    marginBottom: "15px"
  }
});

const Sidebar = (props) => {
  return (
    <div className={css(styles.sidebar)}>
      <div className={css(styles.heading)}>
        <h2 className={css(styles.h2)}>{props.title}</h2>
        <Listing
          places={props.places}
          history={props.history}
        />
      </div>
    </div>
  )
}

export default Sidebar
