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
//import {getCellValue} from "../../../../apps/HighThroughput2/Browser/Dataset/Sources/filterTable/static";
import {KeyboardArrowRight} from "@mui/icons-material";

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
        // console.log(getAllFlatColumns());
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

        let fileInfo = "";
        const filename = fileName + "." + format;

        if (format === "fasta") {
            const seenPositions = new Set();
            rows.forEach(row => {
                const identifier = row.getValue("activeConformation_name");
                const sequence = row.getValue("regulatoryBindingSite_sequence");
                const len = row.getValue("regulatoryBindingSite_leftPos");
                const ren = row.getValue("regulatoryBindingSite_RightPos");
                const positionKey = `${len},${ren}`;
                if (sequence && !seenPositions.has(positionKey)) {
                    seenPositions.add(positionKey);
                    fileInfo += `>ID:${identifier} LeftPos:${len} RightPos:${ren}\n${sequence}\n`;
                }
            });
        } else {
            //console.log(columns);
            const formatSeparator = {
                csv: ",",
                tsv: "\t",
            }
            //file head
            fileInfo = columns.map(column => column.id).join(formatSeparator[format]) + "\n"
            //create rows file
            rows.forEach(row => {
                fileInfo += columns.map(column => {
                    return row.getValue(column.id)
                }).join(formatSeparator[format]) + "\n";
            });
            console.log(fileInfo); // Log the values for inspection
        }
        // console.log(fileInfo); // Log the values for inspection
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
                <MenuItem onClick={() => {
                    handleDownload("fasta");
                    handleCloseMenu();
                }}>
                    <ListItemIcon>
                        <KeyboardArrowRight fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>FASTA format</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}

//function getColumnName