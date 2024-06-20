import React from "react";
import { Typography } from "@mui/material";


export default function Publications({ publications }) {
  if (!publications) {
    return null;
  }
  return (
    <>
     <Typography variant="h2" sx={{fontSize: "22px"}} >Publications: </Typography>
    <div style={{ marginLeft: "15px" }}>
     
      {publications.map((publication, i) => {
        if (!publication?.pmid) {
          return null;
        }
        return (
          <div key={publication?.pmid}>
            {publication?.title ? (
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${publication?.pmid}/`}
                className="p_accent"
                style={{ fontSize: "14px" }}
                target="_blank"
                rel="noreferrer"
              >
                {publication?.title}
              </a>
            ) : null}
            <div style={{ marginLeft: "15px" }}>
              {publication?.authors ? (
                <p>
                  {publication?.authors
                    .map((e) => {
                      return e;
                    })
                    .join(", ")}
                </p>
              ) : null}
              {publication?.pmcid ? (
                <p style={{ float: "left", marginRight: "5px" }}>
                  PMID:
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${publication?.pmid}/`}
                    className="p_accent"
                    style={{ fontSize: "14px" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {publication?.pmid}
                  </a>
                </p>
              ) : null}
              {publication?.pmcid ? (
                <p style={{ float: "left", marginRight: "5px" }}>
                  PMCID:
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${publication?.pmcid}/`}
                    className="p_accent"
                    style={{ fontSize: "14px" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {publication?.pmcid}
                  </a>
                </p>
              ) : null}
              {publication?.doi ? (
                <p style={{ float: "left", marginRight: "5px" }}>
                  DOI:
                  <a
                    href={`https://doi.org/${publication?.doi}`}
                    className="p_accent"
                    style={{ fontSize: "14px" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {publication?.doi}
                  </a>
                </p>
              ) : null}
              {publication?.date ? <p>date: {publication?.date}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
