import React from "react";
import { DataVerifier } from "../../../../components/ui-components";
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
      {sourceSerie?.title && (
        <Typography variant="h2" sx={{ fontSize: "22px" }}>
          {sourceSerie?.title}
        </Typography>
      )}
      <div style={{marginLeft: "15px"}}>
        {sourceSerie?.method && (
        <p style={{ fontSize: "14px" }}>Method: {sourceSerie?.metod}</p>
      )}
      {DataVerifier.isValidArray(sourceSerie.series) && (
        <div>
          <p style={{ fontSize: "14px" }}>
            Series id:
            {sourceSerie.series
              .map((serie) => {
                return serie.sourceId;
              })
              .join(", ")}
          </p>
        </div>
      )}
      {sourceSerie?.platform?.title && (
        <div>
          <p style={{ fontSize: "14px" }}>
            Platform: {sourceSerie?.platform?.title}
          </p>
          {sourceSerie?.platform?.source && (
            <p>source: {sourceSerie?.platform?.source}</p>
          )}
        </div>
      )}
      </div>
      
    </div>
  );
}
