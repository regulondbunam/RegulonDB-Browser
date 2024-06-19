import { useQuery, useLazyQuery } from '@apollo/client';
import { query_getOperonBy } from './queries';
import { DataVerifier } from 'ui-components/utils';


export function useGetOperonByID(operonId) {
  const {data, loading, error: queryError} = useQuery(query_getOperonBy,{
    variables: {advancedSearch: operonId+"[_id]"}
  })
  let operon
  let error
  if (data && !queryError) {
    if (DataVerifier.isValidArray(data.getOperonBy.data)) {
      operon = data.getOperonBy.data[0]
    }else{
      error = { type: "error", message: "ERROR: "+operonId+" not found"}
    }
  }
  if (queryError) {
    console.error("query Error",query_getOperonBy);
    error = { type: "error", message: "query error"}
  }
  return { operon: operon, data, loading, error }
}

export function useLazySearchOperon() {
  const [getData, { data, loading, error }] = useLazyQuery(query_getOperonBy);
  const getOperons = (search, onCompleted = () => { }) => {
    getData({
      variables: {
        search: search
      },
      onCompleted: (data) => {
        if (data) {
          if (DataVerifier.isValidArray(data.getOperonBy.data)) {
            onCompleted(data.getOperonBy.data)
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
  let operons
  if (error) {
    console.error("query getOperonsBy:operonResult Error, search Gene: ", error)
  }
  if (data) {
    if (DataVerifier.isValidArray(data.getOperonBy.data)) {
      operons = data.getOperonBy.data
    }
  }
  return [getOperons, { operons, data, loading, error }]
}


/*
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
    if (DataVerifier.isValidArray(data.getGenesBy.data)) {
      genes = data.getGenesBy.data
    }
  }
  return { genes, data, loading, error }
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
  */