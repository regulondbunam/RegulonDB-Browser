import useScaleBarVM from "../../viewModel/canva/useScaleBarVM";
import Style from "./scalebar.module.css";

export default function ScaleBar() {
  const {
    endPosition,
    startPosition,
    measure,
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
    </div>
  );
}
