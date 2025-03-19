import React from 'react'

export default function ExternalRef({externalRef}) {
    return (
        <div style={{overflowX: "auto", display: "flex"}}>
            {
                externalRef.map( (ref,i )=>{
                    return <BitInfo key={`${i}_${ref?.externalCrossReferenceId}`} reference={ref}  />
                })
            }
        </div>
    )
}

function BitInfo({ reference }) {
    if (!reference) {
        return null
    }
    const objectId = reference?.objectId
    const externalCrossReferenceName = reference?.externalCrossReferenceName
    const url= reference.url
    return (
        <div style={{float: "left", marginRight: "10px"}}>
            <p style={{ fontSize: "10px" }} className="p_accent">
                {externalCrossReferenceName}
            </p>
            <p>
                <a href={url} style={{fontSize: "10px"}} target="_blank" rel="noreferrer" >{objectId}</a>
            </p>
        </div>
    )
}
/**
 * externalCrossReferenceId: "RDBECOLIERC00038"
externalCrossReferenceName: "PFAM"
objectId: "PF00325"
url: "http://pfam.xfam.org/family/~A"
 */