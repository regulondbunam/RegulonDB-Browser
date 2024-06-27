import React from 'react'
import { AccordionHighlight } from 'ui-components/Web/Accordion'
import { Typography } from '@mui/material'

export default function RegulatoryInteractions() {
  return (
    <AccordionHighlight
      title={
        <Typography variant="h3" fontSize={"18px"} color={"#ffffff"}>
            Regulatory Interactions
        </Typography>
      }
      level={1}
      defaultExpanded={true}
    >

    </AccordionHighlight>
  )
}
