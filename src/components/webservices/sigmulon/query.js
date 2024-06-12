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
    limit
    totalResults
  }`

  export const query_getSigmulonBySearch = gql`
  ${fragment_PAGINATION}
  query getSigmulon($search: String){
      getSigmulonBy(search:$search){
        pagination {
          ...PAGINATION
        }
        data {
          _id
          sigmaFactor {
            _id
            gene {
              _id
              name
            }
            name
            sigmulonRegulators {
              _id
              name
            }
            synonyms
          }
          statistics {
            cotranscriptionFactors
            genes
            promoters
            sigmaFactors
            transcriptionFactors
            transcriptionUnits
          }
        }
      }
    }
  `

export const query_getSigmulonBy = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
query getSigmulon($advancedSearch: String){
    getSigmulonBy(advancedSearch:$advancedSearch){
      pagination {
        ...PAGINATION
      }
      data {
        _id
        allCitations {
          ...CITATIONS
        }
        sigmaFactor {
          _id
          gene {
            _id
            name
          }
          name
          sigmulonGenes {
            geneOntologyTerms{
              biologicalProcess{
                _id
                citations{
                  ...CITATIONS
                }
                name
                productsIds
              }
              cellularComponent{
                _id
                citations{
                  ...CITATIONS
                }
                name
                productsIds
              }
              molecularFunction{
                _id
                citations{
                  ...CITATIONS
                }
                name
                productsIds
              }
            }
            name
            _id
          }
          sigmulonRegulators {
            _id
            name
          }
          synonyms
        }
        statistics {
          cotranscriptionFactors
          genes
          promoters
          sigmaFactors
          transcriptionFactors
          transcriptionUnits
        }
        transcribedPromoters {
          _id
          TSSPosition
          boxes {
            leftEndPosition
            rightEndPosition
            sequence
            type
          }
          name
          operonId
          sequence
          transcribedGenes {
            _id
            distanceFromTSS
            name
          }
          citations {
            evidence {
              code
              _id
              name
              type
            }
            publication {
              authors
              citation
              _id
              pmid
              title
              url
              year
            }
          }
        }
      }
    }
  }
`

export const query_getAllSigmulon = gql`
query getAllSigmulon {
    getAllSigmulon {
      data {
        _id
        sigmaFactor {
          _id
          gene {
            _id
            name
          }
          name
          sigmulonGenes {
            name
            _id
          }
          sigmulonRegulators {
            _id
            name
          }
          synonyms
        }
        statistics {
          cotranscriptionFactors
          genes
          promoters
          sigmaFactors
          transcriptionFactors
          transcriptionUnits
        }
      }
    }
  }`