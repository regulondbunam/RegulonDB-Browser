import React from 'react'
import { AccordionHighlight } from '../Accordion';
import { Typography } from '@mui/material';
import { ModalCitation } from './Modal';

export function AllCitations({ publications, evidences }) {
    return (
        <div>
            <Publications evidences={evidences} publications={publications} />
            <br />
            <Evidences evidences={evidences} publications={publications} />
        </div>
    );
}

export function Evidences({ evidences, publications, small = false }) {
    //console.log(evidences);
    return (
        <AccordionHighlight level={1} defaultExpanded={true} title={
            <Typography variant="h3" fontSize={"18px"} color={"#ffffff"}>
                Evidences
            </Typography>
        } >
            <table>
                <tbody>
                    {Object.keys(evidences).map((evidenceId) => {
                        const evidence = evidences[evidenceId];
                        return (
                            <tr key={`citation_no_000${evidence.index}`}>
                                <td>
                                    <ModalCitation
                                        evidence={evidence}
                                        publications={publications}
                                        evidences={evidences}
                                        small={small}
                                        isEvidence
                                        showIndex={true}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
        </AccordionHighlight>
    );
}

export function Publications({ evidences, publications, small = false }) {
    //console.log(publications);
    return (
        <AccordionHighlight defaultExpanded={true} level={1} title={<Typography variant="h3" fontSize={"18px"} color={"#ffffff"}>
            Publications
        </Typography>} >

            <table>
                <tbody>
                    {Object.keys(publications).map((publicationId) => {
                        const publication = publications[publicationId];
                        return (
                            <tr key={`citation_no_000${publication.index}`}>
                                <td>
                                    <ModalCitation
                                        publication={publication}
                                        evidences={evidences}
                                        small={small}
                                        showIndex={false}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
        </AccordionHighlight>
    );
}
