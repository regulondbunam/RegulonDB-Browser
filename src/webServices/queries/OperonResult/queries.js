import { gql } from  '@apollo/client';

export const query_getOperonBy = gql`query GetOperonBy($advancedSearch: String, $search: String) {
  getOperonBy(advancedSearch: $advancedSearch,  search: $search) {
    data {
      _id
      allCitations {
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
      operon {
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
        regulationPositions {
          leftEndPosition
          rightEndPosition
        }
        strand
        statistics {
          transcriptionUnits
          promoters
          genes
        }
      }
      organism {
        _id
        name
      }
      schemaVersion
      transcriptionUnits {
        _id
        name
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
        firstGene {
          distanceToPromoter
          _id
          name
        }
        genes {
          _id
          name
        }
        note
        synonyms
        promoter {
          _id
          bindsSigmaFactor {
            _id
            name
            abbreviatedName
          }
          name
          note
          boxes {
            leftEndPosition
            rightEndPosition
            sequence
            type
          }
          score
          sequence
          synonyms
          transcriptionStartSite {
            leftEndPosition
            rightEndPosition
            range
            type
          }
          confidenceLevel
        }
        terminators {
          _id
          class
          sequence
          transcriptionTerminationSite {
            leftEndPosition
            rightEndPosition
            type
          }
          confidenceLevel
        }
        regulatorBindingSites {
          regulator {
            _id
            name
            function
            abbreviatedName
            synonyms
            note
            conformations {
              _id
              name
              type
              effectorInteractionType
              class
              effector {
                _id
                name
              }
              note
              functionalType
              confidenceLevel
            }
            encodedBy {
              genes {
                _id
                name
                leftEndPosition
                length
                rightEndPosition
              }
              operon {
                _id
                name
                tusEncodingRegulator {
                  transcriptionUnitName
                  promoterName
                }
              }
            }
            sensingClass
            connectivityClass
            products {
              _id
              name
              abbreviatedName
            }
            symmetry
            siteLength
            family
            confidenceLevel
            type
          }
          regulatoryInteractions {
            _id
            relativeCenterPosition
            confidenceLevel
            function
            note
            regulatorySite {
              _id
              centerEndPosition
              leftEndPosition
              length
              note
              rightEndPosition
              sequence
            }
            mechanism
          }
          function
          mechanism
        }
        statistics {
          genes
          sites
          transcriptionFactors
        }
        additiveEvidences {
          category
          code
          type
        }
        confidenceLevel
      }
    }
  }
}`