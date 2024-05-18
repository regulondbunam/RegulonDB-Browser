import React, { useEffect } from 'react'
import { Track } from './GeneticElementsGraphicLibrary'

export default function DrawTrack({
  idTrack,
  geneticElements,
  leftEndPosition,
  rightEndPosition,
  height = 300
}) {

  useEffect(() => {
    const drawPlace = document.getElementById(idTrack)
    if (drawPlace) {
      if (Array.isArray(geneticElements)) {
        const width = drawPlace.clientWidth
        const track = new Track(drawPlace,idTrack,"canvas_"+idTrack,width,height)
        track.draw(geneticElements,leftEndPosition,rightEndPosition)
      }
    }

  }, [idTrack, geneticElements,height,leftEndPosition,rightEndPosition])
  

  return (
    <div
      id={idTrack}
      style={{ height: height + "px", width: "100%" }}
    />
  )
}
