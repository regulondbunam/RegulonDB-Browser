import { SCHEMA_FEATURE, SCHEMA_TRACK, FM_TSV_COLUMNS, toNumber, convertStrand, getRandomSymbol, getRandomBrightColorHex } from "./util";
import governmentLabelColor from "./governmentColors";

export default function FeatureMapTsvToTrackJson(featureMaps,currentTracks,state) {
    const { labelColumn } = state._controlState
    const lines = featureMaps.trim().split('\n');
    let tracks = {
        "_governmentSymbols": {...currentTracks._governmentSymbols},
        "_governmentLabels": {...currentTracks._governmentLabels}
    }
    for (const line of lines) {
        if (line.trim().startsWith('#')) {
            //ignora si la linea empieza con #
            continue;
        }
        const cells = line.split(/\t/);
        if (cells.length > 1) {
            let track = { ...SCHEMA_TRACK }
            if (!tracks[cells[FM_TSV_COLUMNS.mapName]]) {
                tracks[cells[FM_TSV_COLUMNS.mapName]] = {
                    ...track,
                    id: `track_${cells[FM_TSV_COLUMNS.mapName]}_${Math.floor(Math.random() * 1000)}`,
                    name: cells[FM_TSV_COLUMNS.mapName]
                }
            }
            track = tracks[cells[FM_COLUMNS.mapName]]

            switch (cells[FM_TSV_COLUMNS.identifier].toLowerCase()) {
                case "seq_end":
                    track.SEQ_END = toNumber(cells[FM_TSV_COLUMNS.endPosition]);
                    break;
                case "seq_start":
                    track.SEQ_START = toNumber(cells[FM_TSV_COLUMNS.startPosition]);
                    break;
                default:
                    let feature = { ...SCHEMA_FEATURE };
                    feature.id = `feature_${cells[FM_TSV_COLUMNS.mapName]}_${Math.floor(Math.random() * 1000)}`
                    feature.type = cells[FM_TSV_COLUMNS.type]
                    feature.label = cells[FM_TSV_COLUMNS.identifier];
                    feature.identifier = cells[FM_TSV_COLUMNS.identifier];
                    feature.strand = convertStrand(cells[FM_TSV_COLUMNS.strand])
                    feature.leftEndPosition = toNumber(cells[FM_TSV_COLUMNS.startPosition])
                    feature.rightEndPosition = toNumber(cells[FM_TSV_COLUMNS.endPosition])
                    feature.sequence = cells[FM_TSV_COLUMNS.function]
                    feature.score = toNumber(cells[FM_TSV_COLUMNS.score])
                    feature.evidence = cells[FM_TSV_COLUMNS.evidence]
                    feature.additional = cells[FM_TSV_COLUMNS.additional]
                    const value = feature[labelColumn]
                    if (!tracks._governmentLabels[value]) {
                        tracks._governmentLabels[value] = governmentLabelColor(labelColumn,value)
                    }
                    if (!tracks._governmentSymbols[cells[FM_TSV_COLUMNS.identifier]]) {
                        tracks._governmentSymbols[cells[FM_TSV_COLUMNS.identifier]] = getRandomSymbol()
                    }
                    track.features = [...track.features, feature]
                    break;
            }
        }
    }

    return tracks;
}