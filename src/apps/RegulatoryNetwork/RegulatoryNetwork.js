import React, { useState, useEffect } from "react";
import { Canvas } from "./components/Canvas";
import Controls from "./controls";
import { useQuery } from "@apollo/client";

import Style from "./RegulatoryNetwork.module.css";
import { getNetwork } from "./web_services/queries";
import { FormatData } from "./web_services/structuringData";
import CircularProgress from '@mui/material/CircularProgress';

const LAYOUTS = {
  COSE: "cose",
  DAGRE: "dagre",
  GRID: "grid",
  BREADTHFIRST: "breadthfirst",
  CIRCLE: "circle",
}

const ZOOM = {
  INCREMENT: 0.05,
  MIN: 0.05,
  MAX: 2,
}

const OPTIONS = {
  reset: -1,
  layout: 1,
  zoom: 2,
}

const initOptions = {
  layout: LAYOUTS.GRID,
  zoom: 0.75,
}

function reducerOptions(state, action) {
  switch (action.type) {
    case OPTIONS.reset:
      return initOptions
    case OPTIONS.layout:
      return { ...state, layout: action.value }
    case OPTIONS.zoom:
      return { ...state, zoom: action.value }
    default:
      return state
  }
}

function RegulatoryNetwork({ id_regulon }) {
  const [state, dispatch] = React.useReducer(reducerOptions, initOptions);
  const [node, setNode] = useState(id_regulon);
  const [cytoscape, setCytoscape] = useState()
  const { loading, error, data } = useQuery(getNetwork(node), {
    fetchPolicy: "network-only",
  });
  useEffect(()=>{
    if(!node){
      setNode(id_regulon)
    }
  },[setNode,id_regulon,node])

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <p>Error...</p>;
  const handleReset = () => {
    dispatch({ type: OPTIONS.reset })
    setNode(undefined)
  }

  const handleNodeChange = (newNode) => {
    setNode(newNode);
  };
  const network = FormatData(data);

  return (
    <div className={Style.conteiner}>
      <div className="App">
        <Controls
          regulonID={id_regulon}
          handleReset={handleReset}
          cytoscape={cytoscape}
          dispatch={dispatch}
          state={state}
          OPTIONS={OPTIONS}
          ZOOM={ZOOM}
          LAYOUTS={LAYOUTS}
          />
        {node && (
          <Canvas
            cytoscape={cytoscape}
            setCytoscape={setCytoscape}
            zoom={state.zoom}
            zoomChange={() => { }}
            layout={state.layout}
            layoutChange={() => { }}
            minZoom={ZOOM.MIN}
            maxZoom={ZOOM.MAX}
            network={network}
            nodeChange={handleNodeChange}
          />
        )}
      </div>
    </div>
  );
}

export default RegulatoryNetwork;
