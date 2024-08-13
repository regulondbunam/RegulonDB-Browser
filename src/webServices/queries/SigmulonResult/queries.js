import { gql } from "@apollo/client";

export const query_getSigmulonMainDataBySearch = gql`query GetSigmulonBy($search: String) {
  getSigmulonBy(search: $search) {
    data {
      _id
      sigmaFactor {
        name
      }
      statistics {
        genes
        transcriptionFactors
        promoters
        transcriptionUnits
        cotranscriptionFactors
        sigmaFactors
      }
    }
  }
}`

export const query_getAllSigmulonMainData = gql`query GetAllSigmulon {
  getAllSigmulon {
    data {
      _id
      sigmaFactor {
        name
        gene {
          name
          _id
        }
        synonyms
      }
      statistics {
        genes
        transcriptionFactors
        promoters
        transcriptionUnits
        cotranscriptionFactors
        sigmaFactors
      }
    }
  }
}`