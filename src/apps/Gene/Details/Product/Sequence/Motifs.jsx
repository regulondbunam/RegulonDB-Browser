import React, { useMemo, forwardRef, useState } from 'react'
import { Typography, Switch, FormControlLabel, Checkbox, IconButton, Tooltip, Stack, Snackbar, Button, ButtonGroup, Box } from '@mui/material'
import MuiAlert from "@mui/material/Alert";
import { OPTION } from './static'
import ContentCopy from '@mui/icons-material/ContentCopy'
import FilterTable from 'ui-components/Web/FilterTable'
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import ColorPicker from 'ui-components/Web/ColorPicker';

export default function Motifs(props) {
    return (
        <div>
            <Typography variant='h4' fontSize={"18px"} sx={{ fontWeight: "400" }} >Motifs</Typography>
            <MotifsOptions {...props} />
            <MotifList {...props} />
        </div>
    )
}


function MotifList({ dispatch, state, }) {

    const handleChangeColor = (color, id) => {
        if (state.showMotifsId.find(motifId => motifId === id)) {
            const spanMotif = document.getElementById("motif_" + id)
            if (spanMotif) {
                spanMotif.style.backgroundColor = color
            }
        }
    }

    const handleHighlightMotif = (id,color) => {
        const spanMotif = document.getElementById("motif_" + id)
        if (spanMotif) {
            spanMotif.style.backgroundColor = color
        }
        dispatch({ type: OPTION.highlightMotif, id: id })

    }
    const unHandleHighlightMotif = (id) => {
        const spanMotif = document.getElementById("motif_" + id)
        if (spanMotif) {
            spanMotif.style.backgroundColor = 'inherit'
        }
        dispatch({ type: OPTION.unHighlightMotif, id: id })
    }

    const [snackOpen, setSnackOpen] = useState(false);

    const handleChange = () => { }

    const handleOpenSnack = () => {
        setSnackOpen(true);
    };
    const handleCloseSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackOpen(false);
    };

    let table = {
        columns: [
            { key: "control", label: "options", options: false },
            { key: "type", label: "Type" },
            { key: "poss", label: "Positions" },
            { key: "notes", label: "Notes" },
            { key: "sequence", label: "Sequence" },
        ],
        data: []
    }
    Object.keys(state.motifs).forEach(key => {
        const motif = state.motifs[key]
        const showMotif = state.showMotifsId.find(id => id === key)
        table.data.push({
            control: <div value={motif.sequence}>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gap: "10px" }}>
                    <Tooltip title="show in sequence" placement="bottom" >
                        <Button
                            variant="outlined" size='small'
                            sx={{
                                minWidth: "50px"
                            }}
                            onClick={() => {
                                if (!showMotif) {
                                    handleHighlightMotif(motif._id, motif.color)
                                } else {
                                    unHandleHighlightMotif(motif._id)
                                }
                            }}
                        >
                            {showMotif ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
                        </Button>
                    </Tooltip>
                    <Tooltip title="copy motif sequence" placement="bottom" >
                        <Button
                            variant="outlined" size='small'
                            sx={{
                                minWidth: "50px"
                            }}
                            onClick={
                                (e) => {
                                    navigator.clipboard.writeText(motif.sequence);
                                    handleOpenSnack();
                                }}
                        >
                            <ContentCopy />
                        </Button>
                    </Tooltip>
                    <Tooltip title="set color" placement="bottom" >
                        <Box>
                            <ColorPicker setColor={(color) => { handleChangeColor(color, motif._id) }} color={motif.color} />
                        </Box>
                    </Tooltip>

                </div>
            </div>,
            type: motif?.type ? motif.type : "",
            poss: `${motif.leftEndPosition} - ${motif.rightEndPosition}`,
            notes: motif?.note ? motif.note : "",
            sequence: motif?.sequence ? motif.sequence : "",
        })
    })

    return (
        <div>
            <FilterTable {...table} tableName='' selection='row' />
            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={snackOpen}
                    autoHideDuration={1000}
                    onClose={handleCloseSnack}
                >
                    <Alert
                        onClose={handleCloseSnack}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Sequence copied to clipboard!
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}


const Alert = forwardRef(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    }
);

function MotifsOptions({ dispatch, state }) {

    const handleChange = () => {
        dispatch({ type: OPTION.viewMotifs })
    }

    const label = { inputProps: { 'aria-label': 'View Motifs' } };

    return (
        <FormControlLabel control={<Switch {...label} checked={state.viewMotifs} onChange={handleChange} />} label="view all motifs" />
    )
}
