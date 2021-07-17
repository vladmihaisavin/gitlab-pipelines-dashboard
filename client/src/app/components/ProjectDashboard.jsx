import React, { useEffect, useState } from 'react'
import StatusGrid from './StatusGrid'
import { listProjects } from 'app/services/gitlabService'

export default function ProjectDashboard() {
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    const makeRequest = async () => {
      await listProjects('https://www.gitlab.com', { membership: true, simple: true })
    }
    makeRequest().then(({ data }) => setProjectList(data))
  }, [])

  return <StatusGrid projectList={projectList} />
}