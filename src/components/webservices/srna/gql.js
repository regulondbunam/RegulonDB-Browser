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
    lastPage
    limit
    totalResults
  }`

export const fragment_ExternalCrossReferences = gql`fragment ExternalCrossReferences on ExternalCrossReferences {
  externalCrossReferenceId
  externalCrossReferenceName
  objectId
  url
}`

export const fragment_SrnaProducts = gql`fragment SRNA_PRODUCTS on srnaProduct {
  citations {
    ...CITATIONS
  }
  externalCrossReferences {
    ...ExternalCrossReferences
  }
  gene {
    _id
    gcContent
    genomePosition
    name
    strand
  }
  name
  note
  sequence
  synonyms
}`

export const fragment_RegulatoryInteractions = gql`fragment RegulatoryInteractions on srnaRegulatoryInteractions {
  _id
  citations {
    ...CITATIONS
  }
  distanceToGene
  function
  mechanism
  regulatedEntity {
    _id
    name
    type
  }
  regulatoryBindingSites {
    absolutePosition
    citations {
      ...CITATIONS
    }
    function
    _id
    leftEndPosition
    rightEndPosition
    sequence
    strand
  }
}`

const fragment_SrnaSummary = gql`fragment SummaryObject on SummaryObject {
  activated
  dual
  repressed
  total
  unknown
}

fragment Summary on SrnaSummary {
  bindingSites {
    ...SummaryObject
  }
  genes {
    ...SummaryObject
  }
  regulatoryInteractions {
    ...SummaryObject
  }
  sigmaFactors {
    ...SummaryObject
  }
  transcriptionFactors {
    ...SummaryObject
  }
  transcriptionUnits {
    ...SummaryObject
  }
}`

export const query_getAllSRNA = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
${fragment_ExternalCrossReferences}
${fragment_SrnaProducts}
${fragment_RegulatoryInteractions}
${fragment_SrnaSummary}
query getAllSRNA($limit: Int, $page: Int) {
  getAllSrnas(limit: $limit, page: $page) {
    data {
      _id
      allCitations {
        ...CITATIONS
      }
      product {
        ...SRNA_PRODUCTS
      }
      regulatoryInteractions {
        ...RegulatoryInteractions
      }
      summary{
        ...Summary
      }
    }
  }
}   
`

export const query_getSrnaBy = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
${fragment_ExternalCrossReferences}
${fragment_SrnaProducts}
${fragment_RegulatoryInteractions}
${fragment_SrnaSummary}
query getSrnaBy(
  $advancedSearch: String
  $fullMatchOnly: Boolean
  $limit: Int 
  $page: Int
	$properties: [String]
	$search: String) {
  getSrnaBy(
    advancedSearch:$advancedSearch
    fullMatchOnly:$fullMatchOnly
    limit:$limit
    page:$page
    properties:$properties
    search:$search
  ) { 
    data {
      _id
      allCitations {
        ...CITATIONS
      }
      product {
        ...SRNA_PRODUCTS
      }
      regulatoryInteractions {
        ...RegulatoryInteractions
      }
      summary {
        ...Summary
      }
    }
    pagination {
      ...PAGINATION
    }
  }
}
`
