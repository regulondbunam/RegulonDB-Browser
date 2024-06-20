import React from "react";
import { CircularProgress as Circular } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import { Cover } from "ui-components/Web/Cover";
import Typography from "@mui/material/Typography";
import { useGetDatasetByID } from 'webServices/queries';
import SourceSerie from "./SourceSerie";
import Publications from "./Publications";
import TranscriptionFactor from "./TranscriptionFactor";
import GrowthConditions from "./GrowthConditions";
import NLPGrowthConditions from "./NLPGrowthConditions";
import DataFromDataset from "./Data";
import CoverHT from "./Cover";

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
        <Cover>
          <br />
          <CoverHT  datasetId={datasetId} {...dataset} />
        </Cover>
        <div style={{ marginLeft: "10%" }} >
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
