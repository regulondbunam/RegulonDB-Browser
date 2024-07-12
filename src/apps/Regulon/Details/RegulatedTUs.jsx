import React, {useMemo} from 'react'
import { DataVerifier } from 'ui-components/utils'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import FilterTable from 'ui-components/Web/FilterTable'

export default function RegulatedTUs({ tus = [], name="" }) {
    const table = useMemo(() => {
        let _table = {
            columns: [
                { key: "tu", label: "Transcription Unit", width: 30 },
                { key: "fun", label: "Function", width: 40 },
                { key: "promoter", label: "Promoter" },
                { key: "gene", label: "First Gene" },
            ],
            data: []
        }
        for (const tu of tus) {
            //gene
            const gene = DataVerifier.isValidObjectWith_id(tu.firstGene) 
                ? <Link value={tu.firstGene.name} to={"/gene/" + tu.firstGene._id}><Typography><span dangerouslySetInnerHTML={{ __html: tu.firstGene.name }} /></Typography></Link>
                : ""
            //promoter
            const promoter = DataVerifier.isValidObjectWith_id(tu.promoter) 
                ? <Typography value={tu.promoter.name} ><span dangerouslySetInnerHTML={{ __html: tu.promoter.name }} /></Typography>
                : ""
            _table.data.push({
                tu: <Link value={tu.name} to={"/tu/" + tu._id}><Typography><span dangerouslySetInnerHTML={{ __html: tu.name }} /></Typography></Link>,
                fun: <Typography value={tu.function} >{tu.function}</Typography>,
                promoter: promoter,
                gene: gene,
            })
        }
        return _table
    }, [tus])
    return <FilterTable tableName=''  {...table} />
}