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

export default function Controls({ geneticElements, name, state, dispatch, idTrack, initialProps, context }) {
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
              <ArrowLeftIcon sx={{color: "white"}} />
            </Button>
          </Tooltip>
          <Tooltip title={"move to right"}>
            <Button
              onClick={() =>dispatch({type: REDUCER.MoveRight})}
            >
              <ArrowRightIcon  sx={{color: "white"}} />
            </Button>
          </Tooltip>
          <Tooltip title={"zoom in"}>
            <Button
            disabled={(state.rightEndPosition-state.leftEndPosition) < ZOOM}
            onClick={() =>dispatch({type: REDUCER.ZoomIn})}
            >
              <ZoomInIcon  sx={{color: "white"}} />
            </Button>
          </Tooltip>
          <Tooltip title={"zoom out"}>
            <Button
            disabled={(state.rightEndPosition-state.leftEndPosition)> 50000}
            onClick={() =>dispatch({type: REDUCER.ZoomOut})}
            >
              <ZoomOutIcon  sx={{color: "white"}}  />
            </Button>
          </Tooltip>

          <Tooltip title={"Reset Graphic"}>
            <Button
              className="iconButton"
              onClick={() =>dispatch({type: REDUCER.Reset, initialProps: initialProps})}
            >
              <RestartAltIcon  sx={{color: "white"}} />
            </Button>
          </Tooltip>
          <DownloadOptions
            idTrack={idTrack}
            canvaId={"canvas_"+idTrack}
            name={name}
            geneticElements={geneticElements}
          />
            </ButtonGroup>
        </div>
    )
}

function DownloadOptions({ variant, idTrack, canvaId, name, geneticElements }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const _downloadPNG = () => {
      let svg = document.getElementById(canvaId);
      ReImg.fromSvg(svg).toCanvas(function (canvas) {
        let url = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.download = name + ".png";
        link.href = url;
        link.click();
      });
    };
  
    const _downloadSVG = () => {
      const svg = document.getElementById(idTrack).innerHTML;
      const blob = new Blob([svg.toString()]);
      const element = document.createElement("a");
      element.download = name + ".svg";
      element.href = window.URL.createObjectURL(blob);
      element.click();
      element.remove();
    };
  
    const _downloadGQL = () => {
      const element = document.createElement('a');
      const text = `{"data":${JSON.stringify(geneticElements)}}`
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', name+".json");
  
      element.style.display = 'none';
      document.body.appendChild(element);
  
      element.click();
  
      document.body.removeChild(element)
      console.log(geneticElements);
    }
  
    return (
      <React.Fragment>
        <Tooltip title={"Download options"} >
          <Button variant={variant} color="secondary" size="small" onClick={handleClick}>
            <FileDownloadIcon  sx={{color: "white"}} />
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={_downloadPNG}>
            <ImageIcon /> PNG file
          </MenuItem>
          <MenuItem onClick={_downloadSVG}>
            <LandscapeIcon /> SVG file
          </MenuItem>
          <Divider />
          <MenuItem onClick={_downloadGQL}>Data JSON</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }