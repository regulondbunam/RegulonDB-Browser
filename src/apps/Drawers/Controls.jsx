import React from 'react'
import {ButtonGroup, Tooltip, Button} from '@mui/material'
import {ArrowBackIos, VerticalAlignTop} from "@mui/icons-material";

export default function Controls({
                                     setOpen = (open) => {
                                     },
                                 }) {
    const handleTop = () => {
        window.scroll({
            top: 0, behavior: "smooth",
        });
    }

    return (<div style={{display: "flex", justifyContent: "flex-end"}}>
        <ButtonGroup
            disableElevation
            variant="outlined"
            color='secondary'
            size="small"
            sx={{
                boxShadow: ""
            }}
        >

            <Tooltip title={"Scroll to Top"}>
                <Button
                    onClick={handleTop}
                    sx={{borderRadius: 0}}
                >
                    <VerticalAlignTop/>
                </Button>
            </Tooltip>
            <Tooltip title={"Hide Menu"}>
                <Button
                    onClick={() => {
                        setOpen(false)
                    }}
                    sx={{borderRadius: 0}}
                >
                    <ArrowBackIos/>
                </Button>
            </Tooltip>
        </ButtonGroup>
    </div>)
}
