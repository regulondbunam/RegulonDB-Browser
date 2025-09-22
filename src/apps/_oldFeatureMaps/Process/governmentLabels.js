import governmentLabelColor from "./governmentColors";

export default function governmentLabels(tracks, label){
    const government = {}
    for (const key in tracks) {
        if(key !== "_governmentLabels" && key !== "_governmentSymbols"){
            const features = tracks[key].features;
            for (const feature of features) {
                const id = feature.id
                let value = feature[label]
                if(label === "mapName"){
                    value = key
                }else if(label === "endPosition"){
                    value = feature.rightEndPosition
                }else if(label === "startPosition"){
                    value = feature.leftEndPosition
                }
               console.log(label, feature)
                if (!government[id]) {
                    government[value] = governmentLabelColor(label,value)
                }
            }
        }
    }
    return government
}