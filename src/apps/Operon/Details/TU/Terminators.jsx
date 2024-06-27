import React, { useMemo } from "react";
import { useGetPhrase } from "apps/Phrases";
import Label from "ui-components/Web/Label";
import { AccordionHighlight } from "ui-components/Web/Accordion";
import SequenceTrack, { FEATURE_TYPES } from "ui-components/Web/SequenceTrack";
import { DataVerifier } from "ui-components/utils";

export default function Terminators({ terminators = [], references }) {
  return (
    <AccordionHighlight
      title={
        <Label
          label={`Terminators${terminators.length > 1 ? "s" : ""}`}
          TypographyProps={{
            variant: "h3",
            fontSize: "18px",
            color: "#ffffff",
          }}
        />
      }
      level={1}
      defaultExpanded={true}
    >
      {terminators.map((terminator) => {
        return (
          <Terminator
            key={"terminatorInfo_" + terminator._id}
            {...terminator}
          />
        );
      })}
    </AccordionHighlight>
  );
}

function Terminator({
  _id,
  citations,
  confidenceLevel,
  sequence,
  tClass,
  transcriptionTerminationSite,
}) {
  const { phrases } = useGetPhrase(_id);
  const features = useMemo(() => {
    if (!DataVerifier.isValidString(sequence)) {
      return [];
    }
    const terminatorLength = Math.abs(
      transcriptionTerminationSite.rightEndPosition -
        transcriptionTerminationSite.leftEndPosition
    )+1;
    const terminatorInit = sequence
      .split("")
      .findIndex((bp) => bp === bp.toUpperCase());
    return [
      {
        id: _id + "_terminator__feature",
        posX: terminatorInit,
        length: terminatorLength,
        type: FEATURE_TYPES.TERMINATOR,
      },
    ];
  }, [sequence, transcriptionTerminationSite, _id]);
  return (
    <div style={{ marginTop: "15px" }}>
      {DataVerifier.isValidString(sequence) && (
        <div style={{ marginTop: "5px" }}>
          <SequenceTrack controls sequence={sequence} features={features} />
        </div>
      )}
    </div>
  );
}
