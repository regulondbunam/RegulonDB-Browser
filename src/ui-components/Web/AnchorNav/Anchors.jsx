import React from 'react'
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material'
import { ACTION } from './static'
//import style from "./style.module.css"

export default function Anchors({ state, dispatch }) {
    const handleGoSection = (index) => {
        dispatch({type: ACTION.selectSection, sectionIndex: index})
    }

    return (
        <div>
            <div>controls</div>
            <div>
                <List>
                    {state.sections.map((section, index) => {
                        return (
                            <ListItem disablePadding key={"section_" + index} >
                                <ListItemButton dense selected={section.selected} onClick={()=>{handleGoSection(index)}} >
                                    <ListItemText primary={section.title} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        </div>
    )
}
