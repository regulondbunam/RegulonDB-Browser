import { useQuery } from "@apollo/client";
import { DataVerifier } from "ui-components/utils";
import { query_getSigmulonMainDataBySearch } from "./queries";

export function useSearchSigmulon(keyword, onCompleted = () => { }) {
    const { data, loading, error } = useQuery(query_getSigmulonMainDataBySearch, {
      variables: {
        search: keyword
      },
      onCompleted: () => {
        onCompleted({
          nResults: sigmulons?.length ? sigmulons.length : 0,
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