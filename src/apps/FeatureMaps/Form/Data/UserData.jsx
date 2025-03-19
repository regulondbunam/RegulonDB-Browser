import React, { useState } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { DEMO_FEATURE_MAP } from './demo';
import { ACTIONS, FORMATS } from "../../static"



export default function UserData({
    state,
    dispatch,
    handleToDraw
}) {
    const fileInputRef = React.useRef(null);
    const [open, setOpen] = useState(false);


    const handleUpdateData = (raw) => {
        dispatch({ type: ACTIONS.SET_ORIGIN_DATA, raw: raw, format: FORMATS.FEATURE_MAPS })
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                handleUpdateData(e.target.result)
            };
            reader.readAsText(file);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFormatClick = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };

    return (
        <div>
            <div style={{display:"flex", justifyContent: "space-between", margin: "0 0 8px 0"}} >
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleButtonClick}
                        style={{ marginRight: '10px' }}
                        size='small'
                        endIcon={<FileUploadIcon />}
                    >
                        Upload Data
                    </Button>
                    <input
                        type="file"
                        accept=".txt"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                </div>
                <div>
                    <Button variant="outlined" color="secondary" style={{ marginRight: '10px' }}
                        onClick={() => { handleUpdateData(DEMO_FEATURE_MAP) }}
                    >
                        DEMO
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: 'auto' }}
                        size='small'
                        onClick={handleFormatClick}
                    >
                        Format Info
                    </Button>
                </div>
            </div>
            <div>
                <TextField
                    label="Data"
                    multiline
                    rows={8}
                    variant="outlined"
                    fullWidth
                    value={state.originData.raw}
                    onChange={(e) => { handleUpdateData(e.target.value); }}
                />
            </div>
            <div style={{marginTop: "15px"}} >
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    value={state.title}
                    onChange={(e) => {
                        dispatch({ type: ACTIONS.SET_TITLE, title: e.target.value });
                    }}
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Format Data</DialogTitle>
                <DialogContent>
                    Manual Format
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
