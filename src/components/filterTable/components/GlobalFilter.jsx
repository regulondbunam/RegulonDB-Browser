import React from "react"
import { useAsyncDebounce } from "react-table"
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    allColumns
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <Box
            component="form"
            sx={{ display: 'flex', alignItems: 'flex-end', paddingLeft: "5%", paddingRight: "2%" }}
            noValidate
            autoComplete="off"
        >
            <div style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between"
            }}>
                <div>
                    <FilterAltIcon sx={{ fontSize: 40 }} />
                    <TextField label={`Global search in ${count} elements:`} variant="outlined"
                        value={value || ""}
                        size="small"
                        onChange={e => {
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <Button onClick={() => { DownloadCVS(preGlobalFilteredRows, allColumns) }} >
                        Download Table
                    </Button>
                </div>

            </div>

        </Box>
    )
}

function DownloadCVS(preGlobalFilteredRows = [], allColumns) {
    if (preGlobalFilteredRows.length <= 0) {
        return null
    }
    let visualColumns = []
    allColumns.forEach(column => {
        if (column.isVisible) {
            visualColumns.push({ id: column.id, Header: column.Header })
        }
    })
    let fileInfo = visualColumns.map(column => column.Header).join(", ") + "\n"
    preGlobalFilteredRows.forEach((row) => {
        let cells = []
        try {
            visualColumns.forEach(col => {
                const id = col.id
                let rowValue = ""
                if (typeof (row.values[id]) === "object" && row.values[id] !== null) {
                    if (row.values[id].props.value) {
                        rowValue = row.values[id].props.value
                    }
                } else {
                    rowValue = row.values[id]
                }
                cells.push(rowValue)
            })
            fileInfo += cells.join(", ") + "\n"
        } catch (error) {
            console.log(row);
            console.error(error);
        }



    })
    const filename = "data.csv"
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileInfo));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}