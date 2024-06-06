import React, { useMemo } from "react";
import { Typography } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import { AccordionHighlight } from "ui-components/Web/Accordion";
import Note from "ui-components/Web/Note";
import { indexedReferences } from "ui-components/utils/References";
import Sequence from "./Sequence";

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
  //name,
  note,
  regulonId,
  sequence,
  synonyms,
  type,
  allCitations,
}) {
  const references = useMemo(() => {
    return indexedReferences(allCitations);
  }, [allCitations]);
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
          {isRegulator !== null && (
            <tr>
              <td>
                <Typography variant="relevantB">Is regulator:</Typography>
              </td>
              <td>
                <Typography variant="relevant">
                  {isRegulator ? "True" : "False"}
                </Typography>
              </td>
            </tr>
          )}
          {DataVerifier.isValidNumber(isoelectricPoint) && (
            <tr>
              <td>
                <Typography variant="relevantB">Isoelectric point:</Typography>
              </td>
              <td>
                <Typography variant="relevant">{isoelectricPoint}</Typography>
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
        </tbody>
      </table>
      {DataVerifier.isValidString(note) && (
        <AccordionHighlight
          title={
            <Typography variant="h3" color={"#ffffff"}>
              Note
            </Typography>
          }
          level={1}
        >
          <Note note={note} references={references} />
        </AccordionHighlight>
      )}
      {DataVerifier.isValidString(sequence) && (
        <AccordionHighlight
          title={
            <Typography variant="h3" color={"#ffffff"}>
              Features
            </Typography>
          }
          defaultExpanded={true}
          level={1}
        >
          <Sequence sequence={sequence} motifs={motifs} />
        </AccordionHighlight>
      )}
      {/**
       * Sequence
       * Terms
       * Motifs
       * external references
       * citations
       */}
    </div>
  );
}
