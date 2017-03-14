import React from 'react';
import { searchNearby } from '../../utils/googleApiHelpers';
import Map, { GoogleApiWrapper } from 'google-maps-react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Header from '../../components/Header/Header';
// import { RouteHandler, Link, Route, Router } from 'react-router';
// import MapContainer from '../MapContainer/MapContainer';


const styles = StyleSheet.create({
  container: {
  }
});

export class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    // const { push } = context.router.push

    this.state = {
      places: [],
      pagination: null
    }
  }

  onMarkerClick = (item) => {
    const { place } = item; // place prop
    const { push } = this.context.router;
    // const { push } = this.context.router.replaceWith('/');
    push(`map/detail/${place.place_id}`)
  }

  onReady = (mapProps, map) => {
    searchNearby(
      this.props.google,
      map,
      {
        location: map.center,
        radius: '500',
        types: ['bar']
      }
    ).then((results, pagination) => {
      this.setState({
        places: results,
        pagination
      })
    }).catch((status) => {
      console.log('error fetching nearby', status)
    })
  }

  render() {
    let children = null;
    if (this.props.children) {
      // We have children in the Container component
      children = React.cloneElement(
        this.props.children,
        {
          google: this.props.google,
          places: this.state.places,
          loaded: this.props.loaded,
          router: this.context.router,
          onMove: this.onMapMove,
          onMarkerClick: this.onMarkerClick,
          zoom: this.props.zoom,
        });
    }

    return (
      <div className={css(styles.container)}>
        <Map
          google={this.props.google}
          onReady={this.onReady.bind(this)}
          visible={false}
        />
        <Header />
        <div>
          {children}
        </div>
      </div>
    )
  }
}

Main.contextTypes = {
  router: React.PropTypes.object
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(Main)
