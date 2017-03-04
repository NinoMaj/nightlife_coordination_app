import React from 'react'
import { Route } from 'react-router'
import Home from './Home'

export const makeHomeRoutes = () => {

  return (
    <Route path="/" component={Home} />
  )
}

export default makeHomeRoutes;