import { gql } from "@apollo/client";


export const query_GetAllTFBindingOfDataset = gql`query GetAllTFBindingOfDataset($datasetId: String) {
    getAllTFBindingOfDataset(datasetId: $datasetId) {
      _id
      chrLeftPosition
      chrRightPosition
      chromosome
      closestGenes {
        _id
        distanceTo
        name
        transcriptionUnits {
          _id
          distanceTo
          name
        }
      }
      datasetIds
      foundRIs {
        _id
        citations {
          evidence {
            code
            id
            name
            type
          }
          publication {
            authors
            citation
            id
            pmid
            title
            url
            year
          }
        }
        origin
        relativeGeneDistance
        relativeTSSDistance
        sequence
        strand
        tfbsLeftPosition
        tfbsRightPosition
      }
      nameCollection
      peakId
      score
      sequence
      strand
      temporalId
    }
  }`


  export const query_GetAllPeaksOfDataset = gql`query GetAllPeaksOfDataset($datasetId: String) {
    getAllPeaksOfDataset(datasetId: $datasetId) {
      _id
      chromosome
      closestGenes {
        _id
        distanceTo
        name
        productName
      }
      datasetIds
      name
      peakLeftPosition
      peakRightPosition
      score
      siteIds
      temporalId
    }
  }`