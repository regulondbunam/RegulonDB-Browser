import { gql } from "@apollo/client";

export const QUERY_GetObjectList = gql`query GetObjectList($datamartType: String!) {
    getObjectList(datamartType: $datamartType) {
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