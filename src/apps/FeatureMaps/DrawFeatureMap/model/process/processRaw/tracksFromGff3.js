import {TRACK_TEMPLATE, FEATURE_TEMPLATE} from "./trackTemplate";

export default function tracksFromGff3(rawGff3){
  if (!rawGff3) return [];
  const tracks = {}
  const lines = rawGff3.split("\n");
  for (const line of lines) {
    if (line.startsWith("#")) continue;
    const cell = line.split("\t");
    // seqID es tomado como el identificador del track
    let track = {...TRACK_TEMPLATE}
    let feature = {...FEATURE_TEMPLATE}
    if(tracks.hasOwnProperty(cell[0])){
      track = track[cell[0]]
    }else{
      track.leftEndPosition = 0
      track.rightEndPosition = 0
      track._id = cell[0]
      track.name = cell[0]
      track.source.push(cell[1])
    }
    // source


    tracks[cell[0]] = track
  }
}