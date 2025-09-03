import useScaleBarVM from "../../viewModel/canva/useScaleBarVM";
import Style from "./scalebar.module.css";
import React from "react";

export default function ScaleBar() {
  const {
    endPosition,
    startPosition,
    measure,
    relativeMeasure,
    lines,
    refScaleBar,
    refResizeBar,
    onResizeStart,
    onResizeEnd,
    onMoveMouse
  } = useScaleBarVM();

  return (
    <div
      ref={refScaleBar}
      className={Style.bar}
      onMouseDown={onResizeStart}
      onMouseUp={onResizeEnd}
      onMouseLeave={onResizeEnd}
      onMouseMove={onMoveMouse}
    >
      <div className={Style.resizeBar} ref={refResizeBar} />
      <div style={{position: "relative", width: "100%"}} >
        {lines && new Array(lines).fill(0).map((_, i) => {
          const left = relativeMeasure * i;
          let label = 0
          if(startPosition < 0 ){
            label = startPosition + (measure * i)
          }else{
            label = startPosition - (measure * i)
          }
          return (
            <div key={"measure_" + i} style={{left: left, position: "absolute", userSelect: "none" }} >
              <div className={Style.line} />
              <p className={Style.lineLabel}>{label}</p>
            </div>
          )
        })}
      </div>

    </div>
  );
}
