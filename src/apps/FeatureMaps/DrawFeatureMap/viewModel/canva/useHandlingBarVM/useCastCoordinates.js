import { useEffect, useRef, useState } from "react";
import {useStore} from "../../../store"


export default function useCastCoordinates(width) {
  const { scaleBar} = useStore();
  const { end: endPosition, start: startPosition,  } = scaleBar.positions
  const sizeSection = Math.abs(startPosition - endPosition);
  const px_bp = width ? width/ sizeSection : null

  return {px_bp}
}