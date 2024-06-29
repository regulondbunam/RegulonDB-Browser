import React, { useId, useReducer } from 'react'
import Style from "./filterTable.module.css"
import Thead from './Thead';
import Tbody from './Tbody';
import Pagination from './Pagination';
import { REDUCER_TYPES, FILTER, getCellValue } from './static';
import { DataVerifier } from 'ui-components/utils';
import Options from './Options';
import { deleteFilter } from './Thead/Options/filters/deleteFilter';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

export function textFilter(filterValue, row, columnKey) {
  const cellValue = getCellValue(row, columnKey)
  if (cellValue) {
      return cellValue.toLowerCase().includes(filterValue.toLowerCase())
  }
  return false
}

function reducer(state, action) {
  switch (action.type) {
    case REDUCER_TYPES.columnWidth:
      let columns = [...state.columns]
      columns[action.columnIndex] = {
        ...columns[action.columnIndex],
        width: action.value,
      }
      return { ...state, columns: columns }
    case REDUCER_TYPES.setItems:
      if (DataVerifier.isValidNumber(action.value) && action.value > 0) {
        return { ...state, items: action.value, totalPages: Math.ceil(state.nRows / action.value) - 1 }
      }
      return state
    case REDUCER_TYPES.firstPage:
      return { ...state, page: 0 }
    case REDUCER_TYPES.nextPage:
      if (state.page < state.totalPages) {
        return { ...state, page: state.page + 1 }
      }
      return state
    case REDUCER_TYPES.prevPage:
      if (state.page > 0) {
        return { ...state, page: state.page - 1 }
      }
      return state
    case REDUCER_TYPES.lastPage:
      return { ...state, page: state.totalPages }
    case REDUCER_TYPES.hideColumn: {
      let columns = [...state.columns]
      columns[action.columnIndex] = {
        ...columns[action.columnIndex],
        hide: action.value,
      }
      return { ...state, columns: columns }
    }
    case REDUCER_TYPES.updateData:
      return { ...state, currentData: action.newData, nRows: action.newData.length, totalPages: Math.ceil(action.newData.length / state.items) - 1, }
    case REDUCER_TYPES.deleteFilter: {
      let columns = [...state.columns]
      if (action.filter.type === FILTER.TYPES.ONLY_CONTENT) {
        columns[action.columnIndex] = {
          ...columns[action.columnIndex],
          isOnlyContent: false,
        }
      }
      const { newFilters, newData } = deleteFilter(action.filter, state)
      return { ...state, columns: columns, currentData: [...newData], filters: newFilters, nRows: newData.length, totalPages: Math.ceil(newData.length / state.items) - 1, }
    }
    case REDUCER_TYPES.setFilter: {
      let columns = [...state.columns]
      if (action.newFilter.type === FILTER.TYPES.ONLY_CONTENT) {
        columns[action.columnIndex] = {
          ...columns[action.columnIndex],
          isOnlyContent: action.isOnlyContent,
        }
      }
      let newFilters = [...state.filters, action.newFilter]
      return { ...state, columns: columns, currentData: [...action.newData], filters: newFilters, nRows: action.newData.length, totalPages: Math.ceil(action.newData.length / state.items) - 1, page: 0, }

    }
    case "reset":
      return { ...action.newState }
    default:
      return state
  }
}

function initialState({ columns = [], data = [], tableId, idContainer, items = 10 }) {
  let newColumns = [];
  let currentData = [];
  let mapData = {};
  let filters = []
  let headerHeight = 26
  if (data.length < 10) {
    items = data.length + 1
  }

  if (DataVerifier.isValidString(idContainer)) {
    const container = document.getElementById(idContainer)
    if (container) {
      items = Math.ceil(container.clientHeight / 50)
    }
  }
  columns.forEach((column, index) => {
    const key = column?.key ? column.key : column.label
    if(column?.setFilter){
      filters.push({
        columnKey: key,
        columnLabel: column.label,
        index: filters.length,
        logicConnector: "OR",
        type: 0,
        value: column.setFilter
      })
    }
    if (column?.height) {
      headerHeight = column?.height>headerHeight ? column?.height : headerHeight
    }
    newColumns.push({
      id: "column_" + index + "_" + tableId,
      key: key,
      width: 100,
      hide: false,
      isOnlyContent: false,
      filterType: FILTER.TYPES.TEXT,
      options: true,
      ...column
    })
  });
  data.forEach((row, index) => {
    const key = "rowKey_" + index + "_" + tableId
    let newRow = { ...row }
    newRow["_properties" + tableId] = {
      id: "row_" + index + "_" + tableId,
      key: key,
      height: 30,
      onMouseEnter: () => { },
      onMouseLeave: () => { },
      ...row?._properties
    }
    mapData[key] = newRow
    if(filters.length>0){
      filters.forEach(filter => {
      if(textFilter(filter.value,newRow,filter.columnKey)){
        currentData.push(newRow)
      }
    });
    }else{
      currentData.push(newRow)
    }
  });

  return {
    tableId: tableId,
    columns: newColumns,
    data: mapData,
    currentData: currentData,
    nRows: data.length,
    //Pagination
    page: 0,
    items: items,
    totalPages: Math.ceil(data.length / items) - 1,
    //filter
    filters: filters,
    headerHeight: headerHeight
  }
}



export default function FilterTable({
  columns,
  data,
  idContainer,
  tableName = "Table",
  titleVariant = "h2",
  selection = "cell",
  items = 10
}) {

  const tableId = useId()
  const [state, dispatch] = useReducer(reducer, { columns, data, tableId, idContainer, items }, initialState)

  //console.log(state);

  useEffect(() => {
    dispatch({ type: "reset", newState: initialState({ columns, data, tableId, idContainer, items }) })
  }, [columns, data, tableId, idContainer, items])

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
        <div>
          <Typography variant={titleVariant} >{tableName}</Typography>
        </div>
        <Options state={state} dispatch={dispatch} tableName={tableName} tableId={tableId} />
      </div>
      <div style={{ height: ((state.items * 39)+state.headerHeight) + "px", maxHeight: "70vh", overflow: "auto", position: "relative" }}>
        <div style={{ position: "absolute" }} >
          <table className={Style.table}>
            <Thead state={state} dispatch={dispatch} tableId={tableId} />
            <Tbody state={state} dispatch={dispatch} tableId={tableId} selection={selection} />
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }} >
        <Pagination state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}
