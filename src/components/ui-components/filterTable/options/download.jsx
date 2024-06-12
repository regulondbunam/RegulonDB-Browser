import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
//import DataObjectIcon from '@mui/icons-material/DataObject';
import DownloadIcon from '@mui/icons-material/Download';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DataVerifier from '../../utils';

export function Download({
    getAllFlatColumns,
    fileName = "data",
    preGlobalFilteredRows = [],
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDownload = (format) => {
        console.log(getAllFlatColumns());
        const rows = preGlobalFilteredRows().rows
        //check rows
        if (!DataVerifier.isValidArray(rows)) {
            return null
        }
        //check columns is visible
        let columns = []
        if (DataVerifier.isValidArray(getAllFlatColumns())) {
            getAllFlatColumns().forEach(column => {
                if (column.columns.length === 0 && column.getIsVisible()) {
                    columns.push(column)
                }
            });
        }
        //console.log(columns);
        const formatSeparator = {
            csv: ",",
            tsv: "\t",
        }
        //file head
        let fileInfo = columns.map(column => column.id).join(formatSeparator[format]) + "\n"
        const filename = fileName + "." + format
        //create rows file
        rows.forEach(row => {
            fileInfo += columns.map(column => {
                return row.getValue(column.id)
            }).join(formatSeparator[format]) + "\n";
        });
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileInfo));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return (
        <>
            <Tooltip title="Download options" >
                <Button
                    id="demo-customized-button"
                    variant="contained"
                    color='secondary'
                    disableElevation
                    onClick={handleClickMenu}
                    sx={{ height: 30 }}
                    endIcon={<DownloadIcon />}
                >
                    Download
                </Button>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
            >
                <MenuItem
                    onClick={() => {
                        handleDownload("tsv");
                        handleCloseMenu();
                    }}
                >
                    <ListItemIcon>
                        <KeyboardTabIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>tsv format</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleDownload("csv");
                        handleCloseMenu();
                    }}
                >
                    <ListItemIcon>
                        <FormatQuoteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>csv format</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}

//function getColumnName