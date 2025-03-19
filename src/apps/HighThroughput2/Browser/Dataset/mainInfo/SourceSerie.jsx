import React from 'react'

let Style = {}

Style.gridContainer = {
    display: "grid",
    gridGap: "3px",
    gridAutoFlow: "dense",
    gridTemplateColumns: "repeat(auto-fill,minmax(100px, 1fr))"
}
Style.gridItem = {
    display: "grid",
    backgroundColor: "rgb(243, 220, 171)",
    textAlign: "center",
    verticalAlign: "middle",
    padding: "5px",
}

export default function SourceSerie({ sourceSerie }) {
    //console.log(sourceSerie?.series.length);
    return (
        <div style={{ marginLeft: "3%" }}>
            {
                sourceSerie?.title && <p className="p_accent" >{sourceSerie?.title}</p>
            }
            {
                sourceSerie?.metod &&  <p style={{fontSize: "14px"}} >Metod: {sourceSerie?.metod}</p>
            }
            {
                sourceSerie?.series.length > 0 && <div>
                    <p style={{fontSize: "14px"}} >Series id:{
                        sourceSerie.series.map((serie)=>{
                            return serie.sourceId
                        }).join(", ")
                    }</p>
                    
            </div>
            }
            {
                sourceSerie?.platform?.title && <div>
                    <p style={{fontSize: "14px"}} >Platform: {sourceSerie?.platform?.title}</p>
                    {
                        sourceSerie?.platform?.source && <p>source: {sourceSerie?.platform?.source}</p>
                    }
                </div>
            }
            
        </div>
    )
}
