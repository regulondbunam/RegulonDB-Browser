import React from "react";
import Operon from "./Operon";
import { Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DataVerifier } from "ui-components/utils";

export default function Regulation({ operon, regulators, statistics }) {

  return (
    <div>
      <Operon {...operon} statistics={statistics} />
      <Divider />
      {DataVerifier.isValidArray(regulators)&&(
        <div >
            <Typography variant="h3">Regulators:</Typography>
            <div style={{display: "flex", marginTop: "10px"}}>
            {regulators.map((regulator,index)=><Regulator key={"regulator_"+index+"_"+regulator._id} regulator={regulator} />)}
            </div>
        </div>
      )}
      
      {}
    </div>
  );
}

function Regulator({regulator}) {
    let fun = "";
    let spanColor = "#000";
      switch (regulator.function) {
        case "repressor":
          fun = "-";
          spanColor = "#FF0000";
          break;
        case "activator":
          fun = "+";
          spanColor = "#14A054";
          break;
        case "dual":
          fun = "+-";
          spanColor = "#0000FF";
          break;
        default:
          fun = "";
          break;
      }
    return <Typography sx={{ml:2, fontWeight: 400 }} variant="relevant" ><Link to={"/regulon/"+regulator._id} ><span style={{color: spanColor}} >{regulator.name}{fun}</span></Link></Typography>
}