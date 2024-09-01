import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Author from "./Author";
import { useQuery } from "@apollo/client";
import { query_GetAllProcessDataFromDatasetID } from "./query";
import DataVerifier from "../../Table/utils";
import ProcessData from "./ProcessData";
import {CircularProgress} from "@mui/material";

export default function Sources({ datasetId, datasetType }) {

  const { data, loading, error } = useQuery(query_GetAllProcessDataFromDatasetID, {
    variables: {
      datasetId
    }
  })

  let authorData
  let peaks
  let TFBs
  let TSs
  let TTs
  let TUs
  if (data) {
    if (DataVerifier.isValidArray(data?.getAuthorsDataOfDataset)) {
      authorData = data?.getAuthorsDataOfDataset[0]
    }
    if (DataVerifier.isValidArray(data?.getAllPeaksOfDataset)) {
      peaks = data?.getAllPeaksOfDataset
    }
    if (DataVerifier.isValidArray(data?.getAllTFBindingOfDataset)) {
      TFBs = data?.getAllTFBindingOfDataset
    }
    if (DataVerifier.isValidArray(data?.getAllTSSOfDataset)) {
      TSs = data?.getAllTSSOfDataset
    }
    if (DataVerifier.isValidArray(data?.getAllTTSOfDataset)) {
      TTs = data?.getAllTTSOfDataset
    }
    if (DataVerifier.isValidArray(data?.getAllTransUnitsOfDataset)) {
      TUs = data?.getAllTransUnitsOfDataset
    }
  }

  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tabTitle = "";
  switch (datasetType) {
    case "TFBINDING":
      tabTitle = "Normalized";
      break;
    case "RNAP_BINDING_SITES":
    case "TSS":
    case "TTS":
    case "TUS":
    case "GENE_EXPRESSION":
      tabTitle = "Uniformize";
      break;
    default:
      tabTitle = "";
      break;
  }

  console.log(data);

  if (loading) {
    return <div><CircularProgress/></div>
  }

  return (
    <div>
      <h2>SOURCE DATA</h2>
      <Box sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} aria-label="data tabs">
          <Tab value={0} label={tabTitle} />
          <Tab value={1} disabled={!authorData} label="Author" />
        </Tabs>

        <Box sx={{ padding: 2 }}>
          {data && (<></>)}
          {value === 0 && (<>
          <ProcessData peaks={peaks} TFBs={TFBs} TSs={TSs} TTs={TTs} TUs={TUs} />
          </>)}
          {value === 1 && <Author data={authorData} />}
        </Box>
      </Box>
      {datasetId}
    </div>
  );
}
