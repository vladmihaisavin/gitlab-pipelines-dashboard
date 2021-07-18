import React, { useContext, useEffect } from 'react'
import AppContext from 'app/appContext'
import { Route } from 'react-router-dom'
import { hasAuthToken } from 'app/services/auth'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const { authenticatedNavigation, setAuthenticatedNavigation } = useContext(AppContext)

  useEffect(() => {
    if (authenticatedNavigation === false && hasAuthToken()) {
      setAuthenticatedNavigation(true)
    }
  }, [])

  return (
    <Route
      {...rest}
      render={(props) => hasAuthToken()
        ? <Component {...props} action={rest.action} {...rest.componentProps} />
        : props.history.push('/sign-in')}
    />
  )
}

export default ProtectedRoute