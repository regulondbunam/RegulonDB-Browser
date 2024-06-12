import { useQuery } from "@apollo/client";
import { query_getAllGUs, query_getGuById, query_getGuBySearch } from "./queries";
import { DataVerifier } from "../../ui-components";

export function useGetAllGus() {
    const { data, loading, error } = useQuery(query_getAllGUs)
    let gusData = []
    try {
        if (data) {
            if(data.getAllGUs.data){
              gusData = data.getAllGUs.data
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query getGeneBySearch", query_getAllGUs);
    }
    if (error) {
        console.error("query getGeneBy: ", error);
        console.log("query getGeneBySearch", query_getAllGUs);
    }
    return { gusData, loading, error }
}

export function useGetGuBySearch(keyword) {
    const { data, loading, error } = useQuery(query_getGuBySearch,{variables:{search: keyword}})
    let gusData = []
    //console.log(data);
    try {
        if (data) {
            if(DataVerifier.isValidArray(data.getGUsBy.data)){
              gusData = data.getGUsBy.data
            }else{
                gusData = null
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query getGUBySearch", query_getGuBySearch);
    }
    if (error) {
        console.error("query getGUBy: ", error);
        console.log("query getGUBySearch", query_getGuBySearch);
    }
    return { gusData, loading, error }
}

export function useGetGuById(guId) {
    const { data, loading, error } = useQuery(query_getGuById,{variables:{advancedSearch: `${guId}[_id]`}})
    let guData = []
    console.log(data);
    try {
        if (data) {
            if(DataVerifier.isValidArray(data.getGUsBy.data)){
              guData = data.getGUsBy.data[0]
            }else{
                guData = null
            }
        }
    } catch (error) {
        console.error("assign GuData value:", error);
        console.log("query getGUById", query_getGuById);
    }
    if (error) {
        console.error("query getGUBy: ", error);
        console.log("query getGUById", query_getGuById);
    }
    return { guData, loading, error }
}