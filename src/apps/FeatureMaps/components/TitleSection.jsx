import {Typography, Tooltip} from "@mui/material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import React from "react";

export default function TitleSection({title="title", help="help", subtitle}){
    return(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
            <div>
                <Typography component="div" variant="subtitle1" >{title}</Typography>
                {subtitle && (<div>{subtitle}</div>)}
            </div>
            <div>
                <Tooltip title={help}>
                    <HelpCenterIcon/>
                </Tooltip>
            </div>
        </div>
    )
}