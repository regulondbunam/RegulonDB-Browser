import React from "react";
import Box from "@mui/material/Box";
import style from "./style.module.css";

const LABEL_STYLE = {
  fontSize: "12px",
  padding: "3px",
  textWrap: "nowrap",
};

export default function Tbody({
  state,
  dispatch,
  cellTextStyle,
  tableId,
  selection,
}) {
  return (
    <tbody>
      {state.currentData
        .slice(state.page * state.items, state.page * state.items + state.items)
        .map((row) => {
          let rowProperties = row["_properties" + tableId];
          return (
            <tr
              key={rowProperties.key}
              className={selection === "row" ? style.tr : ""}
              onMouseEnter={rowProperties?.onMouseEnter}
              onMouseLeave={rowProperties?.onMouseLeave}
            >
              {state.columns.map((column) => {
                if (column.hide) {
                  return null;
                }
                const cell = row[column.key]
                return (
                  <td
                    key={rowProperties.key + "cell" + cell.key}
                    style={{ width: column.width }}
                    className={selection === "cell" ? style.td : ""}
                  >
                    <Box
                      sx={{
                        height: "30px",
                        ":hover": {
                          cursor: "cell",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "30px",
                          minWidth: column.width + "px",
                          overflow: "hidden",
                        }}
                      >
                        <p
                          className={`cell_${column.id}`}
                          style={{ ...LABEL_STYLE, ...cellTextStyle }}
                          onDoubleClick={(e) => {
                            e.preventDefault();
                            const range = document.createRange();
                            const selection = window.getSelection();
                            range.selectNodeContents(e.target);
                            selection.removeAllRanges();
                            selection.addRange(range);
                          }}
                        >
                          {row[column.key]}
                        </p>
                      </Box>
                    </Box>
                  </td>
                );
              })}
            </tr>
          );
        })}
    </tbody>
  );
}
