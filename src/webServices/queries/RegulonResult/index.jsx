import { useQuery, useLazyQuery } from "@apollo/client";
import { query_GetRegulonBy, query_GetRegulonMainDataBySearch, query_getAllRegulonsSummary } from "./queries";
import { DataVerifier } from "ui-components/utils";


export function useGetRegulonData(id) {
      const { data, error: err, loading } = useQuery(query_GetRegulonBy, {
        variables: {
          advancedSearch: id + "[_id]",
        },
      });
      let regulonData
      if (data) {
        try {
          if (DataVerifier.isValidArray(data.getRegulonBy.data)) {
            //console.log(data);
            regulonData = data.getRegulonBy.data[0];
          } else {
            regulonData = null;
          }
        } catch (error) {
          console.error("assign regulonData error");
        }
      }
      return { regulonData, error: err, loading };
}

export function useSearchRegulon(keyword, onCompleted = () => { }) {
  const { data, loading, error } = useQuery(query_GetRegulonMainDataBySearch, {
    variables: {
      search: keyword
    },
    onCompleted: () => {
      onCompleted({
        nResults: regulons?.length ? regulons.length : 0,
        search: keyword,
      })
    }
  });
  let regulons
  if (error) {
    console.error("query_GetRegulonMainDataBySearch Error, search: ", error)
  }
  if (data) {
    regulons = {};
    if (DataVerifier.isValidArray(data.getRegulonBy.data)) {
      regulons = data.getRegulonBy.data
    }
  }
  return {regulons, data, loading, error }
}

export function useGetAllRegulonsSummary(onCompleted = () => { }) {
  const { data, loading, error } = useQuery(query_getAllRegulonsSummary, {
    onCompleted: (data) => {
      onCompleted(data.getAllRegulon.data)
    }
  });
  let regulons
  if (error) {
    console.error("query_GetRegulonMainDataBySearch Error, search: ", error)
  }
  if (data) {
    regulons = {};
    if (DataVerifier.isValidArray(data.getAllRegulon.data)) {
      regulons = data.getAllRegulon.data
    }
  }
  return {regulons, data, loading, error }
}

export function useLazySearchRegulon() {
  const [getData, { data, loading, error }] = useLazyQuery(query_GetRegulonMainDataBySearch);
  const getRegulons = (search, onCompleted = () => { }) => {
    getData({
      variables: {
        search: search
      },
      onCompleted: (data) => {
        if (data) {
          if (DataVerifier.isValidArray(data.getRegulonBy.data)) {
            onCompleted(data.getRegulonBy.data)
          }else{
            onCompleted([])
          }
        }
      },
      onError: (error) => {
        console.error("search Regulon error: ", error);
      }
    })
  }
  let regulons
  if (error) {
    console.error("query getOperonsBy:operonResult Error, search Regulon: ", error)
  }
  if (data) {
    if (DataVerifier.isValidArray(data.getRegulonBy.data)) {
      regulons = data.getRegulonBy.data
    }
  }
  return [getRegulons, { regulons, data, loading, error }]
}
