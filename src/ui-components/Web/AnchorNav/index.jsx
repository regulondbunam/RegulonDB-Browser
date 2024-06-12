import React, { useReducer } from 'react'
import { AccordionHighlight } from '../Accordion'
import { DataVerifier } from 'ui-components/utils'
import { Typography } from '@mui/material'
import Anchors from './Anchors'
import Controls from './Controls'
import style from "./style.module.css"
import { ACTION } from './static'
import { isMobile } from 'react-device-detect'

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
        hideMenu: !showAnchors,
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
            return { ...state, sections: newSections }
        case ACTION.hideMenu:
            return { ...state, hideMenu: !state.hideMenu }
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
            {!isMobile && (
                <div className={style.anchors} >
                    <div className={style.anchorsSticky}>
                        <Controls state={state} dispatch={dispatch} />
                        {!state.hideMenu && (<>
                            <Anchors state={state} dispatch={dispatch} />
                        </>)}

                    </div>
                </div>
            )}
            <div className={style.body}>
                {DataVerifier.isValidArray(sections) && (
                    <>{state.sections.map((section) => {
                        if (!section.visible) { return null }
                        return (
                            <div className={style.section}>
                                <AccordionHighlight
                                    key={section.id}
                                    defaultExpanded={section.expand}
                                    title={<Typography variant="h2" sx={{ fontSize: "20px" }} color={"#ffffff"} >{section.title}</Typography>}
                                >
                                    {section.component}
                                </AccordionHighlight>
                            </div>
                        )
                    })}</>
                )}
            </div>
        </div>
    )
}
