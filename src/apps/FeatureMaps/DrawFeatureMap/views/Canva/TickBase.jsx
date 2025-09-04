import React from "react";

/**
 * Tick individual (memoizado)
 * Props:
 *  - x: posición en px
 *  - label: número a mostrar
 *  - kind: 'zero' | 'major' | 'mid' | 'minor'
 *  - showLabel: boolean
 *  - Style: CSS module con .tick, .label, .zeroLabel y clases de tipo
 */
function TickBase({ x, label, kind, showLabel, Style }) {
  return (
    <div
      style={{
        position: "absolute",
        transform: `translateX(${x}px)`,
        willChange: "transform",
        userSelect: "none",
      }}
    >
      <div className={`${Style.tick} ${Style[kind]}`} />
      {showLabel && (
        <p className={`${Style.label} ${label === 0 ? Style.zeroLabel : ""}`}>
          {label}
        </p>
      )}
    </div>
  );
}

const Tick = React.memo(TickBase);
export default Tick;