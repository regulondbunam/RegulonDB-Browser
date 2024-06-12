import { gql } from "@apollo/client"

const fragment_detailed = `
fragment detailed on detailedStatistics {
    confirmed
    strong
    total
    weak
    withoutEvidences
  }
`
const fragment_detailedExtern = `
fragment detailedExtern on dbInfoExternalReferencesType{
    total
    origin{
      expasy
      genbank
      geneprotec
      medline
      ouMicroArray
      pdb
      pir
      swissprot     
      }
  }
`

const fragment_product = `
fragment product on productsDBInfoType{
    polypeptides{
      ...detailed
    } 
    rnas{
      ...detailed
    }
   srna{
    ...detailed
   }
  }
`

const fragment_regulons = `
fragment regulons on dbInfoRegulons{
    complexRegulons{
      ...detailed
    } 
    simpleRegulons{
      ...detailed
    }
   total
  }
`

export const query_getSummaryHistoryData = gql`
${fragment_detailed}
${fragment_detailedExtern}
${fragment_product}
${fragment_regulons}
  query getSummaryHistoryData{
    getDatabaseInfo{
      releaseDate
      route
      regulonDBVersion
      ecocycVersion
      lcVersion
      note
      statistics{
        attenuators{
          ...detailed
        }
        effectors{
          ...detailed
        } 
        externalReferences{
          ...detailedExtern
        }
        functConfTF{
          ...detailed
        }
        functionalClasses{
          ...detailed
        }
        genes{
          ...detailed
        }
        gensorUnits{
          ...detailed
        }
        operon{
          ...detailed
        }
        product{
          ...product
        }
        promoters{
          ...detailed
        }
        regulatorBindingSites{
          ...detailed
        }
        regulatoryInteractions{
          ...detailed
        }
        regulons{
          ...regulons
        }
        riboswitches{
          ...detailed
        }
        shineDalgarnos{
          ...detailed
        }
        srnaInteractions{
          ...detailed
        }
        synonyms{
          ...detailed
        }
        terminators{
          ...detailed
        }
        transcriptionFactors{
          ...detailed
        }
        transcriptionUnits{
          ...detailed
        }
      }
    }
  }
`