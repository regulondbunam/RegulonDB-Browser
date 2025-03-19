//import DataVerifier from "../../../../utils";
import DataVerifier from "../../../../utils";
import { FILTER } from "../../../static"
import { onlyContentFilter } from "./onlyContent"
import { textFilter } from "./text";

export function updateDataFilter(data, filters = []) {
    
    if (!DataVerifier.isValidArray(filters)) {
        return  Object.keys(data).map(rowKey=>data[rowKey])
    }
    let rowsKey = new Set()
    filters.forEach(filter=>{
        let rowsKeyFilter = new Set()
        Object.keys(data).forEach(rowKey => {
            const row = data[rowKey]
            switch (filter.type) {
                case FILTER.TYPES.ONLY_CONTENT:
                    if (onlyContentFilter(row, filter.columnLabel)) {
                        rowsKeyFilter.add(rowKey)
                    }
                    break;
                case FILTER.TYPES.TEXT:
                    if (textFilter(filter.value, row, filter.columnLabel)) {
                        rowsKeyFilter.add(rowKey)
                    }
                    break;
                case FILTER.TYPES.SECTION:
    
                    break;
                case FILTER.TYPES.NUMBER:
    
                    break;
                default:
                    break;
            }
        })
        rowsKey = new Set([...rowsKey, ...rowsKeyFilter])
    })

    return [...rowsKey].map(rowKey=>data[rowKey])
}

/*
{
        columnLabel: action.columnLabel,
        key: action.filterKey,
        type: action.filterType,
        index: action.filterIndex,
        logicConnector: action.filterLogicConnector ? action.filterLogicConnector : "OR",
        value: action.value,
      }

*/