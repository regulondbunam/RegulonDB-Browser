import { ListItem, ListItemButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export default function Operon({_id, name=""}) {
    const navigate = useNavigate()
    return (
        <ListItem disablePadding >
            <ListItemButton dense
                onClick={() => { navigate("/operon/"+_id) }} >
                <Typography variant='irrelevant' >
                    {`Operon`}
                </Typography>
                <Typography variant='irrelevant' fontSize={"12px"} >
                    {`(${name})`}
                </Typography>
            </ListItemButton>
        </ListItem>
    )
}