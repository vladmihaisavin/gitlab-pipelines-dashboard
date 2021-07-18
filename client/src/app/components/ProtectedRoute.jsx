import React from 'react'
import { Route } from 'react-router-dom'
import { hasAuthToken } from 'app/services/auth'

const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => hasAuthToken()
        ? <Component {...props} action={rest.action} />
        : props.history.push('/sign-in')}
    />
  )
}

export default ProtectedRoute