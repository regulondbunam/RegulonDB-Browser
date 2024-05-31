import React from "react";
import DrawingTraces, { CONTROLS_POSITIONS } from "apps/DrawingTracesTool/Ecoli/DrawingTraces";

export default function DrawTrace({ leftEndPosition, rightEndPosition, id }) {
  return <DrawingTraces 
    height={200} 
    leftEndPosition={leftEndPosition} 
    rightEndPosition={rightEndPosition} 
    showTable={false} 
    focusElements={[id]} 
    controlsPosition={CONTROLS_POSITIONS.BOTTOM_RIGHT}
    />;
}
