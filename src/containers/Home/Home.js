import React from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';
import { searchNearby } from '../../utils/googleApiHelpers';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null
    }
  }
  onReady(mapProps, map) {
    const { google } = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    }
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        // We got some results and a pagination object
        this.setState({
          places: results,
          pagination
        })
      }).catch((status, result) => {
        // There was an error
      })
  }
  render() {
    return (
      <div>
        <p className="App-intro">
          <i className="fa fa-star"></i>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Map
          onReady={this.onReady.bind(this)}
          google={this.props.google}
          visible={false}>

          {this.state.places.map(place => {
            return (<div key={place.id}>{place.name}</div>)
          })}

        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(Home)