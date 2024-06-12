import React from 'react'
import { FormatIndentDecrease, FormatIndentIncrease, VerticalAlignBottom, VerticalAlignTop, UnfoldMore, UnfoldLess } from '@mui/icons-material'
import { ButtonGroup, Tooltip, Button } from '@mui/material'
import { ACTION } from './static'

export default function Controls({ state, dispatch }) {
    const handleMenu = () => {
        dispatch({ type: ACTION.hideMenu })
    }
    const handleTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }
    const handleCollapse = () => {
        dispatch({ type: ACTION.collapseAll })
    }
    if (state.hideMenu) {
        return (
            <ButtonGroup
                disableElevation
                aria-label="Disabled elevation buttons"
                variant="outlined"
                color='secondary'
                size='small'
            >
                <Tooltip title={"Show Menu"}>
                    <Button
                        onClick={handleMenu}
                        sx={{ borderRadius: 0 }}
                    >
                        <FormatIndentIncrease />
                    </Button>
                </Tooltip>
            </ButtonGroup>
        )
    }
    return (
        <ButtonGroup
            disableElevation
            aria-label="Disabled elevation buttons"
            variant="outlined"
            color='secondary'
            size='small'
        >
            <Tooltip title={"Hide Menu"}>
                <Button
                    onClick={handleMenu}
                    sx={{ borderRadius: 0 }}
                >
                    <FormatIndentDecrease />
                </Button>
            </Tooltip>
            <Tooltip title={state?.onTop ? "go to bottom page" : "go to top page"}>
                <Button
                    onClick={handleTop}
                    sx={{ borderRadius: 0 }}
                >
                    {state.onTop ? (
                        <VerticalAlignBottom />
                    ) : (
                        <VerticalAlignTop />
                    )}
                </Button>
            </Tooltip>
            <Tooltip
                onClick={handleCollapse}
                title={
                    state?.isCollapse ? "Expand all sections" : "Collapse all sections"
                }
            >
                <Button sx={{ borderRadius: 0 }}>
                    {state?.isCollapse ? <UnfoldMore /> : <UnfoldLess />}
                </Button>
            </Tooltip>
        </ButtonGroup>
    )
}
