import { useStore } from "../../../store";
import { useMemo, useRef, useState } from "react";


export default function useScaleBarVM(width, BarComponent) {
  const { scaleBar, setScaleBarPositions } = useStore();
  const { end: endPosition, start: startPosition,  } = scaleBar.positions
  const widthSection = Math.abs(startPosition - endPosition);
  const [initPosition, setInitPosition] = useState(null);

  const refScaleBar = useRef(null);
  const refResizeBar = useRef(null)

  const ticks = useMemo(
    () =>
      BarComponent.getTicks(widthSection, startPosition, endPosition),
    [widthSection, startPosition, endPosition, BarComponent]
  );

  const onResizeStart = (e) => {
    if (!refScaleBar.current) return;
    setInitPosition(e.clientX)
  }

  const onMoveMouse = (e)=>{
    if (!refScaleBar.current || !refResizeBar.current || !initPosition) return;
    const x = e.clientX
    const delta = x - initPosition
    if(delta < 0){
      refResizeBar.current.style.left = x + "px";
      refResizeBar.current.style.width = Math.abs(x - initPosition) + "px";
    }else{
      refResizeBar.current.style.left = initPosition + "px";
      refResizeBar.current.style.width = Math.abs(x - initPosition) + "px";
    }
  }

  const onResizeEnd = (e) => {
    if (!refScaleBar.current || !refResizeBar.current || !initPosition) return;
    const x = e.clientX
    const p1 = BarComponent.getBasePairPosition(initPosition,startPosition, widthSection)
    const p2 = BarComponent.getBasePairPosition(x,startPosition, widthSection)
    if(Math.abs(p1-p2)>=(0.05*width)){
      if(p1<p2){
        setScaleBarPositions(p1, p2, BarComponent.getRightPx(p2))
      }else{
        setScaleBarPositions(p2, p1, BarComponent.getRightPx(p1))
      }
    }
    setInitPosition(null);
    refResizeBar.current.style.left = 0 + "px";
    refResizeBar.current.style.width = 0 + "px";
  }

  const onMouseLave = ()=>{
    setInitPosition(null);
    refResizeBar.current.style.left = 0 + "px";
    refResizeBar.current.style.width = 0 + "px";
  }

  //console.log(featureMapData);
  return {
    ticks,
    refScaleBar,
    refResizeBar,
    onResizeStart,
    onResizeEnd,
    onMoveMouse,
    onMouseLave
  };
}