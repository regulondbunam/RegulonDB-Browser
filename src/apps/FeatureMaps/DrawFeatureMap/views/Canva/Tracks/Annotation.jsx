import { useStore } from "../../../store";

export default function Annotation({
  feature,
  right,
  width,
  color,
  isReverse = false,
}) {
  const { featureMapData } = useStore();
  const { handleAnnotation, trackHeight } = featureMapData.options;
  const { label } = feature;
  if (!handleAnnotation) return null;
  const strand = isReverse ? { top: -3 } : { bottom: -3 };
  const _right = handleAnnotation === "dot" ? right + width / 2 : right;

  const line = ()=>(<div
      style={{
        width: "1px",
        height: ((trackHeight/2)-10)+"px",
        backgroundColor: color,
      }}
  />)

  const annotation = ()=>(<>
    {handleAnnotation === "dot" && (
        <div style={{ width: 10, height: 10, backgroundColor: color, borderRadius: "50%" }} />
    )}
    {handleAnnotation === "label" && (
        <p className={"sequence"} style={{ color: color }}>
          {label}
        </p>
    )}
  </>)

  return (
    <div
      style={{
        ...strand,
        right: _right + "px",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

      }}
    >
      {isReverse ? (
          <>
            {annotation()}
            {line()}
          </>
      ):(
          <>
            {line()}
            {annotation()}
          </>
      )}

    </div>
  );
}
