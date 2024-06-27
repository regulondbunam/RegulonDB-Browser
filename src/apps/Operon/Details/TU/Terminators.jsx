import React from 'react'
import Label from 'ui-components/Web/Label'
import { AccordionHighlight } from 'ui-components/Web/Accordion'
import { useGetPhrase } from 'apps/Phrases'


export default function Terminators({
    terminators = [],
    references,
}) {
    
    return (
        <AccordionHighlight
            title={
                <Label label={`Terminators${terminators.length > 1 ? "s" : ""}`} 
                    TypographyProps={{ variant: "h3", fontSize: "18px", color: "#ffffff" }}
                />
            }
            level={1}
            defaultExpanded={true}
        >
            {terminators.map((terminator)=>{
                return <Terminator key={"terminatorInfo_"+terminator._id} {...terminator} />
            })}
            
        </AccordionHighlight>
    )
}

function Terminator({
    _id,
    citations,
    confidenceLevel,
    sequence,
    tClass,
    transcriptionTerminationSite,
}) {
    const { phrases } = useGetPhrase(_id)
    return(
        <div>
            {_id}
        </div>
    )
}
