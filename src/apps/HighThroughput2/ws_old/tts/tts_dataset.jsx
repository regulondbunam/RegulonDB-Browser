import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

function query(id_dataset) {
  return gql`
    {
      getAllTTSOfDataset(datasetId: "${id_dataset}") {
        _id
        chromosome
        leftEndPosition
        rightEndPosition
        name
        strand
        closestGenes {
          _id
          name
          distanceTo
        }
        terminator {
          _id
          transcriptionUnits {
            _id
            name
            promoter {
              _id
              name
              sequence
              leftEndPosition
              rightEndPosition
              strand
            }
          }
        }
        datasetIds
        temporalId
      }
    }
    `
}

const GetTTS = ({
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
        if (data.getAllTTSOfDataset.length > 0) {
          status('done')
        } else {
          status('no_results')
        }
        resoultsData(data?.getAllTTSOfDataset)

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

export default GetTTS;