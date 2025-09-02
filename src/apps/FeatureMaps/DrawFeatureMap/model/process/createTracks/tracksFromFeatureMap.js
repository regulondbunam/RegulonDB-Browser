import {TRACK_TEMPLATE, FEATURE_TEMPLATE} from "./trackTemplate";


const COLUMNS_FM = {
  MAP_NAME: 0,
  FEATURE_TYPE: 1,
  IDENTIFIER: 2,
  STRAND: 3,
  START: 4,
  END: 5,
  SEQUENCE: 6,
  SCORE: 7
}

export default function tracksFromFeatureMap(rawFM){
  if (!rawFM) return [];
  const tracks = {}
  const lines = rawFM.split("\n");
  for (const line of lines) {
    if (line.startsWith("#")) continue;
    const cell = line.split("\t");
    // columna map name identificador del track
    const mapName = cell[COLUMNS_FM.MAP_NAME]
    if(!mapName || mapName === "") continue;
    let track = {...TRACK_TEMPLATE}
    let feature = {...FEATURE_TEMPLATE}
    if(tracks.hasOwnProperty(mapName)){
      track = tracks[mapName]
    }else{
      // atributos de la track
      track.leftEndPosition = 0
      track.rightEndPosition = 0
      track._id = mapName
      track.name = mapName
    }
    // atributos del feature
    const id = cell[COLUMNS_FM.IDENTIFIER]+"-"+cell[COLUMNS_FM.START]+"-"+cell[COLUMNS_FM.END]
    feature.type = cell[COLUMNS_FM.FEATURE_TYPE]
    feature._id = id
    feature.strand = cell[COLUMNS_FM.STRAND]
    feature.relativeStartPosition = cell[COLUMNS_FM.START]
    feature.relativeEndPosition = cell[COLUMNS_FM.END]
    feature.sequence = cell[COLUMNS_FM.SEQUENCE]
    feature.score = cell[COLUMNS_FM.SCORE]
    feature.label = cell[COLUMNS_FM.IDENTIFIER]
    //track.features[id] = feature
    tracks[mapName] = track
  }
  return tracks;
}