import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import indexedDb from 'app/indexedDb'
import createIndexedDbService from 'app/indexedDb/service'
import { initStoragePersistence, showEstimatedQuota } from 'app/indexedDb/persistence'
import AppContext from 'app/appContext'
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

const TABLE_NAMES = Object.freeze({
  CONFIG_TABLE_NAME: 'config',
  PROJECTS_TABLE_NAME: 'projects'
})

function App() {
  const indexedDbService = createIndexedDbService(indexedDb)
  const [darkMode, setDarkMode] = useState(false)
  const [branchToDisplay, setBranchToDisplay] = useState('none')
  const [authenticatedNavigation, setAuthenticatedNavigation] = useState(false)
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
    initStoragePersistence()
    showEstimatedQuota()
  }, [])

  useEffect(() => {
    setDarkMode(prefersDarkMode)
  }, [prefersDarkMode])

  return (
    <AppContext.Provider value={{ indexedDbService, TABLE_NAMES, authenticatedNavigation, setAuthenticatedNavigation }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper style={{ height: '100vh' }}>
          <BrowserRouter>
            <Navigation darkMode={darkMode} setDarkMode={setDarkMode} setBranchToDisplay={setBranchToDisplay} />
            <Switch>
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
              <ProtectedRoute exact path="/dashboard" component={ProjectDashboard} componentProps={{ branchToDisplay }} />
              <ProtectedRoute exact path="/preferences" component={Preferences} />
              <Route>
                <Redirect to="/dashboard" />
              </Route>
            </Switch>
          </BrowserRouter>
        </Paper>
      </ThemeProvider>
    </AppContext.Provider>
  )
}
export default App
