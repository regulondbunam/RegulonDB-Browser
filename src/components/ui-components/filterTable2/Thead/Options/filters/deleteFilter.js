import { updateDataFilter } from "./updateDataFilters";

export function deleteFilter(filter={},state) {
    let filters = [...state.filters]
    let filterIndex = state.filters.findIndex(f=>f.key===filter.key)
    if (filter===-1) {
        console.warn("filter no found");
        return { newFilters: state.filters, newData: state.currentData }
    }
    filters.splice(filterIndex,1)
    const newData = updateDataFilter(state.data,filters)
    return { newFilters: filters, newData: newData }
}
