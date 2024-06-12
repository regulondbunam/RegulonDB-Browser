import { useQuery } from "@apollo/client";
import { DataVerifier } from "../../ui-components";
import { query_getSigmulonBy, query_getSigmulonBySearch } from "./query";

export function useGetSigmulonBySearch(keyword) {
  const { data, loading, error } = useQuery(query_getSigmulonBySearch, {
    variables: { search: keyword },
  });
  let sigmulonData;
  if (data) {
    try {
      //console.log(data);
      if (DataVerifier.isValidArray(data.getSigmulonBy.data)) {
        sigmulonData = data.getSigmulonBy.data;
      } else {
        sigmulonData = null;
      }
    } catch (error) {
      console.error("assign sigmulonData error");
    }
  }
  if (error) {
    console.error("useQuery query_getSigmulonBySearch Error:", error);
    console.log("query: ", query_getSigmulonBySearch);
  }
  return { sigmulonData, error, loading };
}

export function useGetSigmulonById(sigmulonId) {
  const { data, error, loading } = useQuery(query_getSigmulonBy, {
    variables: {
      advancedSearch: `${sigmulonId}[_id]`,
    },
  });
  let sigmulonData;
  if (data) {
    try {
      //console.log(data);
      if (DataVerifier.isValidArray(data.getSigmulonBy.data)) {
        sigmulonData = data.getSigmulonBy.data[0];
      } else {
        sigmulonData = null;
      }
    } catch (error) {
      console.error("assign sigmulonData error");
    }
  }
  if (error) {
    console.error("useQuery query_getSigmulonBy Error:", error);
    console.log("query: ", query_getSigmulonBy);
  }
  return { sigmulonData, error, loading };
}
