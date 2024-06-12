import { useQuery } from "@apollo/client";
import { query_GET_OPERON_BY } from "./queries"

export function useGetOperonByID({
    _id,
}) {
    const { data, loading, error } = useQuery(query_GET_OPERON_BY, {
        variables: { advancedSearch: `${_id}[_id]`, limit: 1 }
    })
    let operonData
    try {
        if (data) {
            if(data.getOperonBy.data[0]){
              operonData = data.getOperonBy.data[0]  
            }else{
                operonData = null
            }
        }
    } catch (error) {
        console.error("assign operonData value:", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    if (error) {
        console.error("query getOperonBy: ", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    return { operonData, loading, error, getOperonBy: data?.getOperonBy }
}

export function useGetOperonByTuId({
    _tuId,
}) {
    const { data, loading, error } = useQuery(query_GET_OPERON_BY, {
        variables: { advancedSearch: `${_tuId}[transcriptionUnits._id]`, limit: 1 }
    })
    let operonData
    try {
        if (data) {
            if(data.getOperonBy.data[0]){
              operonData = data.getOperonBy.data[0]  
            }else{
                operonData = null
            }
        }
    } catch (error) {
        console.error("assign operonData value:", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    if (error) {
        console.error("query getOperonBy: ", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    return { operonData, loading, error, getOperonBy: data?.getOperonBy }
}

export function useGetOperonBySearch({
    search
}) {
    const { data, loading, error } = useQuery(query_GET_OPERON_BY, {
        variables: { search: search }
    })
    let operonsData
    try {
        if (data) {
            if(data.getOperonBy.data){
              operonsData = data.getOperonBy.data  
            }else{
                operonsData = null
            }
        }
    } catch (error) {
        console.error("assign operonData value:", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    if (error) {
        console.error("query getOperonBy: ", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    return { operonsData, loading, error, getOperonBy: data?.getOperonBy }
}

export function useGetOperonByAdvancedSearch({
    advancedSearch
}) {
    const { data, loading, error } = useQuery(query_GET_OPERON_BY, {
        variables: { advancedSearch: advancedSearch }
    })
    let operonsData
    try {
        if (data) {
            if(data.getOperonBy.data){
              operonsData = data.getOperonBy.data  
            }else{
                operonsData = null
            }
        }
    } catch (error) {
        console.error("assign operonData value:", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    if (error) {
        console.error("query getOperonBy: ", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    return { operonsData, loading, error, getOperonBy: data?.getOperonBy }
}