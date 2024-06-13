import cytoscape from "cytoscape";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import CytoscapeComponent from "react-cytoscapejs";
import styles from "../GensorUnitMap.module.css";
import { useState } from "react";
import { generateElements } from "./generateElements";
import Data from "../data";
import { Accordion } from "../../../../../components/ui-components";

const LAYOUTS = {
  cose: "cose",
  dagre: "dagre",
  breadthfirst: "breadthfirst",
  circle: "circle",
};

export default function SingleReaction({ reaction, reactions = [], nodes }) {
  const cyStylesheet = sbgnStylesheet(cytoscape);
  const layout = LAYOUTS.dagre;
  const [_cy, select_cy] = useState();

  const elements = generateElements(nodes, [reaction, ...reactions]);

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
    cy.layout({
      name: layout,
    }).run();
  };

  return (
    <div>
      <Accordion title={"Graphic"} expand={reactions.length>0} backgroundColor="#d5d5d7">
        <div>
          <CytoscapeComponent
            elements={elements}
            style={{ width: "400px", height: "200px" }}
            zoomingEnabled={true}
            userZoomingEnabled={false}
            zoom={1}
            maxZoom={2}
            minZoom={0.1}
            autounselectify={false}
            boxSelectionEnabled={true}
            stylesheet={styles}
            cy={cyEffects}
          />
        </div>
      </Accordion>
      {reaction && (
        <Accordion
        title={"Reaction Data"}
        backgroundColor="#d5d5d7"
      >
        <Data {...reaction} />
      </Accordion>
      )}
    </div>
  );
}
