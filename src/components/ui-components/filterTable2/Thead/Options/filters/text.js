import DataVerifier from "../../../../utils"
import { getCellValue, REDUCER_TYPES, FILTER } from "../../../static"
import { updateDataFilter } from "./updateDataFilters"

export function textFilter(filterValue, row, columnLabel) {
    const cellValue = getCellValue(row, columnLabel)
    if (cellValue) {
        return cellValue.toLowerCase().includes(filterValue.toLowerCase())
    }
    return false
}

export function setTextFilter(value,columnLabel,state,dispatch,logicConnector){
    const index = state.filters.length
    const filterKey = "type_"+FILTER.TYPES.TEXT+"_"+columnLabel+"_"+index
    if (DataVerifier.isValidString(value)) {
        const newFilter = {
            columnLabel: columnLabel,
            key: filterKey,
            type: FILTER.TYPES.TEXT,
            index: index,
            logicConnector: "OR",
            value: value,
        }
        let newData = updateDataFilter(state.data,[...state.filters, newFilter])
        dispatch({
            type: REDUCER_TYPES.setFilter,
            newData: newData,
            newFilter: newFilter
        })
    }
}

export function deleteTextFilter(filterKey,state,dispatch) {
    const filter = state.filters.find(f=>f.key===filterKey)
        dispatch({
            type: REDUCER_TYPES.deleteFilter,
            filter: filter,
        })
}