import React from "react";
import { Typography } from "@mui/material";
import style from "./cover.module.css";
import RelatedList from "ui-components/Web/Related";
import SourceSerie from "../SourceSerie";
import { DataVerifier } from "ui-components/utils";

export default function Cover({
  datasetId,
  sample,
  sourceSerie,
  datasetType,
  fivePrimeEnrichment,
}) {
  let title = "Dataset " + datasetId;
  const isSourSerie = DataVerifier.isValidObject(sourceSerie)
  const isSample = DataVerifier.isValidObject(sample)

  //Condicion para filtrar comentarios de Victor (curador) saludos n.n
  if (isSample) {
    if (sample.title === "obtener de GEO") {
      title = "";
    } else {
      title = sample.title;
    }
    //console.log(_data)
  }

  return (
    <div className={style.base}>
      <div className={style.title}>
        <div>
          <Typography variant="irrelevant">
            High Throughput Dataset:{" " + datasetId}
          </Typography>
          <Typography variant="h1">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Typography>
          {isSourSerie && (<>
            {sourceSerie?.title && (
              <Typography variant="h2" sx={{ fontSize: "22px" }}>
                {sourceSerie?.title}
              </Typography>
            )}
          </>)}
        </div>
      </div>
      <div className={style.mainInfo}>
        <div>
          {DataVerifier.isValidString(datasetType) && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="relevantB" sx={{ mr: 1 }}>
                Dataset Type:
              </Typography>
              <Typography variant="relevant">
                {datasetType}
              </Typography>
            </div>
          )}
          {isSourSerie && (<>
            {DataVerifier.isValidString(sourceSerie?.strategy) && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="relevantB" sx={{ mr: 1 }}>
                  Strategy
                </Typography>
                <Typography variant="relevant">
                  {sourceSerie?.strategy}
                </Typography>
              </div>
            )}
          </>)}
          {isSourSerie && (<>
            {DataVerifier.isValidString(sourceSerie?.method) && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="relevantB" sx={{ mr: 1 }}>
                  Method
                </Typography>
                <Typography variant="relevant">
                  {sourceSerie.method}
                </Typography>
              </div>
            )}
          </>)}
          <div style={{ display: "flex" }}>
            {isSourSerie && <>{
              DataVerifier.isValidArray(sourceSerie?.series) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="irrelevantB" sx={{ mr: 1 }}>
                    Series id:
                  </Typography>
                  <Typography variant="irrelevant">
                    {sourceSerie.series
                      .map((serie) => {
                        return serie.sourceId;
                      })
                      .join(", ")}
                  </Typography>
                  <Typography variant="irrelevantB" sx={{ mr: 1, ml: 1 }}>
                    |
                  </Typography>
                </div>
              )
            }</>}
            {
              DataVerifier.isValidString(fivePrimeEnrichment) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="irrelevantB" sx={{ mr: 1 }}>
                    5' Enrichment:
                  </Typography>
                  <Typography variant="irrelevant">
                    {fivePrimeEnrichment}
                  </Typography>
                  <Typography variant="irrelevantB" sx={{ mr: 1, ml: 1 }}>
                    |
                  </Typography>
                </div>
              )
            }
            {isSample && <>{
              DataVerifier.isValidArray(sample?.controlId) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="irrelevantB" sx={{ mr: 1 }}>
                    Control ID:
                  </Typography>
                  <Typography variant="irrelevant">
                    {sample?.controlId.join(", ")}
                  </Typography>
                  <Typography variant="irrelevantB" sx={{ mr: 1, ml: 1 }}>
                    |
                  </Typography>
                </div>
              )
            }</>}
            {isSample && <>{
              DataVerifier.isValidArray(sample?.experimentId) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="irrelevantB" sx={{ mr: 1 }}>
                    Experiment ID:
                  </Typography>
                  <Typography variant="irrelevant">
                    {sample?.experimentId.join(", ")}
                  </Typography>
                  <Typography variant="irrelevantB" sx={{ mr: 1, ml: 1 }}>
                    |
                  </Typography>
                </div>
              )
            }</>}
            {isSourSerie && <>{
              DataVerifier.isValidObject(sourceSerie?.platform) && (<>{
                DataVerifier.isValidString(sourceSerie.platform?.title) && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="irrelevantB" sx={{ mr: 1 }}>
                      Platform:
                    </Typography>
                    <Typography variant="irrelevant">
                      {sourceSerie?.platform?.title}
                    </Typography>
                  </div>
                )
              }</>)
            }</>}
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
