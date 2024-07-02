import React from 'react'
import { useSearchOperon } from 'webServices/queries'
import { AccordionList } from "ui-components/Web/Accordion"
import { DataVerifier, markMatches } from 'ui-components/utils';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';


function process(data, search = "") {
    let results = []
    if (DataVerifier.isValidArray(data)) {
        data.forEach((operon) => {
            let score = 0
            let promoters = ""
            if (DataVerifier.isValidArray(operon?.transcriptionUnits)) {
                let _prop = []
                for (const tu of operon?.transcriptionUnits ) {
                    if (DataVerifier.isValidObjectWith_id(tu.promoter)) {
                        _prop.push(tu.promoter.name)
                    }
                }
                
                const matchesPromoter = markMatches(_prop.join(", "), search)
                promoters = "Promoters "+matchesPromoter.markedText
                score += matchesPromoter.score
            }
            let statistics = ""
            if (DataVerifier.isValidObject(operon.operon.statistics)) {
                for (const obj in operon.operon.statistics) {
                    if (!/^__/.test(obj)) {
                        statistics += `${obj}: ${operon.operon.statistics[obj]} `
                    }
                }
            }
            let operonName = operon.operon.name;
            let matchName = markMatches(operonName, search)
            operonName = matchName.markedText
            score += matchName.score
            results.push({
                _id: operon._id,
                data: operon,
                type: "operon",
                primary: operonName,
                secondary: statistics + " " + promoters,
                score: score
            })
        });
    }
    results.sort((a, b) => b.score - a.score);
    return results
}


export default function Operon({ id = "operonResults", search = "", onCompleted = () => { } }) {
    const { operons, loading } = useSearchOperon(search, onCompleted)
    const nav = useNavigate()
    const goItem = (item) => {
        nav("/operon/"+item._id)
    }
    if (loading) {
        return <Skeleton variant="rectangular" height={40} />
    }
    if (operons) {
        let data = process(operons, search)
        return (
            <AccordionList highlightLevel={1} defaultExpanded={!isMobile} data={data} title={"Operons (" + data.length + ")"} 
                onClick={goItem}
            />
        )
    }
    return "---"
}
