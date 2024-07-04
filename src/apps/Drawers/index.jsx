import React, {createContext, useState} from 'react'
import {Box, Button,} from '@mui/material'
import Title from './Title'

export const DrawerContext = createContext({
    expand: false, setExpand: () => {
    }, isEmbed: false
});

export default function Drawers({
                                    drawers = [], setDrawer, isPersistent = false, open: _open = false, title = ""
                                }) {
    const [panel, setPanel] = useState(setDrawer)
    const [open, setOpen] = useState(_open)


    return (<div style={{width: open ? "30%" : "0", maxWidth: open ? "250px" : "0", zIndex: 99}}>
        {open ? (<Box
            sx={{
                position: "sticky", left: 0, top: 0, height: "100vh",
            }}
        >
            <Title title={title}/>
            <Button onClick={() => {
                setOpen(false)
            }}>close</Button>
        </Box>) : (
            <div style={{
                position: "sticky", left: 0, top: 0, display: 'flex', flexDirection: "column", rowGap: "5px"
            }}>
                {drawers.map((Drawer, index) => (
                    <DrawerContext.Provider key={"drawer_" + index}
                                            value={{
                                                expand: false, setExpand: () => {
                                                    setOpen(true)
                                                }, isEmbed: false
                                            }}
                    >
                        {Drawer}
                    </DrawerContext.Provider>))}
            </div>)}
    </div>)
}

/*
function Drawer({
  children,
  isPersistent = false,
  open = false,
  setOpen = ()=>{}
}) {
  return (
    <Drawer
        sx={{
          width: "30%",
          maxWidth: "350px",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: "30%",
            maxWidth: "350px",
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Button onClick={()=>{setOpen(false)}}>Close</Button>
        {children}
    </Drawer>
  )
}


*/