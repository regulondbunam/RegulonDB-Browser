import React, { useState } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Typography, Button, Box, Tooltip, TextField, FormControl, InputLabel, Select, MenuItem, Menu, MenuList, ListItemIcon } from '@mui/material';
import { AccordionHighlight } from 'ui-components/Web/Accordion';
import Positions from './Positions';
import Elements from './Elements';
import style from "./form.module.css"

import {
    RANGE,
    secureRange,
    STATE_FORM,
    SECURE_RANGE,
    FORM_ACTIONS,
    STRAND,
    GE_DEFs,
} from "../definitions";

export default function Form({ state = { ...STATE_FORM }, dispatch }) {
    
    return (
        <div>
            <div style={{ margin: "5px 0 5px 5px", display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }} >
                    <HelpOutlineIcon sx={{ color: "blue" }} fontSize="large" />
                </div>
                <div>
                    <Typography variant="irrelevant" >
                        This graphical tool allows you to visualize the genetic regulatory elements.
                        The tool accepts positions between 1 and 4,639,676, with a maximum range of up to 250,000 base pairs.
                    </Typography>
                </div>
            </div>
            <div>
                <AccordionHighlight defaultExpanded
                    title={<Typography variant='relevant' sx={{ color: "white" }} >Data Parameters</Typography>}
                >
                    <div className={style.parametersContent} >
                        <Positions state={state} dispatch={dispatch} />
                        <Elements state={state} dispatch={dispatch} />
                        <div className={style.parametersActions}>
                            {state.draw ? (
                                <Button
                                    sx={{ marginRight: "2px" }}
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                        dispatch({ type: FORM_ACTIONS.clean });
                                    }}
                                >
                                    Clean
                                </Button>
                            ) : (
                                <Button
                                    sx={{ marginRight: "5px" }}
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    onClick={() => {
                                        if (
                                            secureRange(state.leftEndPosition, state.rightEndPosition)
                                        ) {
                                            dispatch({ type: FORM_ACTIONS.draw });
                                        } else {
                                            alert(
                                                "Incorrect positions, please check that the left position is smaller than the right position and that the difference is less than 100,000bp."
                                            );
                                        }
                                    }}
                                >
                                    Draw
                                </Button>
                            )}
                            <br />
                            <Button
                                sx={{ marginRight: "2px" }}
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                    dispatch({ type: FORM_ACTIONS.demo });
                                }}
                            >
                                Demo
                            </Button>
                        </div>
                    </div>
                </AccordionHighlight>
            </div>
            <br />
        </div>
    )
}
