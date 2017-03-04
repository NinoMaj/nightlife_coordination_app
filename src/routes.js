import React from 'react'
import { browserHistory, Router, Route, Redirect } from 'react-router'

import makeHomeRoutes from './containers/Home/routes'


export const makeRoutes = () => {
  const home = makeHomeRoutes();

  return (
    <Route path=''>
      {home}
    </Route>
  )
}

export default makeRoutes