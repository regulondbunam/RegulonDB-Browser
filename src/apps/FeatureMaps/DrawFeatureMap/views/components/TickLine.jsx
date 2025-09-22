import React, {useId} from "react";
import Style from "./tickLine.module.css";

/*const Tick = {
  x: 0, // posición en px
  label: "", // número a mostrar
  kind: "", // 'zero' | 'major' | 'mid' | 'minor'
  showLabel: false, //boolean
};*/

/**
 * Ticks (memoizado)
 * Props:
 *  - ticks: Tick[]
 *  - variant: 'bottom' | 'middle' | 'top'
 */
function TickLineBase({ ticks, variant = 'bottom', showLabel=false, heightTrack=50 }) {
  const id = useId();
  let top = null
  switch (variant) {
    case 'middle':
      top = heightTrack / 2
      break;
    case 'top':
      top = 0
      break;
    default:
      top = heightTrack
      break;
  }

  return (
    <div style={{height: "100%", width: "100%", position: "relative"}} >
      <div style={{width: "100%", height: "1px", backgroundColor: "black", position: "absolute", top: top}} />
      {ticks.map((t) => {
        let nTop = top
        if(variant === 'middle'){
          switch (t.kind) {
            case 'major':
              nTop = top-8
              break;
            case 'mid':
              nTop = top-7
              break;
            case 'minor':
              nTop = top-5
              break;
            case 'zero':
              nTop = top-12
              break;
            default:
              nTop = top
          }
        }
        return <IndividualTick
          key={`tick_${t.i}_${id}_${variant}`}
          x={t.x}
          label={t.label}
          kind={t.kind}
          showLabel={t.showLabel && showLabel}
          top={nTop}
        />
      })}
    </div>
  )
}

/**
 * Tick individual
 * Props:
 *  - x: posición en px
 *  - label: número a mostrar
 *  - kind: 'zero' | 'major' | 'mid' | 'minor'
 *  - showLabel: boolean
 *  - Style: CSS module con .tick, .label, .zeroLabel y clases de tipo
 */
function IndividualTick({ x, label, kind, showLabel, top }) {

  return (
    <div
      style={{
        position: "absolute",
        transform: `translateX(${x}px)`,
        willChange: "transform",
        userSelect: "none",
      }}
    >
      <div className={`${Style.tick} ${Style[kind]}`} style={{top}} />
      {showLabel && (
        <p className={`${Style.label} ${label === 0 ? Style.zeroLabel : ""}`}>
          {label}
        </p>
      )}
    </div>
  );
}

const TickLine = React.memo(TickLineBase);
export default TickLine;
