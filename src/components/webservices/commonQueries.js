import { gql } from "@apollo/client";

export const fragment_CITATIONS = gql`fragment CITATIONS on Citations {
    publication {
      _id
      authors
      pmid
      citation
      url
      title
      year
    }
    evidence {
      _id
      name
      code
      type
    }
  }`

  export const fragment_PAGINATION = gql`fragment PAGINATION on Pagination {
    currentPage
    firstPage
    hasNextPage
    totalResults
  }`

export const fragment_ExternalCrossReferences = gql`fragment ExternalCrossReferences on ExternalCrossReferences {
    externalCrossReferenceId
    externalCrossReferenceName
    objectId
    url
  }`