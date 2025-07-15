import "./style.css"
import MediaQuery from 'react-responsive'
import React from "react";
import InteractiveCover from "./interactive";
import Title from "./Title";
import Search from "./Search";
import Links from "./Links";
import Dna from "./Dna";
import Cards from "./Cards";
import ecoliPNG from "./media/ecoli-img.png";
import LogoRegulonDB from "./media/RegulonDB-logo-white.png";

export default function Cover(){
    return(
        <div className={"home-cover"} >

            <div className={"home-cover-background"} >
                <InteractiveCover />
                <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2 }} />
            </div>
            <div className={"home-cover-background-ecoli"}
                 style={{position: "absolute", top: 0, right: 50, zIndex: 1}}
            >
                <img
                    className={"home-cover-background-ecoli-img"}
                    src={ecoliPNG}
                    alt="ecoli"
                    style={{
                        height: "420px",
                        width: "auto",
                        transform: "rotate(15deg)",
                    }}
                />
            </div>
            <div style={{zIndex: 3, position: "absolute", width: "100%"}} >
                <img
                    className="home-cover-logo"
                    src={LogoRegulonDB}
                    alt="Logo RegulonDB"
                />
                 <Title />
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}} >
                    <MediaQuery minWidth={600}>
                        <Search />
                    </MediaQuery>
                    <Links />
                </div>
                <MediaQuery minWidth={740}>
                    <Dna/>
                </MediaQuery>
                <Cards />
            </div>
            {/*
            <div style={{zIndex: 3, position: "absolute", width: "100%"}} >


            </div>
            */}
        </div>

    )
}