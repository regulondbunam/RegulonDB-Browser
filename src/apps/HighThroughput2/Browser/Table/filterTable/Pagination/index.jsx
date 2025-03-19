import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { REDUCER_TYPES } from '../static';
import DataVerifier from '../../utils';

export default function Pagination({ state, dispatch }) {
    const handleChangePage = (event) => {
        const eventType = event.target.value
        dispatch({ type: eventType - 0 })
    }
    if (state.nRows < state.items) {
        return null
    }
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl variant="standard" >
                <Select
                    value={state.items}
                    onChange={(e)=>{dispatch({type: REDUCER_TYPES.setItems, value: e.target.value})}}
                    label="Items"
                >
                    <MenuItem value={10}>10</MenuItem>
                    {state.nRows > 40 && (
                        <MenuItem value={20}>20</MenuItem>
                    )}
                   {state.nRows > 60 && (
                        <MenuItem value={30}>30</MenuItem>
                    )}
                    {state.nRows > 100 && (
                        <MenuItem value={50}>50</MenuItem>
                    )}
                </Select>
            </FormControl>
            <Typography sx={{ ml: 1, mr: 1 }} >{` rows of ${state.nRows}`}</Typography>
            <ButtonGroup size='small' color="secondary" variant="contained" aria-label="Basic button group">
                <Tooltip title="First page">
                    <Button value={REDUCER_TYPES.firstPage} onClick={handleChangePage} >{"<<"}</Button>
                </Tooltip>
                <Tooltip title="Prev page">
                    <Button value={REDUCER_TYPES.prevPage} onClick={handleChangePage} >{"<"}</Button>
                </Tooltip>
            </ButtonGroup>
            <Typography sx={{ ml: 1, mr: 1 }} >{state.page + 1}</Typography>
            <ButtonGroup size='small' color="secondary" variant="contained" aria-label="Basic button group">
                <Tooltip title="Next page">
                    <Button value={REDUCER_TYPES.nextPage} onClick={handleChangePage} >{">"}</Button>
                </Tooltip>
                <Tooltip title="Last page">
                    <Button value={REDUCER_TYPES.lastPage} onClick={handleChangePage} >{">>"}</Button>
                </Tooltip>
            </ButtonGroup>
        </div>
    )
}
