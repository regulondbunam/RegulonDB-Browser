import React, { useMemo } from 'react'
import FilterTable from '../FilterTable'
//import { schema_regulatorySite, schema_regulator } from './static'
import { DataVerifier } from 'ui-components/utils'
import { HeaderLabel } from './components'
import { Link } from 'react-router-dom'
import SequenceTrack from '../SequenceTrack'
import { confidenceLevelLabel } from 'ui-components/utils'
import { ParagraphCitations, CITATION_SIZE } from '../Citations'

export default function RegulatoryInteractions({
    isRegulators = false,
    references,
    regulatoryInteractions = [],
}) {

    const table = useMemo(() => {
        let columns = []
        let data = []
        if (isRegulators) {
            columns.push({ key: "regulatorName", label: <HeaderLabel label="RegulonName" subLabel="function: repressor(-), activator(+), dual(+-))" />, width: 250, height: 50 })
        }
        columns = columns.concat([
            {key: "centralPosition",label:<HeaderLabel label={"Relative\ncentral position"} />},
            {key: "leftPos",label:<HeaderLabel label={"LeftEndPosition"} />},
            {key: "rightPos",label:<HeaderLabel label={"RightEndPosition"} />},
            {key: "sequence",label:<HeaderLabel label={"Sequence"} />, width: 400},
            {key: "confidenceLevel",label:<HeaderLabel label="Confidence Level" subLabel="C: Confirmed, S: Strong, W Weak" />},
            {key: "references",label:<HeaderLabel label="References" subLabel="[Publication | Evidences]" />},
        ])
        if (DataVerifier.isValidArray(regulatoryInteractions)) {
            regulatoryInteractions.forEach(regulatoryInteraction => {
                const regulatorySite = regulatoryInteraction?.regulatorySite ? regulatoryInteraction.regulatorySite : {}
                let row = {}
                if (isRegulators) {
                    if (DataVerifier.isValidObjectWith_id(regulatoryInteraction?.regulator)) {
                        const regulator = regulatoryInteraction?.regulator
                        row["regulatorName"] = <Link to={"/regulon/" + regulator._id} value={`${regulator.name}${rFun(regulator.function)}`} ><RegulatorFunction name={regulator.name} regFunction={regulator.function} /></Link>
                    }
                }
                
                data.push({
                    ...row,
                    centralPosition: regulatoryInteraction.relativeCenterPosition,
                    leftPos: regulatorySite?.leftEndPosition,
                    rightPos: regulatorySite?.rightEndPosition,
                    sequence: <SequenceTrack value={regulatorySite?.sequence} sequence={regulatorySite?.sequence} width='400px' />,
                    confidenceLevel: <div value={regulatoryInteraction.confidenceLevel} dangerouslySetInnerHTML={{__html: confidenceLevelLabel(regulatoryInteraction.confidenceLevel)}} />,
                    references: <ParagraphCitations value="" references={references} citations={regulatoryInteraction.citations} citationSize={CITATION_SIZE.ONLY_INDEX} />
                })
            });
        }
        return { data: data, columns }
    }, [regulatoryInteractions, isRegulators, references])
    console.log(regulatoryInteractions);
    console.log(table);
    return (<FilterTable {...table} selection='row' tableName={`${regulatoryInteractions.length} regulatory interactions`} titleVariant='relevant' />)
}


export const rFun = (f) => {
    const rf = {
        repressor: "-",
        activator: "+",
        dual: "+-"
    }
    return rf[f] ? rf[f] : ""
}

export const spanColor = (f) => {
    const rf = {
        repressor: "#FF0000",
        activator: "#14A054",
        dual: "#0000FF"
    }
    return rf[f] ? rf[f] : ""
}


function RegulatorFunction({ name = "", regFunction }) {
    return (
        <span style={{ color: spanColor(regFunction) }}>
            {name}
            {rFun(regFunction)}
        </span>
    );
}

export function getRISbyRBS(regulatorBindingSites = []) {
    if (!DataVerifier.isValidArray(regulatorBindingSites)) {
        return []
    }
    let regulatoryInteractions = []
    regulatorBindingSites.forEach(rbs => {
        if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
            rbs.regulatoryInteractions.forEach(ri => {
                regulatoryInteractions.push({
                    regulator: { ...rbs.regulator, function: rbs.function },
                    ...ri
                })
            });
        }
    });
    return regulatoryInteractions
}