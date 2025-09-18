import React from "react";
import useFeatureVM from "../../../viewModel/canva/useTracksVM/useFeatureVM";
import ToolTipFeature from "./Tooltip"
import Annotations from "./Annotation"
import {Box, Tooltip} from "@mui/material";

const isReverse = (strand = "")=>{
  return strand.toUpperCase() === "R" || strand.toUpperCase() === "REVERSE"
}

const FeatureBase = ({ feature }) => {
  const { color, height, top, width, right } = useFeatureVM(feature);
  if(right === null){return null}

  return (
    <div>
      <Annotations feature={feature} color={color} isReverse={isReverse(feature.strand)} width={width} right={right} top={top} />
      <Tooltip title={<ToolTipFeature feature={feature} />} arrow placement={isReverse(feature.strand) ? "top" : "bottom"}>
        <Box
          sx={{
            position: "absolute",
            display: 'inline-flex',
            right: right + "px",
            top: top+"px",
            width: width + "px",
            height: height + "px",
            backgroundColor: color,
          }}
        />
      </Tooltip>
    </div>
  );
}

const Feature = React.memo(FeatureBase);
export default Feature;