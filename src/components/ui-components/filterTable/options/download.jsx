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
                // console.log(row.original.id);
                let identifier = row.original.id;
                let tfName = fileName;
                let riFunction = row.getValue("regulatoryInteraction_function");
                let regulatedEntity = row.getValue("regulatedEntity_type");
                let promoterName = "";
                let distToPromoter = "";
                if (regulatedEntity === "promoter"){
                    promoterName = row.getValue("regulatedEntity_name");
                    distToPromoter = row.getValue("regulatoryInteraction_distanceTo_promoter");
                }
                let distToGene  = row.getValue("regulatoryInteraction_distanceTo_gene");
                let len = row.getValue("regulatoryBindingSite_leftPos");
                let ren = row.getValue("regulatoryBindingSite_RightPos");
                let confidenceLvl = row.getValue("confidenceLevel");
                const strandLetter = row => {
                    const strand = row.getValue("regulatoryBindingSite_strand");
                    return strand === "forward" ? "F" : strand === "reverse" ? "R" : "";
                }

                let sequence = row.getValue("regulatoryBindingSite_sequence");

                let positionKey = `${len},${ren}`;
                if (sequence && !seenPositions.has(positionKey)) {
                    seenPositions.add(positionKey);
                    const formatedID = identifier.replace(/^ri_\d+_|_.*$/g, '');
                    fileInfo += `>${formatedID};\tTF:${tfName};\tFunction:${riFunction};\t` +
                    (promoterName ? ` Promoter:${promoterName};\tDistToProm:${distToPromoter};\t` :'') +
                    ` DistToGene:${distToGene};\tLeftPos:${len};\tRightPos:${ren};\tStrand:${strandLetter(row)};\tConfidenceLevel:${confidenceLvl}\n${sequence}\n`;

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
            //create a row file
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