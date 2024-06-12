//import { GlobalFilter } from "./globalFilter";
import { Download } from "./download";
import { Columns } from "./columns";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function Options({
  getAllFlatColumns,
  globalFilter,
  setGlobalFilter,
  columnsInfo,
  data,
  fileName,
  preGlobalFilteredRows,
  getIsAllColumnsVisible,
  getToggleAllColumnsVisibilityHandler,
  getAllLeafColumns,
}) {
  return (
    <div style={{display: "flex"}} >
      <div>
        <p>
          <b></b>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          flexDirection: "row-reverse",
        }}
      >
        <ButtonGroup variant="contained" size="small" color="secondary">
          <Columns
            columnsInfo
            getIsAllColumnsVisible={getIsAllColumnsVisible}
            getToggleAllColumnsVisibilityHandler={
              getToggleAllColumnsVisibilityHandler
            }
            getAllLeafColumns={getAllLeafColumns}
          />
          <Download
            data={data}
            fileName={fileName}
            preGlobalFilteredRows={preGlobalFilteredRows}
            getAllFlatColumns={getAllFlatColumns}
          />
        </ButtonGroup>
      </div>
    </div>
  );
}
