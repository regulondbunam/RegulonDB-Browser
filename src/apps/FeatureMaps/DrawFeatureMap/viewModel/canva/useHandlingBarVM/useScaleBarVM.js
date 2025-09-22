import { useStore } from "../../../store";
import { useMemo, useRef, useState } from "react";

export default function useScaleBarVM() {
  const {
    fragment, document,
    getScaleBarTicks,
    getFragmentPosition,
    setDocumentFocusBarRight,
    setFragmentFocusPositions
  } = useStore();
  const { width } = fragment.focus;
  const [initPosition, setInitPosition] = useState(null);

  const refScaleBar = useRef(null);
  const refResizeBar = useRef(null);

  const ticks = useMemo(
    () => getScaleBarTicks(document, fragment),
    [fragment, document, getScaleBarTicks],
  );

  const onResizeStart = (e) => {
    if (!refScaleBar.current) return;
    setInitPosition(e.clientX);
  };

  const onMoveMouse = (e) => {
    if (!refScaleBar.current || !refResizeBar.current || !initPosition) return;
    const x = e.clientX;
    const delta = x - initPosition;
    if (delta < 0) {
      refResizeBar.current.style.left = x + "px";
      refResizeBar.current.style.width = Math.abs(x - initPosition) + "px";
    } else {
      refResizeBar.current.style.left = initPosition + "px";
      refResizeBar.current.style.width = Math.abs(x - initPosition) + "px";
    }
  };

  const onResizeEnd = (e) => {
    if (!refScaleBar.current || !refResizeBar.current || !initPosition) return;
    const x = e.clientX;
    const p1 = getFragmentPosition(document, fragment, initPosition)
    const p2 = getFragmentPosition(document, fragment, x);
    if (Math.abs(p1 - p2) >= 0.05 * width) {
      if (p1 < p2) {
        setFragmentFocusPositions(p1, p2);
        setDocumentFocusBarRight(p2)
      } else {
        setFragmentFocusPositions(p2, p1);
        setDocumentFocusBarRight(p1)
      }
    }
    setInitPosition(null);
    refResizeBar.current.style.left = 0 + "px";
    refResizeBar.current.style.width = 0 + "px";
  };

  const onMouseLave = () => {
    setInitPosition(null);
    refResizeBar.current.style.left = 0 + "px";
    refResizeBar.current.style.width = 0 + "px";
  };

  //console.log(featureMapData);
  return {
    ticks,
    refScaleBar,
    refResizeBar,
    onResizeStart,
    onResizeEnd,
    onMoveMouse,
    onMouseLave,
  };
}
