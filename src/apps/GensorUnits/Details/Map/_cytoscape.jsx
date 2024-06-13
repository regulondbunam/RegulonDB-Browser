import React from 'react'
import CytoscapeComponent from "react-cytoscapejs";

export default function Cytoscape({elements, heightCanva, styles, cyEffects}) {
  return (
    <CytoscapeComponent
            elements={elements}
            style={{ width: "100%", height: heightCanva }}
            zoomingEnabled={true}
            userZoomingEnabled={true}
            zoom={0.5}
            maxZoom={2}
            minZoom={0.1}
            autounselectify={false}
            boxSelectionEnabled={true}
            stylesheet={styles}
            cy={cyEffects}
          />
  )
}
