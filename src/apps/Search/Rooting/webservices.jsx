import { gql, useLazyQuery } from "@apollo/client";
import { collectIds } from "ui-components/Web/Related";
import { DataVerifier } from "ui-components/utils";
import { OBJECTS } from "../static"

const query_getSearchObjects = gql`query GetSearchObjects($search: String) {
  getGenesBy(search: $search) {
    data {
      _id
    }
  }
  getOperonBy(search: $search) {
    data {
      _id
    }
  }
  getSigmulonBy(search: $search) {
    data {
      _id
    }
  }
  getRegulonBy(search: $search) {
    data {
      _id
    }
  }
  getGUsBy(search: $search) {
    data {
      _id
    }
  }
}`

export function useSearchKeywordInDatamart(keyword) {
    const [getData, { data, loading, error }] = useLazyQuery(query_getSearchObjects, {
        variables: {
            search: keyword
        }
    })
    let objectsFound
    if (error) {
        console.log("useSearchKeywordInDatamart ERROR:", error);
    }
    if (data && !error) {
        objectsFound = {}
        if (data?.getGenesBy) {
            if (DataVerifier.isValidArray(data.getGenesBy?.data)) {
                objectsFound[OBJECTS.gene] = {
                    ids: collectIds(data.getGenesBy.data),
                    total: data.getGenesBy.data.length
                }
            } else {
                objectsFound[OBJECTS.gene] = null
            }
        }
        if (data?.getOperonBy) {
            if (DataVerifier.isValidArray(data.getOperonBy?.data)) {
                objectsFound[OBJECTS.operon] = {
                    ids: collectIds(data.getOperonBy.data),
                    total: data.getOperonBy.data.length
                }
            } else {
                objectsFound[OBJECTS.operon] = null
            }
        }
        if (data?.getSigmulonBy) {
            if (DataVerifier.isValidArray(data.getSigmulonBy?.data)) {
                objectsFound[OBJECTS.sigmulon] = {
                    ids: collectIds(data.getSigmulonBy.data),
                    total: data.getSigmulonBy.data.length
                }
            } else {
                objectsFound[OBJECTS.sigmulon] = null
            }
        }
        if (data?.getRegulonBy) {
            if (DataVerifier.isValidArray(data.getRegulonBy?.data)) {
                objectsFound[OBJECTS.regulon] = {
                    ids: collectIds(data.getRegulonBy.data),
                    total: data.getRegulonBy.data.length
                }
            } else {
                objectsFound[OBJECTS.regulon] = null
            }
        }
        if (data?.getGUsBy) {
            if (DataVerifier.isValidArray(data.getGUsBy?.data)) {
                objectsFound[OBJECTS.gu] = {
                    ids: collectIds(data.getGUsBy.data),
                    total: data.getGUsBy.data.length
                }
            } else {
                objectsFound[OBJECTS.gu] = null
            }
        }
    }
    return [getData, { objectsFound, loading }]
}
