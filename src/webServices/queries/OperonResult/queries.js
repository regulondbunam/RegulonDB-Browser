import { gql } from  '@apollo/client';

export const query_getOperonBy = gql`query GetOperonBy($advancedSearch: String, $search: String) {
  getOperonBy(advancedSearch: $advancedSearch, search: $search) {
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
        additiveEvidences {
          category
          code
          type
        }
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
        confidenceLevel
        firstGene {
          distanceToPromoter
          _id
          name
        }
        genes {
          _id
          name
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
              products {
                _id
                name
                abbreviatedName
              }
              symmetry
              siteLength
              family
              additiveEvidences {
                category
                code
                type
              }
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
            }
            function
            mechanism
          }
        }
        name
        note
        promoter {
          _id
          bindsSigmaFactor {
            _id
            name
            abbreviatedName
          }
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
            }
            function
            mechanism
          }
          transcriptionStartSite {
            leftEndPosition
            rightEndPosition
            range
            type
          }
          additiveEvidences {
            category
            code
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
            products {
              _id
              name
              abbreviatedName
            }
            symmetry
            siteLength
            family
            additiveEvidences {
              category
              code
              type
            }
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
          }
          function
          mechanism
        }
        statistics {
          genes
          sites
          transcriptionFactors
        }
        synonyms
        terminators {
          _id
          class
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
          sequence
          transcriptionTerminationSite {
            leftEndPosition
            rightEndPosition
            type
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
  }
}`

export const query_getOperonBySearch = gql`query GetOperonBy($search: String) {
  getOperonBy(search: $search) {
    data {
      _id
      operon {
        name
        statistics {
          genes
          promoters
          transcriptionUnits
        }
      }
      transcriptionUnits {
        _id
        name
        promoter {
          _id
          name
        }
      }
    }
  }
}`