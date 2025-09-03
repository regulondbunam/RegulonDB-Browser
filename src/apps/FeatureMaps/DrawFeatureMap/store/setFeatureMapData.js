export default function setFeatureMapData(state,featureMapData){
    return{
        ...state,
        featureMapData:{
            ...featureMapData
        },
        scaleBar: {
            positions: {
                ...featureMapData.options.limits,
            }
        },
    }
}