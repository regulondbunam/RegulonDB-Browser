import { Typography } from '@mui/material'
import React from 'react'
import { Cover as UiCover } from 'ui-components/Web/Cover'
import { Link } from 'react-router-dom'
import { DataVerifier } from 'ui-components/utils'
import RelatedList from "ui-components/Web/Related";
import { confidenceLevelLabel } from 'ui-components/utils'

export default function Cover({ regulator, sigmaFactors }) {
    const encodeGenes = regulator.encodedBy?.genes
    const encodeOperon = regulator.encodedBy?.operon
    const conformations = DataVerifier.isValidArray(regulator.conformations) && regulator.conformations
    return (
        <UiCover>
            <div style={{ padding: "15px 2px 0px 60px" }}>
                <Typography variant='irrelevant' ><span dangerouslySetInnerHTML={{ __html: regulator.type }} /></Typography>
                <Typography variant='h1' ><span dangerouslySetInnerHTML={{ __html: regulator.name }} /></Typography>
            </div>
            <div style={{ padding: "0px 2px 10px 65px", display: "flex", justifyContent: "space-between" }} >
                <div>
                    {DataVerifier.isValidString(regulator.confidenceLevel) && (<div>
                        <Typography variant='relevant' sx={{ mr: 1 }} >Confidence Level:</Typography>
                        <Typography variant='relevantB' ><span dangerouslySetInnerHTML={{ __html: confidenceLevelLabel(regulator.confidenceLevel) }} /></Typography>
                    </div>)}
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
                    {DataVerifier.isValidArray(sigmaFactors) && (<div>
                        <Typography variant='relevant' >Sigma Factors:</Typography>
                        {sigmaFactors.map(sigma => {
                            return <Link key={"simaInCover_" + sigma._id} style={{ marginLeft: "10px" }} to={"/sigma/" + sigma._id} ><Typography variant='relevantB' ><span dangerouslySetInnerHTML={{ __html: `${sigma.name} (${sigma.function})` }} /></Typography></Link>
                        })}
                    </div>)}

                    {conformations && (
                        <div>
                            <Typography variant='relevant' component={'div'} >Conformations</Typography>
                            <table>
                                <thead>
                                    <tr>
                                        <th><Typography>Type</Typography></th>
                                        <th><Typography>Class</Typography></th>
                                        <th><Typography>Name</Typography></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {conformations.map(conformation => {
                                        return <tr key={"regulatorConformation_" + conformation._id}>
                                            <td>{conformation.type}</td>
                                            <td>{conformation.class}</td>
                                            <td>{conformation.name}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
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
