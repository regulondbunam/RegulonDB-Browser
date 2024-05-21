import React, { useEffect } from "react";
import { Track } from "./GeneticElementsGraphicLibrary";
import TableDTT from "./Table";

export default function DrawTrack({
  trackId,
  geneticElements,
  leftEndPosition,
  rightEndPosition,
  height = 300,
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
        track.draw(geneticElements, leftEndPosition, rightEndPosition);
      }
    }
  }, [trackId, geneticElements, height, leftEndPosition, rightEndPosition]);

  return (
    <div>
      <div id={trackId} style={{ height: height + "px", width: "100%" }} />
      <div id={trackId + "_TABLE"} style={{ height: "400px" }}>
        <TableDTT
          trackId={trackId}
          idContainer={trackId + "_TABLE"}
          geneticElements={geneticElements}
          leftEndPosition={leftEndPosition}
          rightEndPosition={rightEndPosition}
        />
      </div>
    </div>
  );
}
