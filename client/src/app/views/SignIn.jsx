import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CustomizedSnackbar from 'app/components/Snackbar'
import { hasAuthToken, signIn } from 'app/services/auth'

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(1) * 3,
    marginRight: theme.spacing(1) * 3,
    [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
      width: 400,
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(1) * 3,
  },
  bottomLink: {
    marginTop: '20px'
  }
}))

function SignIn(props) {
  const classes = useStyles()
  const [success, signalSuccess] = useState(false)
  const [error, setError] = useState({ active: false, message: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginAction = (e) => {
    e.preventDefault()
    setError({ active: false, message: '' })
    signIn({ email, password })
      .then((response) => {
        if (response.status === 403) {
          setError({
            active: true,
            message: 'Email and password do not match.'
          })
        } if (response.status !== 200) {
          setError({
            active: true,
            message: 'Internal server error.'
          })
        } else {
          signalSuccess(true)
        }
      })
      .catch((err) => {
        setError({
          active: true,
          message: 'Internal server error.'
        })
      })
  }

  if (hasAuthToken() || success) {
    return (<Redirect to={{ pathname: '/dashboard' }} />)
  }

  return (
    <main className={classes.main}>
      {error.active ? <CustomizedSnackbar severity="error" message={error.message} /> : ''}
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={loginAction} >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
          <Grid container justifyContent="center" className={classes.bottomLink}>
            <Grid item>
              <Link to="/sign-up">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </main>
  )
}

export default SignIn
