import React from 'react'
import { Typography } from '@mui/material'

export default function Label({label, content, phrases}) {
    return (
        <div>
            <Typography variant="relevantB" sx={{ mr: 1 }} >{label}</Typography>
            <Typography variant="relevant" ><span dangerouslySetInnerHTML={{ __html: content }} /></Typography>
        </div>
    )
}
