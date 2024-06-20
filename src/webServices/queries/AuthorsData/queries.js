import { gql } from "@apollo/client";

export const query_getAuthorsDataOfDataset = gql`query GetAuthorsDataOfDataset($datasetId: String) {
    getAuthorsDataOfDataset(datasetId: $datasetId) {
      _id
      authorsData
      datasetIds
    }
  }`