import { gql } from "@apollo/client";

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