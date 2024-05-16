import React from 'react'
import { DataVerifier } from 'ui-components/utils';
import { Typography, Button, Box, Tooltip, TextField, FormControl, InputLabel, Select, MenuItem, Menu, MenuList, ListItemIcon } from '@mui/material';
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ForwardIcon from "@mui/icons-material/Forward";

import {
    RANGE,
    secureRange,
    STATE_FORM,
    SECURE_RANGE,
    FORM_ACTIONS,
    STRAND,
    GE_DEFs,
} from "../definitions";

export default function Positions({ state, dispatch }) {
    return (

            <div>
                <Typography variant="normal">
                    Genome Position
                </Typography>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    margin: "10px 0 0 5px"
                }}>
                
                <Tooltip title="Absolute genome left position">
                    <TextField
                        id="rdb_input_leftEndPosition"
                        disabled={state.draw}
                        size="small"
                        label="Left Position"
                        type="number"
                        InputProps={{
                            inputProps: {
                                step: "any",
                            },
                        }}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        value={
                            state.leftEndPosition === 0 ? "" : state.leftEndPosition
                        }
                        onChange={(event) => {
                            if (!/^\d*$/.test(event.target.value)) {
                                return null;
                            }
                            if (event.target.value < RANGE.min) {
                                return null;
                            }
                            if (event.target.value > RANGE.max) {
                                return null;
                            }
                            //event.target.value
                            if (DataVerifier.isValidNumber(event.target.value)) {
                                dispatch({
                                    type: FORM_ACTIONS.setLeftPosition,
                                    value: event.target.value,
                                });
                            }
                        }}
                        sx={{ width: 250 }}
                    />
                </Tooltip>
                <Tooltip title="Absolute genome right position">
                    <TextField
                        id="rdb_input_rightEndPosition"
                        disabled={state.draw}
                        size="small"
                        InputProps={{
                            style: {
                                // Estilos personalizados para ocultar los botones de incremento y decremento
                                WebkitAppearance: "none",
                                appearance: "none",
                            },
                        }}
                        label="Right Position"
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        type="number"
                        value={
                            state.rightEndPosition === 0 ? "" : state.rightEndPosition
                        }
                        onChange={(event) => {
                            if (!/^\d*$/.test(event.target.value)) {
                                return null;
                            }
                            if (event.target.value < RANGE.min) {
                                return null;
                            }
                            if (event.target.value > RANGE.max) {
                                return null;
                            }
                            if (DataVerifier.isValidNumber(event.target.value)) {
                                dispatch({
                                    type: FORM_ACTIONS.setRightPosition,
                                    value: event.target.value,
                                });
                            }
                        }}
                        sx={{ width: 250 }}
                    />
                </Tooltip>
                </div>
                <Typography variant="normal">
                    Strand
                </Typography>
                <div style={{marginLeft: "5px"}} >
                <Tooltip placement="top" title="select strand">
                        <Select
                            value={state.strand}
                            size="small"
                            label="Strand"
                            onChange={(event) => {
                                dispatch({
                                    type: FORM_ACTIONS.setStrand,
                                    value: event.target.value,
                                });
                            }}
                            sx={{ width: 200, height: 40 }}
                        >
                            <MenuItem value={STRAND.both}>
                                <Tooltip title={STRAND.both} placement="right">
                                    <><CompareArrowsIcon /> Both</>
                                </Tooltip>
                            </MenuItem>
                            <MenuItem value={STRAND.forward}>
                                <Tooltip title={STRAND.forward} placement="right">
                                    <ForwardIcon /> Forward
                                </Tooltip>
                            </MenuItem>
                            <MenuItem value={STRAND.reverse}>
                                <Tooltip title={STRAND.reverse} placement="right">
                                    <ForwardIcon sx={{ transform: "rotate(180deg)" }} /> Reverse
                                </Tooltip>
                            </MenuItem>
                        </Select>
                    </Tooltip>
                </div>
            </div>
    )
}
