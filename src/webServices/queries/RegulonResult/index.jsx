import { useQuery } from "@apollo/client";
import { query_GetRegulonBy } from "./queries";
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