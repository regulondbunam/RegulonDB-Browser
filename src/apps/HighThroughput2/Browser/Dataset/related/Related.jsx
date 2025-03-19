import React, {useState, useMemo} from 'react'
import GetRelatedDataset from '../../../ws_old/dataset/dataset_related'
import { CircularProgress } from '@mui/material'
import Style from './related.module.css'
//const relatedOptions = ["datasetType","objectsTested","publications"]

export default function Related({
    datasetId,
    objectTested,
    onSelectDatasetId = () => {},
}) {
    const [_datasets, set_datasets] = useState()
    const [_state, set_state] = useState()

    const tfs = useMemo(() => {
        if(objectTested){
            let a = objectTested.map(obj=>{
                return obj.name
            }).join("|")
            return a
        }
        return undefined
    }, [objectTested])

    if(!objectTested){
        return <div></div>
    }

    if (_state === "error") {
        return <div></div>
    }
    if (!_datasets) {
        return(
            <div>
                <GetRelatedDataset ht_query={`'${tfs}'[objectsTested.name]`} resoultsData={(datasets)=>{set_datasets(datasets)}} status={(state)=>{set_state(state)}} />
                <CircularProgress />
            </div>
        )
    }else{
        if(_datasets.length < 2){
            return <div></div>
        }
        return (
            <div>
                <h2>RELATED DATASET</h2>
                <p>Related by TF</p>
                <div style={{marginLeft: "3%"}}>
                    {
                        _datasets.map((dataset, idx )=>{
                            if(dataset?._id === datasetId ){
                                return null
                            }
                            let title = dataset.sample.title
                            if(!title ||  title === "obtener de GEO"){
                                if(dataset?.publications){
                                    title = dataset.publications.map(pub=>{
                                        return pub.title;
                                    }).join(", ")
                                }
                                if(!title){
                                    title = dataset?._id
                                }
                            }
                            return(
                               <div key={idx} className={Style.relatedCard}
                                    onClick={()=>{onSelectDatasetId(dataset?._id)}}
                                >
                                   {title}
                                    </div>
                            )
                        })
                    }
                </div>
            </div>
          )
    }
  
}
