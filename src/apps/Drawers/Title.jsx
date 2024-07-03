import React, { useRef, useEffect } from 'react'
import RegulonLogo from "static/images/regulonDB.png"
import { Typography } from '@mui/material'

export default function Title({ title = "" }) {
    const headerRef = useRef(null)
    const anchor = useRef(null)

    const handleScroll = () => {
        if (anchor?.current) {
            const { top } = anchor.current.getBoundingClientRect();
            if (top <= 0) {
                headerRef.current.style.display = "block"
            } else {
                headerRef.current.style.display = "none"
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    return (
        <div ref={anchor} >
            <div ref={headerRef} style={{display: "none"}} >
                <img src={RegulonLogo} alt="RegulonDB Logo" style={{
                    margin: "10px 0  0 10px",
                    width: "40%",
                    maxWidth: "250px",
                }} />
                <br />
                <Typography variant='relevantB' sx={{ margin: "0 0  10px 10px" }} component={"div"}  >{title}</Typography>
            </div>
        </div>
    )
}