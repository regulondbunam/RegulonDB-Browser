import {Paper, Typography} from "@mui/material"
import { Link } from "react-router-dom";
import React from "react";
import Summary from "./Summary";

export default function Cards() {

    return (
        <div style={{display: "grid", gridTemplateColumns: "1fr 2fr", marginTop: "20px"}} >
            <Card ><Sites/></Card>
            <Card ><Summary/></Card>
        </div>
    )
}


function Card({children}) {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}} >
            <Paper elevation={3} sx={{width: "90%", minWidth:"240px", height: "140px"}}>
                {children}
            </Paper>
        </div>
    )
}

function Sites(){
    return(
        <div style={{padding: "5px"}} >
            <p style={{color: "black", fontSize: "20px"}} ><b>Mirror Sites</b></p>
            <p style={{color: "black"}}>
                Connect to RegulonDB from our sites in Cuernavaca and Querétaro, or install the Docker app on your computer and use it offline.
            </p>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", margin: "10px"}} >
                <Link to={"https://regulondb.liigh.unam.mx"}>
                    <Typography color="secondary">LIIGH UNAM</Typography>
                </Link>
                <Link to={"https://regulondb.ccg.unam.mx/"}>
                    <Typography color="secondary">CCG UNAM</Typography>
                </Link>
                <Link to={"/manual/apiSoftware/docker"}>
                    <Typography color="secondary">Docker install</Typography>
                </Link>
            </div>
        </div>
    )
}

