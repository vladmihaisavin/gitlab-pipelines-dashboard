import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  preloader:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh'
  }
}))

export default function Preloader() {
  const classes = useStyles()
  return (
    <div className={classes.preloader}>
      <CircularProgress />
    </div>
  )
}