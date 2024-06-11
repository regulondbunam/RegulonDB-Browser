import React from 'react'
import Typography from "@mui/material/Typography";
import EcoliWall from "static/images/coli.webp"
import ecoliImgT3 from "static/images/EcoliRegulonDBT3.webp"
import Paper from "@mui/material/Paper";
import style from "./cover.module.css"
import { isMobile } from 'react-device-detect';
import { InputSearch } from 'apps/Search';
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import PopularSites from './PopularSites';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const searchLinks = [
    {
        label: "Genes",
        link: "/gene",
    },
    {
        label: "Operon",
        link: "/operon",
    },
    {
        label: "Regulon",
        link: "/regulon",
    },
    {
        label: "Sigmulon",
        link: "/sigmulon",
    },
    {
        label: "GENSOR Unit",
        link: "/gu",
    },
    {
        label: "High Throughput",
        link: "/ht",
    },
];

export default function Cover() {
    return (
        <Paper
            elevation={0}
            square
            sx={{
                width: "100wv",
                height: "100%",
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${EcoliWall})`,
            }}>
            <div className={style.ecoliImgContainer} >
                {!isMobile && (
                    <img src={ecoliImgT3} alt="Ecoli RegulonDB" className={style.coverEcoliImg} />
                )}

            </div>

            <div className={isMobile ? style.coverContainerMovile : style.coverContainerDesktop} >
                <Typography variant="h1" color={"white"} sx={{fontSize: "5vw"}} >The RegulonDB Database</Typography>
                <Typography variant="relevant" sx={{fontSize: "2vw"}} color={"white"}>
                    Escherichia coli K-12 Transcriptional Regulatory Network
                </Typography>
                {!isMobile &&  (
                    <>
                        <InputSearch />
                        <Stack direction="row" spacing={1}>
                            {searchLinks.map((link) => {
                                return (
                                    <Item elevation={0} key={"cover_link_" + link.label}>
                                        <Link style={{ color: "#ffffff" }} to={link.link}>
                                            {link.label}
                                        </Link>
                                    </Item>
                                );
                            })}
                        </Stack>
                    </>
                )}
            </div>
            {isMobile && (
                <PopularSites sites={searchLinks}  />
            )}
            
        </Paper>
    )
}
