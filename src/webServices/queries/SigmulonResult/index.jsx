import { useQuery } from "@apollo/client";
import { DataVerifier } from "ui-components/utils";
import { query_getSigmulonMainDataBySearch, query_getAllSigmulonMainData, query_getSigmulonByAdvancedSearch } from "./queries";

export function useSearchSigmulon(keyword, onCompleted = () => { }) {
    const { data, loading, error } = useQuery(query_getSigmulonMainDataBySearch, {
      variables: {
        search: keyword
      },
      onCompleted: () => {
        onCompleted({
          nResults: sigmulons?.length ? sigmulons.length : 0,
            search: keyword,
        })
      }
    });
    let sigmulons
    if (error) {
      console.error("query_GetRegulonMainDataBySearch Error, search: ", error)
    }
    if (data) {
      sigmulons = {};
      if (DataVerifier.isValidArray(data.getSigmulonBy.data)) {
        sigmulons = data.getSigmulonBy.data
      }
    }
    return {sigmulons, data, loading, error }
  }


  export function useGetAllSigmulonMainDAta(onCompleted = () => { }) {
    const { data, loading, error } = useQuery(query_getAllSigmulonMainData, {
      onCompleted: (data) => {
        onCompleted(data.getAllSigmulon.data)
      }
    });
    let sigmulons
    if (error) {
      console.error("query_GetSigmulonMainData Error, search: ", error)
    }
    if (data) {
      sigmulons = [];
      if (DataVerifier.isValidArray(data.getAllSigmulon.data)) {
        sigmulons = data.getAllSigmulon.data
      }
    }
    return {sigmulons, data, loading, error }
  }

  export function useGetSigmulonDataById(sigmulonId){
    const {data, loading, error} = useQuery(query_getSigmulonByAdvancedSearch,{
      variables: {
        advancedSearch: `${sigmulonId}[_id]`
      }
    })
    const sigmulon = DataVerifier.isValidArray(data?.getSigmulonBy?.data) ? data.getSigmulonBy.data[0] : undefined
    if(error){
      console.error("error useGetSigmulonDataById",error); 
    }

    return {data, loading, error, sigmulon}
  }