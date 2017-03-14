import React from 'react';
import { getDetails } from '../../utils/googleApiHelpers';

import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  wrapper: {
    padding: '10px'
  },
  heading: {
    fontSize: '1.5em'
  }
});

export class Detail extends React.Component {
  static childContextTypes = {
    router: React.PropTypes.object,
  }
  
  constructor(props, context) {
    super(props, context)

    this.state = {
      loading: true,
      place: {},
      location: {}
    }
  }

  componentDidMount() {
    if (this.props.map) {
      this.getDetails(this.props.map);
    }
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps in componentDidUpdate in Details', prevProps);
    console.log('this.props.map in componentDidUpdate in Details', this.props.map);
    if (this.props.map &&  // make sure we have a map
      (prevProps.map !== this.props.map ||
        prevProps.params.placeId !== this.props.params.placeId)) {
      this.getDetails(this.props.map);
    }
  }

  getDetails(map) {
    console.log('this.props in getDetails in Detail.js', this.props);

    // the placeId comes from the URL, passed into
    // this component through params
    const { google, params } = this.props;
    const { placeId } = params;
    // Set the loading state
    this.setState({ loading: true }, () => {
      getDetails(google, map, placeId)
        .then(place => {
          const { location } = place.geometry;
          const loc = {
            lat: location.lat(),
            lng: location.lng()
          }

          this.setState({
            place, location: loc, loading: false
          });
        })
    });
  }

  render() {
    if (this.state.loading) {
      return (
      <div className={css(styles.wrapper)}>
        Loading!
      </div>
      );
    }
    // We're no longer loading when we get here
    const { place } = this.state;
    return (
      <div className={css(styles.wrapper)}>
        <h2 className={css(styles.heading)}>{place.name}</h2>
      </div>
    )
  }
}


export default Detail