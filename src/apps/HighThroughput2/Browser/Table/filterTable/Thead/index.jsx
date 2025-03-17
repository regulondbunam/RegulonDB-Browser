import React from 'react'
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ResizeColumn from './ResizeColumn';
import Options from './Options';

const LABEL_STYLE = {
    fontSize: "12px",
    fontWeight: "bold",
    padding: "3px",
    color: "black",
    maxHeight: "26px",
    textWrap: "nowrap",
}
export default function Thead({ labelStyle, state, dispatch, tableId, tableName=""}) {

    return (
        <thead >
            <tr>
                {state.columns.map((column,index) => {
                    if (column.hide) {
                        return null
                    }
                    const calculateWidth = (tableName) => {
                        switch (tableName) {
                            case 'Author data':
                                return column.width+50;
                            case 'Weight Matrix':
                                return column.width;
                            default:
                                return column.width+50;
                        }
                    };

                    const columnWidth = calculateWidth(tableName);

                    return (
                        <th id={column.id}
                            key={column.key}
                            style={{ width: columnWidth, height: "26px", position: "sticky", top: 0 }}
                        >
                            <Box sx={{ display: "grid", gridTemplateColumns: " auto 20px 5px" }} >
                                <Tooltip title={column.label} placement="top" arrow >
                                    <Box
                                        sx={{
                                            overflow: "hidden",
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "#cadce7",
                                            display: "flex",
                                            alignItems: "center" }}
                                    >
                                        {column.label}
                                        {/*<p style={{ ...LABEL_STYLE, ...labelStyle }} ></p>*/}
                                    </Box>
                                </Tooltip>
                                <Options state={state} column={column} dispatch={dispatch} index={index} tableId={tableId} />
                                <ResizeColumn column={column} dispatch={dispatch} index={index} />
                            </Box>
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}
