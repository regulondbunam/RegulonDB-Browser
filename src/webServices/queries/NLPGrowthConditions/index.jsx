import { useQuery } from "@apollo/client";
import { query_GETNLPGrowthConditionById } from "./queries";
import { DataVerifier } from "ui-components/utils";

export function useGetNLPGrowthConditionById(datasetId) {
    const { data, loading, error: queryError } = useQuery(query_GETNLPGrowthConditionById, {
        variables: {
            datasetId: datasetId
        }
    })
    let NLPGrowthConditions
    let error
    if (data) {
        if (data.getNLPGrowthConditionById === null) {
            //console.warn("Dataset not found: ", datasetId);
            error = {
                queryError: queryError,
                label: "NLPGrowthCondition search with dataset id: " + datasetId + " not found",
            };
        }
        if (DataVerifier.isValidObjectWith_id(data.getNLPGrowthConditionById)) {
            NLPGrowthConditions = data.getNLPGrowthConditionById
        }
    }
    if (queryError) {
        console.error("Query error: ", query_GETNLPGrowthConditionById);
        error = {
            queryError: queryError,
            label: "error in the query, try again later",
        };
    }

    return {NLPGrowthConditions, data, loading, error}
}