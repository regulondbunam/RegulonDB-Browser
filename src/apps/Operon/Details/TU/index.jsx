import { useMemo } from "react";
import { DataVerifier } from "ui-components/utils";
import DrawingTraces, { CONTROLS_POSITIONS, FOCUS_TYPE } from "apps/DrawingTracesTool/Ecoli/DrawingTraces";
import { indexedReferences } from "ui-components/utils/References";
import { collectIds } from "ui-components/Web/Related";

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
          top: "58px",
          zIndex: "80",
          boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.43)",
          WebkitBoxShadow: " 0px 2px 2px 0px rgba(0,0,0,0.43)",
          MozBoxShadow: " 0px 2px 2px 0px rgba(0,0,0,0.43)",
        }}
      >
        <DrawTU id={"dttOperon_" + _id + "_" + promoter?._id}
          genes={isGenes && genes}
          promoter={isPromoter && promoter}
          regulatorBindingSites={isRBSinTU && regulatorBindingSites}
          terminators={isTerminators && terminators}
          regulationPositions={regulationPositions} />
      </div>
      <div></div>
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