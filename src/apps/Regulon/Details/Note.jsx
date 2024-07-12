import React from 'react'
import UiNote from "ui-components/Web/Note";
//import { Typography } from '@mui/material';
//import { ParagraphCitations } from "ui-components/Web/Citations";
//import { AccordionHighlight } from 'ui-components/Web/Accordion';

export default function Note({citations,note,references}) {
  return (
    <div >
      <div style={{maxHeight: "500px", overflow: "auto"}} >
        <UiNote note={note} references={references} />
      </div>
    </div>
  )
}

/**
 * <AccordionHighlight title={<Typography variant="h3" sx={{ color: "white" }} > References </Typography>}>
          <ParagraphCitations citations={citations} references={references} />
        </AccordionHighlight>
 */