import { useQuery, useLazyQuery } from  '@apollo/client';
import { query_SEARCH_GENE, query_GET_GENE_BY } from './queries';
import {DataVerifier} from 'ui-components/utils';

export default function useSearchGene(keyword,onCompleted=()=>{}) {
  const {data, loading, error} = useQuery(query_SEARCH_GENE,{
    variables:{
      search: keyword
    },
    onCompleted: ()=>{
      onCompleted({
        nResults: genes?.length ? genes.length : 0,
    })
    }
  });

  let genes
  
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

export function useLazySearchGene() {
  const [getData, {data, loading, error}] = useLazyQuery(query_GET_GENE_BY);
  let genes
  if (error) {
    console.error("query getGeneBY:genesResult Error, search Gene: ",error)
  }
  if (data) {
    if (DataVerifier.isValidArray(data.getGenesBy.data)) {
      genes = data.getGenesBy.data
    }
  }
  return [getData, {genes, data, loading, error}]
}