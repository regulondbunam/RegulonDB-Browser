import React, { useState, useEffect } from 'react'
import Builder from './builder/Builder'
import GetResultsDataset from '../webServices/dataset/dataset_results'
import { SpinnerCircle } from '../components/ui-components_old/ui_components'
import Results from './results/Results'
//import DataBase from '../../../components/indexedDB/history'
//import GetFields from '../webServices/introspection/fields'

export default function Finder({ datasetType }) {
    // console.log(datasetType)
    const [_state, set_state] = useState()
    const [_queryBox, set_queryBox] = useState("")
    const [_nlpgcBox, set_nlpgcBox] = useState("")
    const [_datasetBox, set_datasetBox] = useState("")
    const [_datasets, set_datasets] = useState()
    const [_search, set_search] = useState()
    const [_advanced, set_advanced] = useState(true)

    useEffect(() => {
        const COVER = document.getElementById("title-cover-ht")
        if (COVER) {
            const COVER_REACTION = new CustomEvent('coverR', {
                bubbles: true,
                detail: {
                    title: `Query Builder in ${datasetType}`,
                    state: _state,
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    }, [_state, datasetType])
    if (!_datasets) {
        return (
            <div>
                <GetResultsDataset
                    ht_query={`'${datasetType}'[collectionData.type]`}
                    resoultsData={(data) => { set_datasets(data) }}
                    status={(state) => { set_state(state) }}
                />
                <SpinnerCircle/>

            </div>
        )
    }
    return (
        <article style={{ margin: "0 2% 0 5%" }}>

            <h2>{_advanced ? "QUERY BOX" : "Results of"}</h2>

            {
                _advanced
                    ? <div>
                        <textarea name="queryBox" id="finder_queryBox" style={{ width: "100%" }} rows={5} value={_queryBox} onChange={(e) => { set_queryBox(e.target.value) }} />
                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <button className='aBase'
                                onClick={() => {
                                    set_queryBox("")
                                    set_datasetBox("")
                                    set_nlpgcBox("")
                                    set_search(undefined)
                                    set_datasets(undefined)
                                    set_state('done')
                                }}
                            >reset</button>
                        </div>
                        <h2>Builder</h2>
                        <Builder
                            datasetType={datasetType}
                            queryBox={_queryBox}
                            _datasetBox={_datasetBox}
                            _nlpgcBox={_nlpgcBox}
                            set_datasetBox={(datasetBox)=>{set_datasetBox(datasetBox)}}
                            set_nlpgcBox={(nlpgcBox)=>{set_nlpgcBox(nlpgcBox)}}
                            set_queryBox={(query) => { set_queryBox(query) }}
                            datasets={_datasets}
                            set_search={(search) => { set_search(search); set_advanced(false); set_queryBox(search); }}
                        />
                    </div>
                    : <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <textarea name="queryBox" id="finder_queryBox" style={{ width: "80%", height: "30px", marginRight: "5px" }} value={_queryBox} onChange={(e) => { set_queryBox(e.target.value) }} />
                            <button 
                            style={{ margin: "0", width: "20%" }}
                            onClick={() => {
                                set_advanced(true)
                            }}
                        >Edit Search</button>
                        
                        </div>
                        <Results search={_search} datasetType={datasetType} />
                    </div>
            }


        </article>
    )
}

