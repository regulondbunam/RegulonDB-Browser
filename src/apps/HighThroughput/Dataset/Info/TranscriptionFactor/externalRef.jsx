import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ExternalRef({ externalRef }) {
    return (
        <div style={{ width:"800px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 2fr))", gap: "3px" }}>
            {
                externalRef.map((ref, i) => {
                    return <BitInfo key={`${i}_${ref?.externalCrossReferenceId}`} reference={ref} />
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
    const url = reference.url
    return (
        <Button variant='outlined' >
            <div>
            <Typography variant="irrelevantB" fontSize={10} component="div">
                {externalCrossReferenceName}
            </Typography>
            <Typography variant="irrelevant" fontSize={10} component="div">
                <a href={url} target="_blank" rel="noreferrer" >{objectId}</a>
            </Typography>
            </div>
        </Button>
    )

}