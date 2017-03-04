import React, { Component } from 'react';
import { Router } from 'react-router';
import Header from '../Header/Header';

import 'font-awesome/css/font-awesome.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router
          routes={this.props.routes}
          history={this.props.history}
        />
      </div>
    );
  }
}

App.propTypes = {
  routes: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
};

export default App;
