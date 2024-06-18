import React from 'react'
import { List, ListItem, ListItemText, ListItemButton, Typography } from '@mui/material'


export default function Anchors({ state, dispatch, leftList = null }) {
    const handleGoSection = (id) => {
        //"scroll_section_" + id
        const sectionDiv = document.getElementById("scroll_section_" + id)
        if(sectionDiv){
            sectionDiv.scrollIntoView({ behavior: "smooth" });
        }
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
                                onClick={()=>{handleGoSection(section.id)}} >
                                    <Typography variant='irrelevant' color={section.selected ? "white" : "black"} >
                                        {section.title}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
                {leftList}
            </div>
    )
}
