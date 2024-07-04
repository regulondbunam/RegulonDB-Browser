import React from 'react'
import {useSearchGU} from 'webServices/queries'
import {AccordionList} from "ui-components/Web/Accordion"
import {DataVerifier, markMatches} from 'ui-components/utils';
import Skeleton from '@mui/material/Skeleton';
import {useNavigate} from 'react-router-dom';
import {isMobile} from 'react-device-detect';


function process(data, search = "") {
    let results = []
    if (DataVerifier.isValidArray(data)) {
        data.forEach((gu) => {
            let score = 0
            let guName = gu.gensorUnit.name;
            let matchName = markMatches(guName, search)
            guName = matchName.markedText
            score += matchName.score
            let guGroups = ""
            if (DataVerifier.isValidArray(gu.gensorUnit.groups)) {
                guGroups = gu.gensorUnit.groups.join(", ");
                let matchGroups = markMatches(guGroups, search)
                guGroups = matchGroups.markedText
                score += matchGroups.score
            }
            results.push({
                _id: gu._id,
                data: gu,
                type: "gensorUnit",
                primary: guName,
                secondary: guGroups,
                score: score
            })
        });
    }
    results.sort((a, b) => b.score - a.score);
    return results
}


export default function GensorUnit({
                                       id = "guResult", search = "", onCompleted = () => {
    }
                                   }) {
    const {gensorUnits, loading} = useSearchGU(search, onCompleted)
    const nav = useNavigate()
    const goItem = (item) => {
        nav("/gu/" + item._id)
    }
    if (loading) {
        return <Skeleton variant="rectangular" height={40}/>
    }
    if (gensorUnits) {
        let data = process(gensorUnits, search)
        return (
            <AccordionList highlightLevel={1} defaultExpanded={!isMobile} data={data}
                           title={"GENSOR UNIT (" + data.length + ")"}
                           onClick={goItem}
            />
        )
    }
    return "---"
}
