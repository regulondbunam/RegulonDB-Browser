import React, { useEffect, useRef, useState } from "react";
import { flexRender } from "@tanstack/react-table";

export default function Row({
  row,
  defaultRowHeight = 30,
}) {
  const [resize, setResize] = useState();
  const height = useRef(null);
  const rowId = "tr_" + row.id;

  useEffect(() => {
    const trCont = document.getElementById(rowId);
    if (trCont && !resize) {
      if (trCont.offsetHeight > defaultRowHeight) {
        height.current = trCont.offsetHeight;
        setResize(trCont.offsetHeight);
      }
      
    }
  }, [defaultRowHeight, resize, rowId]);

  return (
    <tr
      key={row.id}
      id={rowId}
      onMouseEnter={() => {
        if (height.current > defaultRowHeight) {
          setResize(height.current)
        }
      }}
      onMouseLeave={() => {
        if (height.current > defaultRowHeight) {
          setResize(defaultRowHeight)
        }
      }}
    >
      {row.getVisibleCells().map((cell) => TestCell(cell,resize?resize+"px":defaultRowHeight+"px"))}
    </tr>
  );
}

function TestCell(cell,height) {
  return (
    <td
      {...{
        key: "cell_" + cell.id,
        style: {
          width: cell.column.getSize(),
        },
      }}
    >
        <div id={"cell_" + cell.id + "_item"}
        style={{
          overflow: "auto",
          height: height
        }}
        >
          {typeof cell.getValue() === "object" ? (
            <div>{cell.getValue()}</div>
          ) : (
            <div>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )}
        </div>
    </td>
  );
}

function Cell(cell, defaultRowHeight, rowId) {
  /*const [resize, setResize] = useState(false);
  const height = useRef(null)
  useEffect(() => {
    const cellCont = document.getElementById("cell_" + cell.id + "_item");
    if (cellCont && !resize) {
      if (cellCont.offsetHeight > defaultRowHeight) {
        height.current = cellCont.offsetHeight
      }
      setResize(true);
    }
  }, [cell, defaultRowHeight, resize]);*/
  let style = {};

  return (
    <td
      {...{
        key: "cell_" + cell.id,
        style: {
          width: cell.column.getSize(),
        },
      }}
    >
      <div
        onMouseEnter={() => {
          // if (height.current > defaultRowHeight) {}
        }}
        onMouseLeave={() => {
          // if (height.current > defaultRowHeight) {}
        }}
      >
        <div id={"cell_" + cell.id + "_item"}>
          {typeof cell.getValue() === "object" ? (
            <div style={style}>{cell.getValue()}</div>
          ) : (
            <div style={style}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )}
        </div>
      </div>
    </td>
  );
}
