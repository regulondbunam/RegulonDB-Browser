import { QUERY_GetObjectList } from "./queries";
import { useQuery } from "@apollo/client";

export default function useGetObjectList({datamartType, onCompleted=()=>{}}) {
    const { data, loading, error } = useQuery(QUERY_GetObjectList, {
        variables: {
            datamartType: datamartType
        },
        onCompleted: onCompleted,
    })
    let objectsList
    try {
        if (data && !error) {
            objectsList = data.getObjectList ? data.getObjectList  : null
        }
    } catch (error) {
        console.error("assign objectsList value:", error);
        console.log("query getGeneBy", QUERY_GetObjectList);
    }
    if (error) {
        console.error("query getGeneBy: ", error);
        console.log("query getGeneBy", QUERY_GetObjectList);
    }
    return { objectsList, loading, error, getObjectList: data?.getObjectList }
}