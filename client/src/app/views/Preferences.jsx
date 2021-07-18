import React, { useContext, useEffect, useState } from 'react'
import AppContext from 'app/appContext'
import { Link, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import CustomizedSnackbar from 'app/components/Snackbar'
import TransferList from 'app/components/TransferList'
import { fetchPreferences, updatePreferences } from 'app/services/preferencesService'
import { formatDistance, parseISO } from 'date-fns'

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(1) * 3,
    marginRight: theme.spacing(1) * 3,
    [theme.breakpoints.up(800 + theme.spacing(1) * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1) * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(1) * 3,
  },
  linkButton: {
    textDecoration: 'none'
  },
  pos: {
    marginBottom: 12,
  }
}))

const branchesOptions = ['develop', 'integration', 'master', 'main', 'release']

function Preferences(props) {
  const classes = useStyles()
  const { indexedDbService, TABLE_NAMES } = useContext(AppContext)
  const [error, setError] = useState({ active: false, message: '' })
  const [hasAccessToken, setHasAccessToken] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [branches, setBranches] = useState([])
  const [updatedAt, setUpdatedAt] = useState(null)

  const [checked, setChecked] = useState([])
  const [leftList, setLeftList] = useState([])
  const [rightList, setRightList] = useState([])

  useEffect(() => {
    fetchPreferences().then(async ({ data }) => {
      if (data && data.branches) {
        await indexedDbService.upsertRecord(TABLE_NAMES.CONFIG_TABLE_NAME, { type: 'preferences', ...data }, 'type')
        setHasAccessToken(data.hasAccessToken)
        setBranches(data.branches)
        setUpdatedAt(data.updatedAt)
      }
    })
  }, [])

  useEffect(() => {
    indexedDbService.getAllRecords(TABLE_NAMES.PROJECTS_TABLE_NAME)
      .then(data => {
        setLeftList((data || []).filter(item => item.display !== 'yes').map(item => item.name))
        setRightList((data || []).filter(item => item.display === 'yes').map(item => item.name))
      })
  }, [])

  const savePreferences = (e) => {
    e.preventDefault()
    setError({ active: false, message: '' })
    const body = { branches }
    if (accessToken) {
      body.accessToken = accessToken
    }
    updatePreferences(body)
      .then(async (response) => {
        if (response.status !== 204) {
          setError({ active: true, message: 'An error occured. Please try again later.' })
        } else {
          for (const leftItem of leftList) {
            await indexedDbService.updateRecordWhere(TABLE_NAMES.PROJECTS_TABLE_NAME, { name: leftItem }, { display: 'no' })
          }
          for (const rightItem of rightList) {
            await indexedDbService.updateRecordWhere(TABLE_NAMES.PROJECTS_TABLE_NAME, { name: rightItem }, { display: 'yes' })
          }
          props.history.push('/')
        }
      })
  }
  
  return (
    <main className={classes.main}>
      {error.active ? <CustomizedSnackbar severity="error" message={error.message} /> : ''}
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Preferences
        </Typography>
        {
          updatedAt && 
            <Typography className={classes.pos} color="textSecondary">
              Last update: { formatDistance(
                  parseISO(updatedAt),
                  new Date(),
                  { addSuffix: true, includeSeconds: true }
                ) }
            </Typography>
        }
        <form className={classes.form} onSubmit={savePreferences} >
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="accessToken">{ hasAccessToken ? 'Update' : 'Set' } GitLab access token</InputLabel>
            <Input id="accessToken" name="accessToken" autoComplete="accessToken" autoFocus value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <Autocomplete
              multiple
              id="branches"
              options={branchesOptions}
              value={branches}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="filled" label="Branches" placeholder="Select branches" />
              )}
              onChange={(event, value, reason) => {
                setBranches(value)
              }}
            />
          </FormControl>
          <TransferList
            checked={checked}
            setChecked={setChecked}
            leftList={leftList}
            setLeftList={setLeftList}
            rightList={rightList}
            setRightList={setRightList}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
          <Link to={{
            pathname: props.location.state ? props.location.state.prevPath : '/',
            state: { prevPath: props.location.pathname }
          }} className={classes.linkButton}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Back
            </Button>
          </Link>
        </form>
      </Paper>
    </main>
  )
}

export default withRouter(Preferences)