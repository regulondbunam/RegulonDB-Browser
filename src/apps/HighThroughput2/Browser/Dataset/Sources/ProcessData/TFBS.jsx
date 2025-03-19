import React, { useMemo } from 'react'
import DataVerifier from '../utils'
import { Link } from 'react-router-dom'
import FilterTable from '../filterTable'

function formatData(TFBs = []){
    let table = {
        columns: [
            {label: "chromosome", hide: true},
            {label: "start"},
            {label: "end"},
            {label: "score"},
            {label: "strand"},
            {label: "sequence"},
            {label: "genes"}
        ],
        data: []
    }

    for (const tf of TFBs) {
        let genes = []
        if (DataVerifier.isValidArray(tf?.closestGenes)) {
            genes = tf.closestGenes
        }
        table.data.push({
            start: tf?.chrLeftPosition ? tf.chrLeftPosition : "",
            end: tf?.chrRightPosition ? tf.chrRightPosition : "",
            score: tf?.score ? tf.score : "",
            strand: tf?.strand ? tf.strand : "",
            sequence: tf?.sequence ? tf.sequence : "",
            genes: <div value={genes.map(gene=>gene.name).join("; ")} >
                {genes.map((gen) => {
                    return <Link key={gen._id} style={{ marginLeft: "5px" }} to={`/gene/${gen._id}`} >{gen.name}</Link>
                })}
            </div>,
        })
    }

    return table
}

export default function TFBS({TFBs}) {
    const table = useMemo(() => formatData(TFBs), [TFBs])
  return (
    <FilterTable {...table} />
  )
}
