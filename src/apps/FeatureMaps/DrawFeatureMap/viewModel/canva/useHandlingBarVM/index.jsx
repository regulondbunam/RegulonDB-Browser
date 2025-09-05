import { useEffect, useRef, useState } from "react";

export default function useHandlingBarVM() {
  const [width, setWidth] = useState(null);
  const refBar = useRef(null);

  useEffect(() => {
    const element = refBar.current
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width)
      }
    });
    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, [refBar]);


  return {width, refBar}
}
