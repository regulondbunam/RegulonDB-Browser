import { useStore } from "../../store";
import { useEffect, useMemo, useRef, useState } from "react";
import { computeTicks } from "../../model/scaleBar";

function getPosition(event, rect) {
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

export default function useScaleBarVM() {
  const { featureMapData, scaleBar, setScaleBarPositions } = useStore();
  const { start: endLimit, end: startLimit, origin } = featureMapData.options.limits;
  const { end: endPosition, start: startPosition,  } = scaleBar.positions
  const [initPositionResize, setInitPositionResize] = useState(null);
  const [scaleBarWidth, setScaleBarWidth] = useState(null);

  const measure = featureMapData.options.measure;
  const sizeSection = Math.abs(startPosition - endPosition);
  const px_bp = scaleBarWidth ? scaleBarWidth/ sizeSection : null

  const refScaleBar = useRef(null);
  const refResizeBar = useRef(null);

  useEffect(() => {
    const element = refScaleBar.current
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setScaleBarWidth(width)
      }
    });
    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, [refScaleBar]);

  const ticks = useMemo(
    () =>
      computeTicks({
        px_bp,
        sizeSection,
        startPosition,
        step: 10,        // minor cada 10
        labelEvery: 100, // etiquetas por defecto cada 100 si 'measure' no viene
        measure,
      }),
    [px_bp, sizeSection, startPosition, measure]
  );

  const onResizeStart = (e) => {
    if (!refScaleBar.current) return;
    const rect = refScaleBar.current.getBoundingClientRect();
    const position = getPosition(e, rect);
    setInitPositionResize(position.x);
  }

  const onResizeEnd = (e) => {
    if (!refScaleBar.current || !refResizeBar.current || !initPositionResize) return;
    const rect = refScaleBar.current.getBoundingClientRect();
    const {x} = getPosition(e, rect);
    let relativeStart = initPositionResize
    let relativeEnd = x
    if(x < initPositionResize){
      relativeStart = x
      relativeEnd = initPositionResize
    }
    const bp_px = sizeSection / scaleBarWidth
    const newStart = Math.trunc(relativeStart * bp_px) + startPosition
    const newEnd = Math.trunc(relativeEnd * bp_px) + startPosition
    setScaleBarPositions(newStart, newEnd)
    setInitPositionResize(null);
    refResizeBar.current.style.left = 0 + "px";
    refResizeBar.current.style.width = 0 + "px";
  }

  const onMoveMouse = (e)=>{
    if (!refScaleBar.current || !refResizeBar.current || !initPositionResize) return;
    const rect = refScaleBar.current.getBoundingClientRect();
    const position = getPosition(e, rect);
    const delta = position.x - initPositionResize
    if(delta < 0){
      refResizeBar.current.style.left = position.x + "px";
      refResizeBar.current.style.width = Math.abs(position.x - initPositionResize) + "px";
    }else{
      refResizeBar.current.style.left = initPositionResize + "px";
      refResizeBar.current.style.width = Math.abs(position.x - initPositionResize) + "px";
    }
  }

  const onMouseLave = ()=>{
    setInitPositionResize(null);
  }

  //console.log(featureMapData);
  return {
    endPosition,
    startPosition,
    endLimit,
    startLimit,
    //lines,
    sizeSection,
    px_bp,
    measure,
    origin,
    refScaleBar,
    refResizeBar,
    ticks,
    onResizeStart,
    onResizeEnd,
    onMoveMouse,
    onMouseLave
  };
}
