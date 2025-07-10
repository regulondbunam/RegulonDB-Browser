import "./style.css"
import InteractiveCover from "./interactive";
import Title from "./Title";
import Search from "./Search";
import Links from "./Links";
import Dna from "./Dna";

export default function Cover(){
    return(
        <div className={"home-cover"} >
            <div className={"home-cover-background"} >
                <InteractiveCover />
                <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", zIndex: 2 }} />
            </div>
            <div style={{zIndex: 3, position: "absolute", width: "100%"}} >
                <Title />
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}} >
                    <Search />
                    <Links />
                </div>
                <Dna/>

            </div>
        </div>

    )
}