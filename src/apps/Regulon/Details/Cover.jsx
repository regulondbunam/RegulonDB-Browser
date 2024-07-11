import { Typography } from '@mui/material'
import React from 'react'
import { Cover as UiCover } from 'ui-components/Web/Cover'
import { Link } from 'react-router-dom'
import { DataVerifier } from 'ui-components/utils'
import RelatedList from "ui-components/Web/Related";

export default function Cover({ regulator }) {
    const encodeGenes = regulator.encodedBy?.genes
    const encodeOperon = regulator.encodedBy?.operon
    return (
        <UiCover>
            <div style={{ padding: "15px 2px 10px 65px", display:"flex", justifyContent: "space-between" }} >
                <div>
                    <Typography variant='irrelevant' ><span dangerouslySetInnerHTML={{ __html: regulator.type }} /></Typography>
                    <Typography variant='h1' ><span dangerouslySetInnerHTML={{ __html: regulator.name }} /></Typography>
                    <div>
                        <Typography variant='relevant' >Encoded by:</Typography>
                        {DataVerifier.isValidArray(encodeGenes) && (
                            <>{encodeGenes.map(gene => (
                                <Link key={"encodeGeneLink_" + gene._id} style={{ marginLeft: "10px" }} to={"/gene/" + gene._id} ><Typography variant='relevantB' ><span dangerouslySetInnerHTML={{ __html: `${gene.name} gene` }} /></Typography></Link>
                            ))}</>
                        )}
                        {DataVerifier.isValidArray(encodeOperon) && (
                            <>{encodeOperon.map(operon => (
                                <Link key={"encodeOperonLink_" + operon._id} style={{ marginLeft: "10px" }} to={"/operon/" + operon._id} ><Typography variant='relevantB' ><span dangerouslySetInnerHTML={{ __html: `${operon.name} operon` }} /></Typography></Link>
                            ))}</>
                        )}
                    </div>
                </div>
                <div>
                    <RelatedList
                        collapse={false}
                        regulonDB_id={regulator._id}
                    />
                </div>
            </div>
        </UiCover>
    )
}
