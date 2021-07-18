import React, { useEffect, useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import _ from 'lodash'
import 'app/styles/rgl.css'
import StatusBox from './StatusBox'
import localStorage from 'app/services/localStorageService'

const projectNameSortCallback = (proj1, proj2) => proj1.name.localeCompare(proj2.name)

const generateInitialLayout = (projectList) => {
  return projectList
    .sort(projectNameSortCallback)
    .map((item, idx) => ({
      x: idx % 6 * 2,
      y: idx / 6,
      w: 2,
      h: 5,
      i: item.id.toString()
    }))
}

function StatusGrid(props) {
  props = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12,
    ...props
  }
  const initialLayout = generateInitialLayout(props.projectList)
  const originalLayout = localStorage.getItem('gridLayout') || initialLayout
  const ReactGridLayout = WidthProvider(RGL)
  const [layout, setLayout] = useState(initialLayout)

  useEffect(() => {
    setLayout(JSON.parse(JSON.stringify(originalLayout)))
  }, [])

  const generateDOM = () => {
    return _.map(props.projectList, (item, idx) => {
      return (
        <div key={item.id}>
          <StatusBox projectInfo={props.projectList[idx]} branchToDisplay={props.branchToDisplay} />
        </div>
      )
    })
  }

  const onLayoutChange = (layout) => {
    localStorage.setItem('gridLayout', layout)
    props.onLayoutChange(layout)
  }

  return (
    <ReactGridLayout
      {...props}
      layout={layout}
      onLayoutChange={onLayoutChange}
    >
      { generateDOM() }
    </ReactGridLayout>
  )
}

export default StatusGrid