import React, { useReducer } from 'react';
import Format from './Format'
import { Promoter, Measure, Box, Terminator } from './features';
import StraightenIcon from '@mui/icons-material/Straighten';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import Tooltip from "@mui/material/Tooltip";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import html2canvas from 'html2canvas';
import ContentCopy from '@mui/icons-material/ContentCopy';



const reducer = (states, action) => {
    return { ...states, ...action }
}

export default function LinealSequence({
    sequenceId,
    sequence = "",
    color = false,
    features = [],
    height = 30,
    measure = false,
    name = "sequence",
    controls = true,
    zoom = 1.5
}) {
    const initialStates = {
        zoom: zoom,
        measure: measure,
    }
    let isMeasure = features.find(f => f.type === "measure")

    const [states, dispatch] = useReducer(reducer, initialStates);
    if (!sequence) { return null }
    const formatSequence = new Format(sequence, "")
    const width = sequence.length * 8.41
    const middleHeight = height / 2
    let zoomStyles={}
    if(controls){
        zoomStyles = {
            zoom: states.zoom,
            MsZoom: states.zoom,
            WebkitZoom: states.zoom,
            MozTransform: `scale(${states.zoom},${states.zoom})`,
        }
    }
    const divStyle = {
        height: height + 10,
        width: `${width}px`,
        overflow: "auto",
        position: "relative",
        ...zoomStyles,
    }
    const sequenceStyle = {
        position: "absolute",
        top: `${middleHeight - 7.75}px`
    }
    return (
        <div style={{ display: "flex", alignItems: "flex-start" }} >
            {controls && (
                <div style={{ marginRight: "3px", }} >
                    <Controls states={states} dispatch={dispatch}
                        sequence={sequence} drawPlaceId={`sequencePanel_${sequenceId}`} name={name}
                        isMeasure={isMeasure}
                    />
                </div>
            )}
            <div id={`sequencePanel_${sequenceId}`} style={divStyle}>
                {
                    features.map((feature, index) => {
                        const featureStyle = {
                            position: "absolute",
                            top: `0px`,
                            left: `${feature.sequencePosition * 8.41}px`
                        }
                        switch (feature.type) {
                            case "promoter":
                                return <Promoter {...feature} featureStyle={featureStyle} height={middleHeight - 7.75} width={30} />
                            case "measure":
                                if (states.measure) {
                                    return <Measure featureStyle={featureStyle} id={feature.id} label={feature.label} height={height} width={8.41} />
                                }
                                return null
                            case "box":
                                return <Box featureStyle={featureStyle} id={feature.id} label={feature.label} height={height} width={feature.boxWidth} />
                            case "terminator":
                                return <Terminator featureStyle={featureStyle} id={feature.id} label={feature.label} height={height} width={(feature.length+1)*8.41} />
                            default:
                            return null
                        }
                    })
                }
                <div style={sequenceStyle} >
                    <p id={`sequence_${sequenceId}_p`} className="rdb_p_sequence" dangerouslySetInnerHTML={{ __html: formatSequence.getLinealFormat({ sequenceId: sequenceId, color: color }) }} />
                </div>
            </div>
        </div>
    )
}


function Controls({ states, sequence, dispatch, drawPlaceId, name, isMeasure }) {

    const handleZoomIn = () => {
        if (states.zoom < 2) {
            dispatch({ zoom: states.zoom + 0.05 })
        }
    }

    const handleZoomOut = () => {
        if (states.zoom > 1) {
            dispatch({ zoom: states.zoom - 0.05 })
        }
    }

    const handleReset = () => {
        dispatch({ zoom: 1.5, measure: false })
    }

    const handleMeasure = () => {
        dispatch({ measure: !states.measure })
    }

    return (
        <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            variant="outlined"
            size="small"
            color="secondary"
        >
            <Tooltip placement="left" title="zoom in">
                <Button onClick={handleZoomIn} ><ZoomInIcon /></Button>
            </Tooltip>

            <Tooltip placement="left" title={"zoom out"}>
                <Button onClick={handleZoomOut}><ZoomOutIcon /></Button>
            </Tooltip>
            <Tooltip placement="left" title={"reset graphic"}>
                <Button onClick={handleReset} ><RestartAltIcon /></Button>
            </Tooltip>
            {isMeasure && (
                <Tooltip placement="left" title={"show measure"}>
                    <Button onClick={handleMeasure} ><StraightenIcon /></Button>
                </Tooltip>
            )}

            <DownloadOptions
                drawPlaceId={drawPlaceId}
                name={name}
                sequence={sequence}
            />
        </ButtonGroup>
    );
}


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function DownloadOptions({ drawPlaceId, name, sequence }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [snackOpen, setSnackOpen] = React.useState(false);

    const handleOpenSnack = () => {
        setSnackOpen(true);
    };
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const _downloadPNG = () => {
        let element = document.getElementById(drawPlaceId);
        html2canvas(element).then(function (canvas) {
            let link = document.createElement("a");
            document.body.appendChild(link);
            link.download = `${name}.jpg`;
            link.href = canvas.toDataURL();
            link.target = '_blank';
            link.click();
        });
    };

    return (
        <React.Fragment>
            <Tooltip title={"Download options"} >
                <Button variant="outlined" color="secondary" size="small" onClick={handleClick}>
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

                <MenuItem
                    onClick={() => {
                        navigator.clipboard.writeText(sequence);
                        handleOpenSnack();
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>copy sequence</ListItemText>

                </MenuItem>
                <Divider />
                <MenuItem onClick={_downloadPNG}>
                    <ListItemIcon>
                        <ImageIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>JPG file</ListItemText>
                </MenuItem>
            </Menu>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={snackOpen} autoHideDuration={1000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                        Sequence copied to clipboard!
                    </Alert>
                </Snackbar>
            </Stack>
        </React.Fragment>
    );
}