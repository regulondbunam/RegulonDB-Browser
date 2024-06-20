import { useQuery, gql } from "@apollo/client";
import { getGenesIds, getOperonIds, getDatasetIds } from "./queries";
import collectIds from "./collectorIds";

const defaultQuery = gql`query GetDatabaseInfo {
  getDatabaseInfo {
    regulonDBVersion
  }
}`

function getQuery(IDObjectRDB) {
    if (!IDObjectRDB) {
        console.warn("IDObjectRDB is undefined");
            return { query: defaultQuery, options: {}, validateError: true }
    }
    const options = {
        variables: {
            advancedSearch: IDObjectRDB.completeId + "[_id]"
        }
    }
    console.log(IDObjectRDB.objectType);
    switch (IDObjectRDB.objectType) {
        case "GN":
            return { query: getGenesIds, options: options, validateError: false }
        case "OP":
            return { query: getOperonIds, options: options, validateError: false }
        case "BSD":
            return { query: getDatasetIds, options: options, validateError: false }
        default:
            console.warn("unknown object Type",IDObjectRDB.objectType);
            return { query: defaultQuery, options: options, validateError: true }
    }
}

function useGetRelatedObjectsByID(IDObjectRDB) {
    const queryData = getQuery(IDObjectRDB)
    const { data, loading, error } = useQuery(queryData.query, { ...queryData.options })
    let ids
    if (data && !queryData.validateError) {
        ids = collectIds(data, [IDObjectRDB.completeId])
    }
    if (error) {
        console.error("get RelatedIs of " + IDObjectRDB.completeId + " ", error);
    }
    return { ids, loading }
}


export { useGetRelatedObjectsByID, collectIds }