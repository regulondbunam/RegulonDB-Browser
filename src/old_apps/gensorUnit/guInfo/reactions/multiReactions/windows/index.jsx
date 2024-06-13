import FloatingWindow from "./FloatingWindow";
import React, { useState } from "react";
import SingleReaction from "../../singleReaction";
import { DataVerifier } from "../../../../../../components/ui-components";

export default function Windows({
  nodes,
  reactions,
  nodeData,
  closeWindow = () => {},
}) {
  const positions = { x: nodeData.x, y: nodeData.y };

  return (
    <>
      <FloatingWindow
        positions={{ x: positions.x, y: positions.y - 200 }}
        title={nodeData.label}
        size={{ width: "400px", height: "300px" }}
        closeWindow={closeWindow}
      >
        <div>
          {nodeData.class === "process" ? (
            <ReactionData
              reactions={reactions}
              reactionID={nodeData.id}
              nodes={nodes}
            />
          ) : (
            <NodeData reactions={reactions} nodeData={nodeData} nodes={nodes} />
          )}
        </div>
      </FloatingWindow>
    </>
  );
}

function NodeData({ nodeData, nodes, reactions }) {
  let selReactions = [];
  if (DataVerifier.isValidArray(nodeData.associatedReaction)) {
    reactions.forEach((ar) => {
      if (nodeData.associatedReaction.find((re) => "R" + ar.number === re)) {
        selReactions.push(ar);
      }
    });
  }
  return (
    <div>
      <SingleReaction reactions={selReactions} nodes={nodes} />
    </div>
  );
}

function ReactionData({ reactions, reactionID, nodes }) {
  const reaction = reactions.find((re) => "R" + re.number === reactionID);
  console.log(reaction);
  return (
    <div>
      <SingleReaction reaction={reaction} nodes={nodes} />
    </div>
  );
}

/*
<div style={{ margin: "5% 5% 5% 5% " }}>
          {nodeData.name && (
            <p style={{ fontSize: "17px", marginBottom: "8px" }}>
              <strong>Name:</strong> {nodeData.name}
            </p>
          )}
          {nodeData.description && (
            <p style={{ fontSize: "17px", marginBottom: "8px" }}>
              <strong>Description:</strong> {nodeData.description}
            </p>
          )}
          {nodeData.type && (
            <p style={{ fontSize: "17px", marginBottom: "8px" }}>
              <strong>Type:</strong> {nodeData.type}
            </p>
          )}
          <p
            style={{
              textDecoration: "underline",
              color: "#72A7C7",
              cursor: "pointer",
            }}
            onClick={(e) => {
              setShowComponents(true);
            }}
          >
            Components
          </p>
        </div>


<>
      {showComponents && (
        <FloatingWindow
          positions={{ x: positions.x - 300, y: positions.y + 70 }}
          header={{ title: "Components:", color: "#FFFF", margin: "0 2% 0 5%" }}
          size={{ width: "55%", height: "28%" }}
          setSelectedNode={() => {
            setShowComponents(false);
          }}
        >
          <div style={{ margin: "2% 5% 0 2%" }}>
            <table style={{ border: "1px solid #999999", width: "103%" }}>
              <thead style={{ border: "1px solid #999999", height: "30px" }}>
                <tr>
                  <th style={styleTitulos}>Function</th>
                  <th style={styleTitulos}>Name</th>
                  <th style={styleTitulos}>Type</th>
                </tr>
              </thead>
              <tbody>
                {nodeData.components.map((component) => {
                  return (
                    <tr>
                      <td style={styleColumnas}>{component.function}</td>
                      <td style={styleColumnas}>{component.name}</td>
                      <td style={styleColumnas}>{component.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FloatingWindow>
      )}

      
    </>
*/
