import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionHighlight({ 
        children, 
        actions, 
        title, 
        defaultExpanded, 
        expanded, 
        onChange = () => { }, 
        level = 0 
    }) {
    const colorLevel = ["#47718a", "#61859c", "#7b9bb0", "#9db8c9"]
    return (
        <div>
            <Accordion square disableGutters defaultExpanded={defaultExpanded} expanded={expanded} onChange={onChange} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    sx={{
                        backgroundColor: colorLevel[level],
                        flexDirection: "row-reverse",
                    }}
                >
                    {title}
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        pt: 0
                    }}
                >
                    {children}
                </AccordionDetails>
                {actions && (
                    <AccordionActions>
                        {actions}
                    </AccordionActions>
                )}

            </Accordion>
        </div>
    );
}
