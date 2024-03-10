import React from 'react'
import "./style.css"
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

export default function Desktop() {
    return (
        <div className="rdb_Layout_Desktop">
            <div className="options">
                <div className="home-buttom" >
                    <IconButton sx={{
                        border: "0.5vw solid white",
                        height: "5vw",
                        width: "5vw",
                    }} ><HomeIcon sx={{ color: "white" }} fontSize="large" /></IconButton>
                </div>
                <button>A</button>
            </div>
        </div>
    )
}
