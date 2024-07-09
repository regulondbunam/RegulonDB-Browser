import React, {useEffect, useState} from 'react'
import {List, ListItem, ListItemText, ListItemButton, Typography} from '@mui/material'


export default function Anchors({state,dispatch, sections=[]}) {
    const [id, setId] = useState()
    const handleGoSection = (id = "") => {
        //"scroll_section_" + id
        const sectionDiv = document.getElementById(id)
        if (sectionDiv) {
            sectionDiv.scrollIntoView({behavior: "smooth"});
            setId(id)
        }
    }

    const handleScroll=()=>{
        for (const section of sections) {
            const sectionDiv = document.getElementById(section.id)
            if (sectionDiv) {
                const { top } = sectionDiv.getBoundingClientRect();
                if (top <= 0) {
                    setId(section.id)
                }
            }
        }
    }

    useEffect(() => {
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    

    return (
        <div>
            <List>
                <ListItem disablePadding>
                    <ListItemText primary={<Typography variant='irrelevantB' sx={{m: 1}}>CONTENTS</Typography>}/>
                </ListItem>
                {sections.map((section,index) => {
                    if(!section.visible){
                        return null
                    }
                    const selected = section.id === id
                    return (
                        <ListItem disablePadding key={"section_" + index}>
                            <ListItemButton dense
                                            selected={selected}
                                            classes={{}}
                                            sx={{
                                                "&.Mui-selected": {
                                                    backgroundColor: "#7b9bb0",
                                                    color: "#ffffff"
                                                }
                                            }}
                                            onClick={() => {
                                                handleGoSection(section.id)
                                            }}>
                                <Typography variant='irrelevant' color={selected ? "white" : "black"}>
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
