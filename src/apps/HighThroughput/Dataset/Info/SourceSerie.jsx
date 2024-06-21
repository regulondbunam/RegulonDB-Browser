import React from "react";
import { DataVerifier } from "ui-components/utils";
import { Typography } from "@mui/material";

let Style = {};

Style.gridContainer = {
  display: "grid",
  gridGap: "3px",
  gridAutoFlow: "dense",
  gridTemplateColumns: "repeat(auto-fill,minmax(100px, 1fr))",
};
Style.gridItem = {
  display: "grid",
  backgroundColor: "rgb(243, 220, 171)",
  textAlign: "center",
  verticalAlign: "middle",
  padding: "5px",
};

export default function SourceSerie({ sourceSerie }) {
  //console.log(sourceSerie?.series.length);
  return (
    <div>
      
      <div style={{marginLeft: "15px"}}>
      
      
      </div>
      
    </div>
  );
}
