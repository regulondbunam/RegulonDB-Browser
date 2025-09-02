import { TRACK_TEMPLATE, FEATURE_TEMPLATE } from "./trackTemplate";
import safeID from "../safeID";
import {stringToNumber} from "../utils"

const COLUMNS_FM = {
  MAP_NAME: 0,
  FEATURE_TYPE: 1,
  IDENTIFIER: 2,
  STRAND: 3,
  START: 4,
  END: 5,
  SEQUENCE: 6,
  SCORE: 7,
};

export default function tracksFromFeatureMap(rawFM) {
  if (!rawFM) return {};

  const tracks = {};
  const lines = rawFM.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const cell = line.split("\t");
    const trackName = cell[COLUMNS_FM.MAP_NAME]?.trim();
    if (!trackName) continue;

    const featureID = safeID(
      `${cell[COLUMNS_FM.IDENTIFIER]}_${trackName}_${cell[COLUMNS_FM.START]}_${cell[COLUMNS_FM.END]}_${cell[COLUMNS_FM.STRAND]}`
    );

    const feature = {
      ...FEATURE_TEMPLATE,
      _id: featureID,
      type: cell[COLUMNS_FM.FEATURE_TYPE],
      strand: cell[COLUMNS_FM.STRAND],
      relativeStartPosition: stringToNumber(cell[COLUMNS_FM.START]),
      relativeEndPosition: stringToNumber(cell[COLUMNS_FM.END]),
      sequence: cell[COLUMNS_FM.SEQUENCE],
      score: cell[COLUMNS_FM.SCORE],
      label: cell[COLUMNS_FM.IDENTIFIER],
      attributes: {},
      leftEndPosition: 0,
      rightEndPosition: 0,
    };

    if (!tracks[trackName]) {
      tracks[trackName] = {
        ...TRACK_TEMPLATE,
        _id: trackName,
        name: trackName,
        leftEndPosition: 0,
        rightEndPosition: 0,
        source: [],
        features: {},
      };
    }

    tracks[trackName].features[featureID] = feature;
  }

  return tracks;
}
