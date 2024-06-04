import React from "react";
import { Typography } from "@mui/material";
import { DataVerifier } from "ui-components/utils";

export default function Product({
  _id,
  abbreviatedName,
  anticodon,
  cellularLocations,
  citations,
  externalCrossReferences,
  geneOntologyTerms,
  isRegulator,
  isoelectricPoint,
  molecularWeight,
  motifs,
  name,
  note,
  regulonId,
  sequence,
  synonyms,
  type,
  allCitations,
}) {
  return (
    <div>
      <table>
        <tbody>
        {DataVerifier.isValidString(abbreviatedName) && (
            <tr>
              <td>
                <Typography variant="relevantB">Abbreviated name:</Typography>
              </td>
              <td>
                <Typography variant="relevant">{abbreviatedName}</Typography>
              </td>
            </tr>
          )}
          {DataVerifier.isValidString(anticodon) && (
            <tr>
              <td>
                <Typography variant="relevantB">Anticodon:</Typography>
              </td>
              <td>
                <Typography variant="relevant">{anticodon}</Typography>
              </td>
            </tr>
          )}
          {DataVerifier.isValidArray(cellularLocations) && (
            <tr>
              <td>
                <Typography variant="relevantB">Cellular location:</Typography>
              </td>
              <td>
                <Typography variant="relevant">
                  {cellularLocations.join(", ")}
                </Typography>
              </td>
            </tr>
          )}



          {DataVerifier.isValidArray(synonyms) && (
            <tr>
              <td>
                <Typography variant="relevantB">Synonyms:</Typography>
              </td>
              <td>
                <Typography variant="relevant">
                  {synonyms.join(", ")}
                </Typography>
              </td>
            </tr>
          )}
          {DataVerifier.isValidString(molecularWeight) && (
            <tr>
              <td>
                <Typography variant="relevantB">Molecular weight:</Typography>
              </td>
              <td>
                <Typography variant="relevant">{molecularWeight}</Typography>
              </td>
            </tr>
          )}
          
          {DataVerifier.isValidString(anticodon) && (
            <tr>
              <td>
                <Typography variant="relevantB">Anticodon:</Typography>
              </td>
              <td>
                <Typography variant="relevant">{anticodon}</Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
