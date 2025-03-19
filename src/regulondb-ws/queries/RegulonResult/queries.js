import { gql } from "@apollo/client";

export const query_GetRegulonBy = gql`query GetRegulonBy($advancedSearch: String, $search: String) {
    getRegulonBy(advancedSearch: $advancedSearch, search: $search) {
      data {
        _id
        aligmentMatrix {
          aligment
          consensus
          matrix
          urlMatrixQualityResult
          urlPWMLogo
        }
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
        evolutionaryConservation {
          urlPromoterTargetGene
          urlRegulatorTargetGene
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
                  name
                }
                cellularComponent {
                  _id
                  name
                }
                molecularFunction {
                  _id
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
            name
          }
          transcriptionUnits {
            _id
            function
            name
            promoter {
              _id
              name
            }
            firstGene {
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
          confidenceLevel
          conformations {
            _id
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
            _id
            abbreviatedName
            name
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
          additiveEvidences {
            category
            code
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
            name
          }
          regulatoryBindingSites {
            absolutePosition
            function
            leftEndPosition
            rightEndPosition
            sequence
            strand
          }
        }
        summary {
          bindingSites {
            activated
            dual
            repressed
            total
            unknown
          }
          genes {
            activated
            dual
            repressed
            total
            unknown
          }
          operons {
            activated
            dual
            repressed
            total
            unknown
          }
          regulatoryInteractions {
            activated
            dual
            repressed
            total
            unknown
          }
          sigmaFactors {
            activated
            dual
            repressed
            total
            unknown
          }
          transcriptionFactors {
            activated
            dual
            repressed
            total
            unknown
          }
          transcriptionUnits {
            activated
            dual
            repressed
            total
            unknown
          }
        }
        terms {
          geneOntology {
            biologicalProcess {
              _id
              name
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
            }
            cellularComponent {
              _id
              name
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
            }
            molecularFunction {
              _id
              name
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