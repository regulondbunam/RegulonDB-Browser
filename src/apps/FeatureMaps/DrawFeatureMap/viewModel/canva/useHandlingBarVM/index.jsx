import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store";

export default function useHandlingBarVM() {
  const { setDocumentScaleBarWidth } = useStore();
  const [loading, setLoading] = useState(true);
  const refBar = useRef(null);


  useEffect(() => {
    const element = refBar.current
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDocumentScaleBarWidth(entry.contentRect.width)
        setLoading(false)
      }
    });
    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, [refBar, setDocumentScaleBarWidth]);


  return {loading, refBar}
}
