import { gql } from "@apollo/client";

export const query_GetRegulonBy = gql`query GetRegulonBy($advancedSearch: String, $search: String) {
  getRegulonBy(advancedSearch: $advancedSearch, search: $search) {
    data {
      _id
      aligmentMatrix {
        aligment
        matrix
        consensus
        urlPWMLogo
        urlMatrixQualityResult
      }
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
      evolutionaryConservation {
        urlRegulatorTargetGene
        urlPromoterTargetGene
      }
      organism {
        _id
        name
      }
      regulates {
        genes {
          _id
          function
          name
          terms {
            geneOntology {
              biologicalProcess {
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
                genes {
                  _id
                  name
                }
                name
              }
              cellularComponent {
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
                genes {
                  _id
                  name
                }
                name
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
                genes {
                  _id
                  name
                }
                name
              }
            }
            multifun {
              _id
              genes {
                _id
                name
              }
              name
            }
          }
        }
        operons {
          _id
          firstGene {
            _id
            name
          }
          function
          name
        }
        sigmaFactors {
          _id
          function
          gene {
            _id
            name
          }
          name
        }
        transcriptionFactors {
          _id
          function
          genes {
            _id
            function
            name
            terms {
              geneOntology {
                biologicalProcess {
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
                      pmid
                      citation
                      url
                      title
                      year
                    }
                  }
                  _id
                  genes {
                    _id
                    name
                  }
                  name
                }
                cellularComponent {
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
                  genes {
                    _id
                    name
                  }
                  name
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
                  genes {
                    _id
                    name
                  }
                  name
                }
              }
              multifun {
                _id
                genes {
                  _id
                  name
                }
                name
              }
            }
          }
          name
        }
        transcriptionUnits {
          _id
          firstGene {
            _id
            name
          }
          function
          name
          promoter {
            _id
            name
          }
        }
      }
      regulator {
        _id
        abbreviatedName
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
        conformations {
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
          class
          confidenceLevel
          effector {
            _id
            name
          }
          effectorInteractionType
          functionalType
          name
          note
          type
        }
        connectivityClass
        encodedBy {
          genes {
            _id
            leftEndPosition
            length
            name
            rightEndPosition
          }
          operon {
            _id
            name
            tusEncodingRegulator {
              promoterName
              transcriptionUnitName
            }
          }
        }
        family
        function
        name
        note
        products {
          name
          abbreviatedName
          _id
        }
        sensingClass
        siteLength
        symmetry
        synonyms
        type
      }
      regulatoryInteractions {
        _id
        activeConformation {
          _id
          name
          type
        }
        citations {
          evidence {
            additiveEvidenceCodeRule
            _id
            code
            name
            type
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
        additiveEvidences {
          category
          code
          type
        }
        confidenceLevel
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
          leftEndPosition
          name
          rightEndPosition
        }
        regulatoryBindingSites {
          _id
          absolutePosition
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
          function
          leftEndPosition
          rightEndPosition
          sequence
          strand
        }
      }
      summary {
        genes {
          repressed
          activated
          dual
          unknown
          total
        }
        transcriptionFactors {
          repressed
          activated
          dual
          unknown
          total
        }
        transcriptionUnits {
          repressed
          activated
          dual
          unknown
          total
        }
        operons {
          repressed
          activated
          dual
          unknown
          total
        }
        sigmaFactors {
          repressed
          activated
          dual
          unknown
          total
        }
        bindingSites {
          repressed
          activated
          dual
          unknown
          total
        }
        regulatoryInteractions {
          repressed
          activated
          dual
          unknown
          total
        }
      }
      terms {
        geneOntology {
          biologicalProcess {
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
            genes {
              _id
              name
            }
            name
          }
          cellularComponent {
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
            genes {
              _id
              name
            }
            name
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
            genes {
              _id
              name
            }
            name
          }
        }
        multifun {
          _id
          genes {
            _id
            name
          }
          name
        }
      }
    }
  }
}`

export const query_GetRegulonMainDataBySearch = gql`query GetRegulonBy($search: String) {
  getRegulonBy(search: $search) {
    data {
      regulator {
        _id
        name
        synonyms
      }
      summary {
        genes {
          total
        }
        transcriptionFactors {
          total
        }
        transcriptionUnits {
          total
        }
        operons {
          total
        }
        sigmaFactors {
          total
        }
        bindingSites {
          total
        }
        regulatoryInteractions {
          total
        }
      }
    }
  }
}`

export const query_getAllRegulonsSummary = gql`{
    getAllRegulon {
      data {
        _id
        regulator {
          name
          abbreviatedName
        }
        summary {
          bindingSites {
            total
          }
          genes {
            total
          }
          operons {
            total
          }
          regulatoryInteractions {
            total
          }
          sigmaFactors {
            total
          }
          transcriptionFactors {
            total
          }
          transcriptionUnits {
            total
          }
        }
      }
    }
  }`