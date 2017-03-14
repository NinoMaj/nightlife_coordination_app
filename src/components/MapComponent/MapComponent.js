import React from 'react';
import Map, { Marker } from 'google-maps-react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Sidebar from '../Sidebar/Sidebar';
// import { colors } from '../../colors';


const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  sidebar: {
    flex: '1'
  },
  map: {
    flex: '2'
  }
});

const MapComponent = (props) => {

  const renderMarkers = () => {
    if (!props.places) {
      return null;
    }
    return props.places.map(place => {
      return <Marker
        key={place.id}
        name={place.id}
        place={place}
        label={place.name}
        onClick={props.onMarkerClick}
        map={props.map}
        position={place.geometry.location}
      />
    })
  }

  const renderChildren = () => {
    console.log('props.map in renderChildren in MapComponent', props.map)
    const { children } = props;
    if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, props, {
          map: props.map,
          google: props.google
        })
      })
    } else {
      return renderMarkers();
    }

  }
  const { children } = props;
  return (
    <div className={css(styles.container)}>
      <Sidebar
        className={css(styles.sidebar)}
        title={'Restaurants'}
        places={props.places}
      />
      <div className={css(styles.map)}>
        <Map
          map={props.map}
          google={props.google}
          zoom={props.zoom}
          onRecenter={props.onMove}
          onDragend={props.onMove}
          onClick={props.onClick}
          visible={!children || React.Children.count(children) === 0}
        >
          {renderChildren()}
        </Map>
      </div>
    </div>
  )
}

export default MapComponent;
