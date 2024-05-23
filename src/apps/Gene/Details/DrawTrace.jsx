import React from "react";
import DrawingTraces from "apps/DrawingTracesTool/Ecoli/DrawingTraces";

export default function DrawTrace({ leftEndPosition, rightEndPosition, id }) {
  return <DrawingTraces leftEndPosition={leftEndPosition} rightEndPosition={rightEndPosition} showTable={false} focusElements={id}  />;
}
