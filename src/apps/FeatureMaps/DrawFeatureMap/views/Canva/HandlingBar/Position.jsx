import Styles from "./positionbar.module.css";
import usePositionBarMV from "../../../viewModel/canva/useHandlingBarVM/usePositionBarMV";
import dny from "./assets/dnaYW.png";

export default function Position({ width }) {
  const {
    containerRef,
    widthPosition,
    leftPosition,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = usePositionBarMV(width);

  return (
    <div className={Styles.content}>
      <div
        className={Styles.dnaImage}
        style={{ backgroundImage: `url(${dny})` }}
      />
      <div
        ref={containerRef}
        style={{ width: widthPosition + "px", right: leftPosition + "px" }}
        className={Styles.position}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onMouseLeave={onPointerUp}
      />
    </div>
  );
}
