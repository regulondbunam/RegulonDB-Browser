import React from "react";
//import Style from "./dtt.module.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import Tooltip from "@mui/material/Tooltip";
//import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
//import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
//import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ImageIcon from "@mui/icons-material/Image";
import LandscapeIcon from "@mui/icons-material/Landscape";
import Divider from "@mui/material/Divider";
import { ReImg } from "reimg";
import { REDUCER, ZOOM } from "./static";

export default function Controls({ state, dispatch, initialProps, context }) {
    return (
        <div>
            <ButtonGroup
                variant="contained"
                size="small"
                color="secondary"
            >
                <Tooltip title={"Move to left"}>
            <Button
              onClick={() => dispatch({type: REDUCER.MoveLeft})}
            >
              <ArrowLeftIcon  />
            </Button>
          </Tooltip>
          <Tooltip title={"move to right"}>
            <Button
              onClick={() =>dispatch({type: REDUCER.MoveRight})}
            >
              <ArrowRightIcon  />
            </Button>
          </Tooltip>
          <Tooltip title={"zoom in"}>
            <Button
            disabled={(state.rightEndPosition-state.leftEndPosition) < ZOOM}
            onClick={() =>dispatch({type: REDUCER.ZoomIn})}
            >
              <ZoomInIcon  />
            </Button>
          </Tooltip>
          <Tooltip title={"zoom out"}>
            <Button
            disabled={(state.rightEndPosition-state.leftEndPosition)> 50000}
            onClick={() =>dispatch({type: REDUCER.ZoomOut})}
            >
              <ZoomOutIcon  />
            </Button>
          </Tooltip>

          <Tooltip title={"Reset Graphic"}>
            <Button
              className="iconButton"
              onClick={() =>dispatch({type: REDUCER.Reset, props: initialProps})}
            >
              <RestartAltIcon  />
            </Button>
          </Tooltip>
            </ButtonGroup>
        </div>
    )
}

/*
{context === "gene" && (
            <Tooltip title={"Regulatory region"}>
              <Button
                className="iconButton"
                onClick={() => {
                }}
              >
                {!state.regulatoryRegion ? <ZoomInMapIcon  /> : <ZoomOutMapIcon  />}
              </Button>
            </Tooltip>
          )}
*/