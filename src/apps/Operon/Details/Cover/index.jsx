import React from "react";
import { Typography } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import Info from "./Info";
import style from "./cover.module.css";
import RelatedList, {OBJECT_TYPE} from "ui-components/Web/Related";

export default function Cover({_id, name, statistics, strand, regulationPositions}) {
  return (
    <div className={style.base}>
      <div className={style.title}>
        <div>
          <Typography variant="irrelevant">Operon</Typography>
          <Typography variant="h1">
            <span dangerouslySetInnerHTML={{ __html: name }} />
          </Typography>
        </div>
      </div>
      <div className={style.mainInfo}>
        <div>
          <Info {...regulationPositions} strand={strand} />
          <Statistics statistics={statistics} />
        </div>
        <div className={style.references}>
          <RelatedList
          collapse={false}
            regulonDB_id={_id}
            leftEndPosition={regulationPositions?.leftEndPosition}
            rightEndPosition={regulationPositions?.rightEndPosition}
            organism={"ecoli"}
            objectType={OBJECT_TYPE.OPERON}
          />
        </div>
      </div>
      <div style={{ height: "18px" }} />
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
            <Typography variant="relevantB">{key}:</Typography>
            <Typography variant="normal">{` ${statistics[key]}`}</Typography>
          </div>
        );
      })}
    </div>
  );
}
