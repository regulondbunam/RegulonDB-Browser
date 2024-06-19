import { useQuery, gql } from "@apollo/client";
import { getGenesIds } from "./queries";
import collectIds from "./collectorIds";

function getQuery(IDObjectRDB){
    const options = {variables: {
        advancedSearch: IDObjectRDB.completeId+"[_id]"
    }}
    switch (IDObjectRDB.objectType) {
        case "GN":
            return {query: getGenesIds, options: options}
        default:
            return {query: gql``, options: options}
    }
}

function useGetRelatedObjectsByID(IDObjectRDB) {
    const queryData = getQuery(IDObjectRDB)
    const{data,loading, error} = useQuery(queryData.query,{...queryData.options})
    let ids
    if (data) {
        ids = collectIds(data,[IDObjectRDB.completeId])
    }
    if (error) {
        console.error("get RelatedIs of "+IDObjectRDB.completeId+" ",error);
    }
    return {ids,loading}
}

export {useGetRelatedObjectsByID, collectIds}