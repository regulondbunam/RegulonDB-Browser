import UNAM_LOGO from "./media/unamLogoWithe.png";
import Typography from "@mui/material/Typography";

export default function Title() {

    return(
        <div className="home-cover-title" >
            <div className={"home-cover-title-logo"} >
                <img
                    className={"UNAM_LOGO"}
                    src={UNAM_LOGO}
                    alt="logo unam"
                    style={{
                        padding:"10%",
                        height: "100%",
                        width: "auto",
                        maxHeight: "200px"
                    }}
                />
            </div>
            <div className={"home-cover-title-strings"} >
                <h1>The RegulonDB Database</h1>
                <h2>Escherichia coli K-12 Transcriptional Regulatory Network</h2>
            </div>
        </div>
    )
}