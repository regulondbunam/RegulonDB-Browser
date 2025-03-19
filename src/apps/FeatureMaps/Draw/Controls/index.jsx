import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ACTIONS, SCALE_VAL } from '../../static'
import { Divider } from '@mui/material';
import DrawerOptions from './DrawerOptions';

export default function Controls({
    state,
    dispatch
}) {
    const { scale /*scaleBar*/ } = state._controlState

    const handleUpScale = () => {
        if (scale + SCALE_VAL < 100) {
            dispatch({ type: ACTIONS.SET_SCALE, scale: scale + SCALE_VAL })
        }
    }

    const handleDownScale = () => {
        if (scale - SCALE_VAL > 0) {
            dispatch({ type: ACTIONS.SET_SCALE, scale: scale - SCALE_VAL })
        }
    }

    const handleResetScale = () => {
        dispatch({ type: ACTIONS.SET_SCALE, scale: 1 })
    }

    return (
        <div style={{ height: "33px", display: 'flex' }} >
            <DrawerOptions state={state} dispatch={dispatch} />
            <Divider orientation='vertical' sx={{ml: 1, mr: 1}} />
            <ButtonGroup variant="contained" size='small' aria-label="basic controls">
                <Button color='secondary' onClick={handleUpScale}>+</Button>
                <Button color='secondary' onClick={handleResetScale}><RestartAltIcon /></Button>
                <Button color='secondary' onClick={handleDownScale}>-</Button>
            </ButtonGroup>
        </div>
    )
}
