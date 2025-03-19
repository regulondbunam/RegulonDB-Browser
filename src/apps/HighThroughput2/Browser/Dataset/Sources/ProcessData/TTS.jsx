import React, { useMemo } from 'react'
import DataVerifier from '../utils'
import { Link } from 'react-router-dom'
import FilterTable from '../filterTable'

function formatData(tts = []) {
    let table = {
        columns: [
            { label: "chromosome", hide: true },
            { label: "start" },
            { label: "end" },
            { label: "name" },
            { label: "strand" },
            { label: "genes" },
        ],
        data: []
    }
    for (const tt of tts) {
        let genes = []
        if (DataVerifier.isValidArray(tt?.closestGenes)) {
            genes = tt.closestGenes
        }
        table.data.push({
            chromosome: tt?.chromosome ? tt.chromosome : "",
            start: tt?.leftEndPosition ? tt.leftEndPosition : "",
            end: tt?.rightEndPosition ? tt.rightEndPosition : "",
            name: tt?.name ? tt.name : "",
            strand: tt?.strand ? tt.strand : "",
            length: tt?.length ? tt.length : "",
            genes: <div value={genes.map(gene => gene.name).join("; ")} >
                {genes.map((gen) => {
                    return <Link key={gen._id} style={{ marginLeft: "5px" }} to={`/gene/${gen._id}`} >{gen.name}</Link>
                })}
            </div>,
        })
    }
    return table
}

export default function TTS({tts}) {
    const table = useMemo(() => formatData(tts), [tts])
    return (
      <FilterTable {...table} />
    )
}
