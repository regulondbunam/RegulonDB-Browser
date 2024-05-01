import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Check from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { REDUCER_TYPES } from '../static';

export default function HideColumns({ state, dispatch, tableName, tableId }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleHideColumn = (column,index)=>{
        dispatch({type: REDUCER_TYPES.hideColumn, value: !column.hide, columnIndex: index})
    }
    return (
        <>
            <Tooltip title="download options" >
                <Button onClick={handleClick} size='small' color='secondary' variant="contained" endIcon={<VisibilityIcon />} >
                    view columns
                </Button>
            </Tooltip>
            <Menu dense
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {state.columns.map((column,index) => (
                    <MenuItem onClick={()=>{handleHideColumn(column,index)}} >
                        <ListItemIcon key={"HideOption_"+column.key} >
                            {!column.hide && (
                                <Check />
                            )}
                        </ListItemIcon>
                        {column.label}
                    </MenuItem>
                ))}

            </Menu>
        </>
    )
}
