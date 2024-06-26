import React, { useEffect, useRef, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataVerifier } from 'ui-components/utils';

export default function AccordionHighlight({
    children,
    actions,
    title = <></>,
    defaultExpanded,
    expanded,
    onChange,
    level = 0
}) {
    const colorLevel = ["#47718a", "#61859c", "#7b9bb0", "#9db8c9"]
    if (DataVerifier.isValidObject(title?.props)) {
        if (title.props?.phrases) {
            return <InteractiveAccordion
                title={title}
                actions={actions}
                colorLevel={colorLevel[3]}
                defaultExpanded={defaultExpanded}
            >
                {children}
            </InteractiveAccordion>
        }
    }

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


function InteractiveAccordion({ children, colorLevel, title, defaultExpanded = false, actions }) {
    const [expanded, setExpanded] = useState(defaultExpanded)
    const ref = useRef(null)

    useEffect(() => {
        const handleClick = () => {
            setExpanded(!expanded)
        };

        const divElement = ref.current;
        if (divElement) {
            divElement.addEventListener('click', handleClick);
        }
        return () => {
            if (divElement) {
                divElement.removeEventListener('click', handleClick);
            }
        };
    }, [expanded]);

    return (
        <div>
            <Accordion square disableGutters expanded={expanded} >
                <AccordionSummary
                    ref={ref}
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    sx={{
                        backgroundColor: colorLevel,
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