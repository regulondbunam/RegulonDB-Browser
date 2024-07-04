import React from 'react'
import { useSearchRegulon } from 'webServices/queries'
import { AccordionList } from "ui-components/Web/Accordion"
import { DataVerifier, markMatches } from 'ui-components/utils';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';


function process(data, search = "") {
    let results = []
    if (DataVerifier.isValidArray(data)) {
        data.forEach((regulon) => {
            let score = 0
            let statistics = ""
            if (DataVerifier.isValidObject(regulon.summary)) {
                for (const obj in regulon.summary) {
                    if (!/^__/.test(obj)) {
                        statistics += `${obj}: ${regulon.summary[obj].total} `
                    }
                }
            }
            let operonName = regulon.regulator.name;
            let matchName = markMatches(operonName, search)
            operonName = matchName.markedText
            score += matchName.score
            results.push({
                _id: regulon.regulator._id,
                data: regulon,
                type: "regulon",
                primary: operonName,
                secondary: statistics,
                score: score
            })
        });
    }
    results.sort((a, b) => b.score - a.score);
    return results
}


export default function Regulon({ id = "regulonResults", search = "", onCompleted = () => { } }) {
    const { regulons, loading } = useSearchRegulon(search, onCompleted)
    const nav = useNavigate()
    const goItem = (item) => {
        nav("/regulon/"+item._id)
    }
    if (loading) {
        return <Skeleton variant="rectangular" height={40} />
    }
    if (regulons) {
        let data = process(regulons, search)
        return (
            <AccordionList id={id} highlightLevel={1} defaultExpanded={!isMobile} data={data} title={"Regulons (" + data.length + ")"}
                onClick={goItem}
            />
        )
    }
    return "---"
}
