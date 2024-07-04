import { useQuery, useLazyQuery } from '@apollo/client';
import { query_getOperonBy, query_getOperonBySearch } from './queries';
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

export function useSearchOperon(keyword, onCompleted = () => { }) {
  const { data, loading, error } = useQuery(query_getOperonBySearch, {
    variables: {
      search: keyword
    },
    onCompleted: () => {
      onCompleted({
        nResults: operons?.length ? operons.length : 0,
        search: keyword,
      })
    }
  });
  let operons
  if (error) {
    console.error("query getOperonsBy:operonResult Error, search Gene: ", error)
  }
  if (data) {
    operons = {};
    if (DataVerifier.isValidArray(data.getOperonBy.data)) {
      operons = data.getOperonBy.data
    }
  }
  return {operons, data, loading, error }
}
