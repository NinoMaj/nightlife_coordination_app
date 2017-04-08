import React from 'react';
import { getDetails } from '../../utils/googleApiHelpers';
import Auth from '../../modules/Auth';

import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  heading: {
    fontSize: '2em',
    marginBottom: '15px'
  },
  icon: {
    marginBottom: '20px'
  },
  paragraph: {
    marginBottom: '10px',
    fontSize: '1.25em'
  },
  photosWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'auto'
  },
  photo: {
    margin: '0 2px'
  },
  comingBtn: {
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "1.2em",
    cursor: "pointer",
    marginBottom: "15px",
    ':focus':{
      border: 'none'
    },
    ':active': {
      border: 'none'
    }
  },
  willComeColor: {
    backgroundColor: "#4CAF50" /* Green */
  },
  cantComeColor: {
    backgroundColor: "#f44336" /* Red */
  }
});

export class Detail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      place: {},
      location: {},
      errors: {},
      coming: 'nobody',
      userComing: false
    }

    this.handleIwillComeClick = this.handleIwillComeClick.bind(this);
    this.handleIwontComeClick = this.handleIwontComeClick.bind(this);
  }


  componentDidMount() {
    console.log('props in Detail', this.props)
    if (this.props.map) {
      this.getPlace(this.props.map);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.map &&  // make sure we have a map
      (prevProps.map !== this.props.map ||
        prevProps.match.params.detail !== this.props.match.params.detail)) {
      this.getPlace(this.props.map);
    }
  }

  getPlace(map) {
    this.getWhoIsComing();
    // the placeId comes from the URL, passed into
    // this component through params
    const { google } = this.props;
    const placeId = this.props.match.params.detail;

    // Set place, location and the loading state
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

  getWhoIsComing() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/coming/' + this.props.match.params.detail);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // success
        if (xhr.response.bar.coming.includes(Auth.getUsername())) {
          this.setState({
            userComing: true
          });
        }

        if (xhr.response.bar.coming) {
          this.setState({
            coming: xhr.response.bar.coming.join(", ")
          });
        }

        return true;

      } else {
        // failure
        console.log('failure');
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(null);
  }

  handleIwillComeClick() {
    const xhr = new XMLHttpRequest();
    const params = '/' + this.props.match.params.detail + '/' + Auth.getUsername();
    xhr.open('post', '/api/coming' + params);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.getWhoIsComing();
        this.setState({
          userComing: true
        });
      } else {
        // failure
        console.log('failure');
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send();
  }

  handleIwontComeClick() {
    const xhr = new XMLHttpRequest();
    const params = '/' + this.props.match.params.detail + '/' + Auth.getUsername();
    xhr.open('put', '/api/coming' + params);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.getWhoIsComing();
          this.setState({
            userComing: false
          });
      } 
    });
    xhr.send();
  }
  renderPhotos(place) {
    if (!place.photos || place.photos.length === 0) return;
    const cfg = { maxWidth: 200, maxHeight: 200 }
    return (<div>
      {place.photos.map(p => {
        const url = `${p.getUrl(cfg)}.png`
        return (<img className={css(styles.photo)} alt='bar' key={url} src={url} />)
      })}
    </div>)
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          Loading...
      </div>
      );
    }
    // We're no longer loading when we get here
    const { place } = this.state;

    let comingButton = null;
    if (this.state.userComing) {
      comingButton = (
        <button className={css(styles.comingBtn, styles.cantComeColor)} onClick={this.handleIwontComeClick}>I can't come</button>
      );
    } else {
      comingButton = (
        <button className={css(styles.comingBtn, styles.willComeColor)} onClick={this.handleIwillComeClick}>I'll go</button>
      );
    }

    return (
      <div className={css(styles.wrapper)}>
        <h2 className={css(styles.heading)}>{place.name}</h2>
        <img className={css(styles.icon)} alt='icon' src={place.icon} />
        <p className={css(styles.paragraph)}>Website: {place.website}</p>
        <p className={css(styles.paragraph)}>Address: {place.formatted_address}</p>
        <p className={css(styles.paragraph)}>Phone number: {place.formatted_phone_number}</p>
        {place.opening_hours && 
          <p className={css(styles.paragraph)}>Currently {(place.opening_hours.open_now) ? 'open' : 'closed'}</p>
        }
        <p className={css(styles.paragraph)}>Coming: {this.state.coming || 'nobody'}</p>
        {Auth.isUserAuthenticated() && comingButton}
        <div className={css(styles.photosWrapper)}>
          {this.renderPhotos(place)}
        </div>
      </div>
    )
  }
}

export default Detail;
