import { useQuery } from "@apollo/client";
import { query_getAuthorsDataOfDataset } from "./queries";
import { DataVerifier } from "ui-components/utils";

export function useGetAuthorDataOfDataset(datasetId){
    const {data, loading, error} = useQuery(query_getAuthorsDataOfDataset,{
        variables:{
            datasetId: datasetId
        }
    })
    let authorData
    if (data && !error) {
        if(DataVerifier.isValidArray(data.getAuthorsDataOfDataset)){
            authorData = data.getAuthorsDataOfDataset
        }
    }
    return {authorData, data, loading, error}
}