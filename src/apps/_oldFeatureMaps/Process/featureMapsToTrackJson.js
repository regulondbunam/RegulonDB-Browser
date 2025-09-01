import { SCHEMA_FEATURE, SCHEMA_TRACK, FM_COLUMNS, toNumber, convertStrand, getRandomSymbol, getRandomBrightColorHex } from "./util";
import governmentLabelColor from "./governmentColors";
import {FEATURE_MAP_COLUMNS} from "../static";

export default function featureMapsToTrackJson(featureMaps,currentTracks,state) {
    const { labelColumn } = state._controlState
    const lines = featureMaps.trim().split('\n');
    let tracks = {
        "_governmentSymbols": {...currentTracks._governmentSymbols},
        "_governmentLabels": {...currentTracks._governmentLabels},
    }
    for (const line of lines) {
        if (line.trim().startsWith('#')) {
            if (line.trim().startsWith('#->')){
                const cells = line.split(/\t/);
                cells[0] = cells[0].slice(3)
                const _governmentsColumns = {
                    columns: cells,
                    mapFMtoCL:{
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.identifier]]: cells[FM_COLUMNS.identifier],
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.type]]: cells[FM_COLUMNS.type],
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.startPosition]]: cells[FM_COLUMNS.startPosition],
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.endPosition]]: cells[FM_COLUMNS.endPosition],
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.score]]: cells[FM_COLUMNS.score],
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.evidence]]: cells[FM_COLUMNS.evidence],
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.sequence]]: cells[FM_COLUMNS.sequence],
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.additional]]: cells[FM_COLUMNS.additional],
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.mapName]]: cells[FM_COLUMNS.mapName],
                        [FEATURE_MAP_COLUMNS[FM_COLUMNS.strand]]: cells[FM_COLUMNS.strand],
                    },
                    mapCLtoFM:{
                        [cells[FM_COLUMNS.identifier]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.identifier],
                        [cells[FM_COLUMNS.type]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.type],
                        [cells[FM_COLUMNS.startPosition]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.startPosition],
                        [cells[FM_COLUMNS.endPosition]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.endPosition],
                        [cells[FM_COLUMNS.sequence]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.sequence],
                        [cells[FM_COLUMNS.score]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.score],
                        [cells[FM_COLUMNS.evidence]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.evidence],
                        [cells[FM_COLUMNS.additional]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.additional],
                        [cells[FM_COLUMNS.mapName]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.mapName],
                        [cells[FM_COLUMNS.strand]]:FEATURE_MAP_COLUMNS[FM_COLUMNS.strand],
                    }
                }
                localStorage.setItem('featureMapColumns', JSON.stringify(_governmentsColumns))
            }else{
                if (localStorage.getItem('featureMapColumns')){
                    localStorage.removeItem('featureMapColumns')
                }
            }
            continue;
        }
        const cells = line.split(/\t/);
        if (cells.length > 1) {
            let track = { ...SCHEMA_TRACK }
            if (!tracks[cells[FM_COLUMNS.mapName]]) {
                tracks[cells[FM_COLUMNS.mapName]] = {
                    ...track,
                    id: `track_${cells[FM_COLUMNS.mapName]}_${Math.floor(Math.random() * 1000)}`,
                    name: cells[FM_COLUMNS.mapName]
                }
            }
            track = tracks[cells[FM_COLUMNS.mapName]]

            switch (cells[FM_COLUMNS.identifier].toLowerCase()) {
                case "seq_end":
                    track.SEQ_END = toNumber(cells[FM_COLUMNS.endPosition]);
                    break;
                case "seq_start":
                    track.SEQ_START = toNumber(cells[FM_COLUMNS.startPosition]);
                    break;
                default:
                    let feature = { ...SCHEMA_FEATURE };
                    feature.trackKey = cells[FM_COLUMNS.mapName]
                    feature.id = `feature_${cells[FM_COLUMNS.mapName]}_${Math.floor(Math.random() * 1000)}`
                    feature.type = cells[FM_COLUMNS.type]
                    feature.label = cells[FM_COLUMNS.identifier];
                    feature.identifier = cells[FM_COLUMNS.identifier];
                    feature.strand = convertStrand(cells[FM_COLUMNS.strand])
                    feature.leftEndPosition = toNumber(cells[FM_COLUMNS.startPosition])
                    feature.rightEndPosition = toNumber(cells[FM_COLUMNS.endPosition])
                    feature.sequence = cells[FM_COLUMNS.sequence]
                    feature.score = toNumber(cells[FM_COLUMNS.score])
                    feature.evidence = cells[FM_COLUMNS.evidence]
                    feature.additional = cells[FM_COLUMNS.additional]
                    const value = feature[labelColumn]
                    if (!tracks._governmentLabels[value]) {
                        tracks._governmentLabels[value] = governmentLabelColor(labelColumn,value)
                    }
                    if (!tracks._governmentSymbols[cells[FM_COLUMNS.identifier]]) {
                        tracks._governmentSymbols[cells[FM_COLUMNS.identifier]] = getRandomSymbol()
                    }
                    track.features = [...track.features, feature]
                    break;
            }
        }
    }

    return tracks;
}