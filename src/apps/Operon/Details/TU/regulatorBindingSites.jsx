import React from 'react'
import { AccordionHighlight } from 'ui-components/Web/Accordion'
import { Typography, Divider } from '@mui/material'
import RegulatoryInteractions from 'ui-components/Web/RegulatoryInteractions'
import { getRISbyRBS } from 'ui-components/Web/RegulatoryInteractions'

export default function RegulatorBindingSites({
  allRegulatorBindingSites = {},
  references
}) {
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
      {Object.keys(allRegulatorBindingSites).map(key=>{
        const regulatoryInteractions = getRISbyRBS(allRegulatorBindingSites[key])
        return <div key={"rbs_in_"+key.trim()} style={{margin: "15px 0 15px 0"}} >
          <Divider textAlign="left" ><Typography variant='relevantB' >{`Regulation identified only in ${key}`}</Typography></Divider>
          <div>
            <RegulatoryInteractions isRegulators regulatoryInteractions={regulatoryInteractions} />
          </div>
        </div>
      })}
    </AccordionHighlight>
  )
}
