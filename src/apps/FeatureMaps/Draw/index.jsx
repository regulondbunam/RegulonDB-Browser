import React from "react";
import Map from "./Map";
import Annotations from "./Annotations";
import Controls from "./Controls";

export default function Draw({ state, dispatch }) {
  


  return (
    <div>
      <Controls state={state} dispatch={dispatch} />
      <div
      style={{
        height: "calc(100vh - 184px)",
        overflow: "auto",
        position: "relative",
        display: "flex",
      }}
    >
      <Map state={state} dispatch={dispatch} />
      <div style={{ width: "30%" }}>
        <Annotations state={state} dispatch={dispatch} />
      </div>
    </div>
    </div>
  );
}
