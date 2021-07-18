import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CustomizedSnackbar from 'app/components/Snackbar'
import { signUp } from 'app/services/auth'
import { useEffect } from 'react'

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

function SignUp(props) {
  const classes = useStyles()
  const [success, signalSuccess] = useState(false)
  const [error, setError] = useState({ active: false, message: '' })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUpAction = (e) => {
    e.preventDefault()
    signUp({ name, email, password })
      .then((response) => {
        if (response.status >= 300) {
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

  useEffect(() => {
    if (success) {
      props.history.push('/sign-in')
    }
  }, [success, props.history])

  return (
    <Container component="main" maxWidth="xs">
      {error.active ? <CustomizedSnackbar severity="error" message={error.message} /> : ''}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={signUpAction} >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">User Name</InputLabel>
            <Input id="name" name="name" autoComplete="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
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
            Sign Up
          </Button>
          <Grid container justifyContent="center"  className={classes.bottomLink}>
            <Grid item>
              <Link to="/sign-in">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default withRouter(SignUp)