import React, { Component } from 'react';
import { Router } from 'react-router';
import 'font-awesome/css/font-awesome.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        
        
        <Router
          routes={this.props.routes}
          history={this.props.history}
          >

          </Router>
      </div>
    );
  }
}

App.propTypes = {
  router: React.PropTypes.object,
  history: React.PropTypes.object
}

export default App;
