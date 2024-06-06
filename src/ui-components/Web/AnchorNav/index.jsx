import React, { useReducer } from 'react'
import { AccordionHighlight } from '../Accordion'
import { DataVerifier } from 'ui-components/utils'
import { Typography } from '@mui/material'
import Anchors from './Anchors'
import style from "./style.module.css"
import { ACTION } from './static'

function initSections({ sections = [], showAnchors = true }) {
    let newSections = []
    sections.forEach((section) => {
        newSections.push({
            expand: true,
            selected: false,
            ...section
        })
    })
    return {
        sections: newSections,
        anchors: showAnchors,
    }
}

function reducer(state, action) {
    switch (action.type) {
        case ACTION.selectSection:
            let newSections = []
            state.sections.forEach((section, index) => {
                newSections.push({
                    ...section,
                    selected: action.sectionIndex === index
                })
            });
            return {...state, sections: newSections}
        default:
            return state
    }

}

export default function AnchorNav({
    sections = [],
    aside = <></>,
    showAnchors = true
}) {
    const [state, dispatch] = useReducer(reducer, { sections, showAnchors }, initSections)
    return (
        <div className={style.container}>
            <div className={style.anchors} >
                <Anchors state={state} dispatch={dispatch} />
            </div>
            <div className={style.body}>
                {DataVerifier.isValidArray(sections) && (
                    <>{state.sections.map((section) => {
                        if (!section.visible){return null}
                        return (
                            <div className={style.section}>
                                <AccordionHighlight
                                    key={section.id}
                                    defaultExpanded={section.expand}
                                    title={<Typography variant="h2" color={"#ffffff"} >{section.title}</Typography>}
                                >
                                    {section.component}
                                </AccordionHighlight>
                            </div>
                        )
                    })}</>
                )}
            </div>
            <div className={style.aside} >

            </div>
        </div>
    )
}
