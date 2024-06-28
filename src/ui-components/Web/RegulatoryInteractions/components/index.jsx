import React from 'react'
import { Typography } from '@mui/material'


const HeaderLabel = ({label,subLabel})=>{return <div>
<Typography variant='irrelevantB' component={"div"} >{label}</Typography>
<Typography variant='irrelevant' component={"div"} fontSize={10} >
    {subLabel}
</Typography>
</div>}

export {HeaderLabel}