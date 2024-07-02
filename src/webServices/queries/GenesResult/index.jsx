import { useQuery, useLazyQuery } from '@apollo/client';
import { query_SEARCH_GENE, query_GET_GENE_BY, query_getMainGeneBySearch } from './queries';
import { DataVerifier } from 'ui-components/utils';


export function useGetGeneByID(geneId) {
  const {data, loading, error: queryError} = useQuery(query_GET_GENE_BY,{
    variables: {advancedSearch: geneId+"[_id]"}
  })
  let gene
  let error
  if (data && !queryError) {
    if (DataVerifier.isValidArray(data.getGenesBy.data)) {
      gene = data.getGenesBy.data[0]
    }else{
      error = { type: "error", message: "ERROR: "+geneId+" not found"}
    }
  }
  if (queryError) {
    console.error("query Error",query_GET_GENE_BY);
    error = { type: "error", message: "query error"}
  }
  return { gene, data, loading, error }
}

export default function useSearchGene(keyword, onCompleted = () => { }) {
  const { data, loading, error } = useQuery(query_SEARCH_GENE, {
    variables: {
      search: keyword
    },
    onCompleted: () => {
      onCompleted({
        nResults: genes?.length ? genes.length : 0,
      })
    }
  });

  let genes

  if (error) {
    console.error("query genesResult Error, search Gene: ", error)
  }
  if (data) {
    genes = {}
    if (DataVerifier.isValidArray(data.getGenesBy.data)) {
      genes = data.getGenesBy.data
    }
  }
  return { genes, data, loading, error }
}

export function useLazySearchGene() {
  const [getData, { data, loading, error }] = useLazyQuery(query_GET_GENE_BY);
  const getGenes = (search, onCompleted = () => { }) => {
    getData({
      variables: {
        search: search
      },
      onCompleted: (data) => {
        if (data) {
          if (DataVerifier.isValidArray(data.getGenesBy.data)) {
            onCompleted(data.getGenesBy.data)
          }else{
            onCompleted([])
          }
        }
      },
      onError: (error) => {
        console.error("search gene error: ", error);
      }
    })
  }
  let genes
  if (error) {
    console.error("query getGeneBY:genesResult Error, search Gene: ", error)
  }
  if (data) {
    if (DataVerifier.isValidArray(data.getGenesBy.data)) {
      genes = data.getGenesBy.data
    }
  }
  return [getGenes, { genes, data, loading, error }]
}

export function useGetMainGenesBySearch(search) {
  const { data, loading, error } = useQuery(query_getMainGeneBySearch, {
    variables: { search: search },
  });
  let genesData = [];
  try {
    if (data) {
      if (data.getGenesBy.data) {
        genesData = data.getGenesBy.data;
      }
    }
  } catch (error) {
    console.error("assign geneData value:", error);
    console.log("query getGeneBySearch", query_getMainGeneBySearch);
  }
  if (error) {
    console.error("query getGeneBy: ", error);
    console.log("query getGeneBySearch", query_getMainGeneBySearch);
  }
  return { genesData, loading, error };
}