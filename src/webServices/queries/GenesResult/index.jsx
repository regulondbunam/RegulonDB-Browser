import { useQuery } from  '@apollo/client';
import { query_SEARCH_GENE } from './queries';
import {DataVerifier} from 'ui-components/utils';
import { useEffect } from 'react';

export default function useSearchGene(keyword,onComplete=()=>{}) {
  const {data, loading, error} = useQuery(query_SEARCH_GENE,{
    variables:{
      search: keyword
    }
  });

  let genes
  
  useEffect(() => {
    if (!error && !loading) {
      onComplete({
        nResults: genes?.length ? genes.length : 0,
    })
    }
  }, [loading, error, genes, onComplete])
  

  if (error) {
    console.error("query genesResult Error, search Gene: ",error)
  }
  if (data) {
    if (DataVerifier.isValidArray(data.getGenesBy.data)) {
      genes = data.getGenesBy.data
    }
  }
  return {genes, data, loading, error}
}
