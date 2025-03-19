import React, { useMemo } from 'react'
import DataVerifier from '../utils'
import { Link } from 'react-router-dom'
import FilterTable from '../filterTable'

function formatData(TUs = []){
    let table = {
        columns: [
            {label: "chromosome", hide: true},
            {label: "start"},
            {label: "end"},
            {label: "name"},
            {label: "strand"},
            {label: "length"},
            {label: "genes"},
        ],
        data: []
    }
    for (const tu of TUs) {
        let genes = []
        if (DataVerifier.isValidArray(tu?.genes)) {
            genes = tu.genes
        }
        table.data.push({
            chromosome: tu?.chromosome ? tu.chromosome : "",
            start: tu?.leftEndPosition ? tu.leftEndPosition : "",
            end: tu?.rightEndPosition ? tu.rightEndPosition : "",
            name: tu?.name ? tu.name : "",
            strand: tu?.strand ? tu.strand : "",
            length : tu?.length ? tu.length : "",
            genes: <div value={genes.map(gene=>gene.name).join("; ")} >
                {genes.map((gen) => {
                    return <Link key={gen._id} style={{ marginLeft: "5px" }} to={`/gene/${gen._id}`} >{gen.name}</Link>
                })}
            </div>,
        })
    }
    return table
}

export default function TUS({tus}) {
    const table = useMemo(() => formatData(tus), [tus])
  return (
    <FilterTable {...table} />
  )
}
