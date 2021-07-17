import React, { useEffect, useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import _ from 'lodash'
import 'app/styles/rgl.css'
import StatusBox from './StatusBox'

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

const initialLayout = [
  {x: 0, y: 0, w: 2, h: 6, i: '0'},
  {x: 2, y: 0, w: 2, h: 6, i: '1'},
  {x: 4, y: 0, w: 2, h: 6, i: '2'},
  {x: 6, y: 0, w: 2, h: 6, i: '3'},
  {x: 8, y: 0, w: 2, h: 6, i: '4'},
  {x: 10, y: 0, w: 2, h: 6, i: '5'}
]

const originalLayout = getFromLS('layout') || initialLayout

function StatusGrid(props) {
  props = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12,
    ...props
  }
  const ReactGridLayout = WidthProvider(RGL)
  const [layout, setLayout] = useState(initialLayout)

  useEffect(() => {
    setLayout(JSON.parse(JSON.stringify(originalLayout)))
  }, [])

  const generateDOM = () => {
    return _.map(_.range(6), function(i) {
      return (
        <div key={i}>
          <StatusBox />
        </div>
      )
    })
  }

  const onLayoutChange = (layout) => {
    console.log(layout)
    saveToLS("layout", layout)
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