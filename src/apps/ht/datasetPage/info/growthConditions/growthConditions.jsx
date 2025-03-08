import React, {useMemo} from 'react'
import Style from './growthC.module.css'

export default function GrowthConditions({growthCondition}) {

    let informations = useMemo(() => {
        let inf = []
        //inf.push({title:"",data:""});
        growthCondition?.organism && inf.push({title:"ORGANISM",data: growthCondition?.organism});
        growthCondition?.geneticBackground && inf.push({title: "GENETIC BACKGROUND",data: growthCondition?.geneticBackground});
        growthCondition?.medium && inf.push({title: "MEDIUM",data: growthCondition?.medium});
        growthCondition?.mediumSupplements && inf.push({title: "MEDIUM SUPPLEMENTS",data: growthCondition?.mediumSupplements});
        growthCondition?.aeration && inf.push({title: "AERATIOM",data: growthCondition?.aeration});
        growthCondition?.temperature && inf.push({title: "TEMPERATURE",data: growthCondition?.temperature});
        growthCondition?.ph && inf.push({title: "PH",data: growthCondition?.ph});
        growthCondition?.pressure && inf.push({title: "PRESSURE",data: growthCondition?.pressure});
        growthCondition?.opticalDensity && inf.push({title: "OPTICAL DENSITY",data: growthCondition?.opticalDensity});
        growthCondition?.growthPhase && inf.push({title: "GROWTH PHASE",data: growthCondition?.growthPhase});
        growthCondition?.growthRate && inf.push({title: "GROWTH RATE",data: growthCondition?.growthRate});
        growthCondition?.vesselType && inf.push({title: "VESSEL TYPE",data: growthCondition?.vesselType});
        growthCondition?.agitationSpeed && inf.push({title: "AERATION SPEED",data: growthCondition?.agitationSpeed});
        return inf;
    },[growthCondition])

    if (!growthCondition || informations.length<1) {
        return <></>
    }

    return (
        <div>
            <h2>GROWTH CONDITIONS</h2>
            <div style={{ marginLeft: "5%" }} className={Style.gridContainer} >
            {
                informations
                ?informations.map((gc,i)=>{
                    if (!gc.data) {
                        return null
                    }
                    return <BitInfo key={`bgrowth_${i}_${gc.title}`} title={gc.title} data={gc.data} />
                })
                :null
            }
            </div>
        </div>
    )
}

function BitInfo({ title, data }) {
    if (!data) {
        return null
    }
    return (
        <div className={Style.gridItem}>
            <p style={{ fontSize: "12px", textAlign: "center" }} className="p_accent">
                {title}
            </p>
            <p style={{ fontSize: "14px", textAlign: "center" }}>
                {data}
            </p>
        </div>
    )
}