import React from 'react'
import { Typography } from '@mui/material'


const HeaderLabel = ({label,subLabel})=>{return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} >
<Typography variant='irrelevantB'  >{label}</Typography>
<Typography variant='irrelevant' component={"div"} fontSize={12} >
    {subLabel}
</Typography>
</div>}

export {HeaderLabel}