import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { searchNearby } from '../../utils/googleApiHelpers';
import Map, { GoogleApiWrapper } from 'google-maps-react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { screenSizes } from '../../screenSizes';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 0,
    padding: '15px',
    height: '100vh',
    flex: 1,
    flexDirection: 'column',
    [screenSizes.smartphone]: {
      padding: "0px"
    },
  }
});

export class MainwoRouter extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null,
      currentLocation: {
        lat: 0,
        lng: 0
      }
    }
  }

  updateLocation(){
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        })
        this.onReady();        
      })
    }
   
  }

  onMarkerClick = (item) => {
    const { place } = item; // place prop
    this.props.history.push(`detail/${place.place_id}`);
  }

  onReady = (mapProps) => {
    const { lat, lng } = this.state.currentLocation;
    if (lat === 0 && lng === 0) {
      this.updateLocation();
      return false;
    }
    
    const { google } = this.props;
    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);
    let zoom = 16;
    
    const center = new google.maps.LatLng(lat, lng);
    const mapConfig = Object.assign({}, {
      center: center,
      zoom: zoom
    })
    let map = new google.maps.Map(node, mapConfig);

        searchNearby(
        google,
        map,
        {
          location: map.center,
          radius: '2000',
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
      console.log('props in Main', this.props)
      let children = null;
      if (this.props.children) {
        // We have children in the Container component
        children = React.cloneElement(
          this.props.children,
          {
            google: this.props.google,
            places: this.state.places,
            loaded: this.props.loaded,
            onMove: this.onMapMove,
            onMarkerClick: this.onMarkerClick,
            zoom: this.props.zoom,
            styles: this.props.styles,
            map: this.props.map,
            history: this.props.history,
            match: this.props.match
          });
      }

      return (
        <div className={css(styles.container)}>
          <div style={{ display: 'none' }} ref='map' >
            <Map
              google={this.props.google}
              onReady={this.onReady.bind(this)}
              visible={false}
            />
          </div>
          <div>
            {children}
          </div>
        </div>
      )
    }
  }

  const Main = withRouter(MainwoRouter);

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
  })(Main)
