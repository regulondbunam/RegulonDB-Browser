import React, { useMemo } from 'react'
import DataVerifier from '../utils'
import { Link } from 'react-router-dom'
import FilterTable from '../filterTable'

function formatData(GEs = []){
    let table = {
        columns: [
            {label: "Gene", hide: false},
            {label: "leftEndPosition"},
            {label: "rightEndPosition"},
            {label: "TPM"},
            {label: "FPKM"},
            {label: "IGV position"},
        ],
        data: []
    }
    for (const ge of GEs) {
        table.data.push({
            Gene: (
                <div value={ge?.gene?.name}>
                    <Link key={ge?.gene?._id} style={{ marginLeft: "5px" }} to={`/gene/${ge?.gene?._id}`}>
                        {ge?.gene?.name}
                    </Link>
                </div>
            ),
            leftEndPosition: ge?.gene?.leftEndPosition ? ge.gene.leftEndPosition : "",
            rightEndPosition: ge?.gene?.rightEndPosition ? ge.gene.rightEndPosition : "",
            TPM: ge?.tpm ? ge.tpm : "",
            FPKM: ge?.fpkm ? ge.fpkm : "",
            "IGV position": "NC_000913.3:"+ge?.gene?.leftEndPosition+"-"+ge?.gene?.rightEndPosition,
        })
    }
    return table
}

export default function GENEX({genex}) {
    const table = useMemo(() => formatData(genex), [genex])
  return (
    <FilterTable {...table} />
  )
}
