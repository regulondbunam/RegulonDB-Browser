import cytoscape from "cytoscape";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import styles from "../GensorUnitMap.module.css";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Typography, CircularProgress } from "@mui/material";
import Options from "./options";
import cola from "cytoscape-cola";
import Windows from "./windows";
import dagre from "cytoscape-dagre";

const CytoscapeComponent = lazy(() => import("./_cytoscape"));

cytoscape.use(dagre);
cytoscape.use(cola);
const EVENT_WINDOW = "initWindow";
const LAYOUTS = {
  dagre: {
    name: "dagre",
    rankDir: "BT", // 'BT' (Bottom to Top) invierte la dirección del layout
    nodeDimensionsIncludeLabels: true,
    ranker: "network-simplex",
  },
  breadthfirst: {
    name: "breadthfirst",
  },
  grid: {
    name: "grid",
  },
  concentric: {
    name: "concentric",
  },
  cola: {
    name: "cola",
  },
};

export default function CytoscapeGraph({
  elements,
  idContainer,
  nodes,
  reactions,
}) {
  const cyStylesheet = sbgnStylesheet(cytoscape);
  let heightSite = 500;
  if (document.getElementById(idContainer)) {
    heightSite = document.getElementById(idContainer).clientHeight;
  }
  const [_cy, select_cy] = useState();
  const [heightCanva, setHeightCanva] = useState(heightSite - 40 + "px");

  const cyEffects = (cy) => {
    select_cy(cy);
    cy.fit();
    cy.style(cyStylesheet);

    cy.elements('node[type = "transcription_factor"]').style({
      "background-color": "#4881A6",
      "text-outline-width": 0,
      width: "100px",
      height: "30px",
    });
    cy.elements('node[type = "protein"]').style({
      "background-color": "#B6BD7B",
      "text-outline-width": 0,
      width: "80px",
      height: "30px",
    });

    cy.elements('node[type = "simple_molecule"]').style({
      "background-color": "#B6BD7B",
      "text-outline-width": 0,
      width: "100px",
      height: "20px",
    });

    cy.elements('node[type = "gene"]').style({
      "background-color": "#FFBC00",
      "text-outline-width": 0,
      shape: "rectangle",
      width: "100px",
      height: "30px",
    });

    cy.elements('node[type = "RNA"]').style({
      "background-color": "#FFBC00",
      "text-outline-width": 0,
      shape: "polygon",
      "shape-polygon-points": "-0.7, -0.6,   1, -0.6,   0.7, 0.5,   -1, 0.5",
      width: "160px",
    });
    //Evento on click para visualizar las ventanita
    cy.on("click", "node", function (event) {
      const node = event.target;
      const position = node.renderedPosition();
      const windowDisplay = document.getElementById("window_GU");
      if (windowDisplay) {
        let detail = { node: { ...node.data(), ...position } };
        const windowDisplay_REACTION = new CustomEvent(EVENT_WINDOW, {
          bubbles: true,
          detail: detail,
        });
        windowDisplay.dispatchEvent(windowDisplay_REACTION);
      }
    });
    let layout = cy.layout(LAYOUTS.dagre);
    /*layout.pon("layoutstop").then(function (event) {
        let element = cy.nodes('node[type = "transcription_factor"]')[0];
        cy.center(cy.getElementById(element.id()));
      });*/
    layout.run();
  };

  return (
    <div id="guMap">
      <WindowManager reactions={reactions} nodes={nodes} />
      <Options
        heightCanva={heightSite - 40 + "px"}
        setHeightCanva={setHeightCanva}
        elements={elements}
        reactions={reactions}
        components={nodes}
        cy={_cy}
        LAYOUTS={LAYOUTS}
      />
      <div style={{ height: heightCanva }}>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="relevantB">
                Loading Cytoscape Graph...
              </Typography>
              <CircularProgress />
            </div>
          }
        >
          <CytoscapeComponent
            heightCanva={heightCanva}
            cyEffects={cyEffects}
            styles={styles}
            elements={elements}
          />
        </Suspense>
      </div>
    </div>
  );
}

function WindowManager(props) {
  const [nodeData, setNodeData] = useState();

  useEffect(() => {
    const windowDisplay = document.getElementById("window_GU");
    if (windowDisplay) {
      windowDisplay.addEventListener(
        EVENT_WINDOW,
        function (e) {
          //console.log(`state`, e.detail)
          if (e.detail.node) {
            setNodeData(e.detail.node);
          }
        },
        false
      );
    }
  }, []);

  return (
    <div id="window_GU">
      {nodeData && (
        <Windows
          {...props}
          nodeData={nodeData}
          closeWindow={() => setNodeData(undefined)}
        />
      )}
    </div>
  );
}
