import { useQuery, useLazyQuery } from "@apollo/client";
import { query_GET_DATASET_BY_ID, query_GET_DATASET_BY_ADVANCE_SEARCH, query_GETALLNPC, query_GET_GENE_EXPRESSION_BY_ADVANCE_SEARCH } from "./queries";
import { DataVerifier } from "ui-components/utils";

export function useGetNLPGC(){
  const {
    data,
    loading,
    error: queryError,
  } = useQuery(query_GETALLNPC, {
    variables: {
      advancedSearch: "GC[_id]",
    },
  });
  let nlgc;
  if (data && !queryError) {
    if (DataVerifier.isValidArray(data.getNLPGrowthConditionBySearch)) {
      nlgc = data.getNLPGrowthConditionBySearch
    }
  }
  return { nlgc, data, loading, error: queryError };
}

export function useGetDatasetByAdvancedSearch(advancedSearch) {
  const {
    data,
    loading,
    error: queryError,
  } = useQuery(query_GET_DATASET_BY_ADVANCE_SEARCH, {
    variables: {
      advancedSearch: advancedSearch,
    },
  });
  let error;
  let datasets;

  if (data) {
    if (DataVerifier.isValidArray(data.getDatasetsFromSearch)) {
      datasets = data.getDatasetsFromSearch;
    }
  }

  if (queryError) {
    console.error("Query error: ", query_GET_DATASET_BY_ADVANCE_SEARCH);
    error = {
      queryError: queryError,
      label: "error in the query, try again later",
    };
  }

  return { datasets, data, loading, error };
}

export function useGetDatasetByID(datasetId) {
  const {
    data,
    loading,
    error: queryError,
  } = useQuery(query_GET_DATASET_BY_ID, {
    variables: {
      datasetId: datasetId,
    },
  });
  let error;
  let dataset;

  if (data) {
    if (data.getDatasetByID === null) {
      console.warn("Dataset not found: ", datasetId);
      error = {
        queryError: queryError,
        label: "Dataset with id: " + datasetId + " not found",
      };
    }
    if (DataVerifier.isValidObject(data.getDatasetByID)) {
      dataset = data.getDatasetByID;
    }
  }

  if (queryError) {
    console.error("Query error: ", query_GET_DATASET_BY_ID);
    error = {
      queryError: queryError,
      label: "error in the query, try again later",
    };
  }

  return { dataset, data, loading, error };
}

export function useLazyGetGeneExpressionByAdvancedSearch(){
  const [getData, {data, loading, error}] = useLazyQuery(query_GET_GENE_EXPRESSION_BY_ADVANCE_SEARCH)
  let geneExpression

  if (data) {
    if (DataVerifier.isValidArray(data?.getGeneExpressionFromSearch)) {
      geneExpression = data.geneExpression
    }
  }
  if (error) {
    console.error("query get geneExpression:",error,query_GET_GENE_EXPRESSION_BY_ADVANCE_SEARCH);
  }
  return [getData, {geneExpression, loading, error}]
}


export function useGetGeneExpressionByAdvancedSearch(advancedSearch){
  const {data, loading, error} = useQuery(query_GET_GENE_EXPRESSION_BY_ADVANCE_SEARCH,{
    variables:{
      advancedSearch: advancedSearch
    }
  })
  let geneExpression
  if (data) {
    if (DataVerifier.isValidArray(data?.getGeneExpressionFromSearch)) {
      geneExpression = data.getGeneExpressionFromSearch
    }
  }
  if (error) {
    console.error("query get geneExpression:",error,query_GET_GENE_EXPRESSION_BY_ADVANCE_SEARCH);
  }
  return {geneExpression, loading, error}
}