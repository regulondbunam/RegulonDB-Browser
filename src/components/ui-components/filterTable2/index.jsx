import React, { useId, useReducer } from 'react'
import Style from "./filterTable.module.css"
import Thead from './Thead';
import Tbody from './Tbody';
import Pagination from './Pagination';
import { REDUCER_TYPES, FILTER, getCellValue } from './static';
import DataVerifier from '../utils';
import Options from './Options';
import { deleteFilter } from './Thead/Options/filters/deleteFilter';
import { Typography } from '@mui/material';



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
      const { newFilters, newData } = deleteFilter(action.filter,state)
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
    default:
      return state
  }
}

function textFilter(filterValue, row, columnLabel) {
  const cellValue = getCellValue(row, columnLabel)
  if (cellValue) {
      return cellValue.toLowerCase().includes(filterValue.toLowerCase())
  }
  return false
}

function initialState(columns = [], data = [], tableId) {
  let newColumns = [];
  let currentData = [];
  let mapData = {};
  let filters = []
  columns.forEach((column, index) => {
    if (column?.setFilter) {
      filters.push({
        columnLabel:column.label,
        index:filters.length,
        key:`type_${filters.length}_Strategy_${filters.length}`,
        logicConnector:"OR",
        type:0,
        value:column.setFilter
      })
    }
    newColumns.push({
      id: "column_" + index + "_" + tableId,
      key: "columnKey_" + index + "_" + tableId,
      width: 100,
      hide: false,
      isOnlyContent: false,
      filterType: FILTER.TYPES.TEXT,
      ...column
    })
  });
  data.forEach((row, index) => {
    let newRow = { ...row }
    newRow["_properties" + tableId] = {
      id: "row_" + index + "_" + tableId,
      key: "rowKey_" + index + "_" + tableId,
      height: 30,
      ...row?._properties
    }
    mapData["rowKey_" + index + "_" + tableId] = newRow
    if(filters.length>0){
      filters.forEach(filter => {
      if(textFilter(filter.value,newRow,filter.columnLabel)){
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
    items: 10,
    totalPages: Math.ceil(data.length / 10) - 1,
    //filter
    filters: filters
  }
}

export default function FilterTable({ columns, data, tableName = "Table", titleVariant = "h2" }) {

  const tableId = useId()
  const [state, dispatch] = useReducer(reducer, initialState(columns, data, tableId))

  console.log(state);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
        <div>
          <Typography variant={titleVariant} >{tableName}</Typography>
        </div>
        <Options state={state} dispatch={dispatch} tableName={tableName} tableId={tableId} />
      </div>
      <div style={{ width: "99vw", height: (state.items * 39) + "px", maxHeight: "70vh", overflow: "auto", position: "relative" }}>
        <div style={{ position: "absolute" }} >
          <table className={Style.table}>
            <Thead state={state} dispatch={dispatch} tableId={tableId} />
            <Tbody state={state} dispatch={dispatch} tableId={tableId} />
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }} >
        <Pagination state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}
