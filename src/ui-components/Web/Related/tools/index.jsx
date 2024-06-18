import { useLazyQuery } from "@apollo/client";
import IDObjectRDB from "ui-components/utils/IDParser";
import { getGenesIds } from "./queries";
import { useState } from "react";

export function useGetRelatedObjectsByID(regulonDB_id) {
    const{data,loading, error} = useLazyQuery()
    const [RDBid, setRDBid] = useState()
    let RBD_id
    try {
        RBD_id = new IDObjectRDB(regulonDB_id)
    } catch (error) {
        console.error(error);
        return null
    }
    let query
    switch (RBD_id.objectType) {
        case "GN":
            query = getGenesIds
            break;
        default:
            query = ""
            break;
    }
    
}