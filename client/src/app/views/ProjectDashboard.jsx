import React, { useContext, useEffect, useState } from 'react'
import AppContext from 'app/appContext'
import StatusGrid from 'app/components/StatusGrid'
import Preloader from 'app/components/Preloader'
import { listProjects } from 'app/services/gitlabService'

export default function ProjectDashboard({ branchToDisplay }) {
  const { indexedDbService, TABLE_NAMES } = useContext(AppContext)
  const [projectList, setProjectList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    indexedDbService.getFilteredRecords(TABLE_NAMES.PROJECTS_TABLE_NAME, { display: 'yes' })
      .then(data => {
        if (data.length === 0) {
          listProjects({ membership: true, simple: true })
            .then(({ data }) => {
              setProjectList(data)
              setLoading(false)
              indexedDbService.addRecords(TABLE_NAMES.PROJECTS_TABLE_NAME, data.map(item => ({
                ...item,
                display: 'yes'
              })))
            })
        } else {
          setProjectList(data)
          setLoading(false)
        }
      })
  }, [])

  return loading ? <Preloader /> : <StatusGrid projectList={projectList} branchToDisplay={branchToDisplay} />
}