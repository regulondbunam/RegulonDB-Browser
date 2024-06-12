import React from 'react'
import { List, ListItem, ListItemText, ListItemButton, Typography } from '@mui/material'
import { ACTION } from './static'
//import style from "./style.module.css"

export default function Anchors({ state, dispatch }) {
    const handleGoSection = (index) => {
        dispatch({type: ACTION.selectSection, sectionIndex: index})
    }

    return (
<div>
                <List>
                <ListItem disablePadding>
                    <ListItemText primary={<Typography variant='irrelevantB' sx={{m:1}} >CONTENTS</Typography>} />
                </ListItem>
                    {state.sections.map((section, index) => {
                        return (
                            <ListItem disablePadding key={"section_" + index} >
                                <ListItemButton dense 
                                selected={section.selected}
                                classes={{}}
                                sx={{
                                    "&.Mui-selected":{
                                        backgroundColor: "#7b9bb0",
                                        color: "#ffffff"
                                    }
                                }}
                                onClick={()=>{handleGoSection(index)}} >
                                    <Typography variant='irrelevant' color={section.selected ? "white" : "black"} >
                                        {section.title}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
    )
}
