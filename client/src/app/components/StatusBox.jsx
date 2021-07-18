import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CodeIcon from '@material-ui/icons/Code'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'

const useStyles = makeStyles({
  root: {
    height: "inherit"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
})

export default function StatusBox({ projectInfo }) {
  const classes = useStyles()
  console.log(projectInfo)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          ProjectID: { projectInfo.id }
        </Typography>
        <Typography variant="h6" component="h3">
          { projectInfo.name }
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Last activity: { projectInfo.last_activity_at }
        </Typography>
      </CardContent>
      <CardActions>
        <a href={ projectInfo.web_url } target="_blank" style={{ color: 'blue' }}>
          <CodeIcon />
        </a>
        <a href={ `${projectInfo.web_url}/pipelines` } target="_blank" style={{ color: 'blue' }}>
          <PlaylistPlayIcon />
        </a>
      </CardActions>
    </Card>
  )
}