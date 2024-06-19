import { gql } from "@apollo/client";

export const gene = gql`query GetGenesBy($advancedSearch: String, $limit: Int) {
  getGenesBy(advancedSearch: $advancedSearch, limit: $limit) {
    data {
      _id
      gene {
        name
      }
    }
  }
}`

export const tu = gql`query GetOperonBy($advancedSearch: String, $limit: Int) {
  getOperonBy(advancedSearch: $advancedSearch, limit: $limit) {
    data {
      _id
      transcriptionUnits {
        name
        _id
        promoter {
          name
        }
      }
    }
  }
}`

export const operon = gql`query GetOperonBy($advancedSearch: String, $limit: Int) {
  getOperonBy(advancedSearch: $advancedSearch, limit: $limit) {
    data {
      _id
      operon {
        name
      }
    }
  }
}`

export const regulon = gql`query GetRegulonBy($advancedSearch: String, $limit: Int) {
  getRegulonBy(advancedSearch: $advancedSearch, limit: $limit) {
    data {
      _id
      regulator {
        name
      }
    }
  }
}`
