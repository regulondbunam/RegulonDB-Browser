import React, { useEffect, useState, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Track } from "./GeneticElementsGraphicLibrary";
import TableDTT from "./Table";

/**
 * Componente para dibujar un Track genético y mostrar una tabla opcionalmente.
 * Utiliza Intersection Observer para dibujar solo cuando el componente está en la vista.
 *
 * @component
 * @param {Object} props - Las props del componente.
 * @param {string} props.trackId - ID único para el track.
 * @param {Array} props.geneticElements - Elementos genéticos a dibujar.
 * @param {number} props.leftEndPosition - Posición inicial del track.
 * @param {number} props.rightEndPosition - Posición final del track.
 * @param {number} [props.height=300] - Altura del track.
 * @param {boolean} [props.showTable=false] - Si se debe mostrar la tabla.
 * @param {Array} props.focusElements - Elementos a enfocar.
 * @param {string} props.focusType - Tipo de enfoque.
 * @returns {JSX.Element} El componente de dibujo del track.
 */
export default function DrawTrack({
  trackId,
  geneticElements,
  leftEndPosition,
  rightEndPosition,
  height = 300,
  showTable = false,
  focusElements,
  focusType,
}) {
  const trackRef = useRef(null);
  /**
   * Función para dibujar el track genético.
   */
  const drawTrack = useMemo(() => {
    return () => {
      const drawPlace = trackRef.current;
      if (drawPlace) {
        if (Array.isArray(geneticElements)) {
          const width = drawPlace.clientWidth;
          if (width > 0) {
            const track = new Track(
              drawPlace,
              trackId,
              "canvas_" + trackId,
              width,
              height,
            );
            track.draw(
              geneticElements,
              leftEndPosition,
              rightEndPosition,
              focusElements,
              focusType,
            );
          } else {
            console.log(trackId, "no se dibujo");
          }
        }
      }
    };
  }, [
    trackId,
    geneticElements,
    height,
    leftEndPosition,
    rightEndPosition,
    focusElements,
    focusType,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          drawTrack();
        }
      },
      { threshold: 0.1 },
    );

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    return () => {
      if (trackRef.current) {
        observer.unobserve(trackRef.current);
      }
    };
  }, [drawTrack]);

  return (
    <div>
      <div
        id={trackId}
        ref={trackRef}
        style={{ height: height + "px", width: "100%" }}
      />
      {showTable && (
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

DrawTrack.propTypes = {
  trackId: PropTypes.string.isRequired,
  geneticElements: PropTypes.array,
  leftEndPosition: PropTypes.number.isRequired,
  rightEndPosition: PropTypes.number.isRequired,
  height: PropTypes.number,
  showTable: PropTypes.bool,
  focusElements: PropTypes.array,
  focusType: PropTypes.string,
};
