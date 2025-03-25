import { gql } from "@apollo/client";

export const QUERY_getDatasetsFromSearch = gql`
  query GetDatasetsFromSearch($advancedSearch: String) {
    getDatasetsFromSearch(advancedSearch: $advancedSearch) {
      _id
      collectionData{
        type
      }
      objectsTested {
        name
        _id
        genes {
          _id
          name
        }
      }
      sample {
        title
      }
      sourceSerie {
        strategy
        title
      }
    }
  }
`;

export const QUERY_getAllTipsDataset = gql`
  query GetAllTipsDataset($limit: Int, $datasetId: String) {
    getAllPeaksOfDataset(limit: $limit, datasetId: $datasetId) {
      _id
    }
    getAllTFBindingOfDataset(datasetId: $datasetId, limit: $limit) {
      _id
    }
  }
`;

export const QUERY_getAllTUSDataset = gql`
  query GetAllTransUnitsOfDataset($datasetId: String, $limit: Int) {
    getAllTransUnitsOfDataset(datasetId: $datasetId, limit: $limit) {
      _id
    }
  }
`;

export const QUERY_getAllTTSDataset = gql`
  query GetAllTTSOfDataset($datasetId: String, $limit: Int) {
    getAllTTSOfDataset(datasetId: $datasetId, limit: $limit) {
      _id
    }
  }
`;

export const QUERY_getAllTSSDataset = gql`
  query GetAllTSSOfDataset($datasetId: String, $limit: Int) {
    getAllTSSOfDataset(datasetId: $datasetId, limit: $limit) {
      _id
    }
  }
`;
