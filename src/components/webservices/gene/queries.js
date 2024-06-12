import { gql } from "@apollo/client";
import { fragment_CITATIONS, fragment_PAGINATION, fragment_ExternalCrossReferences } from "../commonQueries";
export const fragment_PRODUCTS = gql`fragment PRODUCTS on Products {
    anticodon
    cellularLocations
    citations {
      ...CITATIONS
    }
    externalCrossReferences {
      ...ExternalCrossReferences
    }
    geneOntologyTerms {
      biologicalProcess {
        citations {
          ...CITATIONS
        }
        _id
        name
        productsIds
      }
      cellularComponent {
        citations {
          ...CITATIONS
        }
        _id
        name
        productsIds
      }
      molecularFunction {
        citations {
          ...CITATIONS
        }
        _id
        name
        productsIds
      }
    }
    _id
    isRegulator
    isoelectricPoint
    molecularWeight
    motifs {
      description
      _id
      dataSource
      leftEndPosition
      note
      rightEndPosition
      sequence
      type
    }
    name
    note
    regulonId
    sequence
    synonyms
    type
  }`

export const fragment_PROMOTER = gql`fragment PROMOTER on Promoter {
    bindsSigmaFactor {
      citations {
        ...CITATIONS
      }
      sigmaFactor_id
      sigmaFactor_name
    }
    boxes {
      leftEndPosition
      rightEndPosition
      sequence
      type
    }
    citations {
      ...CITATIONS
    }
    _id
    name
    note
    regulatorBindingSites {
      function
      regulator {
        _id
        function
        name
      }
      regulatoryInteractions {
        _id
        centerPosition
        citations {
          ...CITATIONS
        }
        function
        mechanism
        note
        regulatorySite {
          _id
          absolutePosition
          citations {
            ...CITATIONS
          }
          leftEndPosition
          length
          note
          rightEndPosition
          sequence
        }
      }
    }
    score
    sequence
    synonyms
    transcriptionStartSite {
      leftEndPosition
      range
      rightEndPosition
      type
    }
  }`

export const fragment_Regulation = gql`fragment REGULATION on Regulation {
    operon {
      arrangement {
        promoters {
          _id
          name
        }
        regulators {
          function
          _id
          name
          type
        }
        transcriptionUnit {
          _id
          name
        }
      }
      _id
      name
    }
    regulators {
      function
      _id
      name
      type
    }
    statistics {
      promoters
      regulators
      regulatoryInteractions
    }
  }`

export const fragment_GENE = gql`fragment GENE on Gene{
    bnumber
          centisomePosition
          citations {
            ...CITATIONS
          }
          externalCrossReferences {
            ...ExternalCrossReferences
          }
          fragments {
            centisomePosition
            _id
            leftEndPosition
            name
            rightEndPosition
            sequence
          }
          gcContent
          _id
          leftEndPosition
          multifunTerms {
            _id
            label
            name
          }
          name
          note
          rightEndPosition
          sequence
          strand
          synonyms
          type
  }`

export const fragment_SHINEDALGARNOS = gql`fragment SHINEDALGARNOS on ShineDalgarnos {
    distanceToGene
    _id
    leftEndPosition
    note
    rightEndPosition
    sequence
  }`

export const fragment_GROWTHCONDITIONS = gql`fragment GROWTHCONDITIONS on GrowthConditions {
    citations {
      ...CITATIONS
    }
    controlCondition
    effect
    experimentalCondition
    _id
  }`

export const query_GET_GENE_BY = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
${fragment_ExternalCrossReferences}
${fragment_PRODUCTS}
${fragment_Regulation}
${fragment_GENE}
${fragment_SHINEDALGARNOS}
${fragment_GROWTHCONDITIONS}

query GetGeneInfo(
    $advancedSearch: String
    $fullMatchOnly: Boolean = false
    $limit: Int
    $organismName: String
    $page: Int = 0
    $properties: [String]
    $search: String
  ) {
    getGenesBy(
      advancedSearch: $advancedSearch
      fullMatchOnly: $fullMatchOnly
      limit: $limit
      organismName: $organismName
      page: $page
      properties: $properties
      search: $search
    ) {
      data {
        _id
        schemaVersion
        organism {
          _id
          name
        }
        allCitations {
          ...CITATIONS
        }
        gene {
          ...GENE
        }
        shineDalgarnos {
          ...SHINEDALGARNOS
        }
        growthConditions {
          ...GROWTHCONDITIONS
        }
        products {
          ...PRODUCTS
        }
        regulation {
          ...REGULATION
        }
      }
      pagination {
        ...PAGINATION
      }
    }
  }`

  export const query_getMainGeneBySearch = gql`
  query getGeneById($search: String!) {
    getGenesBy(search: $search) {
      data {
        _id
        gene {
          _id
          name
        }
        regulation {
          operon {
            _id
            name
          }
          regulators {
            _id
            name
          }
        }
        products {
          _id
          name
          geneOntologyTerms {
            cellularComponent {
              _id
              name
            }
            biologicalProcess {
              _id
              name
            }
            molecularFunction {
              _id
              name
            }
          }
        }
      }
    }
  }
`;
