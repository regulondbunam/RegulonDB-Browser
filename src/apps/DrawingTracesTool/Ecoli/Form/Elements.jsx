import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Typography, Button, Box, Tooltip, TextField, FormControl, InputLabel, Select, MenuItem, Menu, MenuList, ListItemIcon } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Check from "@mui/icons-material/Check";

import {
    RANGE,
    secureRange,
    STATE_FORM,
    SECURE_RANGE,
    FORM_ACTIONS,
    STRAND,
    GE_DEFs,
} from "../definitions";

export default function Elements(props) {
    if (isMobile) {
        return <Selector {...props} />
    }
    return <List {...props} />
}

function List({ state, dispatch }) {
    const [isAll, setIsAll] = useState(false);

    const handleSelectAllGeneticElement = () => {
        let elements = [];
        if (isAll) {
            GE_DEFs.forEach((ge) => {
                elements.push({ ...ge, isCheck: false });
            });
        } else {
            GE_DEFs.forEach((ge) => {
                elements.push({ ...ge, isCheck: true });
            });
        }
        dispatch({ type: FORM_ACTIONS.setGeneticsElements, value: elements });
        setIsAll(!isAll);
    };

    const handleSelectGeneticElement = (element, index) => {
        let geElements = [...state.objectType];
        geElements[index] = { ...element, isCheck: !element.isCheck };
        dispatch({ type: FORM_ACTIONS.setGeneticsElements, value: geElements });
        if (state.draw) {
            dispatch({ type: FORM_ACTIONS.refresh });
            setTimeout(() => {
                dispatch({ type: FORM_ACTIONS.draw });
            }, 200);
        }
    };
    return (
        <div style={{ marginLeft: "10px" }} >
            <Tooltip title="Select the genetic elements to show them in the drawing.">
                <Typography variant="normal" display="block">
                    Display Genetic Elements
                </Typography>
            </Tooltip>

            <div style={{ marginLeft: "5px" }}>
                <MenuList dense
                    sx={{
                        columns: 2
                    }}
                >
                    <MenuItem onClick={handleSelectAllGeneticElement}>
                        <ListItemIcon>{isAll ? <Check /> : <></>}</ListItemIcon>
                        ALL
                    </MenuItem>
                    {state.objectType.map((element, index) => {
                        return (
                            <MenuItem
                                key={element.label + "_" + index}
                                onClick={() => {
                                    handleSelectGeneticElement(element, index);
                                }}
                            >
                                <ListItemIcon>
                                    {element.isCheck && <Check />}
                                </ListItemIcon>
                                {element.label}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </div>
        </div>
    )
}

function Selector({ state, dispatch }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isAll, setIsAll] = useState(false);
    const geMenu = Boolean(anchorEl);
    const handleGEMenu = (event) => {
        if (anchorEl === null) {
            setAnchorEl(event.currentTarget);
        } else {
            setAnchorEl(null);
        }
    };
    const handleCloseGEMenu = (event) => {
        setAnchorEl(null);
    };

    const handleSelectAllGeneticElement = () => {
        let elements = [];
        if (isAll) {
            GE_DEFs.forEach((ge) => {
                elements.push({ ...ge, isCheck: false });
            });
        } else {
            GE_DEFs.forEach((ge) => {
                elements.push({ ...ge, isCheck: true });
            });
        }
        dispatch({ type: FORM_ACTIONS.setGeneticsElements, value: elements });
        setIsAll(!isAll);
    };

    const handleSelectGeneticElement = (element, index) => {
        let geElements = [...state.objectType];
        geElements[index] = { ...element, isCheck: !element.isCheck };
        dispatch({ type: FORM_ACTIONS.setGeneticsElements, value: geElements });
        if (state.draw) {
            dispatch({ type: FORM_ACTIONS.refresh });
            setTimeout(() => {
                dispatch({ type: FORM_ACTIONS.draw });
            }, 200);
        }
    };
    return (
        <div>
            <Typography variant="normal" display="block">
                Display Genetic Elements
            </Typography>
            <div style={{ marginLeft: "5px" }} >
                <Button
                    sx={{ height: "42px", }}
                    variant="outlined"
                    endIcon={
                        geMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                    }
                    onClick={handleGEMenu}
                >
                    Genetic Elements
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={geMenu}
                    onClose={handleCloseGEMenu}
                >
                    <MenuList dense>
                        <MenuItem onClick={handleSelectAllGeneticElement}>
                            <ListItemIcon>{isAll ? <Check /> : <></>}</ListItemIcon>
                            ALL
                        </MenuItem>
                        {state.objectType.map((element, index) => {
                            return (
                                <MenuItem
                                    key={element.label + "_" + index}
                                    onClick={() => {
                                        handleSelectGeneticElement(element, index);
                                    }}
                                >
                                    <ListItemIcon>
                                        {element.isCheck && <Check />}
                                    </ListItemIcon>
                                    {element.label}
                                </MenuItem>
                            );
                        })}
                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}
