import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router'

function HomeGuard({ children, ...rest }) {
  const authState = useSelector(state => state.auth);
  const status = authState?.data?.status;

  const location = useLocation();

  return (
    <Route {...rest}>
      { status === 'successful' ? children : <Redirect to='/login' /> }
    </Route>
  )
}

export default HomeGuard;