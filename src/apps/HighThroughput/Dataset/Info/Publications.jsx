import React from "react";
import Typography from '@mui/material/Typography';
import { DataVerifier } from "ui-components/utils";


export default function Publications({ publications }) {
  return (
    <div>
      <Typography variant="h2"  >Publication{publications.length > 1 ? "s" : ""}: </Typography>
      <div style={{ marginLeft: "15px" }}>
        {publications.map((publication, i) => {
          if (!publication?.pmid) {
            return null;
          }
          return (
            <div key={publication?.pmid}>
              <div>
                {DataVerifier.isValidString(publication?.title) && (
                  <Typography variant="relevant">
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${publication?.pmid}/`}
                      className="p_accent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {publication.title}
                    </a>
                  </Typography>
                )}
                {DataVerifier.isValidArray(publication?.authors) && (
                  <div>
                    <Typography variant="irrelevant" >
                      {publication?.authors
                        .map((e) => {
                          return e;
                        }).join(", ")}
                    </Typography>
                  </div>
                )}
                {DataVerifier.isValidString(publication?.date) && (
                  <div>
                    <Typography variant="irrelevant" >
                    {publication?.date}
                    </Typography>
                  </div>
                )}
              </div>
              <div style={{ marginLeft: "10px", display: 'flex' }}>
                {DataVerifier.isValidString(publication?.pmid) && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="irrelevantB" sx={{ mr: 1 }}>
                      PMID:
                    </Typography>
                    <Typography variant="irrelevant">
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}/`}
                        className="p_accent"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {publication.pmid}
                      </a>
                    </Typography>
                    <Typography variant="irrelevantB" sx={{ mr: 1, ml: 1 }}>
                      |
                    </Typography>
                  </div>
                )}
                {publication?.pmcid && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="irrelevantB" sx={{ mr: 1 }}>
                      PMID:
                    </Typography>
                    <Typography variant="irrelevant">
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${publication?.pmcid}/`}
                        className="p_accent"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {publication?.pmcid}
                      </a>
                    </Typography>
                    <Typography variant="irrelevantB" sx={{ mr: 1, ml: 1 }}>
                      |
                    </Typography>
                  </div>
                )}
                {DataVerifier.isValidString(publication?.doi) && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="irrelevantB" sx={{ mr: 1 }}>
                      DOI:
                    </Typography>
                    <Typography variant="irrelevant">
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      className="p_accent"
                      style={{ fontSize: "14px" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {publication.doi}
                    </a>
                    </Typography>
                    <Typography variant="irrelevantB" sx={{ mr: 1, ml: 1 }}>
                      |
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
