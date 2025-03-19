import React from "react";
import { Cover } from "../../../components/ui-components";
import { Box, Grid } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import CollectionCard from "./CollectionCard";
import { DataVerifier } from "../../../components/ui-components";

const query = gql`
  query getListOfTypeDatasets {
    listAllDatasetTypes
    listAllHTSources
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(query);

  if (error) {
    console.error("error to getListOfTypeDatasets");
    return (
      <Cover state={"error"}>
        <h1>Error, failed to load collections list</h1>
      </Cover>
    );
  }

  if (loading) {
    return (
      <Cover state={"loading"}>
        <h1>Loading collections list</h1>
      </Cover>
    );
  }

  if (data) {
    let allDatasetTypes = [];
    allDatasetTypes = [...data.listAllDatasetTypes];
    // console.log(allDatasetTypes.sort((a, b) => b.localeCompare(a)));
    const allDatasetTypesSorted = allDatasetTypes.sort((a, b) => {
      if (a.startsWith('G') && !b.startsWith('G')) {
        return 1;  // 'a' se mueve después de 'b'
      }
      if (!a.startsWith('G') && b.startsWith('G')) {
        return -1; // 'a' se mueve antes de 'b'
      }
      return 0;  // Si ambos empiezan o no empiezan con 'G', no se cambia el orden
    });
    return (
      <div>
        <Cover>
          <h1>High Throughput Collection</h1>
        </Cover>

        {DataVerifier.isValidArray(allDatasetTypesSorted) && (
          <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              {allDatasetTypesSorted.map((datasetType) => (
                <Grid item xs={12} sm={6} md={4} lg={6} key={"card_" + datasetType}>
                  <CollectionCard datasetType={datasetType} sources={data.listAllHTSources} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </div>
    );
  }

  return <></>;
}
