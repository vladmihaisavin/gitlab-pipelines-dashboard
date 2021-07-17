import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import ProjectDashboard from 'app/components/ProjectDashboard'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { useEffect } from 'react';

const useStyles = makeStyles({
  darkModePicker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const classes = useStyles()
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
        <div className={classes.darkModePicker}>
          <WbSunnyIcon />
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <Brightness2Icon />
        </div>
        <ProjectDashboard />
      </Paper>
    </ThemeProvider>
  )
}
export default App
