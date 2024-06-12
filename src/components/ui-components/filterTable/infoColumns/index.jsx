import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import style from "../table.module.css";

export default function InfoColumns({
  columnsInfo,
  getIsAllColumnsVisible,
  getToggleAllColumnsVisibilityHandler,
  getAllLeafColumns,
}) {
  const [view, setView] = useState(true);
  return (
    <>
      <div className={style.options}>
        <Button
          size="small"
          startIcon={view ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => {
            setView(!view);
          }}
        >
          Columns
        </Button>
      </div>
      {view && (
        <div style={{ border: "1px solid", padding: "0 30px 10px 30px" }}>
          <FormGroup>
            <FormControlLabel
              className={style.columnSel}
              label="display all"
              control={
                <Checkbox
                  size="small"
                  checked={getIsAllColumnsVisible()}
                  onChange={getToggleAllColumnsVisibilityHandler()}
                />
              }
            />

            {getAllLeafColumns().map((column) => {
                //console.log(columnsInfo[0].accessorKey,column.columnDef.accessorKey);
                const info = columnsInfo.find(c=>c.accessorKey===column.columnDef.accessorKey)
              return (
                <React.Fragment key={column.id} >
                  <FormControlLabel
                    label={<p><b>{column.id}</b>{". "}{info && info.description}</p>}
                    control={
                      <Checkbox
                        size="small"
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                    }
                  />
                </React.Fragment>
              );
            })}
          </FormGroup>
        </div>
      )}
    </>
  );
}
