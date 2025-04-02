/* eslint-disable no-unused-vars */
import Style from "../footer.module.css";
import unamLogo from "../../logos/unam_white.png";
import ccgLogo from "../../logos/ccg_white.png";
import nihLogo from "../../logos/nih_withe.png";
import conahcytLogo from "../../logos/conahcyt_white.svg";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

// export const idFooter = "rdbFooter"; id={idFooter}

export default function Mobile() {
    return (
        <Grid container direction="column" className={Style.footer} >
            <Grid item container direction="row" xs={6} style={{}} >
                <Grid item direction="column">
                    <img src={unamLogo} alt="unam logo" className={Style.imageLogo}/>
                </Grid>
                <Grid item direction="column">
                    <img src={ccgLogo} alt="ccg logo" className={Style.imageLogo}/>
                </Grid>
                <Grid item direction="column">
                    <img src={nihLogo} alt="nih logo" className={Style.imageLogo}/>
                </Grid>
                <Grid item direction="column">
                    <img
                        src={conahcytLogo}
                        alt="Consejo Nacional de Humanidades Ciencia y Tecnologia logo"
                        className={Style.imageLogo}
                    />
                </Grid>
            </Grid>
            <Grid item container direction={"row"}  xs={3} style={{justifyContent: "end"}} >
                <Grid item style={{paddingInline: "10px" }}>
                    <Link

                        to="/manual/aboutUs/terms-conditions"
                        style={{ paddingInline: "10px",}}
                    >
                        <p className={Style.link} >
                            Terms and conditions
                        </p>
                    </Link>
                </Grid>
                <Grid item style={{paddingInline: "10px"}}>
                    <Link
                        to="/manual/aboutUs/funding"
                        style={{ paddingInline: "10px" }}
                    >
                        <p className={Style.link}>
                            Funding
                        </p>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
}
