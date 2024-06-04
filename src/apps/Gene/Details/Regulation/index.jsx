import React from "react";
import Operon from "./Operon";
import { Divider, Typography } from "@mui/material";

export default function Regulation({ operon, regulators, statistics }) {
  return (
    <div>
      <Operon {...operon} statistics={statistics} />
      <Divider />
      <br />
      <Typography variant="h3">Regulators:</Typography>
    </div>
  );
}
