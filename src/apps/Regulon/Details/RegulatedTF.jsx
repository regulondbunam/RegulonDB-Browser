import React, {useMemo} from 'react'
import { DataVerifier } from 'ui-components/utils'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import FilterTable from 'ui-components/Web/FilterTable'

export default function RegulatedTFs({ tfs = [], name="" }) {
    const table = useMemo(() => {
        let _table = {
            columns: [
                { key: "tf", label: "Transcription Factor", width: 30 },
                { key: "fun", label: "Function", width: 40 },
                { key: "genes", label: "Genes" },
            ],
            data: []
        }
        for (const tf of tfs) {
            //gene
            const genes = DataVerifier.isValidArray(tf.genes)
                ? tf.genes
                : []
            _table.data.push({
                tf: <Link value={tf.name} to={"/regulon/" + tf._id}><Typography><span dangerouslySetInnerHTML={{ __html: tf.name }} /></Typography></Link>,
                fun: <Typography value={tf.function} >{tf.function}</Typography>,
                genes: <Typography value={genes.map(fun => fun.name).join("; ")} sx={{ whiteSpace: "nowrap" }} >
                {genes.map(gene=>{
                    return (
                        <Link style={{marginLeft: "5px",  }} value={gene.name} key={`gene_${gene._id}_InTf_${tf._id}`} to={"/gene/" + gene._id}>
                                <span dangerouslySetInnerHTML={{ __html: gene.name }} />
                        </Link>
                    )
                })}
            </Typography>,
            })
        }
        return _table
    }, [tfs])
    return <FilterTable tableName=''  {...table} />
}