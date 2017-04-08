import React from 'react';
import ReactDOM from 'react-dom';
// import browserHistory from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App/App';
import './index.css';
import { screenSizes } from './screenSizes';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  root: {
    [screenSizes.smartphone]: {
      width: '750px'
    },
    [screenSizes.smartphoneLandscape]: {
      width: '750px'
    },
    [screenSizes.tablet]: {
      width: '970px',
      backgroundColor: 'blue'
    },
    [screenSizes.desktop]: {
      width: '1170px',
    }
  },
  container: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
  }
})

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className='App'>
    <App 
      className={css(styles.container)}
      styles={styles}
    />
    </div>
  </MuiThemeProvider>,
  document.getElementById('root')
);

