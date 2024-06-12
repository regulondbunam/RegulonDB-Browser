import React, { useEffect, useReducer, useRef } from 'react'
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
        if (!section?.id) {
            console.error(section.title, " anchor Nav no id");
        }
        newSections.push({
            expand: true,
            selected: false,
            ...section
        })
    })
    return {
        sections: newSections,
        hideMenu: !showAnchors,
        isCollapse: false,
    }
}

function reducer(state, action) {
    switch (action.type) {
        case ACTION.selectSection: {
            let newSections = []
            state.sections.forEach((section, index) => {
                newSections.push({
                    ...section,
                    selected: action.sectionIndex === index
                })
            });
            return { ...state, sections: newSections }
        }
        case ACTION.collapseAll: {
            const isCollapse = state.isCollapse
            let newSections = []
            state.sections.forEach((section, index) => {
                newSections.push({
                    ...section,
                    expand: isCollapse
                })
            });
            return { ...state, sections: newSections, isCollapse: !isCollapse }
        }
        case ACTION.expandSection: {
            let newSections = [...state.sections]
            const section = newSections[action.sectionIndex]
            newSections[action.sectionIndex] = { ...section, expand: !section.expand }
            return { ...state, sections: newSections }
        }
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
    const sectionsRef = useRef([])

    const handleScroll = () => {
        let sectionIndex = null
        sectionsRef.current.forEach((ref,index) => {
          if (ref) {
            const { top } = ref.getBoundingClientRect();
            if(top <= 0){
                sectionIndex = index
            }
          }
        });
        dispatch({type: ACTION.selectSection, sectionIndex: sectionIndex})
      };
    
    useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    

    console.log(state);
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
                    <>{state.sections.map((section, index) => {
                        if (!section.visible) { return null }
                        return (
                            <div key={"c_" + index + "_section_" + section.id} className={style.section}>
                                <div
                                    ref={el => sectionsRef.current[index] = el}
                                    className={style.scroll_section}
                                    id={"scroll_section_" + section.id}
                                />
                                <div
                                    className={style.flag_section}
                                    id={"init_section_" + section.id}
                                />
                                <AccordionHighlight
                                    key={section.id}
                                    expanded={section.expand}
                                    onChange={() => { dispatch({ type: ACTION.expandSection, sectionIndex: index }) }}
                                    title={<Typography variant="h2" sx={{ fontSize: "20px" }} color={"#ffffff"} >{section.title}</Typography>}
                                >
                                    {section.component}
                                    <div
                                        className={style.end_flag_section}
                                        id={"end_section_" + section.id}
                                    />
                                </AccordionHighlight>
                            </div>
                        )
                    })}</>
                )}
            </div>
        </div>
    )
}
