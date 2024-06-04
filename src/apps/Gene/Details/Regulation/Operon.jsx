import React from "react";
import { Typography, Divider } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import FilterTable from "ui-components/Web/FilterTable";

export default function Operon({ _id, name, arrangement, statistics }) {
  return (
    <div>
      <div className={style.operonContent}>
        <div className={style.operonName}>
          <Typography variant="h3">Operon</Typography>
          <Typography variant="h2" sx={{ m: 1 }}>
            <Link to={"/operon/" + _id}>
              <span dangerouslySetInnerHTML={{ __html: name }} />
            </Link>
          </Typography>
        </div>
        <div className={style.operonStatistics}>
          <Typography variant="h4">statistics</Typography>
          <Statistics statistics={statistics} />
        </div>
      </div>
      <Divider />
      <br />
      {DataVerifier.isValidArray(arrangement) && (
        <TUs arrangement={arrangement} />
      )}
    </div>
  );
}

function Statistics({ statistics }) {
  if (!DataVerifier.isValidObject(statistics)) return null;
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {Object.keys(statistics).map((key, index) => {
        if (key === "__typename") {
          return null;
        }
        return (
          <div key={"statistic_" + key + "_" + index}>
            <Typography variant="irrelevant">{key}:</Typography>
            <Typography variant="normal">{` ${statistics[key]}`}</Typography>
          </div>
        );
      })}
    </div>
  );
}

function TUs({ arrangement }) {
  let table = {
    columns: [
      { label: "Name", width: 20 },
      { label: "Promoters", width: 50 },
      { label: "Regulators" },
    ],
    data: [],
  };
  arrangement.forEach((arr) => {
    let regulators = [];
    arr.regulators.forEach((regulator, index) => {
      const tuId = arr.transcriptionUnit._id;
      let fun = "";
      switch (regulator.function) {
        case "repressor":
          fun = "-";
          break;
        case "activator":
          fun = "+";
          break;
        case "dual":
          fun = "+-";
          break;
        default:
          fun = "";
          break;
      }
      regulators.push({
        _id: regulator._id,
        key: tuId + "_" + regulator._id + "_" + index,
        label: `${regulator.name}${fun}`,
      });
    });

    table.data.push({
      Name: (
        <div value={arr.transcriptionUnit.name}>
          <Link to={"/tu/" + arr.transcriptionUnit._id}>
            {arr.transcriptionUnit.name}
          </Link>
        </div>
      ),
      Promoters: arr.promoters.map((pro) => pro.name).join(", "),
      Regulators: (
        <div value={regulators.map((reg) => reg.label).join("; ")}>
          {regulators.map((regulator) => {
            return (
              <Link
                to={"/regulon/" + regulator._id}
                key={regulator.key}
                style={{ marginLeft: "10px" }}
              >
                {regulator.label}
              </Link>
            );
          })}
        </div>
      ),
    });
  });
  return (
    <div>
      <div>
        <FilterTable
          selection="row"
          {...table}
          tableName="Transcription Units:"
          titleVariant="h3"
        />
      </div>
    </div>
  );
}
