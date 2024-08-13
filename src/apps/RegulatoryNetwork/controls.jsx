import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ImageIcon from '@mui/icons-material/Image';
import LandscapeIcon from '@mui/icons-material/Landscape';
import Menu from '@mui/material/Menu';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { saveAs } from "file-saver";

export default function Controls({ regulonID, dispatch, state, cytoscape, OPTIONS, ZOOM, LAYOUTS, handleReset }) {

    const handleZoomIn = () => {
        dispatch({ type: OPTIONS.zoom, value: state.zoom + ZOOM.INCREMENT })
    };
    const handleZoomOut = () => {
        dispatch({ type: OPTIONS.zoom, value: state.zoom - ZOOM.INCREMENT })
    };



    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Regulatory Network</h2>
            <ButtonGroup variant="contained" size='small' color='secondary' aria-label="outlined primary button group">
                <LayoutSelector dispatch={dispatch} state={state} LAYOUTS={LAYOUTS} OPTIONS={OPTIONS} />
                <Tooltip title="zoom in">
                    <Button onClick={handleZoomIn}>
                        <ZoomInIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="zoom out">
                    <Button onClick={handleZoomOut}>
                        <ZoomOutIcon onClick={handleZoomOut} />
                    </Button>
                </Tooltip>
                <Tooltip title="Reset Diagram">
                    <Button onClick={handleReset}>
                        <RestartAltIcon />
                    </Button>
                </Tooltip>
                <DownloadOptions cytoscape={cytoscape} regulonID={regulonID} />
            </ButtonGroup>
        </div>
    );
}

function LayoutSelector({ dispatch, state, LAYOUTS, OPTIONS }) {

    const handleLayoutChange = (e) => {
        dispatch({ type: OPTIONS.layout, value: e.target.value })
    };

    return (
        <FormControl sx={{
            ".MuiInputBase-root": { height: "25px" }
        }} >
            <InputLabel sx={{ fontSize: 14 }} >Layout</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={state.layout}
                label="Layout"
                onChange={handleLayoutChange}
            >
                {Object.keys(LAYOUTS).map((key, index) => {
                    const layout = LAYOUTS[key]
                    return (
                        <MenuItem
                            key={"option_" + index + "_" + layout}
                            value={layout}
                        >
                            {layout}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    );
}

function DownloadOptions({ cytoscape, regulonID }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);


    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const saveAsPng = () => {
        saveAs(cytoscape.png(), "regulatoryNetwork_" + regulonID + ".png");
    };

    const saveAsSvg = () => {
        const svgContent = cytoscape.svg({ scale: 1, full: true });
        const blob = new Blob([svgContent], {
            type: "image/svg+xml;charset=utf-8",
        });
        saveAs(blob, "regulatoryNetwork_" + regulonID + ".svg");
    };

    const saveAsJson = () => {
        var jsonBlob = new Blob([JSON.stringify(cytoscape.json())], {
            type: "application/javascript;charset=utf-8",
        });
        saveAs(jsonBlob, "regulatoryNetwork_" + regulonID + ".json");
    };

    return (
        <>
            <Tooltip title="Download Options" >
                <Button
                    id="demo-customized-button"
                    disableElevation
                    onClick={handleClickMenu}
                >
                    <FileDownloadIcon />
                </Button>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
            >

                <MenuItem onClick={() => {
                    saveAsPng();
                    handleCloseMenu();
                }} >
                    <ListItemIcon>
                        <ImageIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>PNG format</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    saveAsSvg()
                    handleCloseMenu();
                }} >
                    <ListItemIcon>
                        <LandscapeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>SVG format</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        saveAsJson();
                        handleCloseMenu();
                    }}
                >
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cytoscape format</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}
