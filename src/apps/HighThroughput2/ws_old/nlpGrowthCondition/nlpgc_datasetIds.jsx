import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

function query(keyword) {
  return gql`
  {
    getNLPGrowthConditionBySearch(advancedSearch: "${keyword}"){
      datasetIds
    }
  }
  
    `
}

const NLPGCgetdatasetIds = ({
  keyword = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query(keyword))
  //console.log(keyword)
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {
      try {
        //console.log(data);
        if(data.getNLPGrowthConditionBySearch){
          if (data.getNLPGrowthConditionBySearch.length > 0) {
            status('done')
          } else {
            status('no_results')
          }
        }else {
          status('no_results')
        }

        resoultsData(data?.getNLPGrowthConditionBySearch)

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

  }, [loading, error, status, data, resoultsData, keyword]);
  return (<></>);
}

export default NLPGCgetdatasetIds;