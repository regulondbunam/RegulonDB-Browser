import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SortAZ, SortZA } from './Icons';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { REDUCER_TYPES, getCellValue } from '../../static';
import Filters from './filters';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { setOnlyContent } from './filters/onlyContent';
import DataVerifier from '../../../utils';

export default function Options({ state, column, dispatch, index, tableId }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleHideColumn = () => {
        dispatch({ type: REDUCER_TYPES.hideColumn, value: !column.hide, columnIndex: index })
    }
    const handleCopyColumn = () => {
        const text = getColumnValues(state,column).join("\n")
        navigator.clipboard.writeText(text)
    }

    const handleSortAZ = () => {
        const newData = state.currentData.sort((a, b) => {
            let valueA = a[column.label] ? a[column.label] : "zzz"
            valueA = valueA.toLowerCase();
            let valueB = b[column.label] ? b[column.label] : "zzz"
            valueB = valueB.toLowerCase();

            if (valueA > valueB) {
                return 1;
            } else if (valueA < valueB) {
                return -1;
            } else {
                return 0;
            }
        });
        dispatch({ type: REDUCER_TYPES.updateData, newData: newData })
    }

    const handleSortZA = () => {
        const newData = state.currentData.sort((a, b) => {
            let valueA = a[column.label] ? a[column.label] : ""
            valueA = valueA.toLowerCase();
            let valueB = b[column.label] ? b[column.label] : ""
            valueB = valueB.toLowerCase();

            if (valueA < valueB) {
                return 1;
            } else if (valueA > valueB) {
                return -1;
            } else {
                return 0;
            }
        });
        dispatch({ type: REDUCER_TYPES.updateData, newData: newData })
    }

    const handleShowOnlyContent = () => {
        setOnlyContent(column.label,column.isOnlyContent,index,state,dispatch)
    }



    return (
        <Box
            sx={{
                backgroundColor: !open ? "#b5b5b5" : "#f9f9f9",
                ":hover": {
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer"
                }
            }}
        >
            <ArrowDropDownIcon onClick={handleClick} sx={{ fontSize: 20 }} />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    ".MuiMenu-list": {
                        paddingTop: 0,
                        borderRadius: "4px",
                        border: "1px solid rgba(31, 61, 78, 0.5)"
                    }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: "center" }}>
                    <ButtonGroup size='small' aria-label="column options" sx={{ borderRadius: 0, m: 1 }} >
                        <Tooltip title="sort A to Z">
                            <Button sx={{ borderRadius: 0 }} onClick={handleSortAZ} ><SortAZ /></Button>
                        </Tooltip>
                        <Tooltip title="sort Z to A">
                            <Button sx={{ borderRadius: 0 }} onClick={handleSortZA} ><SortZA /></Button>
                        </Tooltip>
                        <Tooltip title="Display only those with content">
                            <Button sx={{ borderRadius: 0 }} onClick={handleShowOnlyContent} >{column.isOnlyContent ? <BookmarkIcon /> : <BookmarkBorderIcon />}</Button>
                        </Tooltip>
                        <Tooltip title="copy column" >
                            <Button sx={{ borderRadius: 0 }} onClick={handleCopyColumn} ><ContentCopyIcon /></Button>
                        </Tooltip>
                    </ButtonGroup>
                    <Divider orientation="vertical" flexItem />
                    <ButtonGroup size='small' aria-label="column options" sx={{ borderRadius: 0, m: 1 }} >
                        <Tooltip title="hide column">
                            <Button sx={{ borderRadius: 0 }} onClick={handleHideColumn} ><VisibilityOffIcon /></Button>
                        </Tooltip>
                    </ButtonGroup>
                </Box>
                {open !== null && (
                    <Filters handleClose={handleClose} state={state} column={column} dispatch={dispatch} index={index} tableId={tableId} />
                )}

            </Menu>

        </Box>
    )
}

function getColumnValues(state, column) {
    const data = []
    state.currentData.forEach((row, index) => {
        const value = getCellValue(row, column.label)
        if (DataVerifier.isValidValue(value)) {
            data.push(value + "")
        }
    })
    console.log(data);
    return data
}

/*

*/