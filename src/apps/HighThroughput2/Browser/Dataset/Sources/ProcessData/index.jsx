import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Peaks from './Peaks';
import TFBS from './TFBS';
import TUS from './TUs';
import TSS from './TSS';
import TTS from './TTS';


export default function ProcessData({
    peaks,
    TFBs,
    TSs,
    TTs,
    TUs,
}) {

    const [expanded, setExpanded] = useState({
        peaks_state: true,
        TFBs_state: true,
        TSs_state: true,
        TTs_state: true,
        TUs_state: true,
    })
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded({ ...expanded, [panel]: isExpanded });
    };

    const data = [
        { key: 'peaks_state', label: 'Peaks', content: peaks, component: <Peaks peaks={peaks} /> },
        { key: 'TFBs_state', label: 'TFBS', content: TFBs, component: <TFBS TFBs={TFBs} /> },
        { key: 'TSs_state', label: 'TSS', content: TSs, component: <TSS tss={TSs} /> },
        { key: 'TTs_state', label: 'TTS', content: TTs, component: <TTS tts={TTs} /> },
        { key: 'TUs_state', label: 'TUS', content: TUs, component: <TUS tus={TUs} /> },
    ];
  return (
    <div>
        {data.map(({ key, label, content , component}) => (
            content && (
                <Accordion
                    key={key}
                    expanded={expanded[key]}
                    onChange={handleChange(key)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        {content && <h3>{label}</h3>}
                    </AccordionSummary>
                    <AccordionDetails>
                        {content && component}
                    </AccordionDetails>
                </Accordion>
            )
        ))}
    </div>
  )
}
