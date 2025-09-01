import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ACTIONS, SCALE_VAL } from '../../static'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export default function Controls({
    state,
    dispatch,
    handleViewMenu = ()=>{},
    menuOpen = true,
}) {
    const { scale } = state._controlState

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
        <div style={{ height: "33px", display: 'grid', alignItems: 'center', gridTemplateColumns: '3fr 1fr' }} >
            <div>
                <p style={{margin: "0 10px 0 10px", fontSize: "24px", color: "black"}}>{state?.title}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }} >
                <ButtonGroup variant="contained" size='small' >
                    <Button color='secondary' onClick={handleUpScale}>+</Button>
                    <Button color='secondary' onClick={handleResetScale}><RestartAltIcon /></Button>
                    <Button color='secondary' onClick={handleDownScale}>-</Button>
                </ButtonGroup>
                <ButtonGroup variant="contained" size='small' >
                    <Button onClick={handleViewMenu}>
                        {menuOpen ? <MenuIcon /> : <MenuOpenIcon />}
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
