import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import makeRoutes from './routes'
import App from './containers/App/App';
import './index.css';

const routes = makeRoutes()

ReactDOM.render(
  <App
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root')
);
