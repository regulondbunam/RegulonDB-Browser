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

export const query_getSigmulonByAdvancedSearch = gql`query GetSigmulonBy($advancedSearch: String) {
  getSigmulonBy(advancedSearch: $advancedSearch) {
    data {
      _id
      allCitations {
        evidence {
          _id
          additiveEvidenceCodeRule
          code
          name
          type
        }
        publication {
          _id
          authors
          citation
          pmid
          title
          url
          year
        }
      }
      organism {
        _id
        name
      }
      sigmaFactor {
        _id
        abbreviatedName
        gene {
          _id
          name
        }
        name
        sigmulonGenes {
          _id
          geneOntologyTerms {
            cellularComponent {
              _id
              citations {
                evidence {
                  _id
                  additiveEvidenceCodeRule
                  code
                  name
                  type
                }
                publication {
                  _id
                  authors
                  citation
                  pmid
                  title
                  url
                  year
                }
              }
              name
              productsIds
            }
            biologicalProcess {
              _id
              citations {
                evidence {
                  _id
                  additiveEvidenceCodeRule
                  code
                  name
                  type
                }
                publication {
                  _id
                  authors
                  citation
                  pmid
                  title
                  url
                  year
                }
              }
              name
              productsIds
            }
            molecularFunction {
              _id
              citations {
                evidence {
                  _id
                  name
                  code
                  type
                  additiveEvidenceCodeRule
                }
                publication {
                  _id
                  authors
                  pmid
                  citation
                  url
                  title
                  year
                }
              }
              name
              productsIds
            }
          }
          name
        }
        sigmulonRegulators {
          _id
          name
        }
        synonyms
      }
      statistics {
        genes
        cotranscriptionFactors
        promoters
        sigmaFactors
        transcriptionFactors
        transcriptionUnits
      }
      transcribedPromoters {
        TSSPosition
        _id
        boxes {
          leftEndPosition
          rightEndPosition
          sequence
          type
        }
        citations {
          evidence {
            _id
            additiveEvidenceCodeRule
            code
            name
            type
          }
          publication {
            _id
            authors
            citation
            pmid
            title
            url
            year
          }
        }
        name
        operonId
        sequence
        strand
        transcribedGenes {
          _id
          distanceFromTSS
          name
        }
      }
    }
  }
}`