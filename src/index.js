import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import makeRoutes from './routes';
import App from './containers/App/App';
import './index.css';

const routes = makeRoutes()

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <App
      history={browserHistory}
      routes={routes}
    />
  </MuiThemeProvider>,
  document.getElementById('root')
);
