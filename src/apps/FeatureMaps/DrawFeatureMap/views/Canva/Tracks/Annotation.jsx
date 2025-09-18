import { useStore } from "../../../store";

export default function Annotation({ feature, right, top, width, color, isReverse = false }) {
  const {
    featureMapData
  } = useStore();
  const handleAnnotation = featureMapData.options.handleAnnotation
  return <div style={{right:right+"px", top: 0, position: "absolute"}}>{"O"}</div>;
}
