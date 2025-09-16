import Styles from "./positionbar.module.css";
import usePositionBarMV from "../../../viewModel/canva/useHandlingBarVM/usePositionBarMV";
import dny from "./assets/dnaYW.png";

export default function Position({ width, BarComponent }) {
  const {
    widthSection,
    rightSection,
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = usePositionBarMV(width,BarComponent);

  return (
    <div className={Styles.content}>
      <div
        className={Styles.dnaImage}
        style={{ backgroundImage: `url(${dny})` }}
      />
      <div
        ref={containerRef}
        style={{ width: widthSection + "px", right: rightSection + "px" }}
        className={Styles.position}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onMouseLeave={onPointerUp}
      />
    </div>
  );
}
