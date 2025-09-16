import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store";
import Bar from "./Bar";

export default function useHandlingBarVM() {
  const [width, setWidth] = useState(null);
  const [BarComponent, setBarComponent] = useState(null);
  const { featureMapData} = useStore();
  const { start: startLimit, end: endLimit } = featureMapData.options.limits;
  const refBar = useRef(null);


  useEffect(() => {
    const element = refBar.current
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width)
        setBarComponent(new Bar(startLimit, endLimit, entry.contentRect.width))
      }
    });
    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, [refBar, startLimit, endLimit]);


  return {width, refBar, BarComponent}
}
