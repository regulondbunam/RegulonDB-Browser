import React from 'react'
import { useSearchSigmulon } from 'webServices/queries'
import { AccordionList } from "ui-components/Web/Accordion"
import { DataVerifier, markMatches } from 'ui-components/utils';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';


function process(data, search = "") {
    let results = []
    if (DataVerifier.isValidArray(data)) {
        data.forEach((sigmulon) => {
            let score = 0
            let statistics = ""
            if (DataVerifier.isValidObject(sigmulon.statistics)) {
                for (const obj in sigmulon.statistics) {
                    if (!/^__/.test(obj)) {
                        statistics += `${obj}: ${sigmulon.statistics[obj]} `
                    }
                }
            }
            let sigmulonName = sigmulon.sigmaFactor.name;
            let matchName = markMatches(sigmulonName, search)
            sigmulonName = matchName.markedText
            score += matchName.score
            results.push({
                _id: sigmulon._id,
                data: sigmulon,
                type: "sigmulon",
                primary: sigmulonName,
                secondary: statistics,
                score: score
            })
        });
    }
    results.sort((a, b) => b.score - a.score);
    return results
}


export default function Sigmulon({ id = "sigmulonResults", search = "", onCompleted = () => { } }) {
    const { sigmulons, loading } = useSearchSigmulon(search, onCompleted)
    const nav = useNavigate()
    const goItem = (item) => {
        nav("/sigmulon/"+item._id)
    }
    if (loading) {
        return <Skeleton variant="rectangular" height={40} />
    }
    if (sigmulons) {
        let data = process(sigmulons, search)
        return (
            <AccordionList highlightLevel={1} defaultExpanded={!isMobile} data={data} title={"Sigmulon (" + data.length + ")"} 
                onClick={goItem}
            />
        )
    }
    return "---"
}
