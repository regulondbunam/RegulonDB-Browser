import React from "react";
import { Typography } from "@mui/material";
import style from "./cover.module.css";
import RelatedList from "ui-components/Web/Related";

export default function Cover({
  datasetId,
  sample,
  sourceSerie,
  datasetType,
  fivePrimeEnrichment,
}) {
  let title = "Dataset " + datasetId;
  //Condicion para filtrar comentarios de Victor (curador) saludos n.n
  if (sample?.title) {
    if (sample?.title === "obtener de GEO") {
      title = "";
    } else {
      title = sample?.title;
    }
    //console.log(_data)
  }
  const pStyle = { fontSize: "14px", marginRight: "10px" };

  return (
    <div className={style.base}>
      <div className={style.title}>
        <div>
          <Typography variant="irrelevant">
            High Throughput Dataset:{datasetId}
          </Typography>
          <Typography variant="h1">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Typography>
        </div>
      </div>
      <div className={style.mainInfo}>
        <div>
          <div style={{ display: "flex" }}>
            <p style={pStyle}>Dataset Type: {datasetType}</p>
            {sourceSerie?.strategy && (
              <p style={pStyle}>| Strategy: {sourceSerie.strategy}</p>
            )}
            {fivePrimeEnrichment && (
              <p style={pStyle}>| 5' Enrichment: {fivePrimeEnrichment}</p>
            )}
            {sample?.controlId.length > 0 && (
              <p style={pStyle}>| Control ID: {sample?.controlId.join(", ")}</p>
            )}
            {sample?.experimentId.length > 0 && (
              <p style={pStyle}>
                | Experiment ID: {sample?.experimentId.join(", ")}
              </p>
            )}
          </div>
        </div>
        <div className={style.references}>
          <RelatedList
            collapse={false}
            regulonDB_id={datasetId}
            organism={"ecoli"}
          />
        </div>
      </div>
      <div style={{ height: "18px" }} />
    </div>
  );
}
/*


          
          */
