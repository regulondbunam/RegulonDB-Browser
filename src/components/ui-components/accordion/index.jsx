/*
# Component (user guide)

# Acordion
	
## Description  
It  is a custom implementation of a Material-UI based accordion for React. It provides a simple way to create collapsible sections with titles and hidden content that users can expand or collapse.

## Category   
	
Visual 

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 
{children, title, expand = true, backgroundColor = "#D5E2EA"}
| Attribute     | Type          | Default |              Description                                                                             |  
| ------------- | ------------- | ------- | ---------------------------------------------------------------------------------------------------- |
|children       |React.ReactNode|         |The content of the accordion that will be shown or hidden when the accordion is expanded or collapsed.|
|   title       |string         |         |The title displayed at the top of the accordion to identify the section.                              |
|expand         |boolean        |  true   |Indicates whether the accordion should be initially expanded (open) or contracted (closed).           |
|backgroundColor|string         |"#D5E2EA"|The background color of the accordion header.                                                         |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team: 


# Component (technical guide)

## Component Type 
Visual

## Dependencies
useState: React hook to manage the local state.

styled: Material-UI function to apply custom styles to React components.

MuiAccordion: Material-UI component that represents a collapsible accordion.

MuiAccordionSummary: Material-UI component that represents the header of an accordion.

ArrowForwardIosSharpIcon: Material-UI forward arrow icon.

MuiAccordionDetails: Material-UI component that represents the hidden content of an accordion.

ExpandMoreIcon: Material-UI down arrow icon.

## States
	
| Property | Value | Description                                                                |
| -------- | ----- | -------------------------------------------------------------------------- |
|expanded  |boolean| Indicates whether the accordion is expanded (open) or contracted (closed). |
           |true   |The accordion is expanded (open).                                           |
           |false  |The accordion is contracted (closed).                                       |

## Hooks
|  Name  | Description                                    |  Syntax                                          | Additional Notes or References                             | 
| ------ | ---------------------------------------------- | -------------------------------------------------| ---------------------------------------------------------- |
|useState|React's useState Hook to manage the local state.| const [state, setState] = useState(initialState);| Can be used to control the expanded state of the accordion.|  



*/
import { useState } from "react";
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


/**
 * Description placeholder
 *
 * @type {*}
 * @param {object} props - Additional properties for the component.
 * @returns {React.ReactNode} The stylized accordion component.
 */
const AccordionStyled = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '& .MuiButtonBase-root-MuiAccordionSummary-root': {
        minHeight: 'initial'
    }
}));


/**
 * Description placeholder
 *
 * @type {*}
 * @param {object} props - Additional properties for the component.
 * @returns {React.ReactNode} The stylized accordion header component.
 */
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    padding: 0,
    minHeight: "10px",
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
}));


/**
 * Description placeholder
 *
 * @type {*}
 * @param {object} theme - Theme object provided by Material-UI.
 * @returns {React.ReactNode} The stylized accordion detail component.
 */
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(1),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


/**
 * Description placeholder
 *
 * @export
 * @param {{ children: any; title: any; expand?: boolean; backgroundColor?: string; }} {children, title, expand = true, backgroundColor = "#D5E2EA"}
 * @returns {React.JSX}
 */
export default function Accordion({children, title, expand = true, backgroundColor = "#D5E2EA"}) {
    const [expanded, setExpanded] = useState(expand);
    return (
        <AccordionStyled expanded={expanded} onChange={() => { setExpanded(!expanded) }} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                style={{
                    backgroundColor: backgroundColor,
                }}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails>
                <div >
                    {children}
                </div>
            </AccordionDetails>
        </AccordionStyled>
    )
}