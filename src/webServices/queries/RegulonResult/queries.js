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
          name
          function
          terms {
            multifun {
              _id
              name
              genes {
                _id
                name
              }
            }
            geneOntology {
              cellularComponent {
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
              }
              molecularFunction {
                _id
                name
              }
              biologicalProcess {
                _id
                name
              }
            }
          }
        }
        transcriptionFactors {
          _id
          name
          function
        }
        transcriptionUnits {
          _id
          name
          function
          firstGene {
            _id
            name
          }
          promoter {
            _id
            name
          }
        }
        operons {
          _id
          name
          function
        }
        sigmaFactors {
          _id
          name
          function
          gene {
            _id
            name
          }
        }
      }
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
        activeConformation {
          _id
          type
          name
        }
        function
        regulatedEntity {
          _id
          type
          name
        }
        distanceToFirstGene
        distanceToPromoter
        regulatedGenes {
          _id
          name
          leftEndPosition
          rightEndPosition
        }
        regulatoryBindingSites {
          _id
          function
          absolutePosition
          leftEndPosition
          rightEndPosition
          sequence
          strand
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
        additiveEvidences {
          category
          code
          type
        }
        confidenceLevel
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
        multifun {
          _id
          name
          genes {
            _id
            name
          }
        }
        geneOntology {
          cellularComponent {
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
          }
          molecularFunction {
            _id
            name
          }
          biologicalProcess {
            _id
            name
          }
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