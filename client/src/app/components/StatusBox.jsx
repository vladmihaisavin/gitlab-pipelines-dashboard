import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CodeIcon from '@material-ui/icons/Code'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { formatDistance, parseISO } from 'date-fns'
import { listPipelines } from 'app/services/gitlabService'

const PROGRESS_STATUSES = Object.freeze([
  'created',
  'waiting_for_resource',
  'preparing',
  'pending',
  'running'
])

const useStyles = makeStyles({
  root: {
    height: "inherit"
  },
  title: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center'
  },
  copy: {
    cursor: 'pointer'
  },
  pos: {
    marginBottom: 12,
  },
  created: {
    backgroundColor: '#4bd5ffef'
  },
  preparing: {
    backgroundColor: '#4bd5ffef'
  },
  waiting_for_resource: {
    backgroundColor: '#ffe94bf0'
  },
  pending: {
    backgroundColor: '#ffe94bf0'
  },
  running: {
    backgroundColor: '#4bd5ffef'
  },
  success: {
    backgroundColor: '#039c03bd'
  },
  failed: {
    backgroundColor: '#e00000b8'
  },
  canceled: {
    backgroundColor: '#8080807a'
  },
  skipped: {
    backgroundColor: '#8080807a'
  },
  manual: {
    backgroundColor: '#8080807a'
  },
  scheduled: {
    backgroundColor: '#8080807a'
  },
})

export default function StatusBox({ projectInfo, branchToDisplay }) {
  const classes = useStyles()
  const [lastPipeline, setLastPipeline] = useState(null)

  useEffect(() => {
    if (branchToDisplay !== 'none') {
      listPipelines(projectInfo.id, branchToDisplay)
        .then(({ data }) => setLastPipeline(data[0] || null))
    }
  }, [])

  useEffect(() => {
    let timeoutRef
    if (lastPipeline) {
      timeoutRef = setTimeout(() => {
        listPipelines(projectInfo.id, branchToDisplay)
          .then(({ data }) => {
            setLastPipeline(data[0] || null)
          })
      }, PROGRESS_STATUSES.includes(lastPipeline.status) ? 10000 : 60000)
    }
    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef)
      }
    }
  }, [lastPipeline, listPipelines])

  return (
    <Card className={`${classes.root} ${classes[(lastPipeline || {}).status]}`}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          ProjectID: { projectInfo.id } <AssignmentIcon className={classes.copy} onClick={() => navigator.clipboard.writeText(projectInfo.id)} />
            <a href={ projectInfo.web_url } target="_blank" rel="noreferrer" style={{ color: 'blue' }}>
              <CodeIcon />
            </a>
            <a href={ `${projectInfo.web_url}/pipelines` } target="_blank" rel="noreferrer" style={{ color: 'blue' }}>
              <PlaylistPlayIcon />
            </a>
        </Typography>
        <Typography variant="h6" component="h3">
          { projectInfo.name } { lastPipeline && lastPipeline.status && PROGRESS_STATUSES.includes(lastPipeline.status) && <CircularProgress size={20} /> }
        </Typography>
        { 
          lastPipeline && lastPipeline.status && 
            <Typography color="textSecondary">
              Status: { lastPipeline.status }
            </Typography>
        }
        <Typography color="textSecondary">
          {
            lastPipeline && lastPipeline.status
             ? <>
              Last run: {
                formatDistance(
                  parseISO(lastPipeline.updated_at),
                  new Date(),
                  { addSuffix: true, includeSeconds: true }
                )
              } { !PROGRESS_STATUSES.includes(lastPipeline.status) && <>
                & took { formatDistance(
                  parseISO(lastPipeline.created_at),
                  parseISO(lastPipeline.updated_at),
                  { includeSeconds: true }
                ) }
              </>
              }
             </>
             : <>
              Last activity: {
                formatDistance(
                  parseISO(projectInfo.last_activity_at),
                  new Date(),
                  { addSuffix: true, includeSeconds: true }
                )
              }
            </>
          }
        </Typography>
      </CardContent>
    </Card>
  )
}