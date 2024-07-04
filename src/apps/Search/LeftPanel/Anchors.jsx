import React, {useState} from 'react'
import {sections} from "../static";
import {List, ListItem, ListItemText, ListItemButton, Typography} from '@mui/material'


export default function Anchors({state,dispatch}) {
    const [id, setId] = useState()
    const handleGoSection = (id = "") => {
        //"scroll_section_" + id
        const sectionDiv = document.getElementById(id)
        if (sectionDiv) {
            sectionDiv.scrollIntoView({behavior: "smooth"});
            setId(id)
        }
    }

    return (
        <div>
            <List>
                <ListItem disablePadding>
                    <ListItemText primary={<Typography variant='irrelevantB' sx={{m: 1}}>RESULTS{state.search && ` (${state.nResults})`}</Typography>}/>
                </ListItem>
                {Object.keys(sections).map((key,index) => {
                    const section = sections[key]
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
                                    {section.label}{`${state.results[section.label]?`(${state.results[section.label]})`:""}`}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}
