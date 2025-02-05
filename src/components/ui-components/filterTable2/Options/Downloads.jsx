import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Download } from '@mui/icons-material'
import { unparse } from "papaparse";
import DataVerifier from '../../utils';
import { getCellValue } from '../static';


export default function Downloads({ state, dispatch, tableName, tableId }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const rows = state.currentData
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDownloadCSV = () => {
        setAnchorEl(null);
        const data = formatTableToData(rows)
        const csv = unparse(data)
        download(csv,tableName+".csv")
    }

    const handleDownloadTSV = () => {
        setAnchorEl(null);
        const data = formatTableToData(rows)
        const csv = unparse(data,{delimiter: "\t"})
        download(csv,tableName+".tsv")
    }

    const formatTableToData =(rows)=>(rows.map((row)=>{
        let newRow = {}
        state.columns.forEach((column)=>{
            if (!column.hide) {
                newRow[column.label] = getCellValue(row,column.label)
            }
        })
        return newRow
    }))

    const download =(fileContent, fileName)=>{
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return (
        <>
            <Tooltip title="download options" >
                <Button onClick={handleClick} size='small' color='secondary' variant="contained" endIcon={<Download />} >
                    Download
                </Button>
            </Tooltip>
            <Menu dense
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDownloadCSV}>
                    <ListItemIcon>
                        <FormatQuoteIcon />
                    </ListItemIcon>
                    CSV format
                </MenuItem>
                <MenuItem onClick={handleDownloadTSV} >
                    <ListItemIcon>
                        <KeyboardTabIcon />
                    </ListItemIcon>
                    TSV format
                </MenuItem>
            </Menu>
        </>
    )
}
