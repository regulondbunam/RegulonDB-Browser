import React, { useEffect } from "react";
import { Track } from "./GeneticElementsGraphicLibrary";
import TableDTT from "./Table";

export default function DrawTrack({
  trackId,
  geneticElements,
  leftEndPosition,
  rightEndPosition,
  height = 300,
  showTable = false,
  focusElements
}) {
  useEffect(() => {
    const drawPlace = document.getElementById(trackId);
    if (drawPlace) {
      if (Array.isArray(geneticElements)) {
        const width = drawPlace.clientWidth;
        const track = new Track(
          drawPlace,
          trackId,
          "canvas_" + trackId,
          width,
          height
        );
        track.draw(geneticElements, leftEndPosition, rightEndPosition, focusElements);
      }
    }
  }, [trackId, geneticElements, height, leftEndPosition, rightEndPosition, focusElements]);

  return (
    <div>
      <div id={trackId} style={{ height: height + "px", width: "100%" }} />
      {showTable&&(
        <div id={trackId + "_TABLE"} style={{ height: height + "px" }}>
        <TableDTT
          trackId={trackId}
          idContainer={trackId + "_TABLE"}
          geneticElements={geneticElements}
          leftEndPosition={leftEndPosition}
          rightEndPosition={rightEndPosition}
        />
      </div>
      )}
    </div>
  );
}
