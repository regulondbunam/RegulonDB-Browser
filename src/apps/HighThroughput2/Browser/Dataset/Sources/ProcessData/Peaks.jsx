import React, { useMemo } from 'react'
import DataVerifier from '../../../Table/utils'
import { Link } from 'react-router-dom'
import FilterTable from "../filterTable"

function formatData(peaks=[]){
    let table = {
        columns: [
            {label: "chromosome", hide: true},
            {label: "start"},
            {label: "end"},
            {label: "score"},
            {label: "genes"}
        ],
        data: []
    }
    for (const peak of peaks) {
        let genes = []
        if (DataVerifier.isValidArray(peak?.closestGenes)) {
            genes = peak.closestGenes
        }
        table.data.push({
            chromosome: peak?.chromosome ? peak.chromosome : "",
            start: peak?.peakLeftPosition ? peak.peakLeftPosition : "",
            end: peak?.peakRightPosition ? peak.peakRightPosition : "",
            score: peak?.score ? peak.score : "",
            strand: peak?.strand ? peak.score : "",
            sequence: "",
            genes: <div value={genes.map(gene=>gene.name).join("; ")} >
                {genes.map((gen) => {
                    return <Link key={gen._id} style={{ marginLeft: "5px" }} to={`/gene/${gen._id}`} >{gen.name}</Link>
                })}
            </div>,
        })
    }
    return table
}

export default function Peaks({peaks}) {
    const table = useMemo(() => formatData(peaks), [peaks])
  return (
    <FilterTable {...table} />
  )
}
