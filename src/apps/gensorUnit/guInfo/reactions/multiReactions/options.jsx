import React, { useState } from "react";
import { fullScreen } from "../../../../../components/layout/Layout";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//import FullscreenIcon from "@mui/icons-material/Fullscreen";
//import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
//import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DataObjectIcon from "@mui/icons-material/DataObject";
import Menu from "@mui/material/Menu";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ImageIcon from "@mui/icons-material/Image";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Search from "./search";

export default function Options(props) {
  const { heightCover } = props;
  return (
    <div
      className="GuOptions"
      style={{ position: "relative", top: `${heightCover}px`, zIndex: "10", backgroundColor:"#f4f5f5ad" }}
    >
      <div></div>
      <Search {...props} />
      <MapControls {...props} />
    </div>
  );
}

function MapControls({ cy, LAYOUTS = {}, name, heightCanva, setHeightCanva }) {
  const [layout, setLayout] = useState(LAYOUTS.dagre);
  const [isFullScreen, setFullScreen] = useState(false);

  const handleLayout = (value) => {
    setLayout(value);
    cy.layout(value).run();
  };

  const handleZoomIn = () => {
    cy.zoom(cy.zoom() + 0.1);
  };

  const handleZoomOut = () => {
    cy.zoom(cy.zoom() - 0.1);
  };

  const handleReset = () => {
    cy.reset();
    cy.zoom(0.5);
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    if (!isFullScreen) {
      fullScreen(true);
      setHeightCanva("100vh")
    } else {
      fullScreen(false);
      setHeightCanva(heightCanva)
      window.scrollTo({ top: 0 });
    }
    setFullScreen(!isFullScreen);
  };

  return (
    <div style={{backgroundColor: "white"}} >
      <Tooltip title="select diagram layout" placement="top">
        <FormControl size="small" variant="standard">
          <Select
            labelId="demo-select-small-label"
            size="small"
            id="demo-select-small"
            value={layout}
            label="Age"
            onChange={(e) => {
              handleLayout(e.target.value);
            }}
          >
            {Object.keys(LAYOUTS).map((lay, index) => {
              return (
                <MenuItem
                  key={"layoutSet_" + lay + "_" + index}
                  value={LAYOUTS[lay]}
                >
                  {LAYOUTS[lay].name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Tooltip>
      <ButtonGroup size="small" color="secondary" variant="contained">
        <Tooltip title="Zoom In" placement="top">
          <Button onClick={handleZoomIn}>
            <ZoomInIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Zoom Out" placement="top">
          <Button onClick={handleZoomOut}>
            <ZoomOutIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Reset Map" placement="top">
          <Button onClick={handleReset}>
            <RestartAltIcon />
          </Button>
        </Tooltip>
        <Tooltip
          title={isFullScreen ? "Exit fullscreen" : "Full screen"}
          placement="top"
        >
          <Button onClick={handleFullScreen}>
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </Button>
        </Tooltip>
        <DownloadOptions cy={cy} name={name} />
      </ButtonGroup>
    </div>
  );
}

function DownloadOptions({ cy, variant = "contained", name = "GUmap" }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const _downloadPNG = () => {
    let a = document.createElement("a");
    a.href = "data:image/png;base64," + cy.png({ output: "base64", scale: 2 }); //Image Base64 Goes here
    a.download = name + ".png"; //File name Here
    a.click(); //Downloaded file
    a.remove();
  };
  const _downloadJSON = () => {
    let a = document.createElement("a");
    const text = `{"data":${JSON.stringify(cy.json())}}`;
    a.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    a.setAttribute("download", name + ".json");
    a.click(); //Downloaded file
    a.remove();
  };
  //const _downloadSVG = () => {};

  return (
    <React.Fragment>
      <Tooltip title={"Download options"}>
        <Button
          variant={variant}
          color="secondary"
          size="small"
          onClick={handleClick}
        >
          <FileDownloadIcon />
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
        <MenuItem onClick={_downloadJSON}>
          <DataObjectIcon /> JSON cytoscape file
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

/**
 * <Tooltip title="view full map" placement="top">
          <Button>
            <FullscreenIcon />
          </Button>
        </Tooltip>
 */
