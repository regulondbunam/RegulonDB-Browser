/** 
 # Component (user guide)

# FilterTable
	
## Description  
	
This component is a flexible and customizable table component for displaying and interacting with data. It provides features like filtering, sorting, and pagination, making it suitable for various data presentation needs.

## Category   
	
Structural 

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
[example:  <FilterTable columns={columns} data={data} /> ]

## Props 

| Attribute     | Type     | Default                         | Description                                           |
| --------------| -------- | ------------------------------- | ----------------------------------------------------- |
| columns       | Array    |                                 | An array of column definitions for the table.        |
| disableOptions| Boolean  | false                           | Indicates whether to disable table options.           |
| data          | Array    |                                 | The data to be displayed in the table.                |
| getItemSize   | Function |                                 | A function to get the item size for pagination.       |
| pagination    | Object   | { pageIndex: 0, pageSize: 20 }` | Pagination configuration object. |
| fileName`     | String   | "tableData"                     | The default file name for data export.               |



## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team: 


# Component (technical guide)

## Component Type 

Visual


## Dependencies
style: This import represents CSS styles specific to the component, and it is imported from a file named "./table.module.css". These styles are likely used to style the table component and its elements.

React: This import represents the core React library, used for building user interfaces in React applications. It is an essential part of any React component.

Options: The Options import represents a React component or module imported from a file named "./options". The specific functionality of this component/module would depend on its implementation but may relate to rendering options or settings related to the table.

Pagination: The Pagination import represents a React component or module imported from a file named "./pagination". Its purpose is likely to provide pagination controls for navigating through the table's data, allowing users to view different pages of data.

## States
	
| Property          | Value   | Description                                       |
| ----------------- | ------- | ------------------------------------------------- |
| columnFilters     | Array   | An array of column filters for the table.        |
| globalFilter      | String  | The global filter value applied to the table.     |
| columnVisibility  | Object  | An object representing the visibility status of table columns. |

| Name        | Description                                                                                                              | Syntax                                            | Additional Notes or References |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------| ------------------------------ |
| useState | A React hook used to manage state within functional components. It allows components to maintain and update local state. | `const [state, setState] = useState(initialState) |                                |


# Functions description

## fuzzyFilter

__Description:__  

This function is a custom filter used for fuzzy text filtering in a table. It ranks items based on how closely they match a provided value and decides whether the item should be included in the filtered result.


__Usage:__

```javascript
&fuzzyFilter(row, columnId, value, addMeta);
```

__Scope: __
This function is typically used within a table filtering mechanism.


__Input Parameter:__  
row: An object representing a row of data in the table.
columnId: A string indicating the ID or identifier of the column being filtered.
value: The value or keyword used for filtering.
addMeta: A function used to add metadata to the filtering process.



__Return:__  
boolean: true if the item should be included in the filtered result; false if it should be filtered out.

 
 **/

import style from "./table.module.css";
import React, { useEffect, useId, useState } from "react";
import Options from "./options";
import Pagination from "./pagination";

import Row from "./Row";
import HeaderCell from "./HeaderCell";
import {
 /* Column,
  Table,*/
  useReactTable,
 /* useBlockLayout,
  useResizeColumns,
  ColumnResizeMode,
  ColumnFiltersState,*/
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
 // sortingFns,
  getSortedRowModel,
 // FilterFn,
 // SortingFn,
 // ColumnDef,
//  flexRender,
//  FilterFns,
} from "@tanstack/react-table";

import {
//  RankingInfo,
  rankItem,
//  compareItems,
} from "@tanstack/match-sorter-utils";
import InfoColumns from "./infoColumns";

/**
 * Description placeholder
 *
 * @param {*} row - An object representing a row of data in the table.
 * @param {*} columnId - A string indicating the ID or identifier of the column being filtered.
 * @param {*} value - The value or keyword used for filtering.
 * @param {*} addMeta - A function used to add metadata to the filtering process.
 * @returns {*} - `true` if the item should be included in the filtered result; `false` if it should be filtered out.
 */
const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item

  /**
   * Description placeholder
   *
   * @type {*}
   */
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

/**
 * Description placeholder
 *
 * @export
 * @param {{ columns: any; disableOptions?: boolean; data: any; getItemSize?: () => number; pagination?: { pageIndex: number; pageSize: number; }; fileName?: string; }} {
  columns,
  disableOptions = false,
  data,
  getItemSize = () => {
    return 30;
  },
  pagination = {
    pageIndex: 0,
    pageSize: 20,
  },
  fileName = "tableData",
}
 * @returns {number; pagination?: { pageIndex: number; pageSize: number; }; fileName?: string; }) => any}
 */
export default function FilterTable(props) {
  const [tableSizes, setTableSizes] = useState({});
  const id = useId();
  //{width:0,height:0}
  useEffect(() => {
    const container = document.getElementById(id);
    if (container && !tableSizes?.width) {
      setTableSizes({
        width: container.offsetWidth,
        height: window.innerHeight - window.innerHeight * 0.1,
      });
    }
  }, [id, tableSizes]);
  return (
    <div>
      <div
        id={id}
        style={{ width: "100%", height: "1px"}}
      ></div>
      <div></div>
      {tableSizes?.width && <FTable {...props} {...tableSizes} />}
    </div>
  );
}
function FTable({
  columns,
  showColumnsInfo = false,
  columnsInfo,
  disableOptions = false,
  data,
  fileName = "tableData",
  rowHeight = 35,
  height,
}) {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  /**
   * Description placeholder
   *
   * @type {*}
   */
  const table = useReactTable({
    data,
    defaultColumn: {
      minSize: 170, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: Math.round(((height-(height*0.3))) / rowHeight+1),
      },
    },
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnVisibility,
      columnFilters,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    columnResizeMode: 'onChange',
    columnResizeDirection: 'rtl',
  });

  //console.log(table.getCenterTotalSize(),width);
  /**preGlobalFilteredRows={table.getPre} allColumns={allColumns} */
  return (
    <div>
      {showColumnsInfo && <InfoColumns {...table} columnsInfo={columnsInfo} />}
      <div>
        <table className={style.table}
        {...{
          style: {
            width: table.getCenterTotalSize()+"px",
          },
        }}
        >
          <thead className={style.tableHead}>
            {!disableOptions && (
              <tr>
                <th colSpan={table.getAllLeafColumns().length}>
                  <div
                    style={{
                      position: "sticky",
                      top: 0,
                      left: 0,
                    }}
                  >
                    <Options
                      columnsInfo={columnsInfo}
                      fileName={fileName}
                      preGlobalFilteredRows={table.getGlobalFacetedRowModel}
                      {...table}
                    />
                  </div>
                </th>
              </tr>
            )}
            {table.getHeaderGroups().map(
              /**
               * Description placeholder
               *
               * @param {*} headerGroup
               * @returns {*}
               */
              (headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(
                      /**
                       * Description placeholder
                       *
                       * @param {*} header
                       * @returns {*}
                       */
                      (header) => {
                        //let column = columns.find(column=>column.id===header.column.id)
                        //style={{ width: column ? column.width : "" }}

                        return (
                          <th
                            {...{
                              key: header.id,
                              colSpan: header.colSpan,
                              style: {
                                width: header.getSize()+"px",
                              },
                            }}
                          >
                            {header.isPlaceholder ? null : (<HeaderCell header={header} table={table} columnResizeMode />)}
                          </th>
                        );
                      }
                    )}
                  </tr>
                );
              }
            )}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(
              /**
               * Description placeholder
               *
               * @param {*} row
               * @returns {HTMLElement}
               */
              (row) => (
                <Row row={row} defaultRowHeight={rowHeight}/>
              )
            )}
            {table.getPageCount() > 1 && (
              <tr>
                <td colSpan={table.getAllLeafColumns().length}>
                  <div
                    style={{
                      width: table.getCenterTotalSize()+"px",
                      position: "sticky",
                      top: 0,
                      left: 0,
                    }}
                    className={style.options}
                  >
                    <Pagination table={table} />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*

                                <div
                                  {...{
                                    onMouseDown: header.getResizeHandler(),
                                    onTouchStart: header.getResizeHandler(),
                                    className: `${style.resizer} ${
                                      table.options.columnResizeDirection
                                    } ${
                                      header.column.getIsResizing()
                                        ? "isResizing"
                                        : ""
                                    }`,
                                    style: {
                                      transform:
                                        columnResizeMode === "onEnd" &&
                                        header.column.getIsResizing()
                                          ? `translateX(${
                                              (table.options
                                                .columnResizeDirection === "rtl"
                                                ? -1
                                                : 1) *
                                              (table.getState().columnSizingInfo
                                                .deltaOffset ?? 0)
                                            }px)`
                                          : "",
                                    },
                                  }}
                                />
                                
*/