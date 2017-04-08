import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Main from '../Main/Main'
import LoginPage from '../LoginPage/LoginPage'
import SignUpPage from '../SignUpPage/SignUpPage'
import MapComponent from '../../components/MapComponent/MapComponent'
import Detail from '../Detail/Detail'
import 'font-awesome/css/font-awesome.css';
import { } from 'aphrodite/no-important';

class App extends Component {

  HomePage = (props) => {
    return <div><Main {...props}><MapComponent {...props}/></Main></div>;
  }

  DetailPage = (props, {match}) => {
    return <div><Main history={this.history} match={match}><MapComponent><Detail/></MapComponent></Main></div>;
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={this.HomePage} />
              <Route path="/map" component={MapComponent} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/logout" component={LoginPage} />
              <Route path="/detail/:detail" component={this.DetailPage} />
              <Route render={() => <h2>Page not found.</h2>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
