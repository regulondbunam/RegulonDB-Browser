import React, { useId } from 'react'
import { DataVerifier } from 'ui-components/utils'
import { AccordionHighlight } from 'ui-components/Web/Accordion'
import { Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

//grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

export default function Genes({ genes }) {
    const localId = useId()
    if (!DataVerifier.isValidArray(genes)) {
        return null
    }
    return (
        <div>
            <div>
                <Typography variant="relevantB" sx={{ mr: 1 }} >Genes:</Typography>
                <div>
                    {genes.map((gene, indx) => {
                        return (
                            <Link key={"geneinTU_"+localId+"_"+gene._id+"_"+indx}
                                style={{ marginLeft: "10px" }} 
                                to={"/gene/"+gene._id}
                                >
                                <Typography variant="relevant">
                                    <span dangerouslySetInnerHTML={{ __html: gene.name }} />
                                </Typography>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
