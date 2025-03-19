import { gql } from "@apollo/client";

export const query_GetAllProcessDataFromDatasetID = gql`query GetNormalizedData($datasetId: String){
getAuthorsDataOfDataset(datasetId: $datasetId) {
    _id
    authorsData
    datasetIds
  }
  getAllPeaksOfDataset(datasetId: $datasetId) {
    _id
    chromosome
    closestGenes {
      _id
      name
      distanceTo
      productName
    }
    name
    peakLeftPosition
    peakRightPosition
    score
    datasetIds
  }
  getAllTFBindingOfDataset(datasetId: $datasetId) {
    _id
    chrLeftPosition
    chrRightPosition
    chromosome
    closestGenes {
      _id
      name
      distanceTo
      transcriptionUnits {
        _id
        name
        distanceTo
      }
    }
    datasetIds
    foundRIs {
      _id
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
  }
  getAllTSSOfDataset(datasetId: $datasetId) {
    _id
    chromosome
    closestGenes {
      _id
      distanceTo
      name
    }
    datasetIds
    leftEndPosition
    pos_1
    promoter {
      _id
      confidenceLevel
      name
      pos1
      sigma
      strand
    }
    rightEndPosition
    strand
  }
  getAllTTSOfDataset(datasetId: $datasetId) {
    _id
    chromosome
    closestGenes {
      _id
      name
      distanceTo
    }
    datasetIds
    leftEndPosition
    name
    rightEndPosition
    strand
    temporalId
    terminator {
      _id
      transcriptionUnits {
        _id
        name
        promoter {
          _id
          leftEndPosition
          name
          rightEndPosition
          sequence
          strand
        }
      }
    }
  }
  getAllTransUnitsOfDataset(datasetId: $datasetId) {
    _id
    chromosome
    datasetIds
    genes {
      _id
      name
    }
    leftEndPosition
    length
    name
    phantom
    pseudo
    rightEndPosition
    strand
    termType
  }
}`