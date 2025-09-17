import React from "react";
import useFeatureVM from "../../../viewModel/canva/useTracksVM/useFeatureVM";

const FeatureBase = ({ feature }) => {
  const { color, height, top, width, right } = useFeatureVM(feature);

  if(right === null){return null}

  return (
    <div
      style={{
        position: "absolute",
        right: right + "px",
        top: top+"px",
        width: width + "px",
        height: height + "px",
        backgroundColor: color,
      }}
    />
  );
}

const Feature = React.memo(FeatureBase);
export default Feature;