import { useMemo } from "react";
import { DataVerifier } from "ui-components/utils";
import DrawingTraces, { CONTROLS_POSITIONS, FOCUS_TYPE } from "apps/DrawingTracesTool/Ecoli/DrawingTraces";
import { indexedReferences } from "ui-components/utils/References";
import { collectIds } from "ui-components/Web/Related";
import { Typography } from "@mui/material";
import { confidenceLevelLabel } from "ui-components/utils";
import { Link } from "react-router-dom";
import { ParagraphCitations } from "ui-components/Web/Citations";
import { AccordionHighlight } from "ui-components/Web/Accordion";
import Note from "ui-components/Web/Note";
import Genes from "./Genes";
import Promoter from "./Promoter";


export default function TranscriptionUnit({
  _id,
  allCitations,
  pageReferences,
  relatedIds,
  regulationPositions,
  strand,
  additiveEvidences = [],
  citations = [],
  confidenceLevel,
  firstGene,
  genes = [],
  name,
  note,
  promoter,
  regulatorBindingSites = [],
  statistics,
  synonyms = [],
  terminators = [],
}) {

  const references = useMemo(() => {
    return pageReferences ? pageReferences : indexedReferences(allCitations);
  }, [allCitations, pageReferences]);

  const isGenes = DataVerifier.isValidArray(genes)
  const isTerminators = DataVerifier.isValidArray(terminators)
  const isPromoter = DataVerifier.isValidObjectWith_id(promoter)
  const isRBSinTU = DataVerifier.isValidArray(regulatorBindingSites);

  //const isRBSinPromoter = isPromoter ? DataVerifier.isValidArray(promoter.regulatorBindingSites) : false;



  //console.log(regulationPositions.leftEndPosition);
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 90,
          boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.43)",
          WebkitBoxShadow: " 0px 2px 2px 0px rgba(0,0,0,0.43)",
          MozBoxShadow: " 0px 2px 2px 0px rgba(0,0,0,0.43)",
          backgroundColor: "white"
        }}
      >
        <DrawTU id={"dttOperon_" + _id + "_" + promoter?._id}
          genes={isGenes && genes}
          promoter={isPromoter && promoter}
          regulatorBindingSites={isRBSinTU && regulatorBindingSites}
          terminators={isTerminators && terminators}
          regulationPositions={regulationPositions} />
      </div>
      <div
        style={{
          zIndex: "1",
          marginTop: "20px"
        }}>
        <Typography variant="relevantB" >
          Transcription Unit info
        </Typography>
        <div style={{ marginLeft: "15px", marginTop: "5px" }} >
          {DataVerifier.isValidString(name) && (
            <div>
              <Typography variant="relevantB" sx={{ mr: 1 }} >Name:</Typography>
              <Typography variant="relevant" ><span dangerouslySetInnerHTML={{ __html: name }} /></Typography>
            </div>
          )}
          {DataVerifier.isValidObjectWith_id(firstGene) && (
            <div>
              <Typography variant="relevantB" sx={{ mr: 1 }} >First Gene: </Typography>
              <Link to={"/gene/" + firstGene._id} ><Typography variant="relevant" ><span dangerouslySetInnerHTML={{ __html: firstGene.name }} /></Typography></Link>
              <div>
                <Typography variant="relevantB" sx={{ mr: 1 }} >Distance from TSS to first gene:</Typography>
                <Typography variant="relevant" >{firstGene.distanceToPromoter}</Typography>
              </div>
            </div>
          )}
          <Genes genes={genes} />
          {DataVerifier.isValidString(confidenceLevel) && (
            <div>
              <Typography variant="relevantB" sx={{ mr: 1 }} >Confidence Level:</Typography>
              <Typography variant="relevant" ><span dangerouslySetInnerHTML={{ __html: confidenceLevelLabel(confidenceLevel) }} /></Typography>
            </div>
          )}
          {DataVerifier.isValidArray(citations) && (
            <div>
              <Typography variant="relevant" >References:</Typography>
              <ParagraphCitations citations={citations} references={references} />
            </div>
          )}
          {DataVerifier.isValidString(note) && (
            <AccordionHighlight
              title={
                <Typography variant="h3" fontSize={"18px"} color={"#ffffff"}>
                  Note
                </Typography>
              }
              level={1}
            >
              <Note note={note} references={references} />
            </AccordionHighlight>
          )}
          {isPromoter && (<Promoter {...promoter} references={references} strand={strand} />)}
          
        </div>
        {
          /**
           * Promoter
           * Terminator
           * RIs
           * Citations
           */
        }
      </div>
    </div>
  );
}

function DrawTU({ id, genes, promoter, regulationPositions, regulatorBindingSites, terminators }) {
  const focusElements = useMemo(() => {
    let ids = []
    if (genes) {
      ids.push(...collectIds(genes))
    }
    if (promoter) {
      ids.push(...collectIds(promoter))
    }
    if (regulatorBindingSites) {
      ids.push(...collectIds(regulatorBindingSites))
    }
    if (terminators) {
      ids.push(...collectIds(terminators))
    }
    return ids
  }, [genes, promoter, regulatorBindingSites, terminators])

  return <DrawingTraces
    id={id}
    height={150}
    leftEndPosition={regulationPositions.leftEndPosition}
    rightEndPosition={regulationPositions.rightEndPosition}
    showTable={false}
    focusElements={focusElements}
    focusType={FOCUS_TYPE.ONLY_FOCUS}
    controlsPosition={CONTROLS_POSITIONS.BOTTOM_RIGHT}
  />
}

//  focusElements={state.ids} 