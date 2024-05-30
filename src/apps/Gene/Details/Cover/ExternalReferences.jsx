import React, { useState } from 'react'
import { Typography } from "@mui/material";
import { DataVerifier } from 'ui-components/utils';

const references = ["ECOCYC", "ecocyc", "REFSEQ", "refseq", "UniProt"];

export default function ExternalReferences({ id, externalCrossReferences }) {
    const [expand, setExpand] = useState(false)
    //console.log(externalCrossReferences);
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="irrelevant" sx={{ mr: 1 }}>
                    RegulonDB ID:
                </Typography>
                <Typography variant="irrelevant">
                    {id}
                </Typography>
            </div>
            {DataVerifier.isValidArray(externalCrossReferences) && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="irrelevant" sx={{ mr: 1 }}>
                        External References IDs:
                    </Typography>
                    {expand ? (
                        <>
                            {externalCrossReferences.map(ref => (
                                <Typography key={ref.externalCrossReferenceId} variant="irrelevant" sx={{ mr: 1 }}>
                                    <a
                                        href={`${ref?.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >{`${ref?.externalCrossReferenceName}: ${ref?.objectId}`}</a>
                                </Typography>
                            ))}
                            <Typography variant="irrelevant" sx={{ mr: 1,
                             textDecoration: "underline", 
                             color: "blue",
                             ":hover":{
                                cursor: "pointer"
                             }
                             }}
                             
                             onClick={()=>{setExpand(false)}}
                             >
                            ...hide
                        </Typography>
                        </>
                    ) : (<>
                        {externalCrossReferences.map(ref => (
                            references.find(name => name === ref.externalCrossReferenceName) ? (
                                <Typography key={ref.externalCrossReferenceId} variant="irrelevant" sx={{ mr: 1 }}>
                                    <a
                                        href={`${ref?.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >{`${ref?.externalCrossReferenceName}: ${ref?.objectId}`}</a>
                                </Typography>
                            ) : (null)
                        ))}
                        <Typography variant="irrelevant" sx={{ mr: 1,
                             textDecoration: "underline", 
                             color: "blue",
                             ":hover":{
                                cursor: "pointer"
                             }
                             }}
                             
                             onClick={()=>{setExpand(true)}}
                             >
                            more...
                        </Typography>
                    </>)}
                </div>
            )}
        </div>
    )
}