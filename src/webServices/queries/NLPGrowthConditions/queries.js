import { gql } from "@apollo/client";

export const query_GETNLPGrowthConditionById = gql`query GetNLPGrowthConditionById($datasetId: String) {
    getNLPGrowthConditionById(datasetId: $datasetId) {
      _id
      additionalProperties {
        name
        value {
          associatedPhrase
          nameField
          score
          value
        }
      }
      aeration {
        associatedPhrase
        nameField
        score
        value
      }
      aerationSpeed {
        associatedPhrase
        nameField
        score
        value
      }
      datasetIds
      geneticBackground {
        associatedPhrase
        nameField
        score
        value
      }
      growthPhase {
        associatedPhrase
        nameField
        score
        value
      }
      growthRate {
        associatedPhrase
        nameField
        score
        value
      }
      medium {
        associatedPhrase
        nameField
        score
        value
      }
      mediumSupplements {
        associatedPhrase
        nameField
        score
        value
      }
      opticalDensity {
        associatedPhrase
        nameField
        score
        value
      }
      organism {
        associatedPhrase
        nameField
        score
        value
      }
      ph {
        associatedPhrase
        nameField
        score
        value
      }
      pressure {
        associatedPhrase
        nameField
        score
        value
      }
      temperature {
        associatedPhrase
        nameField
        score
        value
      }
      temporalId
      vesselType {
        associatedPhrase
        nameField
        score
        value
      }
    }
  }`