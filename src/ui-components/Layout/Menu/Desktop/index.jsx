import React, { useState } from 'react'
import "./style.css"
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Options from './Options';
import menus from '../conf'

export default function Desktop() {
    const [menu, setMenu] = useState()
    //console.log(menu?.id);
    const handleSelectMenu = (menu)=>{
        setMenu(menu)
    }
    const handleCloseMenu = ()=>{
        setMenu(undefined)
    }
    return (
        <div className="rdb_Layout_Desktop">
            <div className="options">
                <div style={{ width: "5vw", }}>

                </div>
                <div className="home-buttom" >
                    <IconButton sx={{
                        border: "0.5vw solid white",
                        height: "5vw",
                        width: "5vw",
                    }} ><HomeIcon sx={{ color: "white", fontSize: "3vw" }} /></IconButton>
                </div>
                <Options menus={menus} menuId={menu?.id} handleSelectMenu={handleSelectMenu} handleCloseMenu={handleCloseMenu} />
            </div>
        </div>
    )
}
