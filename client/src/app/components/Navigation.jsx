import React, { useContext, useState } from 'react'
import AppContext from 'app/appContext'
import { makeStyles } from '@material-ui/core/styles';
import SwitchInput from '@material-ui/core/Switch'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import SettingsDropdown from 'app/components/SettingsDropdown'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { fetchPreferences } from 'app/services/preferencesService'
import { useEffect } from 'react';

const useStyles = makeStyles({
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px 10px',
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
  },
  formControl: {
    minWidth: 120,
  }
});

export default function Navigation({ darkMode, setDarkMode, setBranchToDisplay }) {
  const classes = useStyles()
  const { indexedDbService, TABLE_NAMES, authenticatedNavigation } = useContext(AppContext)
  const [selectedBranch, setSelectedBranch] = useState('')
  const [branches, setBranches] = useState([])

  const changeBranch = (event) => {
    setSelectedBranch(event.target.value)
    setBranchToDisplay(event.target.value)
  }

  useEffect(() => {
    indexedDbService.getFilteredRecords(TABLE_NAMES.CONFIG_TABLE_NAME, { type: 'preferences' })
      .then(async records => {
        if (records.length) {
          const preferences = records[0]
          setBranches(preferences.branches)
        } else {
          const remotePreferences = await fetchPreferences()
          if (remotePreferences.data && remotePreferences.data.branches) {
            setBranches(remotePreferences.data.branches)
            await indexedDbService.upsertRecord(TABLE_NAMES.CONFIG_TABLE_NAME, { type: 'preferences', ...remotePreferences.data }, 'type')
          }
        }
      })
  }, [indexedDbService])

  return (
    <nav className={classes.navigation}>
      <div className={classes.darkModePicker}>
        <WbSunnyIcon />
        <SwitchInput checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <Brightness2Icon />
      </div>
      {
        authenticatedNavigation && <>
          <FormControl className={classes.formControl}>
            <InputLabel id="branch-select-label">Branch</InputLabel>
            <Select
              labelId="branch-select-label"
              id="branch-select"
              value={selectedBranch}
              onChange={changeBranch}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                branches.map(item => <MenuItem value={item}>{item}</MenuItem>)
              }
            </Select>
          </FormControl>
          <SettingsDropdown className={classes.settings} />
        </>
      }
    </nav>
  )
}