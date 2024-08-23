import React, { Fragment } from "react";
import { Typography, Divider, Tooltip } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import { Link } from "react-router-dom";
import style from "./cover.module.css";
import RelatedList from "ui-components/Web/Related";

export default function Cover({ id, sigmaFactor, statistics, organism = "ecoli" }) {
  const { name, synonyms, gene, abbreviatedName } = sigmaFactor
  return (
    <div className={style.base}>
      <div className={style.title}>
        <div>
          <Typography variant="irrelevant">Sigmulon</Typography>
          <Typography variant="h1">
            <span dangerouslySetInnerHTML={{ __html: name }} />
          </Typography>
        </div>
        <div className={style.divider}>
          <Divider orientation="vertical" />
        </div>
        <div>
          <Typography variant="irrelevant"></Typography>
          <Typography variant="h1">
            <span
              dangerouslySetInnerHTML={{
                __html: abbreviatedName
              }}
            />
          </Typography>
        </div>
      </div>
      <div className={style.mainInfo}>
        <div>
          {DataVerifier.isValidArray(synonyms) && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="relevantB" sx={{ mr: 1 }}>
                Synonyms:
              </Typography>
              <Typography variant="relevant">
                {synonyms.map((synonym) => synonym).join(", ")}
              </Typography>
            </div>
          )}
          {DataVerifier.isValidObjectWith_id(gene) && (
            <div>
              <Typography variant="relevantB" sx={{ mr: 1 }}>
                Gene:
              </Typography>
              <Typography variant="relevant">
                <Link to={"/gene/" + gene._id} >
                  <span dangerouslySetInnerHTML={{ __html: gene.name }} />
                </Link>
              </Typography>
            </div>
          )}
          {DataVerifier.isValidObject(statistics) && (
            <Statistics statistics={statistics} />
          )}
        </div>
        <div className={style.references}>
          <RelatedList
            collapse={false}
            regulonDB_id={id}
            gene={gene}
            organism={organism}
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
    <div style={{ display: "flex", gap: "10px", flexWrap: "nowrap" }}>
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