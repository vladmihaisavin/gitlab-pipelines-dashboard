import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SwitchInput from '@material-ui/core/Switch'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import SettingsDropdown from 'app/components/SettingsDropdown'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import localStorage from 'app/services/localStorageService'

const useStyles = makeStyles({
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 10px',
    alignItems: 'center'
  },
  darkModePicker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  settings: {
    width: '106px',
    textAlign: 'right'
  }
});

const savedBranch = localStorage.getItem('savedBranch') || 'none'

export default function Navigation({ darkMode, setDarkMode }) {
  const classes = useStyles()
  return (
    <nav className={classes.navigation}>
      <div className={classes.darkModePicker}>
        <WbSunnyIcon />
        <SwitchInput checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <Brightness2Icon />
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel id="branch-select-label">Branch</InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          value={10}
          onChange={() => {}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <SettingsDropdown className={classes.settings} />
    </nav>
  )
}