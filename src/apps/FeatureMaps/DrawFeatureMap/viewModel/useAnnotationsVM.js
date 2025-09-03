import {useStore} from "../store"
import { getRandomBrightColorHex } from "../model/process/utils"

export default function useAnnotationsVM() {
    const {featureMapData, setAnnotationColor, setAnnotationsLabels} =  useStore()
    console.log(featureMapData)
    const labels = featureMapData?.annotations?.labels
    const columnSelect = featureMapData?.annotations?.columnSelect
    const columns = featureMapData?.columns
    const handleColumnSelect = (event) => {
        const newColumnSelect = event.target.value
        const tracks = featureMapData?.tracks
        const columnsMapping = featureMapData?.columnMapping
        const property = columnsMapping[newColumnSelect]
        const labels = {}
        Object.keys(tracks).forEach(trackKey => {
            const track = tracks[trackKey]
            const features = track.features
            Object.keys(features).forEach(featureKey => {
                const feature = features[featureKey]
                labels[feature[property]] = getRandomBrightColorHex();
            })
        })
        setAnnotationsLabels(labels,newColumnSelect)
        console.log(labels)
    }

    return {labels, columns, columnSelect, setAnnotationColor, handleColumnSelect}
}