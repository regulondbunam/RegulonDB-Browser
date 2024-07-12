import React from 'react'
import Note from './Note'
import Cover from './Cover'
import Genes from './Genes'
import Tabs from 'ui-components/Web/Tabs'
import { Typography } from '@mui/material'
import { DataVerifier } from 'ui-components/utils'
import PageState from 'ui-components/Web/PageStates'
import { useGetRegulonData } from 'webServices/queries'
import { AccordionHighlight } from 'ui-components/Web/Accordion'
import { useGetIndexedReferences } from "ui-components/Web/Citations";
import { AllCitations } from "ui-components/Web/Citations/AllCitations";


export default function Details({ regulonId }) {
    const { regulonData, error, loading } = useGetRegulonData(regulonId)
    const references = useGetIndexedReferences(regulonData?.allCitations)
    if (loading) {
        return <PageState state='loading' title='loading data...' />
    }
    if (error) {
        return <PageState state='error' title='error on load data' />
    }
    if (regulonData) {
        console.log(regulonData);
        return (
            <div>
                <Cover regulator={regulonData.regulator} sigmaFactors={regulonData.regulates.sigmaFactors} />
                <Tabs
                    render
                    tabSelect="tab01"
                    tabs={[
                        {
                            id: "tab01",
                            name: "Details",
                            component: (
                                <div>
                                    <div style={{ display: "flex" }} ></div>
                                    <div style={{ width: "100%" }}>
                                        {DataVerifier.isValidString(regulonData.regulator.note) && (
                                            <AccordionHighlight id={"regulon_notes"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Note </Typography>} level={0}>
                                                <Note references={references} note={regulonData.regulator.note} citations={regulonData.regulator.citations}/>
                                            </AccordionHighlight>
                                        )}
                                        <AccordionHighlight id={"regulon_regulatedGenes"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Regulated Genes </Typography>} level={0}>
                                            <Genes genes={regulonData.regulates.genes} terms={regulonData.terms} regulator={regulonData.regulator} references={references} />
                                        </AccordionHighlight>
                                        <AccordionHighlight id={"regulon_regulatedOperons"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Regulated Operons </Typography>} level={0}>
                                            Regulated Operons
                                        </AccordionHighlight>
                                        <AccordionHighlight id={"regulon_regulatedTUs"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Regulated Transcription Units </Typography>} level={0}>
                                            Regulated Transcription Units
                                        </AccordionHighlight>
                                        <AccordionHighlight id={"regulon_RI"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Regulatory Interactions </Typography>} level={0}>
                                            Regulatory Interactions
                                        </AccordionHighlight>
                                        <AccordionHighlight id={"regulon_citations"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Citations </Typography>} level={0}>
                                            <AllCitations {...references} />
                                        </AccordionHighlight>
                                    </div>
                                </div>
                            )
                        },
                        {
                            id: "tab02",
                            name: "Regulatory Network",
                            component: (
                                <div>
                                    <div style={{ display: "flex" }} ></div>
                                    <div style={{ width: "100%" }}>
                                    </div>
                                </div>
                            )
                        },
                        {
                            id: "tab03",
                            name: "FeatureMaps",
                            component: (
                                <div>
                                    <div style={{ display: "flex" }} ></div>
                                    <div style={{ width: "100%" }}>
                                    </div>
                                </div>
                            )
                        }
                    ]}
                />

            </div>
        )
    }
    return null
}
