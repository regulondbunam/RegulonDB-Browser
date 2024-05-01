import React, { useState } from 'react'
import Box from '@mui/material/Box';
import {REDUCER_TYPES} from "../static"


export default function ResizeColumn({column,dispatch,index}) {
    const [dragInit, setDragInit] = useState()
    const [dragSet, setDragSet] = useState(0)

    const handleResizeColumn = (event) => {
        const {screenX} = event
        if (dragInit) { 
            if (screenX === 0) {
                dispatch({type: REDUCER_TYPES.columnWidth, value: column.width+dragSet-dragInit, columnIndex: index})
                //console.log(dragSet-dragInit);
                setDragInit(undefined)
            }else{
                setDragSet(screenX)
                
            }
        }else{
            setDragInit(screenX)
        }
    }

    const handleAdjustWidth = ()=>{
        const cells = document.getElementsByClassName(`cell_${column.id}`)
        let maxWidth=0
        for (let i = 0; i < cells.length; i++) {
            let width = cells[i].offsetWidth;
            if (width > maxWidth) {
                maxWidth = width;
            }
        }
        if (column.width !== 100) {
            dispatch({type: REDUCER_TYPES.columnWidth, value: 100,  columnIndex: index})
        }else{
            dispatch({type: REDUCER_TYPES.columnWidth, value: maxWidth,  columnIndex: index})
        }
        
    }

  return <Box
  sx={{
      width: "5px",
      height: "26px",
      backgroundColor: "#1c3443",
      ":hover": {
          backgroundColor: "green",
          cursor: "col-resize"
      }
  }}
  draggable="true"
  onDrag={handleResizeColumn}
  onDoubleClick={handleAdjustWidth}
/>
}
