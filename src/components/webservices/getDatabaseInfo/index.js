import { useQuery } from "@apollo/client";
import { query_getSummaryHistoryData } from "./queries";

export function useGetReleasesVersions() {
    let {data, error, loading} = useQuery(query_getSummaryHistoryData)
    if (error) {
        console.log(error);
    } 
    let releases = data?.getDatabaseInfo
    return {data, releases, error, loading}
}