import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ButtonGroup, Tooltip, Button, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material"
import { TextIncrease, TextDecrease, RestartAlt, Straighten, FileDownload, ContentCopy, Image } from "@mui/icons-material"


export default function Controls({ state, sequence, dispatch, drawPlaceId, name }) {

    const handleZoomIn = () => {
        if (state.bpWidth < 16) {
            console.log(state.canvas);
            state.canvas.setFontSize(22)
           // dispatch({ bpWidth: state.bpWidth + 0.05 })
        }
    }

    const handleZoomOut = () => {
        if (state.bpWidth > 5) {
            dispatch({ zoom: state.zoom - 0.05 })
        }
    }

    const handleReset = () => {
        dispatch({ bpWidth: 8, measure: false })
    }

    const handleMeasure = () => {
        dispatch({ measure: !state.measure })
    }

    return (
        <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            variant="outlined"
            size="small"
            color="secondary"
        >
            <Button onClick={handleZoomIn} ><TextIncrease /></Button>
            <Button onClick={handleZoomOut}><TextDecrease /></Button>
            <Tooltip title={"reset graphic"}>
                <Button onClick={handleReset} ><RestartAlt /></Button>
            </Tooltip>
            {state.measure && (
                <Tooltip title={"show measure"}>
                    <Button onClick={handleMeasure} ><Straighten /></Button>
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);

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
                    <FileDownload />
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
                        <Image fontSize="small" />
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