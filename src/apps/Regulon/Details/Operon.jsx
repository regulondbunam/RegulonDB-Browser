import React, {useMemo} from 'react'
import { DataVerifier } from 'ui-components/utils'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import FilterTable from 'ui-components/Web/FilterTable'

export default function RegulatedOperons({ operons = [], name="" }) {
    const table = useMemo(() => {
        let _table = {
            columns: [
                { key: "operon", label: "Operon", width: 30 },
                { key: "fun", label: "Function", width: 40 },
                { key: "gene", label: "First Gene" },
            ],
            data: []
        }
        for (const operon of operons) {
            //gene
            const gene = DataVerifier.isValidObjectWith_id(operon.firstGene) 
                ? <Link value={operon.firstGene.name} to={"/gene/" + operon.firstGene._id}><Typography><span dangerouslySetInnerHTML={{ __html: operon.firstGene.name }} /></Typography></Link>
                : ""
            _table.data.push({
                operon: <Link value={operon.name} to={"/operon/" + operon._id}><Typography><span dangerouslySetInnerHTML={{ __html: operon.name }} /></Typography></Link>,
                fun: <Typography value={operon.function} >{operon.function}</Typography>,
                gene: gene,
            })
        }
        return _table
    }, [operons])
    return <FilterTable tableName=''  {...table} />
}