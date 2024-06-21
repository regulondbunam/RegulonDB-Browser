import React from "react";
import { Link } from "react-router-dom";
import ExternalRef from "./externalRef";
import Note from "./note";
import { gql, useQuery } from "@apollo/client";
import { DataVerifier } from "ui-components/utils";
import { Typography } from "@mui/material";

const query = gql`
  query getIDRegulon($advanceSearch: String) {
    getRegulonBy(advancedSearch: $advanceSearch) {
      data {
        _id
      }
    }
  }
`;

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
  const { data } = useQuery(query, {
    variables: {
      advanceSearch: `'${obj.name}'[regulator.name]`,
    },
  });
  let regulonId;
  if (data) {
    regulonId = DataVerifier.isValidArray(data.getRegulonBy.data)
      ? data.getRegulonBy.data[0]._id
      : undefined;
  }
  return (
    <div>
      {regulonId ? (
        <Link to={"/regulon/" + regulonId}>
          <h3>{obj.name}</h3>
        </Link>
      ) : (
        <h3>{obj.name}</h3>
      )}
      <div style={{marginLeft: "15px"}} >
        {obj.genes.length > 0 && linkGenes(obj.genes)}

        {obj.synonyms.length > 0 && (
          <div>
            <p>
              Synonyms:
              {obj.synonyms.join(", ")}
            </p>
          </div>
        )}
        {obj.externalCrossReferences.length > 0 && (
          <div>
            <p>External cross references:</p>
            <ExternalRef externalRef={obj.externalCrossReferences} />
          </div>
        )}
        {obj?.note && <Note note={obj.note} />}
      </div>
    </div>
  );
}

function linkGenes(genes = []) {
  if (window.IN_URL?.isEmbed) {
    return (
      <div>
        {genes.map((gen) => {
          return (
            <p key={gen._id} style={{ fontSize: "16px" }}>
              {gen.name}
            </p>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      {genes.map((gen) => {
        return (
          <p>
            Gene:{" "}
            <Link
              key={gen._id}
              style={{ fontSize: "16px" }}
              to={`/gene/${gen._id}`}
            >
              {gen.name}
            </Link>
          </p>
        );
      })}
    </div>
  );
}
