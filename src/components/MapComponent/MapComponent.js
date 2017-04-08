import React from 'react';
import Map, { Marker } from 'google-maps-react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Sidebar from '../Sidebar/Sidebar';
import Detail from '../../containers/Detail/Detail';
import { screenSizes } from '../../screenSizes';


const styles = StyleSheet.create({
  container: {
    margin: '10px auto',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflow: 'auto',
    width: '100%',
    [screenSizes.smartphone]: {
      flexDirection: 'column',
      margin: '0px auto',
    },
    [screenSizes.smartphoneLandscape]: {
      flexDirection: 'column'
    }
  },
  sidebar: {
    flex: '1'
  },
  main: {
    flex: '2'
  }
});

export class MapComponent extends React.Component {
  renderMarkers() {
    if (!this.props.places) {
      return null;
    }
    return this.props.places.map(place => {
      return <Marker
        key={place.id}
        name={place.id}
        place={place}
        label={place.name}
        onClick={this.props.onMarkerClick}
        map={this.props.map}
        position={place.geometry.location}
      />
    })
  }

  renderChildren() {
    const { children } = this.props;
    if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, this.props, {
          map: this.props.map,
          google: this.props.google
        })
      })
    } else {
      return this.renderMarkers();
    }

  }
  render() {
    console.log('props in map Comp', this.props)    
    const { children } = this.props;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.sidebar)}>
          <Sidebar
            title={'Restaurants'}
            places={this.props.places}
            history={this.props.history}
          />
        </div>
        <div className={css(styles.main)}>
          {this.props.location && this.props.location.pathname.substring(1, 7) === 'detail' ? (
            <Detail {...this.props} />
          ) : (
              <div>
                <Map
                  map={this.props.map}
                  google={this.props.google}
                  zoom={this.props.zoom}
                  onRecenter={this.props.onMove}
                  onDragend={this.props.onMove}
                  onClick={this.props.onClick}
                  visible={!children || React.Children.count(children) === 0}
                >
                  {this.renderChildren()}
                </Map>
              </div>
            )}
        </div>
      </div>
    )
  }
}

MapComponent.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool
}
MapComponent.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 0,
    lng: 0
  },
  centerAroundCurrentLocation: true
}

export default MapComponent;
