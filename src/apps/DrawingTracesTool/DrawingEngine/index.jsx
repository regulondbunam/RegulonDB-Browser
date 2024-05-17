import React, { useEffect } from 'react'
import { Track } from './GeneticElementsGraphicLibrary'

export default function DrawTrack({
  idTrack,
  geneticElements = [],
  leftEndPosition,
  rightEndPosition,
  height = 300
}) {
  const drawPlaceId = "drawPlace_" + idTrack

  useEffect(() => {
    const drawPlace = document.getElementById(drawPlaceId)
    if (drawPlace) {
      if (Array.isArray(geneticElements)) {
        const width = drawPlace.clientWidth
        const track = new Track(drawPlace,drawPlaceId,"canvas_"+drawPlaceId,width,height)
        track.draw(geneticElements,leftEndPosition,rightEndPosition)
      }
    }
    return ()=>{
      const drawPlace = document.getElementById(drawPlaceId)
    if (drawPlace) {
      drawPlace.innerHTML = ""
    }
    }
  }, [drawPlaceId, geneticElements,height,leftEndPosition,rightEndPosition])
  

  return (
    <div
      id={drawPlaceId}
      style={{ height: height + "px", width: "100%" }}
    />
  )
}
