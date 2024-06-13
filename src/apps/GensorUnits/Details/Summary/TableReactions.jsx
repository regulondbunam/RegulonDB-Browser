import React, { useMemo } from 'react'
import FilterTable from 'ui-components/Web/FilterTable'
import { AccordionHighlight } from 'ui-components/Web/Accordion'
import { DataVerifier } from 'ui-components/utils'
import { Typography } from '@mui/material'

export default function TableReactions({reactions}) {
    const table = useMemo(() => {
        let table = {
            columns: [
                {key:"reactionN",label:"Reaction"},
                {key:"path",label:"Pathway Components"},
                {key:"reactionT",label:"Reaction Type"},
                {key:"component",label:"Components"},
                {key:"function",label:"Functions"},
                {key:"componentT",label:"Components Types"},
            ],
            data: []
        }
        if (DataVerifier.isValidArray(reactions)) {
            reactions.forEach((reaction) => {
              if (DataVerifier.isValidArray(reaction?.components)) {
                const components = reaction.components;
                components.forEach(component => {
                    table.data.push({
                        reactionN:reaction.number,
                        path: reaction.pathwayComponents,
                        reactionT: reaction.type,
                        component: component.name,
                        function: component.function,
                        componentT: component.type,
                    })
                });
              }
            });
          }
          return table
    }, [reactions])
  return(
    <AccordionHighlight title={<Typography variant='h2' color={"white"} >Reactions and Component</Typography>} defaultExpanded={true} >
        <FilterTable {...table} tableName='Gensor Unit Reactions' />
    </AccordionHighlight>
  )
}
