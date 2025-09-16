import { useStore } from "../store";

export default function useControlsVM() {
  const {
    document,
    fragment,
    featureMapData,
    setMenuView,
    setFragmentFocusPositions,
    setDocumentFocusBarRight,
  } = useStore();
  const { start: startLimit, end: endLimit } = featureMapData.options.limits;
  const { endPosition, startPosition } = fragment.focus;
  const title = featureMapData?.title || "...";
  const handleZoomIn = () => {
    if (Math.abs(endPosition - startPosition) < 10) return;
    const newStart =
      startPosition < 0 ? startPosition + 10 : startPosition - 10;
    const newEnd = startPosition > 0 ? endPosition + 10 : endPosition - 10;
    setFragmentFocusPositions(newStart, newEnd);
    setDocumentFocusBarRight(newEnd);
  };
  const handleZoomOut = () => {
    const newStart =
      startPosition < 0 ? startPosition - 10 : startPosition + 10;
    const newEnd = startPosition > 0 ? endPosition - 10 : endPosition + 10;
    if (newStart < startLimit || newEnd > endLimit) return;
    setFragmentFocusPositions(newStart, newEnd);
    setDocumentFocusBarRight(newEnd);
  };

  const handleResetScale = () => {
    setFragmentFocusPositions(startLimit, endLimit);
    setDocumentFocusBarRight(endLimit);
  };

  return {
    handleZoomIn,
    handleZoomOut,
    handleResetScale,
    isMenuOpen: document.menu.open,
    setMenuView,
    title,
  };
}
