import * as React from 'react';
import MUIAccordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionList from './List';
import AccordionHighlight from './Highlight';
import { DataVerifier } from 'ui-components/utils';
import { Typography } from '@mui/material';

//import Button from '@mui/material/Button';

function getHighlightLevel(level=0) {
    //
    const levels = ["#ffffff","#47718a", "#61859c", "#7b9bb0", "#9db8c9"]
    return{
        backgroundColor: levels[level],
        color: level===0?"#000000":"#ffffff",
    }
}

export default function Accordion({
    children,
    highlightLevel = 0,
    title = "",
    actions,
    defaultExpanded = false
}) {
    const highlight = getHighlightLevel(highlightLevel)
    return (
        <div>
            <MUIAccordion square defaultExpanded={defaultExpanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: highlight.color}} />}
                    style={{ minHeight: "45px" }}
                    sx={{
                        height: "45px",
                        ...highlight,
                        ".Mui-expanded": {
                            height: "45px",
                        },
                        ".MuiAccordionSummary-content": {
                            height: "45px",
                            display: "flex",
                            alignItems: "center",
                        }
                    }}

                >
                    <Typography variant='relevant' color={highlight.color} >{title}</Typography>
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

            </MUIAccordion>
        </div>
    );
}

export { AccordionList, AccordionHighlight }