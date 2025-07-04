import { Accordion, DataVerifier } from "../../../ui-components";
import SimpleTrack from "../../../drawingTrack/_old";
import { ParagraphCitations } from "../../citations";
//import { LinealSequence } from "../../../sequence";
import { useMemo } from "react";

export default function Terminators({ terminators, tuID, allCitations }) {
  return (
    <Accordion title={<h2 style={{ margin: 0 }}>Terminators</h2>}>
      <div
        style={{ marginLeft: "5px", display: "flex", flexDirection: "column" }}
      >
        {terminators.map((terminator, index) => (
          <Terminator
            key={`T${index}_tu_${tuID}_terminator${terminator._id}`}
            allCitations={allCitations}
            terminator={terminator}
            tuID={tuID}
          />
        ))}
      </div>
    </Accordion>
  );
}

function Terminator({ terminator, allCitations, tuID }) {
  let _confidenceLevel;
  if (DataVerifier.isValidString(terminator.confidenceLevel)) {
    switch (terminator.confidenceLevel) {
      case "S":
        _confidenceLevel = (
          <span style={{ fontWeight: "bold", color: "#0C6A87" }}>Strong</span>
        );
        break;
      case "C":
        _confidenceLevel = (
          <span style={{ fontWeight: "bold", color: "#000000" }}>
            Confirmed
          </span>
        );
        break;
      case "w":
        _confidenceLevel = <span style={{ color: "#0C6A87" }}>Weak</span>;
        break;
      default:
        _confidenceLevel = <span>.</span>;
        break;
    }
  }

  return (
    <div>
      {DataVerifier.isValidString(terminator.class) && (
        <p
            className={"phraseElement"}
            data-phrase-associated-property="class"
            data-phrase-object-id={terminator._id}
        >
          <b>Class:</b>
          {" " + terminator.class}
        </p>
      )}
      {DataVerifier.isValidString(terminator.confidenceLevel) && (
        <p>
          <b>Confidence Level:</b> {_confidenceLevel}
        </p>
      )}
      {DataVerifier.isValidObject(terminator.transcriptionTerminationSite) && (
        <p
            className={"phraseElement"}
            data-phrase-associated-property="transcriptionTerminationSite"
            data-phrase-object-id={terminator._id}
        >
          <b>Transcription Termination Site:</b>
          {" " +
            terminator.transcriptionTerminationSite.leftEndPosition +
            " - " +
            terminator.transcriptionTerminationSite.rightEndPosition}
        </p>
      )}
      {DataVerifier.isValidString(terminator.sequence) && (
        <>
          <p
              className={"phraseElement"}
              data-phrase-associated-property="sequence"
              data-phrase-object-id={terminator._id}
          >
            <b>Termination Sequence:</b>
          </p>
          <SequenceTerminator
          tuID={tuID}
            _id={terminator._id}
            transcriptionTerminationSite={
              terminator.transcriptionTerminationSite
            }
            sequence={terminator.sequence}
            name={`Terminator_${terminator._id}`}
          />
        </>
      )}
      {DataVerifier.isValidArray(terminator.citations) && (
        <p>
          <b>References and Evidence:</b>
          <br />
          <ParagraphCitations
            citations={terminator.citations}
            allCitations={allCitations}
          />
        </p>
      )}
      <br />
      <br />
    </div>
  );
}

function SequenceTerminator({
    tuID,
  _id,
  sequence,
  name,
  transcriptionTerminationSite,
}) {
  const drawPlaceId = "terminator_" + _id +"_TU_"+tuID;
  const height = 100
  const features = useMemo(() => {
    let _features = [];
    const terminatorLength = Math.abs(
      transcriptionTerminationSite.rightEndPosition -
        transcriptionTerminationSite.leftEndPosition
    );
    const terminatorInit = sequence
      .split("")
      .findIndex((bp) => bp === bp.toUpperCase());
    _features.push({
      id: "sequence_" + _id,
      type: "sequence",
      sequence: sequence,
      posX: 0,
      posY: height - 30,
    });
    _features.push({
      id: _id + "_terminator__feature",
      posX: terminatorInit,
      posY: height - 30,
      length: terminatorLength,
      type: "terminator",
    });
    return _features;
  }, [_id, sequence, transcriptionTerminationSite]);

  return (
    <SimpleTrack
      drawPlaceId={drawPlaceId}
      width={sequence.length}
      height={height}
      features={features}
    />
  );
}
