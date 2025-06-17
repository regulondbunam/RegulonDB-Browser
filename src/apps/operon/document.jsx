import { useMemo } from "react";
import { AnchorNav, DataVerifier } from "../../components/ui-components"
import { AllCitations, useIndexedCitation } from "../../components/datamartSchema"
import DrawingTracesTool from "../../components/DrawingTracesTool";
import { TranscriptionUnit } from "../../components/datamartSchema";
import { getRelatedIdsByOperonData } from "../../components/webservices";
import RelatedTool from "./components/relatedTool";


const cardOptions = {
    showTitle: true
}

export default function Document({ operonData, section }) {
    const citations = useIndexedCitation(operonData.allCitations)
    //console.log(operonData)
    let relatedIds = getRelatedIdsByOperonData(operonData)
    //console.log(operonData);
    let relationTool = <RelatedTool operonData={operonData} relatedIds={relatedIds} />

    let dtt = <DrawingTracesTool
        context="operon"
        relatedIds={relatedIds.all}
        height={200}
        id={operonData._id}
        leftEndPosition={operonData.operon.regulationPositions.leftEndPosition - 1000}
        rightEndPosition={operonData.operon.regulationPositions.rightEndPosition + 1000}
        labelTitle={`Operon ${operonData.operon.name} general context`}
    />
    
    const sections = useMemo(() => {
        let _sections = []
        if (DataVerifier.isValidArray(operonData.transcriptionUnits)) {

            operonData.transcriptionUnits.forEach(tu => {
                let promoterName = ""
                if (DataVerifier.isValidObject(tu.promoter)) {
                    promoterName = " - "+tu.promoter.name
                }
                let tuRelatedIds = relatedIds.groupByTu[tu._id]
                _sections.push({
                    id: "OperonAnchor_TU" + tu._id,
                    label: tu.name+promoterName,
                    title: "TU: "+tu.name+promoterName,
                    component: <div>
                        <TranscriptionUnit {...tu} relatedIds={tuRelatedIds} allCitations={citations.indexedCitations} regulationPositions={operonData.operon.regulationPositions} strand={operonData.operon.strand} />
                    </div>
                })
            });
        }
        if (DataVerifier.isValidArray(citations.indexedCitations)) {
            _sections.push({
                id: "GeneTab_Citations",
                label: "All References and Evidence",
                title: "All References and Evidence",
                component: <div style={{ overflow: "auto" }} >
                    <AllCitations {...citations} />
                </div>,
            })
        }
        return _sections
    }, [operonData, relatedIds, citations])

    return (
        <div>
            <AnchorNav sections={sections} cardOptions={cardOptions} aside={relationTool}
                title={`Operon ${operonData.operon.name}`} header={dtt} />
        </div>
    )
}