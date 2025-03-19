import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

function query(id_dataset) {
  return gql`
    {
        getAllTSSOfDataset(datasetId: "${id_dataset}") {
          _id
          chromosome
          leftEndPosition
          rightEndPosition
          pos_1
          strand
          closestGenes {
            _id
            name
            distanceTo
          }
          promoter {
            _id
            name
            strand
            pos1
            sigma
            confidenceLevel
          }
          datasetIds
        }
      }
    `
}

const GetTSS = ({
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
        if (data.getAllTSSOfDataset.length > 0) {
          status('done')
        } else {
          status('no_results')
        }
        resoultsData(data?.getAllTSSOfDataset)

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

export default GetTSS;