import { useStore } from "../store";

export default function useControlsVM() {
  const {
    scale,
    isMenuOpen,
    setScale,
    setMenuView,
    scaleBar,
    setScaleBarPositions,
    featureMapData,
  } = useStore();
  const {
    start: startLimit,
    end: endLimit,
    origin,
  } = featureMapData.options.limits;
  const { end: endPosition, start: startPosition } = scaleBar.positions;
  const SCALE_VAL = 1.0;
  const title = featureMapData?.title || "null";

  const handleUpScale = () => {
    if(Math.abs(endPosition-startPosition)<10) return;
    if(startPosition<0){
      setScaleBarPositions(startPosition+10, endPosition);
    }else{
      setScaleBarPositions(startPosition-10, endPosition);
    }
  };

  const handleDownScale = () => {
    if(Math.abs(endPosition-startPosition)<10) return;
    if(startPosition<0){
      setScaleBarPositions(startPosition-10, endPosition);
    }else{
      setScaleBarPositions(startPosition+10, endPosition);
    }
  };

  const handleResetScale = () => {
    setScaleBarPositions(startLimit, endLimit);
  };

  return {
    handleUpScale,
    handleDownScale,
    handleResetScale,
    isMenuOpen,
    setMenuView,
    title,
  };
}
