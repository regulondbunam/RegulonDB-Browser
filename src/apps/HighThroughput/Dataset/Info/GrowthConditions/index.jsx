import React, { useMemo } from "react";
import Style from "./growthC.module.css";
import { Typography } from "@mui/material";

export default function GrowthConditions({ growthConditions }) {
  let information = useMemo(() => {
    let inf = [];
    //inf.push({title:"",data:""});
    growthConditions?.organism &&
      inf.push({ title: "ORGANISM", data: growthConditions?.organism });
    growthConditions?.geneticBackground &&
      inf.push({
        title: "GENETIC BACKGROUND",
        data: growthConditions?.geneticBackground,
      });
    growthConditions?.medium &&
      inf.push({ title: "MEDIUM", data: growthConditions?.medium });
    growthConditions?.mediumSupplements &&
      inf.push({
        title: "MEDIUM SUPPLEMENTS",
        data: growthConditions?.mediumSupplements,
      });
    growthConditions?.aeration &&
      inf.push({ title: "AERATIOM", data: growthConditions?.aeration });
    growthConditions?.temperature &&
      inf.push({ title: "TEMPERATURE", data: growthConditions?.temperature });
    growthConditions?.ph &&
      inf.push({ title: "PH", data: growthConditions?.ph });
    growthConditions?.pressure &&
      inf.push({ title: "PRESSURE", data: growthConditions?.pressure });
    growthConditions?.opticalDensity &&
      inf.push({
        title: "OPTICAL DENSITY",
        data: growthConditions?.opticalDensity,
      });
    growthConditions?.growthPhase &&
      inf.push({ title: "GROWTH PHASE", data: growthConditions?.growthPhase });
    growthConditions?.growthRate &&
      inf.push({ title: "GROWTH RATE", data: growthConditions?.growthRate });
    growthConditions?.vesselType &&
      inf.push({ title: "VESSEL TYPE", data: growthConditions?.vesselType });
    growthConditions?.aerationSpeed &&
      inf.push({
        title: "AERATION SPEED",
        data: growthConditions?.aerationSpeed,
      });
    return inf;
  }, [growthConditions]);

  if (!growthConditions || information.length < 1) {
    return <></>;
  }

  return (
    <div>
      <Typography variant="h2" sx={{ fontSize: "22px" }}>
        Growth Conditions
      </Typography>
      <div style={{ marginLeft: "15px", marginTop: "10px" }} className={Style.gridContainer}>
        {information
          ? information.map((gc, i) => {
              if (!gc.data) {
                return null;
              }
              return (
                <BitInfo
                  key={`bgrowth_${i}_${gc.title}`}
                  title={gc.title}
                  data={gc.data}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

function BitInfo({ title, data }) {
  if (!data) {
    return null;
  }
  return (
    <div className={Style.gridItem}>
      <p style={{ fontSize: "12px", textAlign: "center" }} className="p_accent">
        {title}
      </p>
      <p style={{ fontSize: "14px", textAlign: "center" }}>{data}</p>
    </div>
  );
}
