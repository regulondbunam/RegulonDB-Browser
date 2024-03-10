import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function Options({ menus, menuId, handleCloseMenu, handleSelectMenu }) {
    return (
        <div style={{ marginLeft: "2vw" }} >
            <Stack spacing={2} direction=
                "row">
                {Object.keys(menus).map((key) => {
                    const menu = menus[key]
                    return <Button key={menu.id}
                    onClick={()=>{
                        if(menuId===menu.id){
                            handleCloseMenu()
                        }else{
                            handleSelectMenu(menu)
                        }
                    }}
                        sx={{
                            height: '4vw',
                            fontSize: '1.5vw',
                            color: menuId === menu.id ? '' : "white",
                            textTransform: 'none', 
                            borderRadius: 0
                        }}
                        color={menuId === menu.id ? 'surface' : 'primary'}
                        variant={menuId === menu.id ? 'contained' : 'text'}>
                        {menu.label}
                    </Button>
                })}
            </Stack>

        </div>
    )
}
