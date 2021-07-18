import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import ProtectedRoute from 'app/components/ProtectedRoute'
import Navigation from 'app/components/Navigation'
import ProjectDashboard from 'app/views/ProjectDashboard'
import Preferences from 'app/views/Preferences'
import SignIn from 'app/views/SignIn'
import SignUp from 'app/views/SignUp'
import Paper from '@material-ui/core/Paper'
import { useEffect } from 'react';


function App() {
  const [darkMode, setDarkMode] = useState(false)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  )

  useEffect(() => {
    setDarkMode(prefersDarkMode)
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ height: '100vh' }}>
        <BrowserRouter>
          <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
          <Switch>
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
            <ProtectedRoute exact path="/dashboard" component={ProjectDashboard} />
            <ProtectedRoute exact path="/preferences" component={Preferences} />
            <Route>
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  )
}
export default App
