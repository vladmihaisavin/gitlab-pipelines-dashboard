import React, { useEffect, useState } from 'react'
import StatusGrid from 'app/components/StatusGrid'
import Preloader from 'app/components/Preloader'
import { listProjects } from 'app/services/gitlabService'

export default function ProjectDashboard() {
  const [projectList, setProjectList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const makeRequest = async () => {
      return await listProjects({ membership: true, simple: true })
    }
    makeRequest().then(({ data }) => {
      setProjectList(data)
      setLoading(false)
    })
  }, [])

  return loading ? <Preloader /> : <StatusGrid projectList={projectList} />
}