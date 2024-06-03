import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionHighlight({ children, actions, title, defaultExpanded = false, level = 0 }) {
    const colorLevel = ["#47718a", "#61859c", "#7b9bb0", "#9db8c9"]
    return (
        <div>
            <Accordion square disableGutters defaultExpanded={defaultExpanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
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
