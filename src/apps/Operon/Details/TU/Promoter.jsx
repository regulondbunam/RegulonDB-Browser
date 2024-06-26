import React from 'react'
import { AccordionHighlight } from 'ui-components/Web/Accordion'
import { Typography } from '@mui/material'
import { DataVerifier, confidenceLevelLabel } from 'ui-components/utils'
import SequenceTrack, { FEATURE_TYPES } from 'ui-components/Web/SequenceTrack'
import { ParagraphCitations } from 'ui-components/Web/Citations'

export default function Promoter({
    _id,
    additiveEvidences,
    bindsSigmaFactor,
    boxes,
    citations,
    confidenceLevel,
    name,
    note,
    references,
    regulatorBindingSites,
    score,
    sequence,
    synonyms,
    transcriptionStartSite,
    strand,
}) {
    const features = React.useMemo(() => {
        let _features = [];
        if (!DataVerifier.isValidString(sequence)) {
            return _features
        }
        /**
         * promoter
         * boxes
         */
        //find upper case on sequence
        const promoterRelativePosition = sequence
            .split("")
            .findIndex((bp) => bp === bp.toUpperCase());
        if (promoterRelativePosition !== -1) {
            _features.push({
                id: _id + "_promoter_" + promoterRelativePosition + "_feature",
                label: "+1",
                posX: promoterRelativePosition,
                type: FEATURE_TYPES.PROMOTER,
            });
        }
        if (DataVerifier.isValidArray(boxes)) {
            boxes.forEach((box, index) => {
                if (sequence.toLowerCase().includes(box.sequence.toLowerCase())) {
                    const tss = transcriptionStartSite.leftEndPosition
                    let distancePromoterBox = -1
                    let posX = -1

                    if (strand === "forward") {
                        if (tss > box.leftEndPosition) {
                            distancePromoterBox = tss - box.leftEndPosition
                            posX = promoterRelativePosition - distancePromoterBox
                        } else {
                            distancePromoterBox = tss - box.leftEndPosition
                            posX = promoterRelativePosition - distancePromoterBox
                        }
                    } else {
                        if (tss < box.rightEndPosition) {
                            distancePromoterBox = tss - box.rightEndPosition
                            posX = promoterRelativePosition + distancePromoterBox
                        } else {
                            distancePromoterBox = tss - box.leftEndPosition
                            posX = promoterRelativePosition + distancePromoterBox
                        }
                    }

                    //console.log(promoterRelativePosition, distancePromoterBox, box.type, posX);

                    _features.push({
                        id: _id + "_box_" + index + "_feature",
                        label: box.type.replace("minus", "-"),
                        posX: posX,
                        type: FEATURE_TYPES.BOX,
                        sequence: box.sequence,
                    });
                }

            });
        }
        return _features;
    }, [_id, sequence, boxes, strand, transcriptionStartSite]);
    return (
        <AccordionHighlight
            title={
                <Typography variant="h3" fontSize={"18px"} color={"#ffffff"}>
                    {`Promoter ${name}`}
                </Typography>
            }
            level={1}
            defaultExpanded={true}
        >
            <div style={{ marginTop: "15px" }} >
                {DataVerifier.isValidString(sequence) && (
                    <div style={{ marginTop: "5px" }}>
                        <SequenceTrack controls sequence={sequence} features={features} />
                    </div>
                )}
                {DataVerifier.isValidNumber(transcriptionStartSite?.leftEndPosition) && (
                    <div>
                        <Typography variant="relevantB" sx={{ mr: 1 }} >Transcription Start Site: </Typography>
                        <Typography variant="relevant" >{transcriptionStartSite?.leftEndPosition}</Typography>
                    </div>
                )}
                {DataVerifier.isValidArray(boxes) && (
                    <div>
                        <Typography variant="relevantB" sx={{ mr: 1 }} >Confidence Level: </Typography>
                        <Typography variant="relevant" ><span dangerouslySetInnerHTML={{__html: confidenceLevelLabel(confidenceLevel)}} /></Typography>
                    </div>
                )}
                {DataVerifier.isValidArray(citations) && (
            <div>
              <Typography variant="relevant" >References:</Typography>
              <ParagraphCitations citations={citations} references={references} />
            </div>
          )}
            </div>
        </AccordionHighlight>
    )
}
