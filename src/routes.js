import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Main from './containers/Main/Main'
import LoginPage from './containers/LoginPage/LoginPage'
import SignUpPage from './containers/SignUpPage/SignUpPage'
import MapComponent from './components/MapComponent/MapComponent'
import Detail from './containers/Detail/Detail'
// import { browserHistory, Router, Route, Redirect } from 'react-router'

const makeRoutes = () => {

  return (
    <div>
      <Route path="/" component={Main}>
        <IndexRoute component={MapComponent} />
        <Route path="login" component={LoginPage} />
        <Route path="signup" component={SignUpPage} />
        <Route path="logout" component={LoginPage} />
        {/*<Route path="map" component={MapComponent} />*/}
        <Route path="map/detail:detail" component={Detail} />
      </Route>
    </div>
  )
}

export default makeRoutes