import React from 'react'
import { AccordionHighlight } from 'ui-components/Web/Accordion'
import { Typography } from '@mui/material'
import { DataVerifier } from 'ui-components/utils'
import SequenceTrack from 'ui-components/Web/SequenceTrack'

export default function Promoter({ promoter, references }) {
    if (DataVerifier) {
        
    }
    return (
        <AccordionHighlight
            title={
                <Typography variant="h3" fontSize={"18px"} color={"#ffffff"}>
                    {`Promoter ${promoter.name}`}
                </Typography>
            }
            level={1}
            defaultExpanded={true}
        >
            <div style={{marginTop: "15px"}}>
                <SequenceTrack controls sequence={promoter.sequence} />
            </div>
        </AccordionHighlight>
    )
}
