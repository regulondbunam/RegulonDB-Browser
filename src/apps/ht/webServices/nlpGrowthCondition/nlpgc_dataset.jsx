import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

function query(id_dataset) {
  return gql`
  fragment NLPGC on nlpGCProperties {
    value
    score
    associatedPhrase
    nameField
  }
  {
    getNLPGrowthConditionById(datasetId: "${id_dataset}") {
      _id
      organism {
        ...NLPGC
      }
      geneticBackground {
        ...NLPGC
      }
      medium {
        ...NLPGC
      }
      aeration {
        ...NLPGC
      }
      temperature {
        ...NLPGC
      }
      ph {
        ...NLPGC
      }
      pressure {
        ...NLPGC
      }
      opticalDensity {
        ...NLPGC
      }
      growthPhase {
        ...NLPGC
      }
      growthRate {
        ...NLPGC
      }
      vesselType {
        ...NLPGC
      }
      agitationSpeed {
        ...NLPGC
      }
      mediumSupplements {
        ...NLPGC
      }
      additionalProperties {
        name
        value {
          ...NLPGC
        }
      }
      datasetIds
      temporalId
    }
  }
  
    `
}

const GetNLPGC = ({
  id_dataset = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query(id_dataset))
  //console.log(id_dataset)
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {
      try {
        //console.log(data.getNLPGrowthConditionById);
        if(data.getNLPGrowthConditionById){
          if (data.getNLPGrowthConditionById.length > 0) {
            status('done')
          } else {
            status('no_results')
          }
        }else {
          status('no_results')
        }

        resoultsData(data?.getNLPGrowthConditionById)

      } catch (error) {
        resoultsData(undefined)
        status('error')
        console.error(error)
      }
    }
    if (error) {
      resoultsData(undefined)
      status('error')
      console.error(error)
    }

  }, [loading, error, status, data, resoultsData, id_dataset]);
  return (<></>);
}

export default GetNLPGC;