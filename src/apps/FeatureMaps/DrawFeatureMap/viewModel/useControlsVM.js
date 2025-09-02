import { useStore } from "../store";

export default function useControlsVM() {
  const SCALE_VAL = 1.0;
  const { scale, isMenuOpen, setScale, setMenuView, featureMapData } =
    useStore();
  const title = featureMapData?.title || "null";

  const handleUpScale = () => {
    if (scale + SCALE_VAL < 100) {
      setScale(scale + SCALE_VAL);
    }
  };

  const handleDownScale = () => {
    if (scale - SCALE_VAL > 0) {
      setScale(scale - SCALE_VAL);
    }
  };

  const handleResetScale = () => {
    setScale(1);
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
