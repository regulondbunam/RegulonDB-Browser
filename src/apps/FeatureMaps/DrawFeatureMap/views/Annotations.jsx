import Select from "@mui/material/Select";
import { SimpleSquareColorPicker } from "../../../../components/ui-components/ColorPiker";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import useAnnotationsVM from "../viewModel/useAnnotationsVM";

export default function Annotations() {
  const {
    labels,
    setAnnotationColor,
    columns,
    columnSelect,
    handleColumnSelect,
  } = useAnnotationsVM();

  return (
    <div
      style={{ height: "100%", borderLeft: "1px solid #000", padding: "10px" }}
    >
      <p>
        <b>ANNOTATIONS</b>
      </p>
      <p>by column</p>
      {columns && (
        <Select
          size="small"
          variant="standard"
          value={columnSelect}
          onChange={handleColumnSelect}
          label=""
        >
          {columns.map((column, index) => (
            <MenuItem key={`col_${column}_${index}`} value={index}>
              {column}
            </MenuItem>
          ))}
        </Select>
      )}
      {labels &&
        Object.keys(labels).map((key, index) => {
          const color = labels[key];
          return (
            <div
              key={"annotationFeature_" + key}
              style={{ display: "flex", margin: "5px", gap: "2px" }}
            >
              <SimpleSquareColorPicker
                color={color}
                handleSetColor={(newColor) => {
                  setAnnotationColor(key, newColor);
                }}
              />
              <div>
                <p className="sequence" style={{ color: "black" }}>
                  {key}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

// annotations
