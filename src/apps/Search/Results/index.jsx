import React, {useEffect, useState} from 'react'
import {Typography} from '@mui/material'
import Genes from './Genes'
import Operon from './Operon';
import Regulon from './Regulon';
import Sigmulon from './Sigmulon';
import GensorUnit from './GensorUnit';
import {ACTION, sections} from '../static';
import {LocalStorage} from 'ui-components/utils';


export default function Results({state, dispatch}) {

    const setCount = (results) => {
        dispatch({type: ACTION.UPDATE_RESULTS, results: results})
    }

    return (
        <div style={{marginLeft: "10px", marginRight: "5%"}}>
            <Typography variant='h2'>
                Results of {state.search} ({state.nResults})
            </Typography>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <Genes id={sections.genes.id} search={state.search}
                       onCompleted={(state) => {
                           if (state.nResults > 0) {
                               LocalStorage.SaveRecentSearches(state.search)
                           }
                           let results = {}
                           results[sections.genes.label] = state.nResults
                           setCount(results)
                       }}
                />
                <Operon id={sections.operons.id} search={state.search}
                        onCompleted={(state) => {
                            if (state.nResults > 0) {
                                LocalStorage.SaveRecentSearches(state.search)
                            }
                            let results = {}
                            results[sections.operons.label] = state.nResults
                            setCount(results)
                        }}
                />
                <Regulon id={sections.regulons.id} search={state.search}
                         onCompleted={(state) => {
                             if (state.nResults > 0) {
                                 LocalStorage.SaveRecentSearches(state.search)
                             }
                             let results = {}
                             results[sections.regulons.label] = state.nResults
                             setCount(results)
                         }}
                />
                <Sigmulon id={sections.sigmulon.id} search={state.search}
                          onCompleted={(state) => {
                              if (state.nResults > 0) {
                                  LocalStorage.SaveRecentSearches(state.search)
                              }
                              let results = {}
                              results[sections.sigmulon.label] = state.nResults
                              setCount(results)
                          }}
                />
                <GensorUnit id={sections.gu.id} search={state.search}
                            onCompleted={(state) => {
                                if (state.nResults > 0) {
                                    LocalStorage.SaveRecentSearches(state.search)
                                }
                                let results = {}
                                results[sections.gu.label] = state.nResults
                                setCount(results)
                            }}
                />
            </div>
        </div>
    )
}


