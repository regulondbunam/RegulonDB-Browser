import { Button } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

function IconExpand({
    expand,
    setExpand = ()=>{},
    isEmbed = false
}) {
    const [isHover , setIsHover] = useState(false)
    if (isEmbed) {
        return (
            <Button variant="contained" color='secondary' endIcon={<SearchIcon />} onClick={setExpand} />
        )
    } else {
        return (
            <Button variant="contained" color='secondary'  endIcon={<SearchIcon />}
                onMouseEnter={()=>{setIsHover(true)}}
                onMouseLeave={()=>{setIsHover(false)}}
                onClick={setExpand}
            >{isHover ? "Search" : ""}</Button>
        )
    }
}

export default function PanelSearch({
    expand = false,
    setExpand = ()=>{},
    isEmbed = false
}) {


    if (expand) {
        return (
            <div>
                Hoola
            </div>
        )
    } else {
        return <IconExpand isEmbed={isEmbed} setExpand={setExpand} expand={expand} />
    }

}