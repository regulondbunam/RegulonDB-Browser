import React from 'react'
import { AccordionHighlight } from '../Accordion'
import { DataVerifier } from 'ui-components/utils'
import { Typography } from '@mui/material'
import style from "./style.module.css"

export default function AnchorNav({
    sections = [],
    aside = <></>
}) {
    return (
        <div>
            <div >

            </div>
            {DataVerifier.isValidArray(sections) && (
                <div className={style.body}>{sections.map((section) => {
                    return (
                        <AccordionHighlight key={section.id} title={<Typography variant="h2" color={"#ffffff"} >{section.title}</Typography>} >
                            {section.component}
                        </AccordionHighlight>
                    )
                })}</div>
            )}
        </div>
    )
}
