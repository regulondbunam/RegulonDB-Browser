import { useRef, useState } from "react";
import { useStore } from "../../../store";

export default function usePositionBarMV() {
  const {
    fragment,
    document,
    setFragmentFocusPositions,
    setDocumentFocusBarRight,
  } = useStore();
  const {
    startPosition,
    endPosition,
  } = fragment.focus;

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
        (rect.right + delta <= document.scaleBar.width && delta > 0))
    ) {
      isMove.current = true;
      const start =
        delta < 0
          ? startPosition - Math.abs(delta)
          : startPosition + Math.abs(delta);
      const end =
        delta < 0
          ? endPosition - Math.abs(delta)
          : endPosition + Math.abs(delta);
      setTimeout(() => {
        setFragmentFocusPositions(start, end);
        setDocumentFocusBarRight(end)
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
    widthSection: document.focusBar.width,
    rightSection: document.focusBar.right,
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
