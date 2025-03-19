import React from "react";
import Box from "@mui/material/Box";
import DataVerifier from "../../utils";

const LABEL_STYLE = {
  fontSize: "12px",
  padding: "3px",
  textWrap: "nowrap",
}

export default function Tbody({ state, dispatch, cellTextStyle, tableId }) {
  return (
    <tbody>
      {state.currentData.slice((state.page * state.items), (state.page * state.items) + state.items).map((row) => {
        let rowProperties = row["_properties" + tableId]
        return (
          <tr key={rowProperties.key}>
            {state.columns.map((column) => {
              if (column.hide) {
                return null
              }
              return (
                <td
                  key={rowProperties.key + "column_" + column.key}
                  style={{ width: column.width }}
                >
                  <Box sx={{
                    height: "30px",
                    width: "100%",
                    ":hover": {
                      cursor: "cell",
                    },
                  }}>
                    <Box

                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "30px",
                        minWidth: column.width,
                        overflow: "hidden",
                        ":hover": {
                          zIndex: 99,
                          position: "absolute",
                          backgroundColor: "#f5f5f5",
                          boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.75)",
                        },
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