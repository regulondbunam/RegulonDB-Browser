import { Accordion, DataVerifier } from "../../../ui-components";
import { ParagraphCitations, NoteCitations } from "../../citations";
import SimpleTrack from "../../../drawingTrack/_old";
//import RegulatorBindingSites from "./regulatorBindingSites";
import { useMemo } from "react";

function confLevel(level) {
  let _confidenceLevel = <></>
  switch (level) {
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
    case "W":
      _confidenceLevel = <span style={{ color: "#0C6A87" }}>Weak</span>;
      break;
    default:
      _confidenceLevel = <span>.</span>;
      break;
  }
  return _confidenceLevel
}

export default function Promoter({ _id, promoter, strand, allCitations }) {
  let _confidenceLevel;
  if (DataVerifier.isValidString(promoter.confidenceLevel)) {
    switch (promoter.confidenceLevel) {
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
      case "W":
        _confidenceLevel = <span style={{ color: "#0C6A87" }}>Weak</span>;
        break;
      default:
        _confidenceLevel = <span>.</span>;
        break;
    }
  }

  return (
    <Accordion
      title={<h2 style={{ margin: 0 }}>{`Promoter ${promoter.name}`}</h2>}
    >
      <div
        style={{ marginLeft: "5px", display: "flex", flexDirection: "column" }}
      >
        <div>
          {DataVerifier.isValidArray(promoter.synonyms) && (
            <p>
              <b>Synonyms:</b>
              {" " + promoter.synonyms.join(", ")}
            </p>
          )}
          {DataVerifier.isValidString(promoter.confidenceLevel) && (
            <p>
              <b>Confidence Level:</b> {_confidenceLevel}
            </p>
          )}
          {DataVerifier.isValidObject(promoter.transcriptionStartSite) && (
            <>
              {DataVerifier.isValidNumber(
                promoter.transcriptionStartSite.leftEndPosition
              ) && (
                  <p>
                    <b>Transcription start site:</b>
                    {" " + promoter.transcriptionStartSite.leftEndPosition}
                  </p>
                )}
            </>
          )}
          {DataVerifier.isValidObject(promoter.bindsSigmaFactor) && (
            <>
              {DataVerifier.isValidString(promoter.bindsSigmaFactor.name) && (
                <>
                  <p>
                    <b>Sigma Factor:</b>
                    {" " + promoter.bindsSigmaFactor.name}
                  </p>
                  <p style={{ marginLeft: "25px" }}>
                    <ParagraphCitations
                      citations={promoter.bindsSigmaFactor.citations}
                      allCitations={allCitations}
                    />
                  </p>
                </>
              )}
            </>
          )}
        </div>
        {DataVerifier.isValidArray(promoter.additiveEvidences) && (
          <div>
            <table >
              <thead>
                <tr>
                  <th colSpan={3}>Additive Evidence</th>
                </tr>
                <tr>
                  <th>category</th>
                  <th>code</th>
                  <th>type</th>
                </tr>
              </thead>
              <tbody>
                {promoter.additiveEvidences.map((additiveEvidence, index) => {
                  return (
                    <tr key={"AdditiveEvidence_" + promoter._id + "_" + index}>
                      <td>{additiveEvidence.category}</td>
                      <td>{additiveEvidence.code}</td>
                      <td>{confLevel(additiveEvidence.type)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {DataVerifier.isValidString(promoter.sequence) && (
          <div>
            <SequencePromoter
              name={promoter.name + "_sequence"}
              _id={"tu_sequence_" + _id + "_" + promoter._id}
              boxes={promoter.boxes}
              transcriptionStartSite={promoter.transcriptionStartSite}
              strand={strand}
              sequence={promoter.sequence}
            />
          </div>
        )}
        {DataVerifier.isValidString(promoter.note) && (
          <>
            <p>
              <b>Note:</b>
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html: NoteCitations(allCitations, promoter.note),
              }}
            />
          </>
        )}
        {DataVerifier.isValidArray(promoter.citations) && (
          <p>
            <b>Citations:</b>
            <br />
            <ParagraphCitations
              citations={promoter.citations}
              allCitations={allCitations}
            />
          </p>
        )}
      </div>
    </Accordion>
  );
}

function SequencePromoter({
  _id,
  boxes,
  name,
  transcriptionStartSite,
  sequence = "",
  strand,
}) {
  const drawPlaceId = "canva_sequence_" + _id;
  const width = sequence.length;
  const height = 50;
  const features = useMemo(() => {
    let promoterRelativePosition = sequence
      .split("")
      .findIndex((bp) => bp === bp.toUpperCase());
    let _features = [];
    _features.push({
      id: "sequence_" + _id,
      type: "sequence",
      sequence: sequence,
      posX: 0,
      posY: height - 30,
    });
    _features.push({
      id: _id + "_promoter_" + promoterRelativePosition + "_feature",
      label: "+1",
      posX: promoterRelativePosition,
      posY: height - 40,
      type: "promoter",
    });
    if (DataVerifier.isValidArray(boxes)) {
      boxes.forEach((box, index) => {

        if (sequence.toLowerCase().includes(box.sequence.toLowerCase())) {
          //console.log(transcriptionStartSite.leftEndPosition);
          console.log(strand);
          const tss = transcriptionStartSite.leftEndPosition
          let distancePromoterBox = -1
          let posX = -1

          if (strand === "forward") {
            if (tss > box.leftEndPosition) {
              distancePromoterBox = tss - box.leftEndPosition
              posX = promoterRelativePosition - distancePromoterBox
            }else{
              distancePromoterBox = tss - box.rightEndPosition
              posX = promoterRelativePosition - distancePromoterBox
            }
          }else{
            if (tss < box.rightEndPosition) {
              distancePromoterBox = tss - box.rightEndPosition
              posX = promoterRelativePosition + distancePromoterBox
            }else{
              distancePromoterBox = tss - box.leftEndPosition
              posX = promoterRelativePosition + distancePromoterBox
            }
          }

          
          //console.log(promoterRelativePosition, distancePromoterBox, box.type, posX);
          _features.push({
            id: _id + "_box_" + index + "_feature",
            label: box.type.replace("minus", "-"),
            posX: posX,
            posY: height - 30,
            type: "box",
            sequence: box.sequence,
          });
        }

      });
    }
    return _features;
  }, [_id, sequence, boxes, strand, transcriptionStartSite]);
  return (
    <SimpleTrack
      drawPlaceId={drawPlaceId}
      width={width}
      height={height}
      features={features}
    />
  );
}
