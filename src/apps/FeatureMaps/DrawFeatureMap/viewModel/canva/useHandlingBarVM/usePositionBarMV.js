import { useRef, useState } from "react";
import { useStore } from "../../../store";
import Bar from "./Bar";

export default function usePositionBarMV(width, BarComponent) {
  const { scaleBar, setScaleBarPositions } = useStore();
  const { end: endPosition, start: startPosition, right } = scaleBar.positions;
  const widthSection = Math.abs(startPosition - endPosition);

  const [onDrag, setOnDrag] = useState(false);

  const initX = useRef(null);
  const isMove = useRef(false);
  const containerRef = useRef(null);



  const onPointerDown = (e) => {
    if (!containerRef.current) return;
    initX.current = e.clientX;
    setOnDrag(true);
  };

  const onPointerMove = (e) => {
    if (!onDrag || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX;
    const delta = x - initX.current;
    if (
      !isMove.current &&
      ((rect.left + delta >= 0 && delta < 0) ||
        (rect.right + delta <= width && delta > 0))
    ) {
      isMove.current = true;
      const start = delta<0 ? startPosition - Math.abs(delta) : startPosition + Math.abs(delta);
      const end = delta<0 ? endPosition - Math.abs(delta) : endPosition + Math.abs(delta);
      setTimeout(() => {
        setScaleBarPositions(start, end, BarComponent.getRightPx(end))
        isMove.current = false;
      }, 10);
    }
    initX.current = x;
  };

  const onPointerUp = (e) => {
    setOnDrag(false);
    initX.current = null;
  };

  return {
    widthSection: BarComponent.getWidthPx(widthSection),
    rightSection: right,
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}