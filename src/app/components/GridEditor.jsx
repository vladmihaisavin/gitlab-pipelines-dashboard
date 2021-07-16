import React, { useEffect, useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import _ from 'lodash'
import 'app/styles/rgl.css'

function GridEditor(props) {
  props = {
    className: 'layout',
    items: 20,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12,
    ...props
  }
  const ReactGridLayout = WidthProvider(RGL)
  const [layout, setLayout] = useState([])

  useEffect(() => {
    const generateLayout = () => {
      return _.map(_.range(props.items), function(item, i) {
        const y = _.result(props, 'y') || Math.ceil(Math.random() * 4) + 1
        return {
          x: (i * 2) % 12,
          y: Math.floor(i / 6) * y,
          w: 2,
          h: y,
          i: i.toString()
        }
      })
    }
    setLayout(generateLayout())
  }, [])

  const generateDOM = () => {
    return _.map(_.range(props.items), function(i) {
      return (
        <div key={i} style={{ backgroundColor: 'blue' }}>
          <span className="text">{i}</span>
        </div>
      )
    })
  }

  const onLayoutChange = (layout) => {
    props.onLayoutChange(layout)
  }

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={onLayoutChange}
      {...props}
    >
      { generateDOM() }
    </ReactGridLayout>
  )
}

export default GridEditor