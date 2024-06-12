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

export const fragment_ALIGMENTMATRIX = gql`fragment ALIGMENTMATRIX on AligmentMatrix {
  aligment
  consensus
  matrix
  urlMatrixQualityResult
  urlPWMLogo
}`

export const fragment_EVOLUTIONARYCONSERVATION = gql`fragment EVOLUTIONARYCONSERVATION on EvolutionaryConservation {
  urlPromoterTargetGene
  urlRegulatorTargetGene
}`

export const fragment_GeneTerms = gql`fragment GeneTerms on GeneTermsObject {
  _id
  name
}`

export const fragment_GO = gql`fragment GENEONTOLOGY on RegulonGeneOntology {
  biologicalProcess {
    genes {
      ...GeneTerms
    }
    name
    _id
  }
  cellularComponent {
    genes {
      ...GeneTerms
    }
    name
    _id
  }
  molecularFunction {
    genes {
      ...GeneTerms
    }
    name
    _id
  }
}`

export const fragment_REGULATES = gql`fragment REGULATES on Regulates {
  genes {
    function
    _id
    name
    terms {
      geneOntology {
        ...GENEONTOLOGY
      }
      multifun {
        _id
        name
        genes {
          ...GeneTerms
        }
      }
    }
  }
  operons {
    firstGene {
      _id
      name
    }
    function
    _id
    name
  }
  sigmaFactors {
    function
    _id
    name
  }
  transcriptionFactors {
    function
    _id
    name
  }
  transcriptionUnits {
    firstGene {
      _id
      name
    }
    function
    _id
    name
  }
}`

export const fragment_RI = gql`fragment RI on RegulonRegulatoryInteractions {
  _id
  citations {
    ...CITATIONS
  }
  distanceToFirstGene
  distanceToPromoter
  function
  regulatedEntity {
    _id
    name
    type
  }
  regulatedGenes {
    _id
    name
  }
  activeConformation {
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

export const fragment_TERMS = gql`fragment TERMS on Terms {
  geneOntology {
    ...GENEONTOLOGY
  }
  multifun {
    _id
    name
    genes {
      ...GeneTerms
    }
  }
}`

export const fragment_ENCODEFROM = gql`fragment ENCODEFROM on EncodedFrom {
  genes {
    _id
    name
    leftEndPosition
    rightEndPosition
    length
  }
  operon {
    name
    _id
    tusEncodingRegulator {
      promoterName
      transcriptionUnitName
    }
  }
}`

export const fragment_ENCODEBY = gql`fragment ENCODEBY on EncodedBy {
  genes {
    _id
    name
    leftEndPosition
    rightEndPosition
    length
  }
  operon {
    name
    _id
    tusEncodingRegulator {
      promoterName
      transcriptionUnitName
    }
  }
}`

export const fragment_REGULATOR = gql`fragment REGULATOR on Regulator {
  _id
  additiveEvidences {
    category
    code
    type
  }
  citations {
    ...CITATIONS
  }
  conformations {
    additiveEvidences{
    category
    code
    type
  }
    citations {
      ...CITATIONS
    }
    confidenceLevel
    effectorInteractionType
    functionalType
    _id
    name
    type
  }
  confidenceLevel
  connectivityClass
  encodedFrom {
    ...ENCODEFROM
  }
  family
  name
  abbreviatedName
  note
  products {
    _id
    name
  }
  siteLength
  sensingClass
  symmetry
  synonyms
  type
}`

export const fragment_REGULATORv2 = gql`fragment REGULATOR on Regulator {
  _id
  additiveEvidences {
    category
    code
    type
  }
  citations {
    ...CITATIONS
  }
  conformations {
    additiveEvidences{
    category
    code
    type
  }
    citations {
      ...CITATIONS
    }
    confidenceLevel
    effectorInteractionType
    functionalType
    _id
    name
    type
  }
  confidenceLevel
  connectivityClass
  encodedBy {
    ...ENCODEBY
  }
  family
  name
  abbreviatedName
  note
  products {
    _id
    name
  }
  siteLength
  sensingClass
  symmetry
  synonyms
  type
}`

export const fragment_SUMMARY = gql`fragment SUMOBJ on SummaryObject {
  activated
  dual
  repressed
  total
  unknown
}

fragment SUMMARY on Summary {
  bindingSites {
    ...SUMOBJ
  }
  genes {
    ...SUMOBJ
  }
  operons {
    ...SUMOBJ
  }
  regulatoryInteractions {
    ...SUMOBJ
  }
  sigmaFactors {
    ...SUMOBJ
  }
  transcriptionFactors {
    ...SUMOBJ
  }
  transcriptionUnits {
    ...SUMOBJ
  }
}`

export const query_GET_REGULON_BY = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
${fragment_ALIGMENTMATRIX}
${fragment_EVOLUTIONARYCONSERVATION}
${fragment_GeneTerms}
${fragment_GO}
${fragment_REGULATES}
${fragment_RI}
${fragment_TERMS}
${fragment_ENCODEFROM}
${fragment_REGULATOR}
${fragment_SUMMARY}
query GetRegulonInfo($advancedSearch: String, $fullMatchOnly: Boolean = false, $limit: Int = 10, $organismName: String, $page: Int = 0, $search: String) {
  getRegulonBy(
    advancedSearch: $advancedSearch
    fullMatchOnly: $fullMatchOnly
    limit: $limit
    organismName: $organismName
    page: $page
    search: $search
  ) {
    data {
      _id
      allCitations {
        ...CITATIONS
      }
      aligmentMatrix {
        ...ALIGMENTMATRIX
      }
      evolutionaryConservation {
        ...EVOLUTIONARYCONSERVATION
      }
      regulates {
        ...REGULATES
      }
      regulatoryInteractions {
        ...RI
      }
      terms {
        ...TERMS
      }
      regulator {
        ...REGULATOR
      }
      summary{
        ...SUMMARY
      }
    }
    pagination {
      ...PAGINATION
    }
  }
}`

export const query_GET_REGULON_BYSearch = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
${fragment_ALIGMENTMATRIX}
${fragment_EVOLUTIONARYCONSERVATION}
${fragment_GeneTerms}
${fragment_GO}
${fragment_REGULATES}
${fragment_RI}
${fragment_TERMS}
${fragment_SUMMARY}
query GetRegulonInfo($advancedSearch: String, $fullMatchOnly: Boolean = false, $limit: Int = 10, $organismName: String, $page: Int = 0, $search: String) {
  getRegulonBy(
    advancedSearch: $advancedSearch
    fullMatchOnly: $fullMatchOnly
    limit: $limit
    organismName: $organismName
    page: $page
    search: $search
  ) {
    data {
      _id
      allCitations {
        ...CITATIONS
      }
      aligmentMatrix {
        ...ALIGMENTMATRIX
      }
      evolutionaryConservation {
        ...EVOLUTIONARYCONSERVATION
      }
      regulates {
        ...REGULATES
      }
      regulatoryInteractions {
        ...RI
      }
      terms {
        ...TERMS
      }
      regulator {
        abbreviatedName
        name
        _id
      }
      summary{
        ...SUMMARY
      }
    }
    pagination {
      ...PAGINATION
    }
  }
}`

export const query_GET_REGULON_BYV2 = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
${fragment_ALIGMENTMATRIX}
${fragment_EVOLUTIONARYCONSERVATION}
${fragment_GeneTerms}
${fragment_GO}
${fragment_REGULATES}
${fragment_RI}
${fragment_TERMS}
${fragment_ENCODEBY}
${fragment_REGULATORv2}
${fragment_SUMMARY}
query GetRegulonInfo($advancedSearch: String, $fullMatchOnly: Boolean = false, $limit: Int = 10, $organismName: String, $page: Int = 0, $search: String) {
  getRegulonBy(
    advancedSearch: $advancedSearch
    fullMatchOnly: $fullMatchOnly
    limit: $limit
    organismName: $organismName
    page: $page
    search: $search
  ) {
    data {
      _id
      allCitations {
        ...CITATIONS
      }
      aligmentMatrix {
        ...ALIGMENTMATRIX
      }
      evolutionaryConservation {
        ...EVOLUTIONARYCONSERVATION
      }
      regulates {
        ...REGULATES
      }
      regulatoryInteractions {
        ...RI
      }
      terms {
        ...TERMS
      }
      regulator {
        ...REGULATOR
      }
      summary{
        ...SUMMARY
      }
    }
    pagination {
      ...PAGINATION
    }
  }
}`

export const query_GET_ALL_REGULON = gql`
${fragment_REGULATOR}
${fragment_CITATIONS}
${fragment_ENCODEFROM}
  query GetAllRegulon{
    getAllRegulon(limit: 0){
      data{
        _id
        regulator {
          name
          abbreviatedName
        }
      }
      pagination{
        totalResults
      }
    }
  }`
