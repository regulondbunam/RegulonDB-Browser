import { gql, useQuery } from "@apollo/client";
import { DataVerifier } from "../../../components/ui-components";

const query = gql`query GetAuthorsDataOfDataset($datasetId: String) {
  getAuthorsDataOfDataset(datasetId: $datasetId) {
    _id
    authorsData
    datasetIds
  }
}`;

export default function useGetAuthorDataByDatasetId(datasetId) {
    const {data, loading, error} = useQuery(query,{
        variables:{
            datasetId: datasetId
        }
    })
    if (error) {
        console.error("error get Author data by dataset ID: ",error);
    }
    let authorData = data?.getAuthorsDataOfDataset

    if (data) {
        if(DataVerifier.isValidArray(data?.getAuthorsDataOfDataset)){
            authorData = data?.getAuthorsDataOfDataset[0]
        }
    }


    return {authorData, data, error, loading}
}
