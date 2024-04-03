import React from 'react'
import Typography from "@mui/material/Typography";
import EcoliWall from "static/images/coli.webp"
import ecoliImgT3 from "static/images/EcoliRegulonDBT3.webp"
import Paper from "@mui/material/Paper";
import style from "./cover.module.css"
import { isMobile } from 'react-device-detect';




export default function Cover() {
    return (
        <Paper
            elevation={0}
            square
            sx={{
                width: "100wv",
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${EcoliWall})`,
                p: "2% 8% 2% 8%",
            }}>
                {!isMobile && (
                    <img src={ecoliImgT3} alt="Ecoli RegulonDB" className={style.coverEcoliImg} />
                )}
            
            <Typography variant="h1" color={"white"} >The RegulonDB Database</Typography>
            <Typography variant="relevant" color={"white"}>
                Escherichia coli K-12 Transcriptional Regulatory Network
            </Typography>
        </Paper>
    )
}
