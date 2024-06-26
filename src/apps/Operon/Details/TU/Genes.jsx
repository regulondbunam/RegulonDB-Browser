import React, { useId } from 'react'
import { DataVerifier } from 'ui-components/utils'
import Label from 'ui-components/Web/Label'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

//grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

export default function Genes({ genes, phrases={} }) {
    const localId = useId()
    if (!DataVerifier.isValidArray(genes)) {
        return null
    }
    return (
        <div>
            <div>
              <Label label={"Genes:"} phrases={phrases["genes"]}/>
                <div>
                    {genes.map((gene, indx) => {
                        return (
                            <Link key={"geneInTU_"+localId+"_"+gene._id+"_"+indx}
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
