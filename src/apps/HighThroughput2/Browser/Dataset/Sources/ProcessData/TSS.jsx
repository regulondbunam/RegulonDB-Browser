import React, { useMemo } from 'react'
import DataVerifier from '../utils'
import { Link } from 'react-router-dom'
import FilterTable from '../filterTable'

function formatData(tss = []) {
    let table = {
        columns: [
            { label: "chromosome", hide: true },
            { label: "start" },
            { label: "end" },
            { label: "pos_1" },
            { label: "strand" },
            { label: "genes" },
            { label: "promoter" },
        ],
        data: []
    }
    for (const ts of tss) {
        let genes = []
        if (DataVerifier.isValidArray(ts?.closestGenes)) {
            genes = ts.closestGenes
        }
        let promoters = []
        table.data.push({
            chromosome: ts?.chromosome ? ts.chromosome : "",
            start: ts?.leftEndPosition ? ts.leftEndPosition : "",
            end: ts?.rightEndPosition ? ts.rightEndPosition : "",
            pos_1: ts?.pos_1 ? ts.pos_1 : "",
            strand: ts?.strand ? ts.strand : "",
            length: ts?.length ? ts.length : "",
            genes: <div value={genes.map(gene => gene.name).join("; ")} >
                {genes.map((gen) => {
                    return <Link key={gen._id} style={{ marginLeft: "5px" }} to={`/gene/${gen._id}`} >{gen.name}</Link>
                })}
            </div>,
            promoter: <div value={promoters.map(promoter => promoter.name).join("; ")} >
                {
                    promoters.map((promoter) => {
                        return <Link key={promoter._id} style={{ marginLeft: "5px" }} to={`/promoter/${promoter._id}`}>{promoter?.name}</Link>
                    })
                }
            </div>,
        })
    }
    return table
}

export default function TSS({ tss }) {
    const table = useMemo(() => formatData(tss), [tss])
  return (
    <FilterTable {...table} />
  )
}
