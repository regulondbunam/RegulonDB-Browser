import * as React from 'react';
import MUIAccordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionList from './List';

//import Button from '@mui/material/Button';

export default function Accordion({ children, title = "accordion Title", actions, defaultExpanded=false }) {
    return (
        <div>
            <MUIAccordion square defaultExpanded={defaultExpanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ minHeight: "45px" }}
                    sx={{
                        height: "45px",

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
                    {title}
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        pt: 0
                    }}
                >
                    {children}
                </AccordionDetails>
                {actions&&(
                    <AccordionActions>
                        {actions}
                </AccordionActions>
                )}
                
            </MUIAccordion>
        </div>
    );
}

export {AccordionList}