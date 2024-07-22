import React, { Fragment, useMemo } from 'react'
import Note from './Note'
import Cover from './Cover'
import Genes from './Genes'
import Drawers from "apps/Drawers";
import RegulatedOperons from './Operon'
import RegulatedTUs from './RegulatedTUs'
import RegulatedTFs from './RegulatedTF'
import Tabs from 'ui-components/Web/Tabs'
import { Typography } from '@mui/material'
import { DataVerifier } from 'ui-components/utils'
import PageState from 'ui-components/Web/PageStates'
import { useGetRegulonData } from 'webServices/queries'
import { AccordionHighlight } from 'ui-components/Web/Accordion'
import { useGetIndexedReferences } from "ui-components/Web/Citations";
import { AllCitations } from "ui-components/Web/Citations/AllCitations";
import RegulatoryInteractions from 'ui-components/Web/RegulatoryInteractions'
import { PanelDetails } from './Panel';



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
                            component: <Content regulonData={regulonData} references={references} />
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


function Content({ regulonData, references }) {
    const sections = useMemo(() => {
        let _sections = []
        DataVerifier.isValidString(regulonData.regulator.note) && _sections.push({
            id: regulonData._id + "_NoteSection_",
            title: "Note",
            component: <AccordionHighlight id={regulonData._id + "_NoteSection_"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Note </Typography>} level={0}>
                <Note references={references} note={regulonData.regulator.note} citations={regulonData.regulator.citations} />
            </AccordionHighlight>,
        })
        DataVerifier.isValidArray(regulonData.regulates.genes) && _sections.push({
            id: regulonData._id + "_GenesSection_",
            title: "Regulated Genes",
            component: <AccordionHighlight id={regulonData._id + "_GenesSection_"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Regulated Genes </Typography>} level={0}>
                <Genes genes={regulonData.regulates.genes} terms={regulonData.terms} regulator={regulonData.regulator} references={references} />
            </AccordionHighlight>,
        })
        DataVerifier.isValidArray(regulonData.regulates.operons) && _sections.push({
            id: regulonData._id + "_OperonsSection_",
            title: "Regulated Operons",
            component: <AccordionHighlight id={regulonData._id + "_OperonsSection_"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Regulated Operons </Typography>} level={0}>
                <RegulatedOperons operons={regulonData.regulates.operons} />
            </AccordionHighlight>,
        })
        DataVerifier.isValidArray(regulonData.regulates.transcriptionUnits) && _sections.push({
            id: regulonData._id + "_TuSection_",
            title: "Regulated TU",
            component: <AccordionHighlight id={regulonData._id + "_TuSection_"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Regulated Transcription Units </Typography>} level={0}>
                <RegulatedTUs tus={regulonData.regulates.transcriptionUnits} />
            </AccordionHighlight>,
        })
        DataVerifier.isValidArray(regulonData.regulates.transcriptionFactors) && _sections.push({
            id: regulonData._id + "_TfSection_",
            title: "Regulated TF",
            component: <AccordionHighlight id={regulonData._id + "_TfSection_"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Transcription Factors </Typography>} level={0}>
                <RegulatedTFs tfs={regulonData.regulates.transcriptionFactors} />
            </AccordionHighlight>,
        })
        DataVerifier.isValidArray(regulonData.regulatoryInteractions) && _sections.push({
            id: regulonData._id + "_RiSection_",
            title: "Regulatory Interactions",
            component: <AccordionHighlight id={ regulonData._id + "_RiSection_"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Regulatory Interactions </Typography>} level={0}>
                <RegulatoryInteractions references={references} regulatoryInteractions={regulonData.regulatoryInteractions} />
            </AccordionHighlight>,
        })
        _sections.push({
            id: regulonData._id + "_allCitationsSection_",
            title: "Citations",
            component: <AccordionHighlight id={regulonData._id + "_allCitationsSection_"} defaultExpanded={true} title={<Typography variant="h2" sx={{ color: "white" }} > Citations </Typography>} level={0}>
                <AllCitations {...references} />
            </AccordionHighlight>,
        })
        return _sections
    }, [references, regulonData])
    return (
        <div style={{ display: "flex" }} >
            <Drawers
                open
                title={regulonData.regulator.name + " regulon"}
                drawers={[<PanelDetails sections={sections} RegulatorId={regulonData._id} />]}
                setDrawer={0}
            />
            <div style={{ width: "100%" }}>
                {sections.map((section,index)=>{
                    return <Fragment key={section.id+"_"+index} >
                        {section.component}
                    </Fragment>
                })}
            </div>
        </div>
    )
}