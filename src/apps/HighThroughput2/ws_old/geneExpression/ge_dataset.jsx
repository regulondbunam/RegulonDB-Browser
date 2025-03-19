import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

function query(id_dataset) {
  return gql`
  {
    getGeneExpressionFromSearch(advancedSearch:"'${id_dataset}'[datasetIds]"){
        _id
      }
    }
    `
}

const GetGE = ({
  id_dataset = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query(id_dataset))
  //console.log(id_dataset)
  //console.log(error);
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {
      //console.log(data)
      try {
        if (data.getGeneExpressionFromSearch.length > 0) {
          status('done')
        } else {
          status('no_results')
        }
        
        resoultsData(data?.getGeneExpressionFromSearch)

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

export default GetGE;