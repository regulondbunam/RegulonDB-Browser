import React from 'react'
import Style from "../filter.module.css"

/*
organism: String
geneticBackground: String
medium: String
aeration: String
temperature: String
ph: String
pressure: String
opticalDensity: String
growthPhase: String
growthRate: String
vesselType: String
agitationSpeed: String
mediumSupplements: String
otherTerms: [String]
*/

export default function GConditions({ data, filterData, set_filterData, selectDatasets, set_selectedDataset }) {
    let gConditions = filterData.gConditions
    //let groupGC = [] 
    let _gConditions = {}
    for (let dtset of data) {
        let gcs = dtset.growthConditions
        if (gcs) {
            Object.keys(gcs).forEach((gc) => {
                if (gcs[gc] !== null) {
                    let label = `${gc}-${gcs[gc]}`
                    if (_gConditions[label]) {
                        _gConditions[label].push(dtset._id)
                    } else {
                        _gConditions[label] = [dtset._id]
                    }
                }

            })
        }
    }
    //console.log(gConditions)
    return (
        <div className={Style.filedContent} >
            <table className="table_content">
                <thead>
                    {
                        Object.keys(_gConditions).map((strategy, i) => {
                            let ids = _gConditions[strategy]
                            return (
                                <tr key={`ids_filter_${i}_${strategy}`}>
                                    <th>
                                        <input type="checkbox" name={`CB_${strategy}`} id={`CB_author_${strategy}`}
                                            value={strategy}
                                            checked={gConditions.find(element => element === strategy) ? true : false}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    for (let id of ids) {
                                                        selectDatasets.push(id)
                                                    }
                                                    gConditions.push(strategy);
                                                } else {
                                                    let inx
                                                    for (let id of ids) {
                                                        inx = selectDatasets.indexOf(id);
                                                        if (inx > -1) {
                                                            selectDatasets.splice(inx, 1);
                                                        }
                                                    }
                                                    inx = gConditions.indexOf(strategy);
                                                    if (inx > -1) {
                                                        gConditions.splice(inx, 1);
                                                    }
                                                }
                                                filterData.gConditions = gConditions
                                                set_filterData(filterData)
                                                set_selectedDataset(selectDatasets)
                                            }}
                                        />
                                        {
                                            strategy
                                        }
                                    </th>
                                </tr>
                            )
                        })
                    }
                </thead>
            </table>
        </div>
    )
}