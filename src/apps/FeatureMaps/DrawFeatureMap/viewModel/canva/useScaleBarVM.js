import { useStore } from "../../store";
import { useEffect, useRef, useState } from "react";

function getPosition(event, rect) {
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

export default function useScaleBarVM() {
  const { featureMapData, scaleBar } = useStore();
  const { start: endLimit, end: startLimit, origin } = featureMapData.options.limits;
  const { end: endPosition, start: startPosition,  } = scaleBar.positions
  const [initResize, setInitResize] = useState(null);
  const [scaleBarWidth, setScaleBarWidth] = useState(0);

  const measure = featureMapData.options.measure;
  const sizeSection = Math.abs(startPosition - endPosition);
  const relativeMeasure = Math.floor(measure * scaleBarWidth / sizeSection);
  const lines = Math.floor(scaleBarWidth / relativeMeasure)+1;
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

  const onResizeStart = (e) => {
    if (!refScaleBar.current) return;
    const rect = refScaleBar.current.getBoundingClientRect();
    const position = getPosition(e, rect);
    setInitResize(position.x);
  }

  const onResizeEnd = (e) => {
    if (!refScaleBar.current || !refResizeBar.current) return;
    const rect = refScaleBar.current.getBoundingClientRect();
    const position = getPosition(e, rect);
    setInitResize(null);
    refResizeBar.current.style.left = 0 + "px";
    refResizeBar.current.style.width = 0 + "px";
  }

  const onMoveMouse = (e)=>{
    if (!refScaleBar.current || !refResizeBar.current || !initResize) return;
    const rect = refScaleBar.current.getBoundingClientRect();
    const position = getPosition(e, rect);
    const delta = position.x - initResize
    if(delta < 0){
      refResizeBar.current.style.left = position.x + "px";
      refResizeBar.current.style.width = Math.abs(position.x - initResize) + "px";
    }else{
      refResizeBar.current.style.left = initResize + "px";
      refResizeBar.current.style.width = Math.abs(position.x - initResize) + "px";
    }
  }

  //console.log(featureMapData);
  return {
    endPosition,
    startPosition,
    endLimit,
    startLimit,
    lines,
    measure,
    relativeMeasure,
    origin,
    refScaleBar,
    refResizeBar,
    onResizeStart,
    onResizeEnd,
    onMoveMouse
  };
}
