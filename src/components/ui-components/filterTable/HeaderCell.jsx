import React from "react";
import { flexRender } from "@tanstack/react-table";
import SortIcon from "@mui/icons-material/Sort";
//import SettingsIcon from '@mui/icons-material/Settings';
import "./header_cell.css";
import { Tooltip } from "@mui/material";
import { Simple } from "./Filters";

export default function HeaderCell({ header, table }) {
  return (
    <div className="FT_header_columnCell">
        <div className="FT_headerCell">
      <div className="FT_headerCell_title">
        <div className="FT_headerCell_label">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </div>
        {header.column.getCanSort() && (
          <Tooltip title={"sort"}>
            <div
              className="FT_headerCell_sort"
              onClick={header.column.getToggleSortingHandler()}
            >
              {{
                asc: "|A-Z|",
                desc: "|Z-A|",
              }[header.column.getIsSorted()] ?? <SortIcon />}
            </div>
          </Tooltip>
        )}
      </div>
      <div className="FT_headerCell_options">
      <div className="FT_headerCell_menu">
        {/*<SettingsIcon fontSize="12" />*/}
      </div>
        {header.column.getCanFilter() ? (
          <div className="FT_headerCell_filter">
            <Simple column={header.column} table={table} />
          </div>
        ) : null}
      </div>
    </div>
    <div className="FT_headerResize"
    onMouseDown={header.getResizeHandler()}
    onTouchStart={header.getResizeHandler()} //for mobile
    style={{
        transform: header.column.getIsResizing()
          ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
          : '',
      }}
    >
    </div>
    </div>
  );
}
