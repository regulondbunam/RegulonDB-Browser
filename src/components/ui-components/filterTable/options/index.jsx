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
          <ButtonGroup variant="contained" size="small" color="secondary"
                       style={{
                           display: "flex",
                           width: "100%",
                           height: "100%",
                       }}>
              <Download
                  data={data}
                  fileName={fileName}
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  getAllFlatColumns={getAllFlatColumns}
              />
              <Columns
                  columnsInfo
                  getIsAllColumnsVisible={getIsAllColumnsVisible}
                  getToggleAllColumnsVisibilityHandler={
                      getToggleAllColumnsVisibilityHandler
                  }
                  getAllLeafColumns={getAllLeafColumns}
              />




          </ButtonGroup>
      </div>
  );
}
