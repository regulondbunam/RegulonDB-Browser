import { gql } from "@apollo/client";

export const getDatasetIds = gql`query GetDatasetByID($datasetId: String) {
  getDatasetByID(datasetID: $datasetId) {
    _id
    objectsTested {
      _id
      genes {
        _id
      }
    }
  }
}`

export const getGenesIds = gql`query GetGenesBy($advancedSearch: String) {
  getGenesBy(advancedSearch: $advancedSearch) {
    data {
      _id
      gene {
        multifunTerms {
          _id
        }
      }
      products {
        regulonId
      }
      regulation {
        operon {
          _id
        }
        regulators {
          _id
        }
      }
    }
  }
}`

export const getOperonIds = gql`query GetOperonBy($advancedSearch: String) {
  getOperonBy(advancedSearch: $advancedSearch) {
    data {
      _id
      operon {
        _id
      }
      transcriptionUnits {
        _id
        firstGene {
          _id
        }
        genes {
          _id
        }
        promoter {
          _id
        }
        regulatorBindingSites {
          regulator {
            _id
          }
          regulatoryInteractions {
            _id
          }
        }
        terminators {
          _id
        }
      }
    }
  }
}`