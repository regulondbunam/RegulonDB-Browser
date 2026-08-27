import { gql } from "@apollo/client";

export const QUERY_GetObjectList = gql`query GetObjectList($datamartType: String! $organismId: String!) {
    getObjectList(datamartType: $datamartType organismId: $organismId) {
      _id
      datamartType
      encodedGenes
      name
      productsName
      sigmulonGeneName
      statistics {
        cotranscriptionFactors
        genes
        promoters
        sigmaFactors
        sites
        transcriptionFactors
        transcriptionUnits
      }
      synonyms
    }
  }`