import { REDUCER_TYPES, FILTER, getCellValue } from "../../../static"
import { updateDataFilter } from "./updateDataFilters"

export function onlyContentFilter(row,columnLabel){
    return getCellValue(row, columnLabel)
}

export function setOnlyContent(columnLabel,columnOnlyContent,columnIndex,state,dispatch) {
    const index = state.filters.length
    const filterKey = "type_"+FILTER.TYPES.ONLY_CONTENT+"_"+columnLabel
    if (columnOnlyContent === false) {
        const newFilter = {
            columnLabel: columnLabel,
            key: filterKey,
            type: FILTER.TYPES.ONLY_CONTENT,
            index: index,
            logicConnector: "OR",
            value: columnOnlyContent,
        }
        let newData = updateDataFilter(state.data,[...state.filters, newFilter])
        dispatch({
            type: REDUCER_TYPES.setFilter,
            newData: newData,
            newFilter: newFilter,
            columnIndex: columnIndex,
            isOnlyContent: true
        })
    } else {
        const filter = state.filters.find(f=>f.key===filterKey)
        dispatch({
            type: REDUCER_TYPES.deleteFilter,
            filter: filter,
            columnIndex: columnIndex,
            isOnlyContent: false
        })
        //deleteFilter(filterKey)
    }


}