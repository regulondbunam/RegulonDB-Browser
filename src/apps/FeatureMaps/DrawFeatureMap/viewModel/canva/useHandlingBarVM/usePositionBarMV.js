import { useRef, useState } from "react";
import { useStore } from "../../../store";

export default function usePositionBarMV(width) {
  const { featureMapData, scaleBar, setScaleBarLeft } = useStore();
  const { start: startLimit, end: endLimit } = featureMapData.options.limits;
  const { end: endPosition, start: startPosition, left: leftPosition } = scaleBar.positions
  const widthAllSection = Math.abs(endLimit - startLimit)
  const widthSection = Math.abs(startPosition - endPosition)
  const widthPosition = widthSection * width / widthAllSection
  const [initPoint, setInitPoint] = useState(0)
  const [onDrag, setOnDrag] = useState(false)
  const containerRef  = useRef(null);
  const isMove = useRef(false);

  const onPointerDown = (e) => {
    if (!containerRef.current) return;
    setInitPoint(e.clientX)
    setOnDrag(true)
  };

  //console.log(scaleBar)

  const onPointerMove = (e) => {
    if (!onDrag || !containerRef.current) return;
    const delta = e.clientX - initPoint
    const rect = containerRef.current.getBoundingClientRect();
    if(!isMove.current && ((rect.left + delta >= 0 && delta<0) || (rect.right + delta <= width && delta>0))){
      isMove.current = true;
      setTimeout(()=>{
        setScaleBarLeft(leftPosition + delta)
        isMove.current = false;
      },30)
    }

    setInitPoint(e.clientX)
  };

  const onPointerUp = (e) => {
    setOnDrag(false);
  };

  return { containerRef, widthPosition, leftPosition, onPointerDown, onPointerMove, onPointerUp}
}