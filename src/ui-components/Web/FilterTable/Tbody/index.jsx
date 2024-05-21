import React from "react";
import Box from "@mui/material/Box";
import style from "./style.module.css"

const LABEL_STYLE = {
  fontSize: "12px",
  padding: "3px",
  textWrap: "nowrap",
}

export default function Tbody({ state, dispatch, cellTextStyle, tableId, selection }) {
  return (
    <tbody>
      {state.currentData.slice((state.page * state.items), (state.page * state.items) + state.items).map((row) => {
        let rowProperties = row["_properties" + tableId]
        return (
          <tr key={rowProperties.key} className={selection === "row" ? style.tr : ""} >
            {state.columns.map((column) => {
              if (column.hide) {
                return null
              }
              return (
                <td
                  key={rowProperties.key + "column_" + column.key}
                  style={{ width: column.width }}
                  className={selection === "cell" ? style.td : ""}
                >
                  <Box sx={{
                    height: "30px",
                    ":hover": {
                      cursor: "cell",
                    },
                  }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "30px",
                        minWidth: column.width+"px",
                        overflow: "hidden",
                      }}
                    >
                      <p className={`cell_${column.id}`} style={{ ...LABEL_STYLE, ...cellTextStyle }}
                        onDoubleClick={(e) => {
                          e.preventDefault()
                          const range = document.createRange();
                          const selection = window.getSelection();
                          range.selectNodeContents(e.target)
                          selection.removeAllRanges();
                          selection.addRange(range);
                        }}
                      >
                        {row[column.label]}
                      </p>
                    </Box>
                  </Box>

                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  );
}