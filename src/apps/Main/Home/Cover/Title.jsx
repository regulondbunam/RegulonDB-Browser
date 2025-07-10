import ecoliImgT3 from "./media/EcoliRegulonDBT3.webp";
import EcoliWall from "./media/coli.webp";
import UNAM_LOGO from "./media/unamLogoWithe.png";
import Typography from "@mui/material/Typography";

export default function Title() {

    return(
        <div style={{display: "grid", gridTemplateColumns: "15% 85%", gap: "10px", width: "80vw"}} >
            <div >
                <img
                    className={"UNAM_LOGO"}
                    src={UNAM_LOGO}
                    alt="logo unam"
                    style={{
                        padding:"10%",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}} >
                <Typography variant="h1Cover" component="div"  fontSize={{xs:"110%", md:"360%"}}>The RegulonDB Database</Typography>
                <Typography variant="h2Cover" component="div" >
                    Escherichia coli K-12 Transcriptional Regulatory Network
                </Typography>
            </div>
        </div>
    )
}