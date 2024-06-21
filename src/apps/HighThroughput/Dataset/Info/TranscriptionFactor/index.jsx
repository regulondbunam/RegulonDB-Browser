import React from "react";
import ExternalRef from "./externalRef";
import Note from "./note";
import { DataVerifier } from "ui-components/utils";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function TranscriptionFactor({ objectsTested }) {
  return (
    <>
      <Typography variant="h2">
        Transcription Factor
      </Typography>
      {objectsTested.map((obj, i) => (
        <div style={{ marginLeft: "15px" }} key={"objectTested_" + obj._id}>
          <ObjectTested obj={obj} i={i} />
        </div>
      ))}
    </>
  );
}

export function ObjectTested({ obj, i }) {
  return (
    <div>
      <br />
      <div>
        <Link to={"/regulon/" + obj._id}>
          <Typography variant="h3" >
            {obj.name}
          </Typography>
        </Link>
      </div>
      <div style={{ marginLeft: "15px" }} >
        {DataVerifier.isValidArray(obj.genes) && (
          <div>
            <Typography variant="relevantB" sx={{ mr: 1 }} >
              Genes:
            </Typography>
            {obj.genes.map((gene) => {
              return (
                <Link to={"/gene/" + gene._id}>
                  <Typography variant="relevant" >
                    {gene.name}
                  </Typography>
                </Link>
              )
            })}
          </div>
        )}
        {DataVerifier.isValidArray(obj.synonyms) && (
          <div>
            <Typography variant="relevantB" sx={{ mr: 1 }} >
             Synonyms:
            </Typography>
            <Typography variant="relevant" >
              {obj.synonyms.join(", ")}
            </Typography>
          </div>
        )}
        {obj.externalCrossReferences.length > 0 && (
          <div>
            <Typography variant="relevantB" >External cross references:</Typography>
            <ExternalRef externalRef={obj.externalCrossReferences} />
          </div>
        )}
        {obj?.note && <Note note={obj.note} />}
      </div>
    </div>
  );
}
