import { useQuery, useLazyQuery } from "@apollo/client";
import { DataVerifier } from "../../ui-components";
import { query_GET_DATA_FILE } from "./queries";

export function useGetDataFile(fileName) {
  const { data, loading, error } = useQuery(query_GET_DATA_FILE, {
    variables: { fileName: fileName },
  });

  let fileData;

  try {
    if (data) {
      if (DataVerifier.isValidObject(data.getDataOfFile)) {
        fileData = data.getDataOfFile;
      } else {
        fileData = null;
      }
    }
  } catch (error) {
    console.error("assign fileData value:", error);
    console.log("query getDataOfFile", query_GET_DATA_FILE);
  }
  if (error) {
    console.error("query getDataOfFile:", error);
    console.log("query getDataOfFile", query_GET_DATA_FILE);
  }

  return { fileData, loading, error };
}

export function useLazyGetDataFile() {
  const [getFile, { loading }] = useLazyQuery(query_GET_DATA_FILE);

  return [getFile, { loading }];
}
