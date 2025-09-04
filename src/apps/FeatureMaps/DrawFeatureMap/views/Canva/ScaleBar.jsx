import React, { useMemo } from "react";
import useScaleBarVM from "../../viewModel/canva/useScaleBarVM";
import Tick from "./TickBase";
import Style from "./scalebar.module.css";

export default function ScaleBar() {
  const {
    endPosition,
    startPosition,
    measure,
    px_bp,
    sizeSection,
    ticks,
    refScaleBar,
    refResizeBar,
    onResizeStart,
    onResizeEnd,
    onMoveMouse,
    onMouseLave, // si fue typo y tu VM expone onMouseLeave, cámbialo aquí y en el div
  } = useScaleBarVM();



  return (
    <div
      ref={refScaleBar}
      className={Style.bar}
      onMouseDown={onResizeStart}
      onMouseUp={onResizeEnd}
      onMouseLeave={onMouseLave}
      onMouseMove={onMoveMouse}
    >
      <div className={Style.resizeBar} ref={refResizeBar} />

      {/* Contenedor de ticks */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {ticks.map((t) => (
          <Tick
            key={`tick_${t.i}`}
            x={t.x}
            label={t.label}
            kind={t.kind}
            showLabel={t.showLabel}
            Style={Style}
          />
        ))}
      </div>
    </div>
  );
}
