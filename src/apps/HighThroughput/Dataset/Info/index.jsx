import React from "react";
import { Cover, DataVerifier, Circular } from "../../../../components/ui-components";
import Typography from "@mui/material/Typography";
import { useGetDatasetByID } from "../../../../regulondb-ws/queries/Dataset";
import SourceSerie from "./SourceSerie";
import Publications from "./Publications";
import TranscriptionFactor from "./TranscriptionFactor";
import GrowthConditions from "./GrowthConditions";
import NLPGrowthConditions from "./NLPGrowthConditions";
import DataFromDataset from "./Data";

//import Related from './related/Related'

export default function Info({ datasetId }) {
  const { dataset, loading, error } = useGetDatasetByID(datasetId);
  console.log(dataset);

  if (error) {
    return (
      <div>
        <Cover state={"error"}>
          <Typography variant="h1">error</Typography>
        </Cover>
      </div>
    );
  }
  if (loading) {
    return (
      <div>
        <Cover state="loading" >Loading Dataset</Cover>
        <Circular />
      </div>
    )
  }

  if (DataVerifier.isValidObjectWith_id(dataset)) {
    return (
      <div>
        <CoverTitle datasetId={datasetId} {...dataset} />

        <div style={{ marginLeft: "11%" }} >
          <SourceSerie {...dataset} />
          {DataVerifier.isValidArray(dataset.publications) && (
            <>
              <br />
              <Publications publications={dataset.publications} />
            </>
          )}
          {DataVerifier.isValidArray(dataset.objectsTested) && (
            <>
              <br />
              <TranscriptionFactor {...dataset} />
            </>
          )}
          {DataVerifier.isValidObject(dataset.growthConditions) && (
            <>
              <br />
              <GrowthConditions {...dataset} />
            </>
          )}
          <NLPGrowthConditions datasetId={datasetId} />
        </div>
        <DataFromDataset {...dataset} />
      </div>
    );
  }
}

function CoverTitle({
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
    <>
      <Cover>
        <p>Dataset:{" "}{datasetId}</p>
        <Typography variant="h1">{title}</Typography>
        <div style={{ display: "flex" }} >
          <p style={pStyle}>Dataset Type: {datasetType}</p>
          {sourceSerie?.strategy && (
            <p style={pStyle}>| Strategy: {sourceSerie.strategy}</p>
          )}
          {fivePrimeEnrichment && (
            <p style={pStyle}>
              | 5' Enrichment: {fivePrimeEnrichment}
            </p>
          )}
          {sample?.controlId.length > 0 && (
            <p style={pStyle}>
              | Control ID: {sample?.controlId.join(", ")}
            </p>
          )}
          {sample?.experimentId.length > 0 && (
            <p style={pStyle}>
              | Experiment ID: {sample?.experimentId.join(", ")}
            </p>
          )}
        </div>
        <br />
      </Cover>
    </>
  );
}
