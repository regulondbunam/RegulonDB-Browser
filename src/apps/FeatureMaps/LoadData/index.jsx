import {Typography, Tooltip, TextField, Button, Link} from "@mui/material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {ACTIONS, FORMATS} from "../static";
import {DEMO_FEATURE_MAP} from "./demo";
import React from "react";



export default function LoadData({state, dispatch, handleToDraw, handleToConfVisual}){
    const fileInputRef = React.useRef(null);

    const handleUpdateData = (raw) => {
        dispatch({ type: ACTIONS.SET_ORIGIN_DATA, raw: raw, format: FORMATS.FEATURE_MAPS })
    }

    const handleUpdateTitle = (title) => {
        dispatch({ type: ACTIONS.SET_TITLE, title: title })
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

    return <div>
        <TitleSection title="Dataset Title" help="help-text-dataset-title"/>
        <TextField fullWidth variant="outlined" size="small"
            value={state.title} onChange={(e) => { handleUpdateTitle(e.target.value); }}
        />
        <TitleSection title="Dataset" help="help-text-datasetContent"
                      subtitle={
                          <div style={{display: 'flex', alignItems: 'center'}}>
                              <Typography variant="subtitle2" >Enter the data in tabular format or upload the file in tsv format. View a  <Link onClick={() => { handleUpdateData(DEMO_FEATURE_MAP) }} >Demo Data </Link> or check help document about <Link >Format</Link></Typography>
                          </div>
                      }
        />
        <TextField fullWidth variant="outlined" size="small" multiline rows={10}
                   value={state.originData.raw}
                   onChange={(e) => { handleUpdateData(e.target.value); }}
        />
        <div style={{display:"flex", justifyContent: "space-between", margin: "5px 0 0 0"}} >
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
                <Button  size='small' variant="contained" color="error" endIcon={<DeleteForeverIcon />} onClick={() => { handleUpdateData("") }} >
                    Clear Data
                </Button>
            </div>
            <div>
                <Button  size='small' variant="outlined" color="secondary" endIcon={<KeyboardDoubleArrowRightIcon/>} sx={{mr:2}}
                    onClick={handleToDraw}
                >
                    Draw whit default configuration
                </Button>
                <Button  size='small' variant="contained" color="secondary" endIcon={<KeyboardArrowRightIcon/>} >
                    Next Step
                </Button>
            </div>
        </div>
    </div>
}

function TitleSection({title="title", help="help", subtitle}){
    return(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
            <div>
                <Typography component="div" variant="subtitle1" >{title}</Typography>
                {subtitle && (<div>{subtitle}</div>)}
            </div>
            <div>
                <Tooltip title={help}>
                    <HelpCenterIcon/>
                </Tooltip>
            </div>
        </div>
    )
}