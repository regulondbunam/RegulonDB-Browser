import React, { useMemo, forwardRef, useState } from 'react'
import { Typography, Switch, FormControlLabel, Checkbox, IconButton, Tooltip, Stack, Snackbar, Button, ButtonGroup } from '@mui/material'
import MuiAlert from "@mui/material/Alert";
import { OPTION } from './static'
import ContentCopy from '@mui/icons-material/ContentCopy'
import FilterTable from 'ui-components/Web/FilterTable'
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import FontDownloadIcon from '@mui/icons-material/FontDownload';

export default function Motifs(props) {
    const handleChange = () => { }
    return (
        <div>
            <Typography variant='h4' fontSize={"18px"} sx={{ fontWeight: "400" }} >Motifs</Typography>
            <MotifsOptions {...props} />
            <MotifList {...props} />
        </div>
    )
}

const Alert = forwardRef(
    /**
     * Description placeholder
     *
     * @param {*} props - The props passed by the parent component.
     * @param {*} ref - The ref attribute passed by the parent component
     * @returns {React.JSX}
     */
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    }
);

function MotifList({ dispatch, state, }) {

    const [snackOpen, setSnackOpen] = useState(false);

    const table = useMemo(() => {
        let table = {
            columns: [
                { key: "control", label: "options" },
                { key: "type", label: "Type" },
                { key: "poss", label: "Positions" },
                { key: "notes", label: "Notes" },
                { key: "sequence", label: "Sequence" },

            ],
            data: []
        }
        Object.keys(state.motifs).forEach(key => {
            const motif = state.motifs[key]
            table.data.push({
                control: <div value={motif.sequence}>
                    <div style={{display: "grid", gridTemplateColumns: "auto auto auto"}}>
                        <Tooltip title="copy sequence" placement="left-start" >
                            <Button
                             variant="outlined" size='small'
                            onClick={
                                (e) => {
                                    navigator.clipboard.writeText(motif.sequence);
                                    handleOpenSnack();
                                }}
                        >
                            <ContentCopy />
                        </Button>
                        </Tooltip>
                        <Tooltip title="set color" placement="left-start" >
                            <Button
                             variant="outlined" size='small'
                            onClick={
                                (e) => {
                                    navigator.clipboard.writeText(motif.sequence);
                                    handleOpenSnack();
                                }}
                        >
                            <FontDownloadIcon />
                        </Button>
                        </Tooltip>
                        <Tooltip title="show in sequence" placement="left-start" >
                            <Button
                             variant="outlined" size='small'
                            onClick={
                                (e) => {
                                    navigator.clipboard.writeText(motif.sequence);
                                    handleOpenSnack();
                                }}
                        >
                            {state.showMotifsId.find(id=>id===key) ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
                        </Button>
                        </Tooltip>
                    </div>
                </div>,
                type: motif?.type ? motif.type : "",
                poss: `${motif.leftEndPosition} - ${motif.rightEndPosition}`,
                notes: motif?.note ? motif.note : "",
                sequence: motif?.sequence ? motif.sequence : "",
            })
        })
        return table
    }, [state])


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


function MotifsOptions({ dispatch, state }) {
    /*
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };*/

    const handleChange = () => {
        dispatch({ type: OPTION.viewMotifs })
    }

    const label = { inputProps: { 'aria-label': 'View Motifs' } };

    return (
        <FormControlLabel control={<Switch {...label} checked={state.viewMotifs} onChange={handleChange} />} label="view all motifs" />
    )
}
