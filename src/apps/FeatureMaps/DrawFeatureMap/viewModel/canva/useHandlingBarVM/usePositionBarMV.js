import { useRef, useState } from "react";
import { useStore } from "../../../store";
import Bar from "./Bar";

export default function usePositionBarMV(width, BarComponent) {
  const { scaleBar, setScaleBarPositions } = useStore();
  const { end: endPosition, start: startPosition, right } = scaleBar.positions;
  const widthSection = Math.abs(startPosition - endPosition);

  const [initPosition, setInitPosition] = useState(null);
  const [onDrag, setOnDrag] = useState(false);

  const containerRef = useRef(null);
  const isMove = useRef(false);

  const onPointerDown = (e) => {
    if (!containerRef.current) return;
    setInitPosition(e.clientX);
    setOnDrag(true);
  };

  const onPointerMove = (e) => {
    if (!onDrag || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX;
    const delta = x - initPosition;
    if (
      !isMove.current &&
      ((rect.left + delta >= 0 && delta < 0) ||
        (rect.right + delta <= width && delta > 0))
    ) {
      isMove.current = true;
      setTimeout(() => {
        const start = delta<0 ? startPosition - Math.abs(delta) : startPosition + Math.abs(delta);
        const end = delta<0 ? endPosition - Math.abs(delta) : endPosition + Math.abs(delta);
        setScaleBarPositions(start, end, BarComponent.getRightPx(end))
        isMove.current = false;
      }, 10);
      console.log(delta);
    }
  };

  const onPointerUp = (e) => {
    setOnDrag(false);
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

/*
export default function usePositionBarMV(width) {
  const { featureMapData, scaleBar, setScaleBarPositions } = useStore();
  const { start: startLimit, end: endLimit } = featureMapData.options.limits;
  const { end: endPosition, start: startPosition, right: rightPosition } = scaleBar.positions
  const widthAllSection = Math.abs(endLimit - startLimit)
  const widthSection = Math.abs(startPosition - endPosition)
  const widthPosition = widthSection * width / widthAllSection
  const [initPoint, setInitPoint] = useState(0)
  const [onDrag, setOnDrag] = useState(false)
  const containerRef  = useRef(null);
  const isMove = useRef(false);

  const onPointerDown = (e) => {
    if (!containerRef.current) return;
    const NewBar = new Bar(startPosition, endPosition, width)
    setInitPoint(e.clientX)

    console.log(NewBar.getBasePairPosition(e.clientX))
    setOnDrag(true)
  };


  const onPointerMove = (e) => {
    if (!onDrag || !containerRef.current) return;
    const delta = e.clientX - initPoint;
    const rect = containerRef.current.getBoundingClientRect();
    if(!isMove.current && ((rect.left + delta >= 0 && delta<0) || (rect.right + delta <= width && delta>0))){
      isMove.current = true;
      setTimeout(()=>{
        const start = delta<0 ? startPosition - Math.abs(delta) : startPosition + Math.abs(delta);
        const end = delta<0 ? endPosition - Math.abs(delta) : endPosition + Math.abs(delta);
        setScaleBarPositions(start, end, rightPosition - delta)
        isMove.current = false;
      },10)
    }

    setInitPoint(e.clientX)
  };

  const onPointerUp = (e) => {
    setOnDrag(false);
  };

  return { containerRef, widthPosition, rightPosition, onPointerDown, onPointerMove, onPointerUp}
}
* */
